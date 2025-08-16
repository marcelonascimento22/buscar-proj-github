import api from './api'
class App{
    constructor(){
        //Lista de repositórios
        this.repos = []

        //Form
        this.formulario = document.querySelector('form')

        //List
        this.lista = document.querySelector('.list-group')


        //Meétodo para registrar eventos do form
        this.registerEvents()
    }

    registerEvents(){
        this.formulario.onsubmit = evento => this.adicionarRepositorio(evento)

    }

    async adicionarRepositorio(evento){
        //
        // Evita que o formulario recarregue a pagina.
        evento.preventDefault() 

        //recupera o valor do input
        let input = this.formulario.querySelector('input[id=repositorio]').value

        //Se vier vazio sai da aplicação
        if(input.length === 0){ 
            return
        }

        //Ativa o carregamento
        this.apresentarBuscando()

        try{
            let response = await api.get(`/repos/${input}`)
            //console.log(response)

            let {name, description, html_url, owner: {avatar_url}} = response.data
            //adciona o repositorio na lista de repositórios
            this.repos.push({
                nome: name,
                descricao: description,
                avatar_url,
                link: html_url,
            })

            //renderiza a lista de repositórios
            //console.log(this.repos);
            this.renderizarTela()
        } catch(error){
            //LImpar Buscando
            this.lista.removeChild(document.querySelector('.list-group-item-warning'))
            let err = document.querySelector('.list-group-item-danger')
            if(err !== null){
                this.lista.removeChild(err)
            }


            //Li
            let li = document.createElement('li')
            li.setAttribute('class', 'list-group-item list-group-item-danger')
            let txterror = document.createTextNode(`O repositório ${input} não existe.`)
            li.appendChild(txterror)
             this.lista.appendChild(li)
        }
    }

    apresentarBuscando(){
        //recupera o valor do input
        let input = this.formulario.querySelector('input[id=repositorio]').value
        //Li
        let li = document.createElement('li')
        li.setAttribute('class', 'list-group-item list-group-item-warning')
        let txtBuscando = document.createTextNode(`Aguarde, buscando o repositório ${input}...`)
        li.appendChild(txtBuscando)
        this.lista.appendChild(li)
    }

    renderizarTela(){
        //Limpar o conteudo
        this.lista.innerHTML = ''

        //Pecorrer toda a lista
        this.repos.forEach(repos => {
            //Li
            let li = document.createElement('li')
            li.setAttribute('class', 'list-group-item list-group-item-action')

            //Img
            let img = document.createElement('img')
            img.setAttribute('src', repos.avatar_url)


            //strong
            let strong = document.createElement('strong')
            let txtnome = document.createTextNode(repos.nome)
            strong.appendChild(txtnome)
 
            //p
            let p = document.createElement('p')
            let txtp = document.createTextNode(repos.descricao)
            p.appendChild(txtp)

            //a
            let a = document.createElement('a')
            a.setAttribute('href', repos.link)
            a.setAttribute('target', '_blank')
            let txta = document.createTextNode('Acessar')
            a.appendChild(txta)

            //Adcionando na li
            li.appendChild(img)
            li.appendChild(strong)
            li.appendChild(p)
            li.appendChild(a)

            //Adcioando o li na ul
            this.lista.appendChild(li)

            //Limpar o conteudo do input
            this.formulario.querySelector('input[id=repositorio]').value = ''

            //Adciona o foco no input
            this.formulario.querySelector('input[id=repositorio]').focus()
        })
    }



}

new App();