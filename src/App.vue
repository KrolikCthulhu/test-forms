<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
    <RouterView />
</template>

<style>
body {
    min-height: 100vh;
    font-family:
        Inter,
        -apple-system,
        BlinkMacSystemFont,
        'Segoe UI',
        Roboto,
        Oxygen,
        Ubuntu,
        Cantarell,
        'Fira Sans',
        'Droid Sans',
        'Helvetica Neue',
        sans-serif;
}

*,
*::before,
*::after {
    box-sizing: border-box;
    margin: 0;
    font-weight: normal;
}

#app {
    max-width: 940px;
    margin: 0 auto;
    padding: 2rem;
    font-weight: normal;
}
</style>
