const express = require('express');
const cors = require('cors');
const https = require('https');

const app =  express();

let result;

const ht = https.get('https://my-json-server.typicode.com/typicode/demo/comments', (resp) => {
  let data = '';

  // A chunk of data has been received.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    result = JSON.parse(data);
    console.log(result);
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});

app.use(cors());
app.get('/comment', (req, res) => {
    res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials" : true 
    });
    res.json(result);
    
});


app.delete('/comment/:id', (req, res) => {
    const found = result.some(result => result.id === parseInt(req.params.id) );
  
    if (found) {
      res.json({
        msg: 'Comment deleted',
        result: result.filter(result => result.id !== parseInt(req.params.id) )
      });
      result = result.filter(result => result.id !== parseInt(req.params.id) )
    } else {
      res.status(400).json({ msg: `No Comment with the id of ${req.params.id}` });
    }
  });


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server on. Port ${PORT}`));