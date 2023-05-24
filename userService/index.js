require('dotenv').config();
const express = require('express');

/*********
 * API
 *********/

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = process.env.API_PORT;

app.listen(port, () => {
    console.log(`userService running on port ${port}`);
});

app.get('/', (req, res) => {
    res.status(200).send('Welcome to the peaceful DP2 user service API!');
});

app.post('/api/register', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    console.log(username, password);
    res.status(200).send("Registration successful");
});