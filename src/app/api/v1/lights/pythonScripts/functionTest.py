import RPi.GPIO as GPIO
import time
import sys

GPIO.setmode(GPIO.BCM)
GPIO.setup(sys.argv[1], GPIO.OUT)

try:
  GPIO.output(sys.argv[1], GPIO.HIGH)
  time.sleep(1)
  GPIO.output(sys.argv[1], GPIO.LOW)
  time.sleep(1)
finally:
  GPIO.cleanup()
