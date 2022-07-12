const admin = require('./admin');
const login = require('./login');
const user = require('./user');

function routes(app){
    app.use('/', user);
    app.use('/index', user);
    app.use('/admin', admin);
    app.use('/login', login);
};

module.exports = routes;
