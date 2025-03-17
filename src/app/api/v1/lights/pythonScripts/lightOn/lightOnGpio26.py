import RPi.GPIO as GPIO

GPIO.setmode(GPIO.BCM)

# GPIO 26 Relay 1
GPIO.setup(26, GPIO.OUT)

try:
  GPIO.output(26, GPIO.HIGH)
