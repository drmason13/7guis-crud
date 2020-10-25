<script>
    import Search from './Search.svelte';
    import DbView from './DbView.svelte';
    import User from './User.svelte';
    import Edit from './Edit.svelte';
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

<article class="
    text-beige-800 border-beige-500 bg-beige-50
    max-w-xs sm:max-w-2xl w-full rounded shadow px-2 py-6 border-2
    flex flex-col place-content-center items-center justify-items-center
">
    <div class="flex flex-col sm:flex-row">
        <section id="left" class="flex flex-col mx-2">
            <Search bind:search></Search>
            <DbView styles="h-64 border-2 border-beige-300 flex flex-col items-stretch text-left content-start overflow-auto" items={users} let:item={user}>
                <User {user} {selected} {selectUser}></User>
            </DbView>
        </section>

        <section id="right" class="grid xs:grid-rows-2 sm:grid-rows-3 mx-2">
            <div class="row-start-2">
                <Edit bind:first bind:last></Edit>
            </div>
            <div id="actions" class="row-start-3 flex flex-row flex-grow-0 items-end mt-4 sm:mt-0">
                <button id="create" on:click={createUser} class="btn btn-outline-beige flex-grow-0 mx-2">Create</button>
                <button id="update" on:click={updateUser} class="btn btn-outline-beige flex-grow-0 mx-2">Update</button>
                <button id="delete" on:click={deleteUser} class="btn btn-red bg-red-700 border-2 border-red-700 flex-grow-0 mx-2" >Delete</button>
            </div>
        </section>
    </div>
</article>
