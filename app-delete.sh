echo "******CHECKEAR LOS CONTAINERS E IMAGENES******"
docker ps -a
docker image ls

echo "******DETENIENDO Y ELIMINANDO EL CONTAINER******"
docker stop apollocontainer
docker rm apollocontainer

echo "******ELIMINANDO LA IMAGEN******"
docker image rm apolloimg:v0

echo "******VOLVER A CHECKEAR LOS CONTAINERS E IMAGENES******"
docker ps -a
docker image ls