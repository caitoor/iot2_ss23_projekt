require('dotenv').config();
const express = require('express');
const cors = require('cors');


const { MongoClient, ServerApiVersion } = require('mongodb');
const dbUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}?retryWrites=true&w=majority`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const dbClient = new MongoClient(dbUri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
let db, userCollection;
async function dbRun() {
    await dbClient.connect();
    db = await dbClient.db(process.env.DB_DATABASE);
    userCollection = await db.collection("users");
    console.log("connected to db");
    deleteAllDocuments(userCollection); // DELETE THIS!!
}
dbRun().catch(console.dir);


async function deleteAllDocuments(collection) {
    const result = await collection.deleteMany({});
    console.log(`${result.deletedCount} Dokumente wurden gelöscht.`);
}





/*********
 * API
 *********/

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
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
    let user = {};
    user.username = username;
    user.password = password;
    user.createdAt = new Date();
    user.modifiedAt = new Date();
    saveDocument(user);
    res.status(200).send("Registration successful");
});

function saveDocument(msg) {
    msg.createdAt = new Date();
    if (userCollection) {
        userCollection.insertOne(msg);
    }
}