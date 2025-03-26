import RPi.GPIO as GPIO
import time
import sys

try:
  status = GPIO.input(int(sys.argv[1]))
  print(status)
finally:
  print("Finalizado")