<template>
    <header>
        <h1> ContactList 1.0 </h1>
        <h5> Cadastro de usuários</h5>
    </header>
</template>

<script>
export default {
    name: 'Header'
}
</script>

<style>
    header {
        grid-area: header;

        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;

        background: linear-gradient(to right, #f3f3f22c, #c7c3c371)
        
    }
    h1 {
         margin-bottom: 0px;
    }

    h5 {
        margin-top: 5px;
    }
    
</style>