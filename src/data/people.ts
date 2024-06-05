import type { PersonT } from "../models/models.ts"

export const dave: PersonT = {
    name: "Dave",
}
export const fra: PersonT = {
    name: "Fra",
}
export const tom: PersonT = {
    name: "Tom",
}
export const row: PersonT = {
    name: "Row",
}
export const chris: PersonT = {
    name: "Chris",
}
export const melody: PersonT = {
    name: "Melody",
}
export const evelyn: PersonT = {
    name: "Evelyn",
}
export const iris: PersonT = {
    name: "Iris",
}
export const hannah: PersonT = {
    name: "Hannah",
}

export const people = {
    [chris.name.toLowerCase()]: chris,
    [dave.name.toLowerCase()]: dave,
    [evelyn.name.toLowerCase()]: evelyn,
    [fra.name.toLowerCase()]: fra,
    [hannah.name.toLowerCase()]: hannah,
    [iris.name.toLowerCase()]: iris,
    [melody.name.toLowerCase()]: melody,
    [row.name.toLowerCase()]: row,
    [tom.name.toLowerCase()]: tom,
}
