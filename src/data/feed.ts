import {
    teams
} from "../data/data.ts"
import { Status } from "../models/models.ts"
import type { FeedT, MatchT } from "../models/models.ts"

const response = await fetch("https://bluebones.net/matches.json")
const matches = await response.json()

const feed: FeedT = {
    matches: [],
    lastMatches: [],
    currentMatches: [],
    nextMatches: [],
}

matches.forEach((match: MatchT) => {
    const home = teams[match.home.name] ?? match.home
    const away = teams[match.away.name] ?? match.away
    const kickoff = new Date(match.kickoff)
    const m: MatchT = {
        ...match,
        kickoff: kickoff,
        home: home,
        away: away,
    }
    feed.matches.push(m)
})

const upcomingMatches = feed.matches.filter((m: MatchT) => m.status === Status.UPCOMING)
const minKickoffTime = Math.min(...upcomingMatches.map(m => m.kickoff.getTime()))
feed.nextMatches = upcomingMatches.filter((m: MatchT) => m.kickoff.getTime() === minKickoffTime)

const finishedMatches = feed.matches.filter((m: MatchT) => m.status === Status.FINISHED)
const maxKickoffTime = Math.max(...finishedMatches.map(m => m.kickoff.getTime()))
feed.lastMatches = finishedMatches.filter((m: MatchT) => m.kickoff.getTime() === maxKickoffTime)

feed.currentMatches = feed.matches.filter((m: MatchT) => m.status === Status.CURRENT)

export default feed
