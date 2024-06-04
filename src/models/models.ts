export type PersonT = {
    name: string,
    teams?: [TeamT],
};

export type TeamT = {
    name: string,
    code: string,
    person?: PersonT,
}

export type MatchT = {
    home: TeamT,
    away: TeamT,
    kickoff: Date,
};

export type FeedT = {
    matches: {string: MatchT},
}
