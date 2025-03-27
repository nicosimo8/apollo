{
echo "******PERMITIENDO A DOCKER, APOLO Y LEDS BOOTEAR DESDE EL INICIO******"
sudo systemctl enable docker
sudo systemctl start docker
# sudo systemctl status docker
sudo cp apolo.service /etc/systemd/system
sudo cp estado_led_anodo.service /etc/systemd/system
sudo systemctl daemon-reload
sudo systemctl enable estado_led_anodo.service
sudo systemctl enable test.service
sudo systemctl enable apolo
sudo systemctl start estado_led_anodo
sudo systemctl start test
sudo systemctl start apolo
}