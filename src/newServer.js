const express = require('express');

const app = express();

const PORT = 5002;

const server = app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
