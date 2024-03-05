import io
import time
from picamera2 import Picamera2, Preview
import paho.mqtt.client as mqtt
import random
import RPi.GPIO as GPIO
import base64
# Set up GPIO
GPIO.setmode(GPIO.BOARD)

# Define GPIO pins for ultrasonic sensor
TRIG = 16
ECHO = 18

# Set up ultrasonic sensor
GPIO.setwarnings(False)
GPIO.cleanup()
GPIO.setup(TRIG, GPIO.OUT)
GPIO.setup(ECHO, GPIO.IN)

# MQTT Broker Configurations
broker = 'm12.cloudmqtt.com'
port = 17939
topic = "cognited/image"
client_id = f'python-mqtt-{random.randint(0, 1000)}'
username = 'fpretkxq'
password = 'BJK10l6-BAOt'

# Function to publish the image to MQTT
def publish_image(image):
    client = mqtt.Client(client_id)
    client.username_pw_set(username, password)
    client.connect(broker, port, 60)
    client.publish(topic,image)
    client.disconnect()

# Capture an image and send it to MQTT broker
def capture_and_publish():
    with Picamera2() as camera:
        camera.options['quality'] = 50
        camera.start()
        # Wait for the camera to warm up
        time.sleep(2)
        # Capture the image
        stream = io.BytesIO()
        camera.capture_file(stream, format='jpeg')
        # Convert the image to bytes
        image = stream.getvalue()
        base64_image = base64.b64encode(image).decode('utf-8')
        base64_with_mime = "data:image/jpeg;base64," + base64_image
        #print(image)
        # Publish the image
        publish_image(base64_with_mime)

def get_distance():
    # Send a pulse on the TRIG pin
    GPIO.output(TRIG, True)
    time.sleep(0.00001)
    GPIO.output(TRIG, False)

    # Measure the time taken for the pulse to return
    while GPIO.input(ECHO) == 0:
        pulse_start = time.time()
    while GPIO.input(ECHO) == 1:
        pulse_end = time.time()

    # Calculate distance from time taken
    pulse_duration = pulse_end - pulse_start
    distance = pulse_duration * 17150  # Speed of sound = 343 m/s = 17150 cm/s
    distance = round(distance, 2)
    return distance





if __name__ == "__main__":
    while True:
            distance = get_distance()
            print("Distance:", distance, "cm")
            
            if distance < 100:  # Check if distance is less than 100 cm (1 meters)
                 capture_and_publish()

