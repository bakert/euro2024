import {
    teams
} from "../data/data.ts";
import { Status } from "../models/models.ts";
import type { FeedT, MatchT } from "../models/models.ts";

const response = await fetch("https://bluebones.net/matches.json");
const matches = await response.json();

const data: FeedT = {
    matches: [],
    lastMatches: [],
    currentMatches: [],
    nextMatches: [],
}

matches.forEach((match: MatchT) => {
    const home = teams[match.home.name] ?? match.home;
    const away = teams[match.away.name] ?? match.away;
    const kickoff = new Date(match.kickoff);
    const m: MatchT = {
        ...match,
        kickoff: kickoff,
        home: home,
        away: away,
    };
    data.matches.push(m);
});

const upcomingMatches = data.matches.filter((m: MatchT) => m.status === Status.UPCOMING);
const minKickoffDate = Math.min(...upcomingMatches.map(m => m.kickoff.getTime()));
data.nextMatches = upcomingMatches.filter((m: MatchT) => m.kickoff.getTime() === minKickoffDate);

const finishedMatches = data.matches.filter((m: MatchT) => m.status === Status.FINISHED);
const maxKickoffDate = Math.max(...finishedMatches.map(m => m.kickoff));
data.lastMatches = finishedMatches.filter((m: MatchT) => m.kickoff === maxKickoffDate);

data.currentMatches = data.matches.filter((m: MatchT) => m.status === Status.CURRENT)

// BAKERT the word matches is working overtime here. better names
export default data;
