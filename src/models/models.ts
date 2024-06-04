export type PersonT = {
    name: string,
    teams?: TeamT[],
};

export type TeamT = {
    name: string,
    code: string,
    person?: PersonT,
};

export type StadiumT = {
    name: string,
};

type ScoreT = {
    home: number,
    away: number,
}

export type MatchT = {
    home: TeamT,
    away: TeamT,
    kickoff: Date,
    stage: string,
    stadium: StadiumT,
    score?: {
        regular?: ScoreT,
        penalties?: ScoreT,
    }
};

export type FeedT = {
    matches: { [key: string]: MatchT },
    lastMatches: MatchT[],
    nextMatches: MatchT[],
};
