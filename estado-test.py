import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BCM)

GPIO.setup(17, GPIO.OUT)
GPIO.setup(27, GPIO.OUT)
GPIO.setup(22, GPIO.OUT)
GPIO.setup(23, GPIO.OUT)
GPIO.setup(24, GPIO.OUT)
GPIO.setup(25, GPIO.OUT)
GPIO.setup(16, GPIO.OUT)
GPIO.setup(26, GPIO.OUT)

try:
  GPIO.output(17, GPIO.HIGH)
  time.sleep(1)
  input = GPIO.input(17)
  print(str(input))
  GPIO.output(17, GPIO.LOW)
  time.sleep(1)
  input = GPIO.input(17)
  print(str(input))
finally:
  GPIO.cleanup()
