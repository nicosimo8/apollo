import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BCM)

GPIO.setup(0, GPIO.OUT)
GPIO.setup(2, GPIO.OUT)
GPIO.setup(3, GPIO.OUT)
GPIO.setup(4, GPIO.OUT)
GPIO.setup(5, GPIO.OUT)
GPIO.setup(6, GPIO.OUT)
GPIO.setup(25, GPIO.OUT)
GPIO.setup(27, GPIO.OUT)

try:
  GPIO.output(0, GPIO.HIGH)
  time.sleep(1)
  GPIO.output(2, GPIO.LOW)
  time.sleep(1)
  GPIO.output(3, GPIO.HIGH)
  time.sleep(1)
  GPIO.output(4, GPIO.LOW)
  time.sleep(1)
  GPIO.output(5, GPIO.HIGH)
  time.sleep(1)
  GPIO.output(6, GPIO.LOW)
  time.sleep(1)
  GPIO.output(25, GPIO.HIGH)
  time.sleep(1)
  GPIO.output(27, GPIO.LOW)
  time.sleep(1)
        
finally:
  GPIO.cleanup()
