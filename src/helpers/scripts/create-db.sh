# Setando as variaveis de ambiente
set -e

# Cores
red=`tput setaf 1`
green=`tput setaf 2`
reset=`tput sgr0`

# Variaveis
SERVER="conecta_cafe_server";
PW="12345";
DB="conecta_cafe_db";
DB_TEST="conecta_cafe_db_test";
SUCCESS_MESSAGE="${green}Instance create with success${reset}";
FAILURE_MESSAGE="${red}Cannot create instance${reset}";
SUCCESS_MESSAGE_DB="${green}Database create with success${reset}";
FAILURE_MESSAGE_DB="${red}Cannot create database${reset}";
COMMAND="";
COMMAND_DB="";
UNAME=$(uname) # Variavel para descobrir qual o Sistema Operacional utilizado

# Mudando o comando dependendo do SO
case $UNAME in
  MINGW*)
    COMMAND="(docker kill $SERVER || :) && \
    (docker rm $SERVER || :) && \
    docker run --name $SERVER -e POSTGRES_PASSWORD=$PW \
    -e PGPASSWORD=$PW \
    -p 5433:5432 \
    -d postgres"

    COMMAND_DB="docker exec -i $SERVER psql -U postgres"
    ;;
  *) 
    COMMAND="(sudo docker kill $SERVER || :) && \
    (sudo docker rm $SERVER || :) && \
    sudo docker run --name $SERVER -e POSTGRES_PASSWORD=$PW \
    -e PGPASSWORD=$PW \
    -p 5433:5432 \
    -d postgres"

    COMMAND_DB="sudo docker exec -i $SERVER psql -U postgres"
    ;;
esac

# Removendo instancia antiga do docker e iniciando uma nova
echo "echo stop & remove old docker [$SERVER] and starting new fresh instance of [$SERVER]"
if eval $COMMAND ; then
  echo $SUCCESS_MESSAGE
else
  echo $FAILURE_MESSAGE
fi

# Aguardando PostgreSQL iniciar
echo "sleep wait for pg-server [$SERVER] to start";
sleep 3;

# Criando os bancos
if echo "CREATE DATABASE $DB ENCODING 'UTF-8';" | eval $COMMAND_DB ; then
  if echo "CREATE DATABASE $DB_TEST ENCODING 'UTF-8';" | eval $COMMAND_DB ; then
    echo $SUCCESS_MESSAGE_DB
  else
    echo $FAILURE_MESSAGE_DB
  fi
fi
