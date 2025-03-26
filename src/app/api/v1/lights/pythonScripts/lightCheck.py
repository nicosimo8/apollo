import RPi.GPIO as GPIO
import time
import sys

GPIO.setmode(GPIO.BCM)
GPIO.setup(int(sys.argv[1]), GPIO.OUT)

status = GPIO.input(int(sys.argv[1]))
print(str(status))
print("PUTO")