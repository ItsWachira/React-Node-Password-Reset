const User = require('../models/user.model');
const nodemailer = require('nodemailer');

//you can use the registerUser controller and getUsers controller to test the API endpoints in Postman since they are not connected to the client

exports.registerUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    res.status(201).send({ message: 'User registered successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'An error occurred while registering the user' });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'An error occurred while fetching users' });
  }
};
// verify the email exist
exports.checkEmail = async (req, res) => {
  const email = req.query.email;
  try {
    const user = await User.findOne({ email });
    if (user) {
      res.status(200).send({ message: 'Email exists in the database' });
    } else {
      res.status(404).send({ message: 'Email does not exist in the database' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'An error occurred while checking the email' });
  }
};

exports.updatePassword = async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while updating the password' });
  }
};


exports.sendEmail = (req, res) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: true,
    auth: {
      user: process.env.MY_EMAIL,
      pass: process.env.APP_PASSWORD,
    },
  });
  const { recipient_email, OTP } = req.body;
  const mailOptions = {
    from: process.env.MY_EMAIL,
    to: recipient_email,
    subject: 'PASSWORD RESET',
    html: `<html>
             <body>
               <h2>Password Recovery</h2>
               <p>Use this OTP to reset your password. OTP is valid for 1 minute</p>
               <h3>${OTP}</h3>
             </body>
           </html>`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send({ message: "An error occurred while sending the email" });
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send({ message: "Email sent successfully" });
    }
  });};