import { create } from "zustand";
import * as _ from "lodash";

export interface Team {
  name: string;
  scores: number[];
}

enum RoundStage {
  WORDS = "WORDS",
  SECRET = "SECRET",
  GUESS = "GUESS",
  OTHER_TEAM_GUESS = "OTHER_TEAM_GUESS",
  RESULTS = "RESULTS",
}

export type HigherLower = "higher" | "lower";

export enum GameMode {
  ONE_GROUP = "ONE_GROUP",
  TWO_GROUPS = "TWO_GROUPS",
}

interface Round {
  roundNumber: number;
  roundStage: RoundStage;
  roundNumberWithGroupsSwitching: number;

  words: [string, string] | undefined;
  secret: number | undefined;
  guess: number | undefined;
  otherTeamGuess: HigherLower | undefined;
}

export type GameState = {
  teams: Team[];
  round: Round;
  mode: GameMode | undefined;
  adultPromptsAllowed: boolean;
};

type GameActions = {
  getCurrentTeam: (kind: "guessing" | "other") => Team;
  getTeamScore: (teamName: string) => number;

  newGame: (mode: GameMode, adultPromptsAllowed: boolean) => void;
  newRound: (changeRoles: boolean) => void;
  loadGame: (gameState: GameState) => void;

  setWords: (words: [string, string]) => void;
  setSecret: (secret: number) => void;
  setGuess: (guess: number) => void;
  setOtherTeamGuess: (guess: HigherLower) => void;
  setRoundScore: (teamName: string, score: number) => void;
};

const TEAMS_TEMPLATE: Team[] = [
  {
    name: "🟩 Green",
    scores: [],
  },
  {
    name: "🟥 Red",
    scores: [],
  },
];

const NEW_ROUND_TEMPLATE: Round = {
  roundNumber: 1,
  // This is different from the round number because it only advances when the players switch roles (guessing vs. giving clues)
  // This number isn't increased when losing team guesses correctly (+4)
  roundNumberWithGroupsSwitching: 1,
  roundStage: RoundStage.WORDS,
  words: undefined,
  secret: undefined,
  guess: undefined,
  otherTeamGuess: undefined,
};

// Create your store, which includes both state and (optionally) actions
export const useStore = create<GameState & GameActions>((set, get) => ({
  teams: [],
  round: { ...NEW_ROUND_TEMPLATE },
  mode: undefined,
  adultPromptsAllowed: false,
  getCurrentTeam: (kind: "guessing" | "other") => {
    let index = get().round.roundNumberWithGroupsSwitching;
    if (kind === "guessing") {
      index++;
    }
    return get().teams[index % 2];
  },
  getTeamScore: (teamName: string | undefined) => {
    if (teamName) {
      const team = get().teams.find((team) => team.name === teamName);
      if (team) {
        return team.scores.reduce((a, b) => a + b, 0);
      }
    }

    return 0;
  },
  newGame: (mode, adultPromptsAllowed: boolean) =>
    set(() => {
      let teams = _.cloneDeep(TEAMS_TEMPLATE);
      if (mode === GameMode.ONE_GROUP) {
        teams = [teams[0]];
      }

      return {
        round: { ...NEW_ROUND_TEMPLATE },
        teams: teams,
        adultPromptsAllowed: adultPromptsAllowed,
      };
    }),
  loadGame: (gameState) => set(() => gameState),
  newRound: (switchRules: boolean) => {
    set((state) => {
      let roundNumberWithGroupsSwitching =
        state.round.roundNumberWithGroupsSwitching;
      if (switchRules && state.teams.length > 1) {
        roundNumberWithGroupsSwitching++;
      }

      return {
        round: {
          ...NEW_ROUND_TEMPLATE,
          roundNumber: state.round.roundNumber + 1,
          roundNumberWithGroupsSwitching: roundNumberWithGroupsSwitching,
        },
      };
    });
  },
  setWords: (words) =>
    set((state) => ({
      round: { ...state.round, words: words, roundStage: RoundStage.SECRET },
    })),
  setSecret: (secret) =>
    set((state) => ({
      round: { ...state.round, secret: secret, roundStage: RoundStage.GUESS },
    })),
  setGuess: (guess) =>
    set((state) => ({
      round: {
        ...state.round,
        guess: guess,
        roundStage: RoundStage.OTHER_TEAM_GUESS,
      },
    })),
  setOtherTeamGuess: (guess) =>
    set((state) => ({
      round: {
        ...state.round,
        otherTeamGuess: guess,
        roundStage: RoundStage.RESULTS,
      },
    })),
  setRoundScore: (teamName, addedScore) =>
    set((state) => {
      const teams: Team[] = [...state.teams];

      const teamIndex = teams.findIndex((team) => team.name === teamName);
      if (teamIndex === -1) {
        throw new Error(`Team ${teamName} not found`);
      }

      const team = teams[teamIndex];
      const teamScores = team.scores;
      if (teamScores.length < state.round.roundNumber) {
        teamScores.push(0);
      }

      const newScores = [...teamScores];
      newScores[state.round.roundNumber - 1] = addedScore;

      teams[teamIndex] = {
        ...team,
        scores: newScores,
      };

      return {
        teams: teams,
      };
    }),
}));
