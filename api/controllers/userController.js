const mongoose = require('mongoose');
const User = require('../modules/userSchema');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const sendVerificationEmail = async (email, user, verificationToken) => {
  const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
          user: "amitkumar425863@gmail.com",
          pass: "wqql hbvq udjt erat",
      },
      tls: {
          rejectUnauthorized: false,
      },
  });

  const mailOptions = {
      from: "amazon.com",
      to: email,
      subject: "Email Verification",
      html: `
          <div style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f5f5f5; width: 100%; text-align: center;">
              <table align="center" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; margin-top: 20px;">
                  <tr>
                      <td style="padding: 20px; text-align: center; border-bottom: 1px solid #e0e0e0;">
                          <img src="https://via.placeholder.com/150x50?text=Amazon" alt="Amazon" style="display: block; margin: 0 auto;">
                      </td>
                  </tr>
                  <tr>
                      <td style="padding: 20px;">
                          <h1 style="color: #333333; font-size: 24px; margin-top: 0;">Welcome to Amazon!</h1>
                          <p style="color: #666666; font-size: 16px;">Please verify your email address by clicking the button below:</p>
                          <a href="https://ccf9-2401-4900-1cc5-2e96-5c34-8578-d103-9f25.ngrok-free.app/api/user/verify/${verificationToken}" style="display: inline-block; padding: 12px 24px; margin-top: 20px; font-size: 16px; color: #ffffff; background-color: #007bff; text-decoration: none; border-radius: 5px;">Verify Email</a>
                      </td>
                  </tr>
                  <tr>
                      <td style="padding: 20px; text-align: center; font-size: 14px; color: #999999; border-top: 1px solid #e0e0e0;">
                          <p style="margin: 0;">If you did not create an account, no further action is required.</p>
                          <p style="margin: 0;">&copy; ${new Date().getFullYear()} Amazon. All rights reserved.</p>
                      </td>
                  </tr>
              </table>
          </div>
      `,
  };

  try {
      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              console.error("Error sending email:", error);
              return;
          }
          console.log("Email sent:", info.response);
      });
  } catch (error) {
      console.error("Error creating transporter:", error);
  }
};


const userRegistration = async (req, res, next) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) return res.status(400).json({ msg: 'User already exists' });

        // Hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            verificationToken: crypto.randomBytes(20).toString("hex"),
        });

        await newUser.save();

        // Send verification email
        sendVerificationEmail(newUser.email, newUser, newUser.verificationToken);

        res.status(201).json({ msg: 'User registered successfully. Please verify your email.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server Error' });
    }
};

const verifyEmail = async (req, res) => {
    const { token } = req.params;
    try {
        const user = await User.findOne({ verificationToken: token });
        if (!user) return res.status(400).json({ msg: 'Verification token is invalid or expired' });

        user.isVerified = true;
        user.verificationToken = null;
        await user.save();
        res.status(200).json({ msg: 'Email has been verified. Please login.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Email verification failed' });
    }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
      if (!email || !password) {
          return res.status(400).json({ msg: 'Please enter all fields' });
      }

      // Await the result of the findOne query
      const loginUser = await User.findOne({ email });
      if (!loginUser) return res.status(401).json({ msg: 'User not found' });

      // Compare the hashed password
      const isMatch = await bcrypt.compare(password, loginUser.password);
      if (!isMatch) return res.status(401).json({ msg: 'Invalid credentials' });

      if (!loginUser.isVerified) {
          return res.status(403).json({ msg: 'Email is not verified' });
      }

      // Create the JWT payload
      const payload = {
          id: loginUser._id,
          name: loginUser.name,
          email: loginUser.email,
      };

      // Secret key should be an environment variable in production
      const secret_key = "YOUR_SECRET_KEY"; // Update with your actual secret key

      // Generate the access token
      const accessToken = jwt.sign(payload, secret_key, { expiresIn: '1d' });

      // Send the access token in the response
      res.status(200).json({ accessToken });

  } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Server Error' });
  }
};



module.exports = {
    userRegistration,
    verifyEmail,
    userLogin,  
};
