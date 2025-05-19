const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

const supabase = createClient('https://kerxhfgndizldnyptbdo.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtlcnhoZmduZGl6bGRueXB0YmRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1ODY3NjEsImV4cCI6MjA2MzE2Mjc2MX0.FKI1WZsGo7nhRMeL3zNkSYDM1rCeXxAojqN9w35H6BY');

app.get('/api/cats', async (_, res) => {
  const { data, error } = await supabase.from('cats').select('*');
  res.status(error ? 500 : 200).json(error ? { error: error.message } : data);
});

app.post('/api/vote', async (req, res) => {
  const { id } = req.body;
  const { error } = await supabase.rpc('increment_vote', { cat_id: id });
  res.status(error ? 500 : 200).json({ success: !error });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));