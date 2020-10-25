<script>
    export let first;
    export let last;
</script>

<div class="grid gap-y-2 grid-cols-3 grid-rows-2 px-2 py-2">
    <label for="name">Name: </label>
    <input id="name" class="col-span-2 border-2 border-beige-300 rounded" bind:value={first}>
    <label for="surname">Surname: </label>
    <input id="surname" class="col-span-2 border-2 border-beige-300 rounded" bind:value={last}>
</div>