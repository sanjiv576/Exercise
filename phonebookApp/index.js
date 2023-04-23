
require('dotenv').config();
const express = require('express');
const phonebook_routes = require('./routes/phonebookRoutes');

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

app.use('/phonebook', phonebook_routes);

app.listen(port, () => console.log(`Server is running at port $port`))