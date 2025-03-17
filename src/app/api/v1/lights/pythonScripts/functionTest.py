import RPi.GPIO as GPIO
import time
import sys

GPIO.setmode(GPIO.BCM)

def funcTest(num):
  try:
    GPIO.setup(num, GPIO.OUT)
    GPIO.output(num, GPIO.HIGH)
    time.sleep(1)
    GPIO.output(num, GPIO.LOW)
    time.sleep(1)
          
  finally:
    GPIO.cleanup()

funcTest(sys.argv[1])