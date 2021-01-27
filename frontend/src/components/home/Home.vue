<template>
    <div>
        <h1> USUÁRIOS </h1>

        <b-table :items="users">

        </b-table>
    </div>

</template>

<script>
import axios from 'axios'
import { baseApiUrl } from '@/global'
export default {
    name: 'Home',
    data: function (){
        return {
            users: {}
        }
    },
    methods: {
        loadUsers() {
            const url = `${baseApiUrl}/users`
            axios.get(url).then(res => {
                this.users = res.data
            })
        }
    },
    mounted() {
        this.loadUsers()
    }
}
</script>
    
<style>

</style>