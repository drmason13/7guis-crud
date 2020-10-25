<script>
    import Search from './Search.svelte';
    import DbView from './DbView.svelte';
    import User from './User.svelte';
    import Edit from './Edit.svelte';
    import { v4 as uuid } from 'uuid';

	import { users } from './stores.js';

    // searching
    let search = "";
    $: visibleUsers = searchUsers(search, $users);

    function searchUsers(search, users) {
        return Object.values(users).filter(user => `${user.first} ${user.last} ${user.last}, ${user.first}`.toLowerCase().includes(search.toLowerCase()))
    }

    // editing
    let first = "";
    let last = "";
    
    const reset = () => {
        selected = null;
        first = "";
        last = "";
    }

    // selecting
    let selected = null;

    function selectUser(e, user) {
        selected = user.id;
        first = user.first;
        last = user.last;
    }

    // crud functions
    function createUser() {
        const id = uuid();
        users.update(users => {
            users[id] = { first, last, id };
            return users
        });
        reset();
    }

    function updateUser() {
        if (!selected) { return }
        users.update(users => {
            users[selected].first = first;
            users[selected].last = last;
            return users
        });
    }

    function deleteUser() {
        users.update(users => {
            delete users[selected];
            return users;
        });
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
            <DbView styles="h-64 border-2 border-beige-300 flex flex-col items-stretch text-left content-start overflow-auto" items={visibleUsers} let:item={user}>
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
