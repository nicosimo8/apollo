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

print(str(state1), str(state2), str(state3), str(state4), str(state5), str(state6), str(state7), str(state8))
