const bcrypt = require('bcrypt-nodejs')


module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation

    //criptografia
    const encryptPassword = password => {
        const salt = bcrypt.genSaltSync(8)
        return bcrypt.hashSync(password, salt)
    }    
    
    const save = async (req, res) => {
        const user = { ...req.body }
        // se o id vier na req, setar no user.id        
        if(req.params.id) user.id = req.params.id

        //verifica se informações foram passadas ou não por meio de validações
        try {
            existsOrError(user.name, 'Nome não informado')
            existsOrError(user.email, 'Email não informado')
            existsOrError(user.password, 'Senha não informada')
            existsOrError(user.confirmPassword, 'Confirme a senha informada')
            equalsOrError(user.password, user.confirmPassword, 'Senhas não conferem')

            const checkUserFromDB = await app.db('users')
                .where({ email: user.email }).first()
            if(!user.id) {
                notExistsOrError(checkUserFromDB, 'Usuário já cadastrado')
            }
        } catch (msg) {
            return res.sendStatus(400).send(msg)
        }

        //se passar pelas validações, criptografa o email e segue a persistência no BD
        user.password = encryptPassword(user.password)
        delete user.confirmPassword

        if(user.id) {
            app.db('users')
                .update(user)
                .where({ id: user.id})
                .then(_ => res.sendStatus(204).send())
                .catch(err => res.sendStatus(500).send(err))
        } else {
            app.db('users')
                .insert(user)
                .then(_ => res.sendStatus(204).send(500))
                .catch(err => res.sendStatus(500).send(err))
        }
    }

    const get = (req, res) => {
        app.db('users')
            .select('id', 'name', 'email')
            .then(user => res.json(user))
            .catch(err => res.sendStatus(500).send(err))
    }

    return { save, get }
}