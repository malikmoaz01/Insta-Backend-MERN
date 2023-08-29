const nodemailer = require("nodemailer");
const { google } = require("googleapis");

// OAuth 2.0 configuration
const oAuth2Client = new google.auth.OAuth2(
  "77435146535-7gt9egun06cvp3lojfr4beg4es5ei9h0.apps.googleusercontent.com",
  "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",
  "http://localhost:3000/oauth2callback"
);

oAuth2Client.setCredentials({
  refresh_token: "YOUR_REFRESH_TOKEN",
});

// Create a Nodemailer transporter using OAuth 2.0
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: "YOUR_EMAIL",
    clientId: "YOUR_CLIENT_ID",
    clientSecret: "YOUR_CLIENT_SECRET",
    refreshToken: "YOUR_REFRESH_TOKEN",
    accessToken: oAuth2Client.getAccessToken(),
  },
});

// Send email function
const sendEmail = async (recipient, subject, text) => {
  const mailOptions = {
    from: "YOUR_EMAIL",
    to: recipient,
    subject: subject,
    text: text,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    return true; // Email sent successfully
  } catch (error) {
    console.log("Error sending email:", error);
    return false; // Failed to send email
  }
};

module.exports = sendEmail;
