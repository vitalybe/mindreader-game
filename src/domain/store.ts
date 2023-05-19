import { create } from "zustand";

export interface Team {
  name: string;
  score: number;
}

enum RoundStage {
  WORDS = "WORDS",
  SECRET = "SECRET",
  GUESS = "GUESS",
  OTHER_TEAM_GUESS = "OTHER_TEAM_GUESS",
  RESULTS = "RESULTS",
}

export type HigherLower = "higher" | "lower";

interface Round {
  roundNumber: number;
  roundStage: RoundStage;

  words: [string, string] | undefined;
  secret: number | undefined;
  guess: number | undefined;
  otherTeamGuess: HigherLower | undefined;
}

type State = {
  teams: Team[];
  round: Round;
};

type Action = {
  newRound: () => void;

  setWords: (words: [string, string]) => void;
  setSecret: (secret: number) => void;
  setGuess: (guess: number) => void;
  setOtherTeamGuess: (guess: HigherLower) => void;
  setScore: (teamName: string, score: number) => void;
};

const NEW_ROUND_TEMPLATE: Round = {
  roundNumber: 1,
  roundStage: RoundStage.WORDS,
  words: undefined,
  secret: undefined,
  guess: undefined,
  otherTeamGuess: undefined,
};

// Create your store, which includes both state and (optionally) actions
export const useStore = create<State & Action>((set) => ({
  teams: [
    {
      name: "🟩 Green",
      score: 0,
    },
    {
      name: "🟥 Red",
      score: 0,
    },
  ],
  round: { ...NEW_ROUND_TEMPLATE },
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
  setScore: (teamName, addedScore) =>
    set((state) => {
      const teams: Team[] = [ ...state.teams ];

      const teamIndex = teams.findIndex((team) => team.name === teamName);
      if (teamIndex === -1) {
        throw new Error(`Team ${teamName} not found`);
      }

      teams[teamIndex] = {
        ...teams[teamIndex],
        score: teams[teamIndex].score + addedScore,
      };

      return {
        teams: teams,
      };
    }),
}));
