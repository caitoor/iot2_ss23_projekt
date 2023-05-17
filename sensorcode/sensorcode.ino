#include <DHT.h>
#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>
#include "config.h"

DHT dht(DHTPIN, DHTTYPE);
unsigned long previousMillis = 0;
WiFiClient espClient;
PubSubClient mqttClient(espClient);
const char* clientId = "esp-faebs";

char* temperatureTopic = "iot2/temperature";
char* humidityTopic = "iot2/humidity";

void setup() {
  Serial.begin(115200);
  delay(10);

  dht.begin();

  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(SSID);

  WiFi.begin(SSID, PSK);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());

  mqttClient.setServer(MQTT_HOST, MQTT_PORT);
}

void loop() {
  if (!mqttClient.connected()) {
    Serial.print("Connecting to MQTT broker...");
    if (mqttClient.connect(clientId)) {
      Serial.println("connected");
    } else {
      Serial.print("failed, rc=");
      Serial.print(mqttClient.state());
      Serial.println(" retrying in 5 seconds");
      delay(5000);
      return;
    }
  }

  unsigned long currentMillis = millis();

  if (currentMillis - previousMillis > INTERVAL) {

    float temperature = dht.readTemperature();
    float humidity = dht.readHumidity();

    Serial.print("Temperature: ");
    Serial.print(temperature);
    Serial.print(" °C - Humidity: ");
    Serial.print(humidity);
    Serial.println(" %");

    previousMillis = currentMillis;

    String mac = WiFi.macAddress();
    Serial.print("Mac:");
    Serial.println(mac);

    StaticJsonDocument<200> jsonDocTemp;
    jsonDocTemp["mac"] = mac;
    jsonDocTemp["value"] = temperature;
    char bufferTemp[100];
    serializeJson(jsonDocTemp, bufferTemp);
    mqttClient.publish(temperatureTopic, bufferTemp);

    StaticJsonDocument<200> jsonDocHum;
    jsonDocHum["mac"] = mac;
    jsonDocHum["value"] = humidity;
    char bufferHum[100];
    serializeJson(jsonDocHum, bufferHum);
    mqttClient.publish(humidityTopic, bufferHum);
  }
}