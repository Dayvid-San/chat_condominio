const app = require('http').createServer(resposta)
const fs = require('fs')
const io = require('socket.io')(app);
let usuario = []


const PORT = 8080
app. listen(PORT, () => {
    console.log('Rodando na porta ' + PORT)
})
function resposta (req, res) {
    var arquivo = "";
    if(req.url == "/"){
        arquivo = __dirname + '/index.html';
    }else{
        arquivo = __dirname + req.url;
    }
    fs.readFile(arquivo,
        function (err, data) {
             if (err) {
                  res.writeHead(404);
                  console.log(`Algo aconteceu. Veja aí! => {
                      ${err}
                  }`)
                  return res.end(`Vish! deu ruim`)
             }

             res.writeHead(200);
             res.end(data);
        }
    );
}

io.on("connection", function(socket){

    // Verificação de usuários
    socket.on("entrar", function(apelido, callback){
        if(!(apelido in usuarios)){
            socket.apelido = apelido;
            usuarios[apelido] = socket;
            callback(true);
        }else{
            callback(false);
        }
    });

    socket.on("enviar mensagem", function(mensagem_enviada, callback){
        mensagem_enviada = "[ " + pegarDataAtual() + " ]: " + socket.apelido + ": " + mensagem_enviada;

        io.sockets.emit("atualizar mensagens", mensagem_enviada);
        callback();
    });

    socket.on("disconnect", function(){
        delete usuarios[socket.apelido];
        io.sockets.emit("atualizar usuarios", Object.keys(usuarios));
        io.sockets.emit("atualizar mensagens", "[ " + pegarDataAtual() + " ] " + socket.apelido + " saiu da sala");
      });
});




function pegarDataAtual(){
    let dataAtual = new Date();
    let dia = (dataAtual.getDate()<10 ? '0' : '') + dataAtual.getDate();
    let mes = ((dataAtual.getMonth() + 1)<10 ? '0' : '') + (dataAtual.getMonth() + 1);
    let ano = dataAtual.getFullYear();
    let hora = (dataAtual.getHours()<10 ? '0' : '') + dataAtual.getHours();
    let minuto = (dataAtual.getMinutes()<10 ? '0' : '') + dataAtual.getMinutes();
    let segundo = (dataAtual.getSeconds()<10 ? '0' : '') + dataAtual.getSeconds();
  
    let dataFormatada = dia + "/" + mes + "/" + ano + " " + hora + ":" + minuto + ":" + segundo;
    return dataFormatada;
}