{
echo "******APP-CREATE - INICIO******"

echo "******CREANDO IMAGEN******"
sudo docker build . -t apolloimg:v0

echo "******CREANDO Y CORRIENDO LOS CONTAINERS******"
docker network create -d bridge apolonet
sudo docker run --privileged -d --restart=always -v /sys:/sys -p3000:3000 --name apollocontainer --network apolonet -e USERNAME_ONE="admin" -e USERNAME_TWO="operador1" -e USERNAME_THREE="operador2" -e PASSWORD_ONE="admin" -e PASSWORD_TWO="coop.union1" -e PASSWORD_THREE="coop.union2" -e CUSTOMER_NAME="Coop. Unión" apolloimg:v0
docker run --name apolodb --network apolonet -e MYSQL_ROOT_PASSWORD=Argos.123 -e MYSQL_USER=Argos -e MYSQL_PASSWORD=Argos.123 -d mysql
sh app-cdb.sh

echo "******FINALIZANDO******"

echo "******APP-CREATE - FIN******"
}