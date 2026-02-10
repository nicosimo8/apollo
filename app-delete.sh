{
echo "******APP-DELETE INICIO******"
echo "******CHECKEAR LOS CONTAINERS E IMAGENES******"
sudo docker ps -a
sudo docker image ls

echo "******DETENIENDO Y ELIMINANDO EL CONTAINER******"
sudo docker stop apollocontainer
sudo docker rm apollocontainer -f
sudo docker stop apolodb
sudo docker rm apolodb -f

echo "******ELIMINANDO LA IMAGEN******"
sudo docker image rm apolloimg:v0

echo "******LIMPIANDO RESTOS******"
sudo docker network rm apolonet
yes | sudo docker system prune -a --volumes

echo "******VOLVER A CHECKEAR LOS CONTAINERS E IMAGENES******"
sudo docker ps -a
sudo docker image ls
echo "******APP-DELETE FIN******"
}