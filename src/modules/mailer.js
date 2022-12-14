const path = require('path')
const nodemailer = require('nodemailer') 
const hbs = require('nodemailer-express-handlebars') 

const { host, port, user, pass } = require('../config/mailer.json')

const transport = nodemailer.createTransport({
    host: host,
    port: port,
    auth: { user, pass}
});

transport.use('compile', hbs({
    viewEngine: {
      defaultLayout: undefined,
      partialsDir: path.resolve('./src/resources/mail/')
    },
    viewPath: path.resolve('./src/resources/mail/'),
    extName: '.html',
  }));

module.exports = transport