#INSTALAR NODE
# echo "******DESCARGANDO E INSTALANDO NODE 20******"
# curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.2/install.sh | bash
# \. "$HOME/.nvm/nvm.sh"
# nvm install 20
# node -v
# nvm current
# npm -v
#INSTALAR PYTHON
# echo "******DESCARGANDO E INSTALANDO PYTHON******"
# sudo apt-get install python3-pip
# pip3 --version
# pip3 install rpi.gpio --break-system-packages
# sudo apt install python3-rpi.gpio
#INSTALAR DOCKER
{
echo "******DESCARGANDO E INSTALANDO ACTUALIZACIONES******"
sudo apt-get update
sudo apt-get -y upgrade

echo "******DESCARGANDO E INSTALANDO DOCKER******"
curl -fsSL test.docker.com -o get-docker.sh
sudo apt install ca-certificates curl gnupg lsb-release
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update
sudo apt install docker-ce docker-ce-cli containerd.io

echo "******DANDO PERMISOS A DOCKER******"
sudo usermod -aG docker $USER
groups $USER
/usr/bin/newgrp docker<<EONG
EONG
echo "******PERMITIENDO A DOCKER BOOTEAR DESDE EL INICIO******"
sudo systemctl enable docker
sudo systemctl start docker
# sudo systemctl status docker
sudo cp apolo.service /etc/systemd/system
sudo cp estado_led_anodo.service /etc/systemd/system
sudo systemctl daemon-reload
sudo systemctl enable estado_led_anodo.service
sudo systemctl enable apolo
sudo systemctl start estado_led_anodo.service
sudo systemctl start apolo
}