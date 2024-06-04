import { people, dave, fra, tom, row, chris, melody, evelyn, iris, hannah } from "../data/people.js";
import { teams, germany, belgium, france, portugal, scotland, spain, turkiye, austria, england, hungary, slovakia, albania, czechia, denmark, netherlands, romania, switzerland, slovenia, serbia, croatia, italy, poland, georgia, ukraine } from "../data/teams.js";

const personMap = Object.fromEntries(Object.values(people).map((person) => [person.name, structuredClone(person)]));
const teamMap = Object.fromEntries(Object.values(teams).map((team) => [team.name, structuredClone(team)]));

const owners = {
    [dave.name]: [germany, scotland],
    [fra.name]: [france, portugal],
    [tom.name]: [spain, belgium],
    [row.name]: [turkiye, austria, ukraine],
    [chris.name]: [england, hungary, georgia],
    [melody.name]: [slovakia, albania, poland],
    [evelyn.name]: [czechia, denmark, italy],
    [iris.name]: [netherlands, romania, croatia],
    [hannah.name]: [switzerland, slovenia, serbia],
};

Object.values(people).forEach((person) => {
    person.teams = owners[person.name].map((team) => teamMap[team.name]);
    owners[person.name].forEach((team) => {
        team.person = personMap[person.name];
    });
});

const olympiastadion = {
    name: "Olympiastadion",
}

console.log(people);

export {
    people,
    teams,
    dave, fra, tom, row, chris, melody, evelyn, iris, hannah,
    germany, belgium, france, portugal, scotland, spain, turkiye, austria, england, hungary, slovakia, albania, czechia, denmark, netherlands, romania, switzerland, slovenia, serbia, croatia, italy, poland, georgia, ukraine,
    olympiastadion
};
