<template>
    <div class="text">
        <input v-model="user.name" placeholder="Digite seu nome">  
        <input v-model="user.email" placeholder="Digite seu email">  
        <input type="password" v-model="user.password" placeholder="Digite sua senha">  
        <input type="password" v-model="user.confirmPassword" placeholder="Confirme sua senha">  

        <button @click="signup"> Registrar </button>

    </div>
</template>

<script>
import axios from 'axios'
import { baseApiUrl } from '@/global'

export default {
    name: 'Autentication',
    data: function (){
        return {
            user: {}
        }
    },
    methods: {
        signup() {
            axios.post(`${baseApiUrl}/signup`, this.user)
                .then(() => {
                    this.user = {}                    
                })
                .catch(msg)
        }
    }

}
</script>

<style>
    .text {
        display: flex;
        
        margin-top: 100px;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        

    }

    input {
        margin: 12px;
    }
</style>