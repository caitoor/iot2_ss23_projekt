require('dotenv').config();
const uuid = require('uuid');
const mqtt = require('mqtt');
const express = require('express');

const mqttClientId = "sensorvalueservice-faebs-" + uuid.v4();
const mqttClient = mqtt.connect(process.env.MQTT_HOST, { clientId: mqttClientId });
const topic = process.env.MQTT_TOPIC;

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

mqttClient.on('message', async function (topic, message) {
    console.log('Message received:', message.toString());
    let msg = JSON.parse(message);
    msg.createdAt = new Date();
    try {
        const result = await db.run(`
        INSERT INTO temperatureValues (value, mac, createdAt)
        VALUES(?,?,?)`,
            [msg.value, msg.mac_address, msg.createdAt]);
    } catch (error) {
        console.log(error.message);
    }
});



const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const createTables = require('./createTables');
const dbFilename = process.env.SQLITE_FILENAME;
let db;

(async () => {
    db = await open({
        filename: dbFilename,
        driver: sqlite3.Database
    });
    console.log('Connected to the dp2_ss2023.db database.');
    await createTables(db);
})()

async function deleteAllDocuments(tableName) {
    const result = await db.run(`
    DELETE FROM ${tableName}
    `);
    console.log(`${result.changes} documents have been deleted.`);
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

app.get('/api/temperature/current', async (req, res) => {
    const latestTemp = await getTemperatureValues(1);
    res.status(200).send(latestTemp);
});

app.get('/api/temperature/maximum', async (req, res) => {
    res.send('Hello World!');
});

app.get('/api/temperature/minimum', async (req, res) => {
    res.send('Hello World!');
});

app.get('/api/temperature/latest/:n', async (req, res) => {
    const count = parseInt(req.params.n);
    const latestTemp = await getTemperatureValues(count);
    res.status(200).send(latestTemp);
});

async function getTemperatureValues(count) {
    try {
        const result = await db.all(`
        SELECT * FROM temperatureValues
        ORDER BY createdAt DESC
        LIMIT ?`, count);
        return result;
    }
    catch (error) {
        console.log(error.message);
    }
} 