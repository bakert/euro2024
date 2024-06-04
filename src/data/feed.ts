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
    const home = teams[match.home.name.toLowerCase()] ?? match.home
    const away = teams[match.away.name.toLowerCase()] ?? match.away
    const kickoff = new Date(match.kickoff)
    const m: MatchT = {
        ...match,
        kickoff: kickoff,
        home: home,
        away: away,
    }
    feed.matches.push(m)
})

export default feed
