// noinspection JSUnusedLocalSymbols
const moduleLogger = loggerCreator(__filename);

interface Team {
  name: string;
  score: number;
}

interface Round {
  roundNumber: number;

  words: [string, string];
  secret: number;
  guess: number | undefined;
  otherTeamGuess: "higher" | "lower" | undefined;
}

interface Params {
  teams: Team[];
  round: Round;
}

export class GameEntity {
  get currentTeam(): Team {
    return this.teams[this.round.roundNumber % this.teams.length];
  }

  get otherTeam(): Team {
    return this.teams[(this.round.roundNumber + 1) % this.teams.length];
  }

  constructor(data: Params) {
    Object.assign(this, data);
  }
}

// utility - merges parameters as class members
export interface GameEntity extends Params {}
