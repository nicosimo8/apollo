{
echo "******CREANDO IMAGEN******"
docker build . -t apolloimg:v0

echo "******CREANDO Y CORRIENDO EL CONTAINER******"
docker run --privileged -d --restart=always -v /sys:/sys -p3000:3000 --name apollocontainer -e USERNAME_ONE="argos" -e USERNAME_TWO="argos2" -e USERNAME_THREE="argos3" -e PASSWORD_ONE="three.123" -e PASSWORD_TWO="Argos123" -e PASSWORD_THREE="testing" -e CUSTOMER_NAME="Argos Testing" apolloimg:v0
# docker run --privileged -v /sys:/sys -p3000:3000 --name apollocontainer apolloimg:v0
}