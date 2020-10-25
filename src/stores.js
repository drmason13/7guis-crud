import { writable } from 'svelte/store'
import { v4 as uuid } from 'uuid';

const initialUsers = [
    { first: 'Hans', last: 'Emil' },
    { first: 'Max', last: 'Mustermann' },
    { first: 'Roman', last: 'Tisch' },
    { first: 'Hans', last: 'Emil' },
    { first: 'Max', last: 'Mustermann' },
    { first: 'Roman', last: 'Tisch' },
    { first: 'Hans', last: 'Emil' },
    { first: 'Max', last: 'Mustermann' },
    { first: 'Roman', last: 'Tisch' },
    { first: 'Hans', last: 'Emil' },
]

function init() {
    let users = {};
    for (const user of initialUsers) {
        const id = uuid();
        users[id] = { ...user, id };
    };
    return users
}

export const users = writable(init())