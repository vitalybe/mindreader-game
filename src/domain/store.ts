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

  words: [string, string] | undefined;
  secret: number | undefined;
  guess: number | undefined;
  otherTeamGuess: HigherLower | undefined;
}

export type GameState = {
  teams: Team[];
  round: Round;
  mode: GameMode | undefined;
};

type GameActions = {
  newGame: (mode: GameMode) => void;
  newRound: () => void;
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
  roundStage: RoundStage.WORDS,
  words: undefined,
  secret: undefined,
  guess: undefined,
  otherTeamGuess: undefined,
};

// Create your store, which includes both state and (optionally) actions
export const useStore = create<GameState & GameActions>((set) => ({
  teams: [],
  round: { ...NEW_ROUND_TEMPLATE },
  mode: undefined,
  newGame: (mode) =>
    set(() => {
      let teams = _.cloneDeep(TEAMS_TEMPLATE);
      if (mode === GameMode.ONE_GROUP) {
        teams = [teams[0]];
      }

      return {
        round: { ...NEW_ROUND_TEMPLATE },
        teams: teams,
      };
    }),
  loadGame: (gameState) => set(() => gameState),
  newRound: () => {
    set((state) => ({
      round: {
        ...NEW_ROUND_TEMPLATE,
        roundNumber: state.round.roundNumber + 1,
      },
    }));
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
