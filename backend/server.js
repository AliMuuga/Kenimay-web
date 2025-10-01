// server.js
require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ===== MongoDB connection =====
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> console.log("MongoDB connected"))
  .catch(err=> console.log(err));

// ===== Message schema =====
const messageSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
});
const Message = mongoose.model('Message', messageSchema);

// ===== Contact API =====
app.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  // Save to DB
  const newMessage = new Message({ name, email, message });
  await newMessage.save();

  // Send email notification
  let transporter = nodemailer.createTransport({
    service: 'gmail', // or SMTP
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  await transporter.sendMail({
    from: email,
    to: process.env.EMAIL_USER,
    subject: `New message from ${name}`,
    text: message
  });

  res.send({ success: true, message: 'Message sent successfully!' });
});

// ===== Start Server =====
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));
