const express = require('express');
const cors = require('cors');
const router =require('./routes') ;
require('./database/db');

const app = express();

app.use(express.json({ extended: false }));
app.use(cors());
app.use('/api/v1', router);

app.get('/', (_req, res) => {
  res.status(200).send('Welcome');
});


const port = process.env.PORT || 3500;

if (!module.parent) {
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
}

module.exports= app;
