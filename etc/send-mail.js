const { MAILGUN_API_KEY, MAILGUN_DOMAIN } = process.env;
const mailgun = require("mailgun-js")({
  apiKey: MAILGUN_API_KEY,
  domain: MAILGUN_DOMAIN
});

const send = (to, subject, content) => {
  const data = {
    from: "Filtergram <hello@benhowdle.im>",
    to,
    subject,
    html: content
  };
  return new Promise((res, rej) => {
    mailgun.messages().send(data, function(error, body) {
      if (error) return rej(error);
      return res(body);
    });
  });
};

const sendForgotPasswordEmail = (email, token) => {
  const resetURL = `https://filtergram.app/reset-password?token=${token}&email=${email}`;
  const html = `<p>Reset your password here: <a href="${resetURL}">${resetURL}</a></p>`;
  return send(email, "Forgot Password", html);
};

module.exports = {
  sendForgotPasswordEmail
};
