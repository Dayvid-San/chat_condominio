const app = require('http').createServer(resposta)
const fs = require('fs')
const io = require('socket.io')(app);



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
                  return res.end('Vish! deu ruim')
             }

             res.writeHead(200);
             res.end(data);
        }
    );
}

io.on("connection", function(socket){
    socket.on("enviar mensagem", function(mensagem_enviada, callback){
        mensagem_enviada = "[ " + pegarDataAtual() + " ]: " + mensagem_enviada;

        io.sockets.emit("atualizar mensagens", mensagem_enviada);
        callback();
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


