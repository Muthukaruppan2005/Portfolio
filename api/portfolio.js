require('dotenv').config();
const mongoose = require('mongoose');

let isConnected = false;
async function connectDB() {
  if (isConnected) return;
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log('MongoDB connected successfully for serverless function.');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  phoneNumber: { type: String },
  date: { type: Date, default: Date.now }
});
const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);

const portfolioData = { /* your portfolio data as before */ };

export default async function handler(req, res) {
  await connectDB();

  if (req.method === 'GET') {
    res.status(200).json(portfolioData);
  } else if (req.method === 'POST') {
    try {
      const { name, email, phoneNumber, message } = req.body;
      if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: 'Name, email, and message are required.' });
      }
      const newContact = new Contact({ name, email, phoneNumber, message });
      await newContact.save();
      res.status(201).json({ success: true, message: 'Message sent successfully!' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Failed to send message.' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
