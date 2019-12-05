// implement your API here
const express = require('express');
const db = require('./data/db');

const app = express();
app.use(express.json());

const port = 5000;
const host = '127.0.0.1';

app.post('/api/users', (req, res) => {
  if (!req.body.name || !req.body.bio) {
    return res
      .status(400)
      .json({ errorMessage: 'Please provide name and bio for the user.' });
  }

  const newUser = {
    name: req.body.name,
    bio: req.body.bio
  };

  db.insert(newUser);
  res.status(201).json(newUser);
});

app.get('/api/users', (req, res) => {
  res.json(db);
});

app.get('/api/users/:id', (req, res) => {
  const id = req.params.id;

  db.findById(id).then(response => {
    res
      .status(200)
      .json({
        url: `/api/users/${id}`,
        user: response
      })
      .catch(err => {
        res.status(500).json({ message: 'An error occured...' });
      });
  });
});

app.delete('/api/users/:id', (req, res) => {
  const id = req.params.id;

  db.findById(id)
    .then(response => {
      res.status(200).json({
        url: `/api/users/${id}`
      })
        .catch(err => {
          // still working on this.
        })
    })
})

app.listen(port, host, () => {
  console.log(`server listening on http://${host}:${port}`);
});
