export interface PersonT {
    name: string,
    teams?: TeamT[],
}

export interface TeamT {
    name: string
    code: string
    person?: PersonT
}

export interface StadiumT {
    name: string
}

interface ScoreT {
    home: number
    away: number
}

export enum Status {
    UPCOMING = "UPCOMING",
    CURRENT = "CURRENT",
    FINISHED = "FINISHED",
}

export interface MatchT {
    status: Status
    home: TeamT
    away: TeamT
    kickoff: Date
    stage: string
    stadium: StadiumT
    score?: {
        regular?: ScoreT
        penalty?: ScoreT
    }
}

export interface FeedT {
    matches: MatchT[]
}
