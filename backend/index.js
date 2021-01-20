const app = require('express')()
const consign = require('consign')
const db = require('./config/database')

app.db = db

consign()
    .then('./config/middlewares.js')

app.listen(3000, () =>{
    console.log('Backend executando...')
})