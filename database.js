/**
 * Módulo de conexão com o banco de dados
 * Uso de framework Mongoose
 */

// Importação do Mongoose
const mongoose = require('mongoose')

// Configuração do banco de dados
const url = 'mongodb+srv://joaollokaok4:123Senac@cluster02.czib3.mongodb.net/dblanches'

// Validação (evitar a abertura de várias conexões)
let conectado = false

// Método para conectar ao banco de dados
const conectar = async () => {
    if (!conectado) {
        try {
            await mongoose.connect(url) // Conectar sem opções desnecessárias
            conectado = true
            console.log("Cardapio Aberto")
        } catch (error) {
            console.error("Erro ao conectar ao MongoDB:", error)
        }
    }
}

// Método para desconectar do banco de dados
const desconectar = async () => {
    if (conectado) {
        try {
            await mongoose.disconnect()
            conectado = false
            console.log("Cardapio Fechado")
        } catch (error) {
            console.error("Erro ao desconectar do MongoDB:", error)
        }
    }
}

// Exportação dos métodos conectar e desconectar
module.exports = { conectar, desconectar }
