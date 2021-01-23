const { authSecret } = require('../.env')
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const signin = async (req, res) =>{
        // se requisição vier sem email/password, retorne
        if(!req.body.email || !req.body.password) {
            return res.sendStatus(404).send('Informe usuário e senha')
        }
        
        // consulta db e pega primeiro registro com email que veio em req.body
        const user = await app.db('users')
            .where({ email: req.body.email})
            .first()
        
        if(!user) return res.sendStatus(400).send('Usuário não encontrado')

        //compara as senhas da requisição com a do db
        const isMath = bcrypt.compareSync(req.body.password, user.password)
        if(!isMath) return res.sendStatus(401).send('E-mail/senha incorretos')

        //para definir tempo do token
        const now = Math.floor(Date.now() / 1000)

        const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            //dados para token
            iat: now,
            exp: now + (60 * 60 * 24 * 3)    //tempo de expiração do token (3 dias)

        }

        res.json({
            ...payload,
            token: jwt.encode(payload, authSecret)
        })        
    }

    // testar validade do token
    const validateToken = async (req, res) => {
        const userData = req.body || null
        try {
            if(userData) {
                const token = jwt.decode(userData.token, authSecret)
                if(new Date (token.exp * 1000) > new Date()) {
                    return res.send(true)
                }
            }
        } catch (e) {

        }
    }

    return { signin, validateToken }
}