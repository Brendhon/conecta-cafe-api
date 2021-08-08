# Setando as variaveis de ambiente
set -e

# Variaveis
SERVER="conecta_cafe_server";

# Variavel para achar currenty SO
UNAME=$(uname)

# Cores
red=`tput setaf 1`
green=`tput setaf 2`
reset=`tput sgr0`

# Removendo instancia antiga da imagem e iniciando uma nova
echo "echo stop & remove old docker [$SERVER]"
case $UNAME in
  MINGW64*)
    (docker kill $SERVER || :) && (docker rm $SERVER || echo "\n${red}Container not found${reset}\n")
    ;;
  *) 
    (sudo docker kill $SERVER || :) && (sudo docker rm $SERVER || echo "\n${red}Container not found${reset}\n")
    ;;
esac