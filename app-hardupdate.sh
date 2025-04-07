{
echo "******APP-HARDUPDATE INICIO******"
echo "******ELIMINANDO******"
cd ..
yes | sudo rm -r apollo
echo "******VOLVIENDO A COPIAR******"
git clone https://github.com/nicosimo8/apollo.git
echo "******EJECUTANDO SCRIPT******"
cd apollo/
#ONLY FOR TESTING
# git switch develop
#ONLY FOR TESTING
sh app-update.sh
sh app-perm.sh
#ONLY FOR PRODUCTION
sh app-mess.sh
#ONLY FOR PRODUCTION
}