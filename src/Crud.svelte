<script>
	import { onMount } from 'svelte';
    import { v4 as uuid } from 'uuid';

    let search = "";
    let first = "";
    let last = "";

    const reset = () => {
        selected = null;
        first = "";
        last = "";
    }

    const initialUsers = [
        { first: 'Hans', last: 'Emil' },
        { first: 'Max', last: 'Mustermann' },
        { first: 'Roman', last: 'Tisch' }
    ]

    let users = {};
    init();

    function init() { 
        for (const user of initialUsers) {
            const id = uuid();
            users[id] = { ...user, id };
        }
    }

    let selected = null;

    function selectUser(e, user) {
        jumpAreas['selected'] = e.target;
        selected = user.id;
        first = user.first;
        last = user.last;
    }

    function createUser() {
        const id = uuid();
        users[id] = { first, last, id };
        users = users;
        reset();
    }

    function updateUser() {
        if (!selected) { return }
        users[selected].first = first;
        users[selected].last = last;
    }

    function deleteUser() {
        let newUsers = users;
        delete newUsers[selected];
        users = newUsers;
        reset();
    }

    let jumpAreas;
    
    let currentArea = 'unknown';

    document.addEventListener('focus', updateJumpAreas, true)
    document.addEventListener('keydown', navigate, false)
    
    function updateJumpAreas(e) {
        currentArea = e.target.getAttribute('jumpArea');
        if (!currentArea || !Object.keys(jumpAreas).includes(currentArea)) {
            currentArea = 'unknown';
        }
        switch (currentArea) {
            case 'content':
            case 'edit':
                jumpAreas['middle'] = e.target;
                break;
        }
        jumpAreas[currentArea] = e.target;
    }

    function navigate(e) {
        let jump;
        switch (e.key) {
            case 'ArrowLeft':
                jump = jumpAreas[jumpLinks[currentArea].left];
                break;
            case 'ArrowRight':
                jump = jumpAreas[jumpLinks[currentArea].right];
                break;
            case 'ArrowUp':
                jump = jumpAreas[jumpLinks[currentArea].up];
                break;
            case 'ArrowDown':
                jump = jumpAreas[jumpLinks[currentArea].down];
                break;
            case 'Enter':
                if (e.target === document.querySelector('#db-view')) {
                    jump = jumpAreas['selected']
                }
                
        }
        if (typeof jump !== 'undefined') {
            jump.focus();
        }
    }

    $: console.log(jumpAreas)
    
    let jumpLinks = {
        search: {
            right: 'edit',
            down: 'middle',
        },
        content: {
            right: 'edit',
        },
        edit: {
            up: 'search',
            left: 'content',
            down: 'action',
        },
        action: {
            up: 'middle',
        },
        unknown: {
            up: 'search',
            left: 'content',
            right: 'edit',
            down: 'action',
        },
    }

    onMount(() => {
        jumpAreas = {
            search: document.querySelector("#search"),
            content: document.querySelector("#db-view"),
            middle: document.querySelector("#db-view"),
            edit: document.querySelector("#name"),
            action: document.querySelector("#update"),
        };
    })
</script>

<article class="
    text-beige-800 border-beige-500 bg-beige-50
    max-w-2xl w-full rounded shadow px-2 py-6 border-2
    flex flex-col place-content-center items-center justify-items-center
">
    <div class="flex">
        <section id="left" class="flex flex-col mx-2">
            <div class="flex flex-grow-0 mb-6">
                <label for="search" class="w-2/5">Filter prefix: </label>
                <input id="search" class="w-3/5 border-2 border-beige-300 rounded" bind:value={search} jumpArea="search">
            </div>

            <ul id="db-view" class="h-64 border-2 border-beige-300 flex flex-col items-stretch content-start overflow-auto" tabindex=0 jumpArea="content">
                {#each Object.values(users) as user}
                    <li><button class="px-2 py-1 w-full" class:focus:bg-yellow-200="{selected !== user.id}" class:hover:bg-yellow-200="{selected !== user.id}" class:bg-blue-700="{selected === user.id}" class:text-white="{selected === user.id}" on:click={e => selectUser(e, user)} jumpArea="content">{user.last}, {user.first}</button></li>
                {/each}
            </ul>
        </section>

        <section id="right" class="flex flex-col justify-center mx-2">
            <div class="flex flex-grow-0 px-2 py-2">
                <label for="name" class="w-1/3">Name: </label>
                <input id="name" class="w-2/3 border-2 border-beige-300 rounded" bind:value={first} jumpArea="edit">
            </div>
            <div class="flex flex-grow-0 px-2 py-2">
                <label for="surname" class="w-1/3">Surname: </label>
                <input id="surname" class="w-2/3 border-2 border-beige-300 rounded" bind:value={last} jumpArea="edit">
            </div>
        </section>
    </div>

    <div id="buttons" class="mt-4 flex flex-grow-0">
        <button id="create" on:click={createUser} class="btn btn-outline-beige flex-grow-0 mx-2" jumpArea="action">Create</button>
        <button id="update" on:click={updateUser} class="btn btn-outline-beige flex-grow-0 mx-2" jumpArea="action">Update</button>
        <button id="delete" on:click={deleteUser} class="btn btn-red bg-red-700 border-2 border-red-700 flex-grow-0 mx-2" jumpArea="action">Delete</button>
    </div>
</article>
