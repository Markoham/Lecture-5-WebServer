var nodemailer = require('nodemailer');

var Mailer = function () {
  this.configured = false;
};

Mailer.prototype = {
  config: function (conf) {
    this.configured = true;
    this.transport = nodemailer.createTransport('SMTP', conf);
  },
  send: function (mailOptions, callback) {
    if (!this.configured) cb(new Error('Mail transport not initialized'));
    this.transport.sendMail(mailOptions, function(err) {
      if (err) callback(err);
      callback(null);
    });
  }
};

module.exports = new Mailer();
