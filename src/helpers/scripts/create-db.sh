# Setando as variaveis de ambiente
set -e

# Variaveis
SERVER="conecta_cafe_server";
PW="12345";
DB="conecta_cafe_db";
DB_TEST="conecta_cafe_db_test";

# Cores
red=`tput setaf 1`
green=`tput setaf 2`
reset=`tput sgr0`

# Variavel para achar currenty SO
UNAME=$(uname)

echo "OS - $UNAME \n"

# Removendo instancia antiga do docker e iniciando uma nova
echo "echo stop & remove old docker [$SERVER] and starting new fresh instance of [$SERVER]"
case $UNAME in
  MINGW*)
    (docker kill $SERVER || :) && \
    (docker rm $SERVER || :) && \
    docker run --name $SERVER -e POSTGRES_PASSWORD=$PW \
    -e PGPASSWORD=$PW \
    -p 5433:5432 \
    -d postgres
    ;;
  *) 
    (sudo docker kill $SERVER || :) && \
    (sudo docker rm $SERVER || :) && \
    sudo docker run --name $SERVER -e POSTGRES_PASSWORD=$PW \
    -e PGPASSWORD=$PW \
    -p 5433:5432 \
    -d postgres
    ;;
esac

# Aguardando PostgreSQL iniciar
echo "sleep wait for pg-server [$SERVER] to start";
sleep 3;

# Criando os bancos
case $UNAME in
  MINGW64*)
    echo "CREATE DATABASE $DB ENCODING 'UTF-8';" | docker exec -i $SERVER psql -U postgres
    echo "CREATE DATABASE $DB_TEST ENCODING 'UTF-8';" | docker exec -i $SERVER psql -U postgres
    ;;
  *) 
    echo "CREATE DATABASE $DB ENCODING 'UTF-8';" | sudo docker exec -i $SERVER psql -U postgres
    echo "CREATE DATABASE $DB_TEST ENCODING 'UTF-8';" | sudo docker exec -i $SERVER psql -U postgres
    ;;
esac

# Mensagem de sucesso
echo "\n${green}Database create with success${reset}\n"
