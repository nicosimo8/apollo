#INSTALAR NODE

echo "******DESCARGANDO E INSTALANDO NODE 20******"
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.2/install.sh | bash
\. "$HOME/.nvm/nvm.sh"
nvm install 20
node -v
nvm current
npm -v