require('dotenv').config();

const mqtt = require('mqtt');
const mqttClientId = process.env.MQTT_CLIENTID;
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

mqttClient.on('message', function (topic, message) {
    console.log('Message received:', message.toString());
});