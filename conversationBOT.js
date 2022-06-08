const chamar = document.querySelector('#chamar-morador')
const sala_chat = document.querySelector('#sala_chat')
const acessoUsuario = sala_chat.querySelector('#chat_bot')

//let mensagemEspera = `OK, ${visitante}! Vou chamar ${moradorSolicitado} agora mesmo. Por favor, espere um momento!`


// Pessoas
const nomeVisitante = document.querySelector('#visitante').value
const moradorSolicitado = document.querySelector('#moradorSolicitado').value

if (nomeVisitante === undefined) {
    alert('Digite o nome do visitante!')
}
else {
    chamar.addEventListener('click', () => {
        acessoUsuario.classList.toggle('off')
        document.querySelector('#respostaBotSaudacao').innerHTML = `Por favor, espere um ${nomeVisitante} momento! `
        //document.querySelector('#respostaBotSaudacao').innerHTML = `OK, ${visitante}! Vou chamar ${moradorSolicitado} agora mesmo. Por favor, espere um momento!`
    })
}

// função que ativa função no python para ligar para morador

