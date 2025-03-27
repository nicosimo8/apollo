
echo "******APP-HARDUPDATE INICIO******"
echo "******ELIMINANDO******"
cd ../
yes | rm -r apollo
echo "******VOLVIENDO A COPIAR******"
git clone https://github.com/nicosimo8/apollo.git
cd apollo/
echo "******EJECUTANDO SCRIPT******"
sh app-upgrade.sh