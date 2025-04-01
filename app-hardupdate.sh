{
echo "******APP-HARDUPDATE INICIO******"
echo "******ELIMINANDO******"
cd ../
yes | rm -r apollo
echo "******VOLVIENDO A COPIAR******"
sudo git clone https://github.com/nicosimo8/apollo.git
echo "******EJECUTANDO SCRIPT******"
cd apollo/
sudo git switch develop
sh app-upgrade.sh
}