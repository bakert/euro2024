import {
    teams
} from "../data/data.ts";
import now from "../data/now.ts";
import type { FeedT } from "../models/models.ts";

const response = await fetch("https://bluebones.net/matches.json");
const matches = await response.json();

const data: FeedT = {
    matches: [],
    lastMatches: [],
    currentMatches: [],
    nextMatches: [],
}

matches.forEach((match) => {
    const home = teams[match.home.name] ?? match.home; // BAKERT typing of this nonsense
    const away = teams[match.away.name] ?? match.away;
    // BAKERT can maybe do some clever ...rest stuff here
    const m = {
        status: match.status,
        kickoff: match.kickoff,
        stage: match.stage,
        home: home,
        away: away,
        stadium: match.stadium,
    };
    if (match.score) {
        m.score = match.score;
    }
    if (match.penalty) {
        m.penalty = match.penalty;
    }
    data.matches.push(m);
});

const upcomingMatches = matches.filter(m => m.status === "UPCOMING");
const minKickoffDate = Math.min(...upcomingMatches.map(m => new Date(m.kickoff).getTime()));
data.nextMatches = upcomingMatches.filter(m => new Date(m.kickoff).getTime() === minKickoffDate);

const finishedMatches = matches.filter(m => m.status === "FINISHED");
const maxKickoffDate = Math.max(...finishedMatches.map(m => new Date(m.kickoff).getTime()));
data.lastMatches = finishedMatches.filter(m => new Date(m.kickoff).getTime() === maxKickoffDate);

data.currentMatches = data.matches.filter((m) => m.status === "CURRENT")

// BAKERT the word matches is working overtime here. better names
export default data;
