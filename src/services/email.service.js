const fs = require('fs').promises;
const nodemailer = require('nodemailer');
const config = require('../config/config');
const logger = require('../config/logger');
const { User } = require('../models');

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
  // Fetch user information from the database
  const user = await User.findOne({ email: to }).populate('company');

  if (!user) {
    throw new Error('User not found');
  }

  const { firstName, lastName } = user;

  const subject = 'Reset password';
  // replace this url with the link to the reset password page of your front-end app
  const resetPasswordUrl = `http://${config.frontendUrl}reset-password?token=${token}`;

  const template = await fs.readFile('src/services/templates/resetPassword.html', 'utf-8');

  // Replace placeholders with actual values
  // Replace placeholders with actual values
  const htmlContent = template
    .replace('{{resetPasswordUrl}}', resetPasswordUrl)
    .replace('{{userName}}', `${`${firstName} ${lastName}`}`);

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
  // Fetch user information from the database
  const user = await User.findOne({ email: to }).populate('company');

  if (!user) {
    throw new Error('User not found');
  }

  const { firstName, lastName } = user;

  const subject = 'Send Invitation Email';
  // replace this url with the link to the reset password page of your front-end app
  const resetPasswordUrl = `http://${config.frontendUrl}reset-password?token=${token}`;

  const template = await fs.readFile('src/services/templates/sendInvitationEmail.html', 'utf-8');

  // Replace placeholders with actual values
  const htmlContent = template
    .replace('{{resetPasswordUrl}}', resetPasswordUrl)
    .replace('{{userName}}', `${`${firstName} ${lastName}`}`);

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

const sendContactEmail = async (data) => {
  const { name, email, phone, message } = data;

  const subject = 'Youu have new query for healmefit.io';

  const template = await fs.readFile('src/services/templates/sendEmailContact.html', 'utf-8');

  // Replace placeholders with actual values
  const htmlContent = template
    .replace('{{name}}', name)
    .replace('{{phone}}', phone)
    .replace('{{email}}', email)
    .replace('{{message}}', message);

  const msg = { from: config.email.from, to: config.clientEmailId, subject, html: htmlContent };
  await transport.sendMail(msg);
};

const sendRatingEmail = async (data) => {
  const user = await User.findOne({ _id: data.userId });

  if (!user) {
    throw new Error('User not found');
  }

  const { firstName, lastName } = user;

  const subject = 'Youu have new query for rating healmefit.io';

  const template = await fs.readFile('src/services/templates/sendEmailRating.html', 'utf-8');

  // Replace placeholders with actual values
  const htmlContent = template.replace('{{name}}', `${firstName} ${lastName}`).replace('{{rating}}', data.rating);

  const msg = { from: config.email.from, to: config.clientEmailId, subject, html: htmlContent };
  await transport.sendMail(msg);
};

module.exports = {
  transport,
  sendEmail,
  sendResetPasswordEmail,
  sendVerificationEmail,
  sendInvitationEmail,
  sendContactEmail,
  sendRatingEmail,
};
