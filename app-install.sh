#INSTALAR NODE
# echo "******DESCARGANDO E INSTALANDO NODE 20******"
# curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.2/install.sh | bash
# \. "$HOME/.nvm/nvm.sh"
# nvm install 20
# node -v
# nvm current
# npm -v

#INSTALAR DOCKER
echo "******DESCARGANDO E INSTALANDO ACTUALIZACIONES******"
sudo apt-get update
sudo apt-get upgrade

echo "******DESCARGANDO E INSTALANDO DOCKER******"
curl -fsSL test.docker.com -o get-docker.sh
sudo apt install ca-certificates curl gnupg lsb-release
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update
sudo apt install docker-ce docker-ce-cli containerd.io
docker --version
sudo usermod -aG docker $USER
groups $USER
newgrp docker
docker run hello-world

echo "******PERMITIENDO A DOCKER BOOTEAR DESDE EL INICIO******"
sudo systemctl enable docker
sudo systemctl start docker
sudo systemctl status docker