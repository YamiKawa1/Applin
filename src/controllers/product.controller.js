import fs from 'fs';
import csv from 'csvtojson';
import {Orders} from '../models/Orders.js'


export const getProducts = async (req, res) => {
    try {
        const orders = await Orders.find();

        if (orders.length == 0) return res.status(204).json({data: null, message: 'There is nothing here, yet'});

        return res.status(200).json({data: orders, message: 'ok'});

    } catch (error) {
        console.log({ step: 'getProducts', error: error.message });
        return res.status(500).json({data: null, message: 'Internal Error'});
    }
}

// Si fueran archivos muy grandes me tomaria el tiempo de realizar un child porcess para manejar este trabajo fuera del flujo principal
export const saveFileData = async (req, res) => {
try {
    const fileReceived = req.files.file;
    
    // Verifico que el archivo sea de tipo csv
    const isCSV = req.files.file.name.match(/.{3}$/)[0].toLowerCase() == 'csv'

    if (!isCSV) return res.status(400).json({ data: null, message: 'Its not a csv file' });

    // Transforma el buffer de la informacion en un json
    const csvFile = await csv().fromString(fileReceived.data.toString());

    const idAlreadyInUse = []
    for ( const data of csvFile) {
        let product = await Orders.findOne({ id: data.id }).exec();

        if (product) { // existe el id en la DB

            // verifico que no este el sku en la base de datos
            if (product.skus.findIndex(element => element.name == data.sku) == -1) {
                let newSku = {
                    name: data.sku,
                    quantity: data.quantity
                };
                await Orders.updateOne({id: data.id}, { $push: { skus: newSku } });
            }

        } else { // no existe el id en la DB
            await Orders.create({
                id: data.id,
                skus: [{
                    name: data.sku,
                    quantity: data.quantity
                }]
            });
        }
    };

    return res.status(201).json({data: null, message: 'Information saved correctly'});

} catch (error) {
    console.log({ step: 'saveFileData', error: error.message });
    res.status(500).json({data: null, message: 'Internal Error'});
}
}

export const productView = (req, res) => {
    res.render('index')
}