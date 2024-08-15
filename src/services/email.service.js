const fs = require('fs').promises;
const nodemailer = require('nodemailer');
const config = require('../config/config');
const logger = require('../config/logger');

const transport = nodemailer.createTransport(config.email.smtp);
/* istanbul ignore next */
if (config.env !== 'test') {
  transport
    .verify()
    .then(() => logger.info('Connected to email server'))
    .catch(() => logger.warn('Unable to connect to email server. Make sure you have configured the SMTP options in .env'));
}

/**
 * Send an email
 * @param {string} to
 * @param {string} subject
 * @param {string} text
 * @returns {Promise}
 */
const sendEmail = async (to, subject, text) => {
  const msg = { from: config.email.from, to, subject, text };
  await transport.sendMail(msg);
};

/**
 * Send reset password email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendResetPasswordEmail = async (to, token) => {
  const subject = 'Reset password';
  // replace this url with the link to the reset password page of your front-end app
  const resetPasswordUrl = `http://${config.frontendUrl}reset-password?token=${token}`;

  const template = await fs.readFile('src/services/templates/resetPassword.html', 'utf-8');

  // Replace placeholders with actual values
  const htmlContent = template.replace('{{resetPasswordUrl}}', resetPasswordUrl);

  const msg = { from: config.email.from, to, subject, html: htmlContent };
  await transport.sendMail(msg);
};

/**
 * Send invitation email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendInvitationEmail = async (to, text, token) => {
  const subject = 'Send Invitation Email';
  // replace this url with the link to the reset password page of your front-end app
  const resetPasswordUrl = `http://${config.frontendUrl}reset-password?token=${token}`;

  const template = await fs.readFile('src/services/templates/sendInvitationEmail.html', 'utf-8');

  // Replace placeholders with actual values
  const htmlContent = template.replace('{{resetPasswordUrl}}', resetPasswordUrl, text);

  const msg = { from: config.email.from, to, subject, html: htmlContent };
  await transport.sendMail(msg);
};

/**
 * Send verification email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendVerificationEmail = async (to, token) => {
  const subject = 'Email Verification';
  // replace this url with the link to the email verification page of your front-end app
  const verificationEmailUrl = `http://${config.frontendUrl}verify-email?token=${token}`;
  const text = `Dear user,
To verify your email, click on this link: ${verificationEmailUrl}
If you did not create an account, then ignore this email.`;
  await sendEmail(to, subject, text);
};

module.exports = {
  transport,
  sendEmail,
  sendResetPasswordEmail,
  sendVerificationEmail,
  sendInvitationEmail,
};
