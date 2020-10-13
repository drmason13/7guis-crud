import { writable } from 'svelte/store'

const intialUsers = [
    { first: 'Hans', last: 'Emil' },
    { first: 'Max', last: 'Mustermann' },
    { first: 'Roman', last: 'Tisch' }
]

export const users = writable(intialUsers)