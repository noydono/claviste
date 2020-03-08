const nodemailer = require('nodemailer'),
    keys = require('./keys')

transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: 'gmail',
    port: '587',
    secure:false,
    auth: {
      user: "noytest.test@gmail.com",
      pass: keys.mdpMailer
    }
  })
  module.exports = transporter
