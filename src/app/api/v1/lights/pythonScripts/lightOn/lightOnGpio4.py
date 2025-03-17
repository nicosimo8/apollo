import RPi.GPIO as GPIO

GPIO.setmode(GPIO.BCM)

# GPIO 4 Relay 4
GPIO.setup(4, GPIO.OUT)

try:
  GPIO.output(4, GPIO.HIGH)
