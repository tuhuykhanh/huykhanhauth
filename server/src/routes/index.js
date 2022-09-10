
const home  = require('./home')
const account  = require('./account')

function route (app) {
    app.use('/',home)
    app.use('/account',account)
}
module.exports = route