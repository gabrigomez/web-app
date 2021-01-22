<template>
    <div class="content">        
        <Authentication />
    </div>
</template>

<script>
import Authentication from '@/components/auth/Authentication'

export default {
    name: 'Content',
    components: { Authentication }
}
</script>

<style>
    .content {
        grid-area: content;
    }
</style>