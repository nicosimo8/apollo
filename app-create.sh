echo "******CREANDO IMAGEN******"
docker build . -t apolloimg:v0

echo "******CREANDO Y CORRIENDO EL CONTAINER******"
docker run --privileged -p3000:3000 --name apollocontainer apolloimg:v0
# docker run --privileged -v /sys:/sys -p3000:3000 --name apollocontainer apolloimg:v0