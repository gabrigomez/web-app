const user = require('../api/users')

module.exports = app => {
    app.route('/users')
        .post(app.api.users.save)
        .get(app.api.users.get)
    app.post('/signup', app.api.users.save)
}