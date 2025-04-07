{
echo "******APP-CREATE - INICIO******"

echo "******CREANDO VOLUMEN******"
sudo docker volume create --name apolodata

echo "******CREANDO LA RED******"
docker network create -d bridge apolonet

echo "******CREANDO IMAGEN******"
sudo docker build . -t apolloimg:v0

echo "******CREANDO Y CORRIENDO LOS CONTAINERS******"
# sudo docker run --privileged -d --restart=always -v /sys:/sys -p3000:3000 --name apollocontainer --network apolonet -e USERNAME_ONE="admin" -e USERNAME_TWO="operador1" -e USERNAME_THREE="operador2" -e PASSWORD_ONE="admin" -e PASSWORD_TWO="coop.union1" -e PASSWORD_THREE="coop.union2" -e CUSTOMER_NAME="Coop. Unión" apolloimg:v0
sudo docker run --privileged -d --restart=always -v /sys:/sys -p3000:3000 --name apollocontainer --network apolonet -e USERNAME_ONE=admin -e USERNAME_TWO=operador1 -e USERNAME_THREE=operador2 -e PASSWORD_ONE=admin -e PASSWORD_TWO=coop.union1 -e PASSWORD_THREE=coop.union2 -e CUSTOMER_NAME="Coop. Unión" -e MYSQL_HOST_URL=apolodb -e MYSQL_PORT=3306 -e MYSQL_USER=argos -e MYSQL_PASSWORD=argos -e MYSQL_DATABASE=argosapolodb apolloimg:v0
docker run -d --restart=always -v apolodata:/var/lib/mysql -p3306:3306 --name apolodb --network apolonet -e MYSQL_ROOT_PASSWORD=argos -e MYSQL_USER=argos -e MYSQL_PASSWORD=argos -e MYSQL_DATABASE=argosapolodb mysql
# sh app-cdb.sh

echo "******FINALIZANDO******"

echo "******APP-CREATE - FIN******"
}