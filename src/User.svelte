<script>    
    export let user;
    export let selected;

    export let selectUser;
</script>

{#if user}
<li><button class="px-2 py-1 w-full text-left" class:focus:bg-yellow-200="{selected !== user.id}" class:hover:bg-yellow-200="{selected !== user.id}" class:bg-blue-700="{selected === user.id}" class:text-white="{selected === user.id}" on:click={e => selectUser(e, user)}>{user.last}, {user.first}</button></li>
{/if}