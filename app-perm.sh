#DANDO A DOCKER PERMISOS Y DEJANDO QUE CORRA CADA VEZ QUE INICIA
echo "******DANDO PERMISOS A DOCKER******"
sudo usermod -aG docker $USER
groups $USER
newgrp docker
docker run hello-world
echo "******PERMITIENDO A DOCKER BOOTEAR DESDE EL INICIO******"
sudo systemctl enable docker
sudo systemctl start docker
sudo systemctl status docker
docker --version