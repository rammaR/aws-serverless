'use strict';

//Bibliotecas para trabalhar com AWS
const {v4} = require("uuid")
const AWS = require("aws-sdk")

//Função que recebe uma requisição e salva um novo item no DynamoDB
const insertItem = async(event) => {
    //Parsear a resposta q vem em JSON
    const {item} = JSON.parse(event.body);
    
    //Criação do novo registro
    const createAt = new Date().toISOString();
    const id = v4();
    const dynamoDB = new AWS.DynamoDB.DocumentClient();
    const newItem = {
        id,
        item,
        createAt,
        itemStatus: false
    }
    //

    //Função para inserir no banco de dados
    await dynamoDB.put(
        {
            TableName: "ItemTableNew",
            Item: newItem
        }
    )

    //Retorna código de sucesso e o novo item como resposta
    return {
        statusCode: 200,
        body: JSON.stringify(newItem)
    }
}

//Exporta a função
module.exports = {
    handler:insertItem
}