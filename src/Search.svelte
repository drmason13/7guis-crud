<script>
    export let search;
</script>

<section class="flex flex-grow-0 mb-6">
    <label for="search" class="w-2/5 pr-1">Filter prefix: </label>
    <input id="search" class="w-3/5 border-2 border-beige-300 rounded" bind:value={search}>
</section>