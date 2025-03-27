import RPi.GPIO as GPIO
import sys

GPIO.setmode(GPIO.BCM)
GPIO.setup(int(sys.argv[1]), GPIO.OUT)

input = GPIO.input(int(sys.argv[1]))

print(str(input))
