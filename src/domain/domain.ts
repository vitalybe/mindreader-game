interface Team {
    name: string;
    score: number;
}

interface Round {
    roundNumber: number;
    secret: number;
    words: [string, string];
}

export interface Game {
    teams: Team[];
    round: Round;
}
