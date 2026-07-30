const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for frontend requests
app.use(cors());
app.use(express.json());

// Serve static frontend files from current directory
app.use(express.static(__dirname));

let proposals = [
  { id: 1, title: 'Solar Roof Installation', client: 'Acme Corp', amount: '$15,000' },
  { id: 2, title: 'Energy Audit & Modernization', client: 'Nexus Tech', amount: '$8,500' }
];

// Render health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend running smoothly on Render!' });
});

app.get('/api/proposals', (req, res) => {
  res.json({ success: true, data: proposals });
});

app.post('/api/proposals', (req, res) => {
  const { title, client, amount } = req.body;
  if (!title || !client) {
    return res.status(400).json({ success: false, message: 'Title and client are required' });
  }

  const newProposal = {
    id: proposals.length + 1,
    title,
    client,
    amount: amount || '$0'
  };

  proposals.push(newProposal);
  res.status(201).json({ success: true, data: newProposal });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
