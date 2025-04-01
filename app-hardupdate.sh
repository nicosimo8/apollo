{
echo "******APP-HARDUPDATE INICIO******"
echo "******ELIMINANDO******"
cd ../
yes | rm -r apollo
echo "******VOLVIENDO A COPIAR******"
git clone https://github.com/nicosimo8/apollo.git
git switch develop
echo "******EJECUTANDO SCRIPT******"
cd apollo/
sh app-upgrade.sh
}