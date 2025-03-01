/**
 * CRUD de Lanches com MongoDB
 */

// Importação do módulo de conexão (database.js)
const { conectar, desconectar } = require('./database')

// Importação do modelo de dados de lanches
const lancheModel = require('./src/models/Lanches')

// CRUD Create - Adicionar um novo lanche
const criarLanche = async (nomeLanche, descricao, preco) => {
    try {
        const novoLanche = new lancheModel({
            nomeLanche,
            descricao,
            preco
        })
        await novoLanche.save()
        console.log("Lanche adicionado com sucesso.")
    } catch (error) {
        console.log(error)
    }
}

// CRUD Read - Listar todos os lanches
const listarLanches = async () => {
    try {
        const lanches = await lancheModel.find().sort(
            {
                nomeLanche: 1
            }
        )
       console.log(lanches)
    } catch (error) {
        console.log(error)
    }
}

const atualizarLanches = async (id, nomeLanche, descricao, preco) => {
    try {
        const lanches = await clienteModel.findByIdAndUpdate(
            id,
            {
                nomeLanche: nomeLanche,
                descricao: descricao,
                preco: preco
            },
            {
                new: true,
                runValidators: true
            }
        )
        //validação (retorno do banco)
        if(!lanches) {
            console.log("Lanche não encontrado")
        } else {
            console.log("Lanche alterado com sucesso")
        }
    } catch (error) {
        console.log(error)
    }
}

const buscarLanche = async (lanches) => {
    try {
        const lanche = await lancheModel.find (
            {
                nomeLanche: new RegExp(lanches, 'i')
            }
        )
        const nomesLanches = lanche.map(lanche => lanche.nomeLanche)
        if (nomesLanches.length === 0) {
            console.log("Lanche nao cadastrado no cardapio")
        } else {
            const match = stringSimilarity.findBestMatch(lanche, nomesLanches)
          
            const melhorLanche = lanche.find(lanche => lanche.nomeLanche === match.bestmatch.target)

            const lancheFormatado = {
                nomeLanche: melhorLanche.nomeLanche,
                descricao: melhorLanche.descricao,
                preco: melhorLanche.preco
            }
            console.log(lancheFormatado)
        }    
    } catch (error) {
        console.log(error)
    }
}

// Execução da aplicação
const app = async () => {
    await conectar()

    // CRUD - Create
    //await criarLanche("Chicken", "Pão,frango, bacon, queijo e molho especial", 15.90)
    //await criarLanche("Quarteirão", "Pão, hambúrguer, queijo, alface, tomate e maionese", 13.50)
    //await criarLanche("X-Crispy", "Pão de brioche, hambúrguer, bacon, cebola Crispy e molho especial", 19.00)
    //await criarLanche("X-Bacon", "Pão de brioche, hambúrguer, bacon, alface, tomate e molho especial", 20.00)
    //await criarLanche("X-Calabresa", "Pão, hambúrguer, calabresa, alface, tomate e maionese", 18.00)
    //await criarLanche("X-Egg", "Pão, hambúrguer, queijo, 2 ovos e molho especial", 19.00)
    //await criarLanche("X-Salada", "Pão, hambúrguer, maionese especial, queijo, alface e tomate", 16.50)
    //await criarLanche("Melt", "Pão australiano, hambúrguer, maionese, queijo e molho cheddar", 18.00)
    //await criarLanche("Tasty", "Pão Brioche ,hambúrguer, cebola onion, tomate, alface e molho chipotle", 19.90)
    

    await buscarLanche("Tasty")

    


    // CRUD - Read
    //await listarLanches()
    //await atualizarLanches()
    await desconectar()
}

console.clear()
app()
