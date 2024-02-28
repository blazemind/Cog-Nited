import paho.mqtt.client as mqtt

# Define the MQTT server settings
broker_address = "localhost"
broker_port = 8080
topic = "cognited/image"

# Define the message to publish
message = "data:image/jpeg;base64,/9j/4AAQS.." # Base64 string truncated for brevity..

# Callback function when the client receives a CONNACK response from the server
def on_connect(client, userdata, flags, rc):
    print(f"Connected with result code {rc}")
    # Publishing a message to the topic
    client.publish(topic, message)

# Create a new MQTT client instance
client = mqtt.Client(transport="websockets")

# Assign the on_connect callback function
client.on_connect = on_connect

# Connect to the MQTT broker
client.connect(broker_address, broker_port, 60)


# Start the loop to process callbacks and handle reconnections.
client.loop_forever()