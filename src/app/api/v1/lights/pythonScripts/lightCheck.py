import RPi.GPIO as GPIO
import time
import sys

GPIO.setmode(GPIO.BCM)
GPIO.setup(int(sys.argv[1]), GPIO.OUT)

def state():
  status = GPIO.input(int(sys.argv[1]))
  print(status)
  return status

try:
  state()
finally:
  print("Finalizado")