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

# Removendo instancia antiga do docker e iniciando uma nova
echo "echo stop & remove old docker [$SERVER] and starting new fresh instance of [$SERVER]"
(docker kill $SERVER || :) && \
  (docker rm $SERVER || :) && \
  docker run --name $SERVER -e POSTGRES_PASSWORD=$PW \
  -e PGPASSWORD=$PW \
  -p 5433:5432 \
  -d postgres

# Aguardando PostgreSQL iniciar
echo "sleep wait for pg-server [$SERVER] to start";
SLEEP 3;

# Criando os bancos
echo "CREATE DATABASE $DB ENCODING 'UTF-8';" | docker exec -i $SERVER psql -U postgres
echo "CREATE DATABASE $DB_TEST ENCODING 'UTF-8';" | docker exec -i $SERVER psql -U postgres

# Mensagem de sucesso
echo "${green}Database create with success${reset}"

# Listando os bancos
echo "\l" | docker exec -i $SERVER psql -U postgres
