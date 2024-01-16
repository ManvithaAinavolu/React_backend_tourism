const app = require('./Requires');
const express = require('express');
const path = require('path');
const Query = require('./Database');

app.use(express.static(path.join(__dirname, 'dist')));

const port = 4000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
 





app.get('/', async (req, res) => {
  try {
    const result = await Query(`Select * from places`);
    console.log('Query result:', result);
    res.json(result);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/places', async (req, res) => {
  const searchTerm = req.query.search;

  if (!searchTerm) {
    return res.status(400).json({ error: 'Missing search term' });
  }

  try {
    const result = await Query(`SELECT * FROM places WHERE name LIKE :1`, [`%${searchTerm}%`]);
    console.log('Query result:', result);

    if (result.length === 0) {
      return res.status(404).json({ error: 'No matching places found' });
    }

    res.json(result);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.post('/reg-insert', async (req, res) => {
  try {
    const { firstname,lastname,email,phone,gender,password, cpassword } = req.body;

     const insertQuery = `INSERT INTO register (firstname,lastname,email,phone,gender,password, cpassword) VALUES (:firstname,:lastname,:email,:phone,:gender,:password, :cpassword)`;
    
    const result = await Query(insertQuery, { firstname,lastname,email,phone,gender,password, cpassword });

    res.json({ success: true, message: 'Data inserted successfully' });
    console.log('inserted data',result);
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Query(`SELECT * FROM register WHERE email = :email`, { email });
    console.log('user:', user);

     if (user.length > 0) {
       if (password === user[0][5]) {
        res.json({ message: 'Login successful' });
        console.log('Login successful');
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
        console.log('Invalid credentials');
      }
    } else {
      res.status(401).json({ error: 'Not registered' });
      console.log('Not registered');
    }
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
