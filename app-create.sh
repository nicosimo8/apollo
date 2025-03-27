{
echo "******APP-CREATE - INICIO******"

echo "******CREANDO IMAGEN******"
sudo docker build . -t apolloimg:v0

echo "******CREANDO Y CORRIENDO EL CONTAINER******"
sudo docker run --privileged -d --restart=always -v /sys:/sys -p3000:3000 --name apollocontainer -e USERNAME_ONE="argos" -e USERNAME_TWO="argos2" -e USERNAME_THREE="argos3" -e PASSWORD_ONE="three.123" -e PASSWORD_TWO="Argos123" -e PASSWORD_THREE="testing" -e CUSTOMER_NAME="Argos Testing" apolloimg:v0

echo "******FINALIZANDO******"
sudo rm -r readme.md
sudo rm -r package.json
sudo rm -r package-lock.json
sudo rm -r next.config.mjs
sudo rm -r lock.json
sudo rm -r jsconfig.json
sudo rm -r eslint.config.mjs
sudo rm -r Dockerfile
sudo rm -r .env
sudo rm -r src
sudo rm -r public
sudo rm -r node_modules
sudo rm -r build
sudo rm -r .next

echo "******APP-CREATE - FIN******"
}