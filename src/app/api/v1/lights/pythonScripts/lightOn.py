import RPi.GPIO as GPIO
import time
import sys

GPIO.setmode(GPIO.BCM)
GPIO.setup(int(sys.argv[1]), GPIO.OUT)

try:
  GPIO.output(int(sys.argv[1]), GPIO.HIGH)
  time.sleep(1)
finally:
  GPIO.cleanup()
