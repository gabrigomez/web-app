const bodyParser = require('body-parser')
const cors = require('cors')

app => {
    app.use(bodyParser.json())
    app.use(cors())
}

export default { app }