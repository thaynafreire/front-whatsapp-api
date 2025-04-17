'use strict'

async function buscarContatos() {
    const url = 'http://localhost:8080/v1/whatsapp/data/user/contacts/?id=1'
    const resposta = await fetch(url)
    const dados = await resposta.json()
    return dados.contatos
}

function criarCardContato(contato) {
    const card = document.createElement('div')
    card.classList.add('card-contato')

    const foto = document.createElement('div')
    foto.id = 'foto-perfil'

    const detalhes = document.createElement('div')
    detalhes.classList.add('detalhes-contato')

    const nome = document.createElement('p')
    nome.classList.add('nome')
    nome.textContent = contato.nome

    const numero = document.createElement('p')
    numero.classList.add('numero')
    numero.textContent = contato.telefone

    detalhes.appendChild(nome)
    detalhes.appendChild(numero)

    card.appendChild(foto)
    card.appendChild(detalhes)

    card.addEventListener('click', async () => {
        const conversas = await buscarConversas(contato.id)
        mostrarConversas(conversas)
    })

    return card
}

async function buscarConversas(idContato) {
    const url = `http://localhost:8080/v1/whatsapp/data/user/conversations/?id=${idContato}`
    const resposta = await fetch(url)
    const dados = await resposta.json()
    return dados.conversas
}

function mostrarConversas(conversas) {
    const container = document.querySelector('.conversas')
    container.replaceChildren('')

    conversas.forEach(mensagem => {
        const msg = document.createElement('p')
        msg.textContent = mensagem.texto
        container.appendChild(msg)
    })
}

async function carregarContatos() {
    const contatos = await buscarContatos()
    const container = document.querySelector('.contatos')
    container.replaceChildren('')
    contatos.forEach(contato => {
        const card = criarCardContato(contato)
        container.appendChild(card)
    })
}

carregarContatos()

