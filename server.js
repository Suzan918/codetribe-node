const express = require('express');
const app = express();
const mediaRoutes = require('./routes/mediaRoutes.js');
const PORT = 3000;

app.use(express.json());
app.use('/', mediaRoutes);

app.use((req, res) => {
  res.status(404).send('Route not found');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
