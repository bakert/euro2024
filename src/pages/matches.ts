import {
    germany, belgium, france, portugal, scotland, spain, turkiye, austria, england,
    olympiastadion
} from "../data/data.ts";
import now from "../data/now.ts";
import type { FeedT } from "../models/models.ts";

const data: FeedT = {
    matches: {
        "1": {
            kickoff: new Date("2024-06-14T19:00:00Z"),
            stage: "Group A",
            home: germany,
            away: scotland,
            stadium: olympiastadion,
            score: {
                regular: {
                    home: 2,
                    away: 1,
                },
                extraTime: {
                    home: 8,
                    away: 8,
                },
                penalties: {
                    home: 4,
                    away: 3,
                }
            }
        },
        "2": {
            kickoff: new Date("2024-06-15T13:00:00Z"),
            stage: "Group B",
            home: france,
            away: portugal,
            stadium: olympiastadion,
        },
        "3": {
            kickoff: new Date("2024-06-16T16:00:00Z"),
            stage: "Group B",
            home: spain,
            away: belgium,
            stadium: olympiastadion,
        },
        "4": {
            kickoff: new Date("2024-06-17T20:00:00Z"),
            stage: "Group C",
            home: england,
            away: austria,
            stadium: olympiastadion,
        },
        "5": {
            kickoff: new Date("2024-06-18T18:00:00Z"),
            stage: "Group ",
            home: turkiye,
            away: scotland,
            stadium: olympiastadion,
        }
    },
    lastMatches: [],
    nextMatches: [],
}

// Add lastMatches and nextMatches
const matches = Object.values(data.matches);
const lastMatchIndex = matches.findIndex(match => match.kickoff > now) - 1;
const lastMatches = lastMatchIndex >= 0 ? [matches[lastMatchIndex]] : [];
const nextMatches = matches.slice(lastMatchIndex + 1, lastMatchIndex + 2);
data.lastMatches = lastMatches;
data.nextMatches = nextMatches;

export const GET = async function GET() {
    return new Response(JSON.stringify(data), {
        headers: {
            "Content-Type": "application/json",
        },
    });
};
