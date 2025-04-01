{
echo "******APP-HARDUPDATE INICIO******"
echo "******ELIMINANDO******"
cd ..
yes | sudo rm -r apollo
echo "******VOLVIENDO A COPIAR******"
git clone https://github.com/nicosimo8/apollo.git
echo "******EJECUTANDO SCRIPT******"
cd apollo/
sh app-update.sh
}