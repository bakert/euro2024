export interface PersonT {
    name: string,
    teams?: TeamT[],
};

export interface TeamT {
    name: string;
    code: string;
    person?: PersonT;
};

export interface StadiumT {
    name: string;
};

interface ScoreT {
    home: number;
    away: number;
}

export enum Status {
    UPCOMING = "UPCOMING",
    CURRENT = "CURRENT",
    FINISHED = "FINISHED",
}

export interface MatchT {
    status: Status;
    home: TeamT;
    away: TeamT;
    kickoff: Date;
    stage: string;
    stadium: StadiumT;
    score?: {
        regular?: ScoreT;
        penalty?: ScoreT;
    }
};

// BAKERT death to semicolons
export interface FeedT {
    matches: MatchT[];
    // BAKERT maybe just generate these in home
    currentMatches: MatchT[];
    lastMatches: MatchT[];
    nextMatches: MatchT[];
};
