import RPi.GPIO as GPIO
import time
import sys

GPIO.setmode(GPIO.BCM)

# GPIO 26 Relay 1
GPIO.setup(26, GPIO.OUT)
# GPIO  6 Relay 2
GPIO.setup(6, GPIO.OUT)
# GPIO 22 Relay 3
GPIO.setup(22, GPIO.OUT)
# GPIO  4 Relay 4
GPIO.setup(4, GPIO.OUT)

def funcTest(num):
  try:
    GPIO.output(num, GPIO.HIGH)
    time.sleep(1)
    GPIO.output(num, GPIO.LOW)
    time.sleep(1)
          
  finally:
    GPIO.cleanup()

funcTest(sys.argv[1])