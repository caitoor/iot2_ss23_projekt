#include <DHT.h>
#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include "config.h"

DHT dht(DHTPIN, DHTTYPE);
unsigned long previousMillis = 0;
WiFiClient espClient;
PubSubClient client(espClient);
const char* clientId = "esp-faebs";


void setup() {
  Serial.begin(115200);
  delay(10);

  dht.begin();
  // Connect to Wi-Fi network
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

  client.setServer(MQTT_HOST, MQTT_PORT);
}

void loop() {
  if (!client.connected()) {
    Serial.print("Connecting to MQTT broker...");
    if (client.connect(clientId)) {
      Serial.println("connected");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" retrying in 5 seconds");
      delay(5000);
      return;
    }
  }

  unsigned long currentMillis = millis();

  if (currentMillis - previousMillis > interval) {

    float temperature = dht.readTemperature();  // Read temperature value
    float humidity = dht.readHumidity();        // Read humidity value

    Serial.print("Temperature: ");
    Serial.print(temperature);
    Serial.print(" °C - Humidity: ");
    Serial.print(humidity);
    Serial.println(" %");

    previousMillis = currentMillis;
    char temp[6];
    dtostrf(temperature, 4, 2, temp);
    client.publish(MQTT_TOPIC, temp);
  }
}
