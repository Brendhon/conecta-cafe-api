# Setando as variaveis de ambiente
set -e

# Cores
red=`tput setaf 1`
green=`tput setaf 2`
reset=`tput sgr0`

# Variaveis
SERVER="conecta_cafe_server";
SUCCESS_MESSAGE="${green}Container is running${reset}";
FAILURE_MESSAGE="${red}Container not found or already running${reset}";
COMMAND="";
UNAME=$(uname) # Variavel para descobrir qual o Sistema Operacional utilizado

# Mudando o comando dependendo do SO
case $UNAME in
  MINGW*)
    COMMAND="docker start $SERVER"
    ;;
  *) 
    COMMAND="sudo docker start $SERVER"
    ;;
esac

# Iniciando docker 
echo "echo start docker [$SERVER]"
if eval $COMMAND ; then
  echo $SUCCESS_MESSAGE
else
  echo $FAILURE_MESSAGE
fi