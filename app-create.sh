{
echo "******APP-CREATE - INICIO******"

echo "******CREANDO IMAGEN******"
sudo docker build . -t apolloimg:v0

echo "******CREANDO Y CORRIENDO EL CONTAINER******"
sudo docker run --privileged -d --restart=always -v /sys:/sys -p3000:3000 --name apollocontainer -e USERNAME_ONE="admin" -e USERNAME_TWO="operador1" -e USERNAME_THREE="operador2" -e PASSWORD_ONE="admin" -e PASSWORD_TWO="coop.union1" -e PASSWORD_THREE="coop.union2" -e CUSTOMER_NAME="Coop. Unión" apolloimg:v0

echo "******FINALIZANDO******"
yes | sudo rm -rf readme.md
yes | sudo rm -rf package.json
yes | sudo rm -rf package-lock.json
yes | sudo rm -rf next.config.mjs
yes | sudo rm -rf lock.json
yes | sudo rm -rf jsconfig.json
yes | sudo rm -rf eslint.config.mjs
yes | sudo rm -rf Dockerfile
yes | sudo rm -rf .env
yes | sudo rm -rf src
yes | sudo rm -rf public
yes | sudo rm -rf node_modules
yes | sudo rm -rf build
yes | sudo rm -rf .next

echo "******APP-CREATE - FIN******"
}