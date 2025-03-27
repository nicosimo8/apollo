import RPi.GPIO as GPIO
import sys

GPIO.setmode(GPIO.BCM)

GPIO.setup(17, GPIO.OUT)
GPIO.setup(27, GPIO.OUT)
GPIO.setup(22, GPIO.OUT)
GPIO.setup(23, GPIO.OUT)
GPIO.setup(24, GPIO.OUT)
GPIO.setup(25, GPIO.OUT)
GPIO.setup(16, GPIO.OUT)
GPIO.setup(26, GPIO.OUT)

state1 = GPIO.input(17)
state2 = GPIO.input(27)
state3 = GPIO.input(22)
state4 = GPIO.input(23)
state5 = GPIO.input(24)
state6 = GPIO.input(25)
state7 = GPIO.input(16)
state8 = GPIO.input(26)

print([str(estate1), str(estate2), str(estate3), str(estate4), str(estate5), str(estate6), str(estate7), str(estate8)])
