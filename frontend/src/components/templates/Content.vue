<template>
    <div class="content">        
        <Authentication />       
        
    </div>
</template>

<script>
import Authentication from '@/components/auth/Authentication'
import Home from "@/components/home/Home"

export default {
    name: 'Content',
    components: { Authentication}
}
</script>

<style>
    .content {
        grid-area: content;
    }
</style>