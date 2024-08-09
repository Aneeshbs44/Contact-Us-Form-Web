const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

mongoose.connect('mongodb+srv://newuser:newuser12@nodetuto.4upw8op.mongodb.net/nodetuto?retryWrites=true&w=majority&appName=nodetuto', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const formDataSchema = new mongoose.Schema({
  email: String,
  phone: String,
  advantageCardNumber: String,
  questionDescription: String,
});

const FormData = mongoose.model('FormData', formDataSchema);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Email validation function
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

app.post('/api/submitForm', async (req, res) => {
  console.log('Form submitted');
  const formData = req.body;
  console.log(formData);

  try {
    // Validate email
    if (!isValidEmail(formData.email)) {
      console.log("Invalid Email Address");
      return res.status(400).json({ success: false, error: 'Invalid email format' });
    }

    // Save form data to MongoDB
    await FormData.create(formData);

    // Respond with success message
    res.json({ success: true });
  } catch (error) {
    console.error('Error saving form data:', error.message);
    res.status(500).json({ success: false, error: 'Failed to save form data' });
  }
});

app.get('/api/getAllFormData', async (req, res) => {
  try {
    const allFormData = await FormData.find();
    res.json({ success: true, data: allFormData });
  } catch (error) {
    console.error('Error retrieving form data:', error.message);
    res.status(500).json({ success: false, error: 'Failed to retrieve form data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
