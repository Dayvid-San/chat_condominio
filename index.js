const app = require('http').createServer(resposta)
const fs = require('fs')
const io = require('socket.io')(app);



const PORT = 8080
app. listen(PORT, () => {
    console.log('Rodando na porta ' + PORT)
})
function resposta (req, res) {

    let arquivo = ''
    if (req.url == '/'){
        arquivo = __dirname + '/index.html'
    }
    else{
        arquivo = __dirname + req.url
    }

    fs.readFile(__dirname + '/index.html', (err, data) => {
        if (err) {
            res.writeHead(404)
            return res.end('A página ou o arquivo não foi encontrado')
        }

        res.writeHead(200)
        res.end(data)
        console.info('O servidor está rodando corretamente.')
    })
    
}

io.on('connection', (socket) => {
    socket.on('enviar mensagem', function(mensagem_enviada, callback){
        mensagem_enviada = '[ ' + pegarDataAtual() + ' ]:' + mensagem_enviada

        io.sockets.emit('atualizar mensagens', mensagem_enviada)
        callback()
    })
})

function pegarDataAtual(){
    var dataAtual = new Date();
    var dia = (dataAtual.getDate()<10 ? '0' : '') + dataAtual.getDate();
    var mes = ((dataAtual.getMonth() + 1)<10 ? '0' : '') + (dataAtual.getMonth() + 1);
    var ano = dataAtual.getFullYear();
    var hora = (dataAtual.getHours()<10 ? '0' : '') + dataAtual.getHours();
    var minuto = (dataAtual.getMinutes()<10 ? '0' : '') + dataAtual.getMinutes();
    var segundo = (dataAtual.getSeconds()<10 ? '0' : '') + dataAtual.getSeconds();
  
    var dataFormatada = dia + "/" + mes + "/" + ano + " " + hora + ":" + minuto + ":" + segundo;
    return dataFormatada;
}