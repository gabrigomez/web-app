<template>
    <footer>
        Desenvolvido por <b>gabrigomez</b>
    </footer>
</template>

<script>
export default {
    name: 'Footer'
}
</script>

<style>
    footer {
        grid-area: footer;
        
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }
</style>