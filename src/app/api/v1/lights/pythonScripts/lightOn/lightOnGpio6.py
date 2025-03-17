import RPi.GPIO as GPIO

GPIO.setmode(GPIO.BCM)

# GPIO 6 Relay 2
GPIO.setup(6, GPIO.OUT)

try:
  GPIO.output(6, GPIO.HIGH)
