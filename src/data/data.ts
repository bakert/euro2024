import { people, dave, fra, tom, row, chris, melody, evelyn, iris, hannah } from "../data/people.ts"
import { teams, germany, belgium, france, portugal, scotland, spain, turkiye, austria, england, hungary, slovakia, albania, czechia, denmark, netherlands, romania, switzerland, slovenia, serbia, croatia, italy, poland, georgia, ukraine } from "../data/teams.ts"
import { Status } from "../models/models.ts"
import type { MatchT, PersonT, TeamT } from "../models/models.ts"

const owners = {
    [dave.name]: [belgium, poland],
    [fra.name]: [albania, croatia, hungary],
    [tom.name]: [czechia, germany, ukraine],
    [row.name]: [portugal, slovenia, switzerland],
    [chris.name]: [england, turkiye],
    [melody.name]: [france, serbia, slovakia],
    [evelyn.name]: [georgia, netherlands, romania],
    [iris.name]: [austria, italy],
    [hannah.name]: [denmark, scotland, spain],
}

// Link owners to teams and teams to owners
Object.values(people).forEach((person: PersonT) => {
    person.teams = owners[person.name].map((team) => teams[team.name.toLowerCase()])
    owners[person.name].forEach((team: TeamT) => {
        team.person = people[person.name.toLowerCase()]
    })
})

const response = await fetch("https://bluebones.net/matches.json")
const rawMatches = await response.json()
const matches: MatchT[] = []

rawMatches.forEach((match: MatchT) => {
    const home = teams[match.home.name.toLowerCase()] ?? match.home
    const away = teams[match.away.name.toLowerCase()] ?? match.away
    const kickoff = new Date(match.kickoff)
    const m: MatchT = {
        ...match,
        kickoff: kickoff,
        home: home,
        away: away,
    }
    matches.push(m)
})

const bucket = (matches: MatchT[]) => {
    const bucketedMatches = matches.reduce((buckets: { [key: string]: MatchT[] }, match) => {
        buckets[match.status] = buckets[match.status] || [];
        buckets[match.status].push(match);
        return buckets;
    }, {})
    return [bucketedMatches[Status.UPCOMING] || [], bucketedMatches[Status.CURRENT] || [], bucketedMatches[Status.FINISHED] || []]

}

const fixtures = (team: TeamT, matches: MatchT[]) => {
    const teamMatches = matches.filter(match => match.home.name === team.name || match.away.name === team.name)
    return bucket(teamMatches)
}

Object.values(teams).forEach((team) => {
    const [upcoming, current, finished] = fixtures(team, matches);
    team.upcoming = upcoming
    team.current = current
    team.finished = finished
})

export { people, teams, matches, bucket }
