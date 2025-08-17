// Load environment variables securely
require('dotenv').config();

const express = require('express');
const app = express();
const port = 5000;

// You can run other local-only server logic here.
// The main logic is now in api/portfolio.js.

app.listen(port, () => {
  console.log(`Local development server is running on http://localhost:${port}`);
});