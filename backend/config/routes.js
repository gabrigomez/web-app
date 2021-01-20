module.exports = app => {
    app.route('/users')
        .post(app.api.users.save)

}