import RPi.GPIO as GPIO
import time
import sys

GPIO.setmode(GPIO.BCM)
GPIO.setup(26, GPIO.OUT)

try:
  GPIO.output(26, GPIO.HIGH)
  time.sleep(1)
  GPIO.output(26, GPIO.LOW)
  time.sleep(1)
  print(sys.argv)
finally:
  GPIO.cleanup()
