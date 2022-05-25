const chamar = document.querySelector('#chamar-morador')
const sala_chat = document.querySelector('#sala_chat')
const acessoUsuario = sala_chat.querySelector('#chat_bot')

chamar.addEventListener('click', () => {
    acessoUsuario.classList.toggle('off')
})