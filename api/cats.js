const { createClient } = require('@supabase/supabase-js');

const supabase = createClient('https://kerxhfgndizldnyptbdo.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtlcnhoZmduZGl6bGRueXB0YmRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1ODY3NjEsImV4cCI6MjA2MzE2Mjc2MX0.FKI1WZsGo7nhRMeL3zNkSYDM1rCeXxAojqN9w35H6BY');

module.exports = async (req, res) => {
  const { data, error } = await supabase.from('cats').select('*');
  res.status(error ? 500 : 200).json(error ? { error: error.message } : data);
};