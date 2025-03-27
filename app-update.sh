#ACTUALIZAR REPO
{
echo "******APP-UPDATE INICIO******"
echo "******TRAYENDO LOS NUEVOS CAMBIOS******"
git pull

echo "******CHECKEAR LOS CONTAINERS E IMAGENES******"
sudo docker ps -a
sudo docker image ls

echo "******DETENIENDO Y ELIMINANDO EL CONTAINER******"
sudo docker stop apollocontainer
sudo docker rm apollocontainer

echo "******ELIMINANDO LA IMAGEN******"
sudo docker image rm apolloimg:v0

echo "******VOLVER A CHECKEAR LOS CONTAINERS E IMAGENES******"
sudo docker ps -a
sudo docker image ls

sh app-create.sh

echo "******APP-UPDATE FIN******"
}