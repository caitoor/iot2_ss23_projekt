require('dotenv').config();
const uuid = require('uuid');
const mqtt = require('mqtt');
const express = require('express');

const mqttClientId = "sensorvalueservice-faebs-" + uuid.v4();
const mqttClient = mqtt.connect(process.env.MQTT_HOST, { clientId: mqttClientId });
const topic = process.env.MQTT_TOPIC;

let dbReady = false;

mqttClient.on('connect', function () {
    console.log('Connected to MQTT broker!');
    mqttClient.subscribe(topic, function (err) {
        if (err) {
            console.error('Error subscribing to iot2 topic:', err);
        } else {
            console.log('Subscribed to iot2 topic!');
        }
    });
});

mqttClient.on('message', function (topic, message) {
    console.log('Message received:', message.toString());
    let msg = JSON.parse(message);
    msg.createdAt = new Date();
    if (dbReady) {
        temperatureCollection.insertOne(msg);
    }
});


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
let db, temperatureCollection, humidityCollection, userCollection;
async function dbRun() {
    await dbClient.connect();
    db = await dbClient.db(process.env.DB_DATABASE);
    temperatureCollection = await db.collection("temperatureValues");
    console.log("connected to db");
    deleteAllDocuments(temperatureCollection); // DELETE THIS!!
    dbReady = true;
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
const port = process.env.API_PORT;

app.listen(port, () => {
    console.log(`sensorValueService running on port ${port}`);
});

app.get('/', (req, res) => {
    res.status(200).send('Welcome to the joyful DP2 sensorvalue service API!');
});

app.get('/api/temperature/current', (req, res) => {
    res.send('Hello World!');
});

app.get('/api/temperature/maximum', (req, res) => {
    res.send('Hello World!');
});

app.get('/api/temperature/minimum', (req, res) => {
    res.send('Hello World!');
});

app.get('/api/temperature/latest/:n', (req, res) => {
    res.send('Hello World!');
});