const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation

    //encriptar senha
    const encryptPassword = password => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }

    //salvar usuário
    const save = async (req, res) =>{
        const user = { ...req.body }

        if(req.params.id) user.id = req.params.id

        try {
            existsOrError(user.name, 'Nome não informado')
            existsOrError(user.email, 'E-mail não informado')
            existsOrError(user.password, 'Senha não informada')
            existsOrError(user.confirmPassword, 'Senha não informada')
            equalsOrError(user.password, user.confirmPassword, 'Senhas não conferem')
            
            //consulta se o user já existe no DB atual
            const userDb = await app.db('users')
                .where({ email: user.email }).first()
            
            //caso o user.id não existir, verificar se usuário já existe no BD
            if(!user.id) {
                notExistsOrError(userDb, 'Usuário já cadastrado')
            } 
        } catch (msg) {
            return res.status(400).send(msg)
        }

        //encriptografa password
        user.password = encryptPassword(user.password)
        delete confirmPassword

        if(user.id) {
            app.db('users')
                .update(user)
                .where({ id: user.id })
                .whereNull('deletedAt')   //verificação de soft delete
                .then(_ => res.status(204).send())
                .catch(err => res.send(500).send(err))
        } else {
            app.db('users')
                .insert(user)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))

        }

    }
    //get usuário
    const get = (req, res) => {
        app.db('users')
            .select('id', 'name', 'email')
            .whereNull('deletedAt')
            .then(user => res.json(user))
            .catch(err => res.status(500).send(err))        
    }

    return { save, get }
}