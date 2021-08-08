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

# Iniciando docker 
echo "echo start docker [$SERVER]"
case $UNAME in
  MINGW64*)
    (docker start $SERVER || echo "\n${red}Container not found or already running${reset}\n")
    ;;
  *) 
    (sudo docker start $SERVER || echo "\n${red}Container not found or already running${reset}\n")
    ;;
esac