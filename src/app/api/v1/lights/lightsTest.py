import RPi.GPIO as GPIO
import time
import sys

GPIO.setmode(GPIO.BCM)

# GPIO 26 enciende Relay 1
GPIO.setup(26, GPIO.OUT)
# GPIO 6 enciende Relay 2
GPIO.setup(6, GPIO.OUT)
# GPIO 22 enciende Relay 3
GPIO.setup(22, GPIO.OUT)
# GPIO 4 enciende Relay 4
GPIO.setup(4, GPIO.OUT)

try:
  while True:
    GPIO.output(26, GPIO.HIGH)
    print('relay 4 ON')
    time.sleep(1)
    GPIO.output(26, GPIO.LOW)
    print('relay 4 OFF')
    time.sleep(1)
    GPIO.output(6, GPIO.HIGH)
    print('relay 2 ON')
    time.sleep(1)
    GPIO.output(6, GPIO.LOW)
    print('relay 2 OFF')
    time.sleep(1)
    GPIO.output(22, GPIO.HIGH)
    print('relay 3 ON')
    time.sleep(1)
    GPIO.output(22, GPIO.LOW)
    print('relay 3 OFF')
    time.sleep(1)
    GPIO.output(4, GPIO.HIGH)
    print('relay 1 ON')
    time.sleep(1)
    GPIO.output(4, GPIO.LOW)
    print('relay 1 OFF')
    time.sleep(1)
        
finally:
  GPIO.cleanup()
