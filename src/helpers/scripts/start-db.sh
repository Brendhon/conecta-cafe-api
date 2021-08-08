# Setando as variaveis de ambiente
set -e

# Variaveis
SERVER="conecta_cafe_server";

# Iniciando docker 
echo "echo start docker [$SERVER]"
docker start $SERVER