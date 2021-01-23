<template>
    <div class="text">
        <input v-if="showSignup" v-model="user.name" placeholder="Digite seu nome">  
        <input v-model="user.email" placeholder="Digite seu email">  
        <input type="password" v-model="user.password" placeholder="Digite sua senha">  
        <input v-if="showSignup" type="password" v-model="user.confirmPassword" placeholder="Confirme sua senha">

        
        <!-- Link para trocar modo -->
        <a href @click.prevent="showSignup = !showSignup">
            <span v-if="showSignup"> Clique aqui para Logar </span>
            <span v-else> Clique aqui para se cadastrar </span>
        </a>
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
            user: {},
            showSignup: false
        }
    },
    methods: {
        signup() {
            axios.post(`${baseApiUrl}/signup`, this.user)
                .then(() => {
                    this.user = {}                    
                })
                .catch(msg)
        },
        signin() {
            axios.post(`${baseApiUrl}/signin`, this.user)
                .then(res => {
                    this.$store.commit('setUser', res.data)
                    localStorage.setItem(userKey, JSON.stringify(res.data))
                    this.$router.push({ path: '/'})
                })
                .catch('Ocorreu um erro')
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

    a {
        text-decoration: none;
        margin: 25px;
    }
</style>