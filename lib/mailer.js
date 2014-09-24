var nodemailer = require('nodemailer');
var sendmailTransport = require('nodemailer-sendmail-transport');

var Mailer = function () {
  this.configured = false;
};

Mailer.prototype = {
  config: function (conf) {
    this.configured = true;
    this.transport = nodemailer.createTransport(sendmailTransport(conf.emailConfig));
  },
  send: function (mailOptions, callback) {
    if (!this.configured) callback(new Error('Mail transport not initialized'));
    this.transport.sendMail(mailOptions, function(err) {
      if (err) callback(err);
      callback(null);
    });
  }
};

module.exports = new Mailer();
