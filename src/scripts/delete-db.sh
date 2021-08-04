# Setando as variaveis de ambiente
set -e

# Variaveis
SERVER="conecta_cafe_server";

# Removendo instancia antiga da imagem e iniciando uma nova
echo "echo stop & remove old docker [$SERVER]"
(docker kill $SERVER || :) && (docker rm $SERVER || :) 