const button = document.querySelector('.button-add-task')
const input = document.querySelector('.input-task')
const listaCompleta = document.querySelector('.list-tasks')

let minhaListaDeItens = []

function adicionarNovaTarefa() {
    minhaListaDeItens.push({
        tarefa: input.value, 
        concluida: false // por padrão, quando cria-se uma tarefa ela não está conclúida, portanto é false
    })

    input.value = ''

    mostrarTarefas()

}

function mostrarTarefas() {
    let novaLi = ''

    // ['comprar café', 'estudar programação']

    minhaListaDeItens.forEach((item, posicao) => { //forEach vai item por item de um array
        novaLi = novaLi +
        `

            <li class="task ${item.concluida && 'done'}">
                <img src="./assets/checked.png" alt="check-na-tarefa" onclick="concluirTarefa(${posicao})">
                <p>${item.tarefa}</p>
                <img src="./assets/trash.png" alt="tarefa-para-o-lixo" onclick="deletarItem(${posicao})">
            </li>
            
        `
    })
    
    listaCompleta.innerHTML = novaLi

    localStorage.setItem('lista', JSON.stringify(minhaListaDeItens)) 
    /* 
        localStorage tem várias funcionalidades, a setTime é colocar um item, depois é preciso de duas coisas, o primeiro parâmetro é dar um nome pros 
        itens que irão ficar guardados e a outra é os items em si, porém o localStorage só aceita strings e, eu estou
        usando objeto (minhaListaDeItens), para isso eu uso JSON.stringify() e tudo que estiver dentro dele será convertido para string

    */
}

function concluirTarefa(posicao) {
    minhaListaDeItens[posicao].concluida = !minhaListaDeItens[posicao].concluida // inverte o valor, se está true, ele coloca pra false e vice-versa

    mostrarTarefas()
}

function deletarItem(posicao) {
    minhaListaDeItens.splice(posicao, 1) // splice permite que eu delete o que eu quiser dentro do meu array, só precisa falar duas coisas pra ele, qual a posição do item dentro do array e, quantos itens a partir dessa posição

    mostrarTarefas()
}

function recarregarTarefas() {
    const tarefasDoLocalStorage = localStorage.getItem('lista')

    if (tarefasDoLocalStorage) {
        minhaListaDeItens = JSON.parse(tarefasDoLocalStorage) // JSON.parse() transforma para objeto
    }

    mostrarTarefas()
}

recarregarTarefas()
button.addEventListener('click', adicionarNovaTarefa)