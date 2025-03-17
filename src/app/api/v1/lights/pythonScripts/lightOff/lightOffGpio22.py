import RPi.GPIO as GPIO

GPIO.setmode(GPIO.BCM)

# GPIO 22 Relay 3
GPIO.setup(22, GPIO.OUT)

try:
  GPIO.output(22, GPIO.LOW)
