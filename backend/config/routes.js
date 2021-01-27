const user = require('../api/users')

module.exports = app => {
    app.post('/signin', app.api.auth.signin)
    app.post('/signup', app.api.users.save)

    app.route('/users')
        .get(app.api.users.get)    
}