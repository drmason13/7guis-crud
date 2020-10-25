<script>    
    export let items
    export let styles;
</script>

<ul class={styles}>
    {#each Object.values(items) as item}
        <slot {item}></slot>
    {/each}
</ul>