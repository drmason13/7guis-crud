<script>
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

    function selectUser(user) {
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

</script>

<section class="
    text-beige-800 border-beige-500 bg-beige-50
    max-w-2xl w-full rounded shadow px-2 py-6 border-2
    flex flex-col place-content-center items-center justify-items-center
">
    <div class="flex">
        <article id="left" class="flex flex-col mx-2">
            <div class="flex flex-grow-0 mb-6">
                <label for="search" class="w-2/5">Filter prefix: </label>
                <input id="search" class="w-3/5" bind:value={search}>
            </div>

            <ul id="db-view" class="h-64 border-2 border-beige-300 overflow-auto">
                {#each Object.values(users) as user}
                    <li class="px-2 py-1" class:hover:bg-yellow-200="{selected !== user.id}" class:bg-blue-700="{selected === user.id}" class:text-white="{selected === user.id}" on:click={() => selectUser(user)}>{user.last}, {user.first}</li>
                {/each}
            </ul>
        </article>

        <article id="right" class="flex flex-col justify-center mx-2">
            <div class="flex flex-grow-0">
                <label for="name" class="w-1/3">Name: </label>
                <input id="surname" class="w-2/3" bind:value={first}>
            </div>
            <div class="flex flex-grow-0">
                <label for="name" class="w-1/3">Surname: </label>
                <input id="surname" class="w-2/3" bind:value={last}>
            </div>
        </article>
    </div>

    <div id="buttons" class="mt-4 flex flex-grow-0 place-content-center items-center justify-items-center">
        <button on:click={createUser} class="btn box-border font-medium text-blue-500 bg-beige-100 border-blue-500 border-2 flex-grow-0 mx-2">Create</button>
        <button on:click={updateUser} class="btn box-border font-medium text-blue-500 bg-beige-100 border-blue-500 border flex-grow-0 mx-2">Update</button>
        <button on:click={deleteUser} class="btn box-content font-medium bg-red-700 flex-grow-0 mx-2">Delete</button>
    </div>
</section>
