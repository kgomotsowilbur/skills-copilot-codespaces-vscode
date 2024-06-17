// Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Create a route that responds to a POST request
app.post('/comments', (req, res) => {
  // Read the comments.json file
  fs.readFile('./comments.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.json({ error: err });
      return;
    }

    // Parse the content of the file
    const comments = JSON.parse(data);

    // Add the new comment to the comments array
    comments.push(req.body);

    // Write the new comment to the file
    fs.writeFile('./comments.json', JSON.stringify(comments, null, 2), (err) => {
      if (err) {
        console.error(err);
        res.json({ error: err });
        return;
      }

      // Send the new comments list back to the client
      res.json(comments);
    });
  });
});

// Start the server on port 3000
app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
// Start the server on port 3000
app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});