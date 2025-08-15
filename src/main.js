
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

    adicionarRepositorio(evento){
        //
        // Evita que o formulario recarregue a pagina.
        evento.preventDefault() 

        //adciona o repositorio na lista de repositórios
        this.repos.push({
            nome: 'Nerd Fonts',
            descricao: "Iconic font aggregator, collection, and patcher",
            avatar_url: "https://avatars.githubusercontent.com/u/8083459?s=48&v=4",
            link: "thhps://github.com/ryanoasis/nerd-fonts",
        })

        //renderiza a lista de repositórios
        //console.log(this.repos);
        this.renderizarTela()
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