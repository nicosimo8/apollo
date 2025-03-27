{
echo "******APP-CREATE - INICIO******"

echo "******CREANDO IMAGEN******"
sudo docker build . -t apolloimg:v0

echo "******CREANDO Y CORRIENDO EL CONTAINER******"
sudo docker run --privileged -d --restart=always -v /sys:/sys -p3000:3000 --name apollocontainer -e USERNAME_ONE="argos" -e USERNAME_TWO="argos2" -e USERNAME_THREE="argos3" -e PASSWORD_ONE="three.123" -e PASSWORD_TWO="Argos123" -e PASSWORD_THREE="testing" -e CUSTOMER_NAME="Argos Testing" apolloimg:v0

echo "******FINALIZANDO******"
sudo rm -rf readme.md
sudo rm -rf package.json
sudo rm -rf package-lock.json
sudo rm -rf next.config.mjs
sudo rm -rf lock.json
sudo rm -rf jsconfig.json
sudo rm -rf eslint.config.mjs
sudo rm -rf Dockerfile
sudo rm -rf .env
sudo rm -rf src
sudo rm -rf public
sudo rm -rf node_modules
sudo rm -rf build
sudo rm -rf .next

echo "******APP-CREATE - FIN******"
}