# Setando as variaveis de ambiente
set -e

# Cores
red=`tput setaf 1`
green=`tput setaf 2`
reset=`tput sgr0`

# Variaveis
SERVER="conecta_cafe_server";
SUCCESS_MESSAGE="${green}Deleted with success${reset}";
FAILURE_MESSAGE="${red}Container not found${reset}";
COMMAND="";
UNAME=$(uname) # Variavel para descobrir qual o Sistema Operacional utilizado

# Mudando o comando dependendo do SO
case $UNAME in
  MINGW*)
    COMMAND="(docker kill $SERVER) && (docker rm $SERVER)"
    ;;
  *) 
    COMMAND="(sudo docker kill $SERVER) && (sudo docker rm $SERVER)"
    ;;
esac

# Removendo instancia antiga da imagem e iniciando uma nova
echo "echo stop & remove old docker [$SERVER]"
if eval $COMMAND ; then
  echo $SUCCESS_MESSAGE
else
  echo $FAILURE_MESSAGE
fi