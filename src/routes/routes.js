const express = require('express');
const router = express.Router();

const Schema = require('../models/schema')

router.get('/', async (req, res) => {
    const schemas = await Schema.find();
    res.json(schemas)
});

router.get('/:id', async (req, res) => {
    const schemas = await Schema.findById(req.params.id);
    res.json(schemas)
});

router.post('/park-send', async(req, res) => {
    const datosEntrantes = new Schema(req.body);
    datosEntrantes['_id']=datosEntrantes['_id'].toString();
    await datosEntrantes.save();
    res.json({
        status: 'Datos Cuardado'
    });
});

 
router.put('/update/:id', async(req, res) => {
    await Schema.findByIdAndUpdate(req.params.id, req.body)
    res.json({status: 'Datos actualizados'});
});

router.delete('/delete/:id', async (req, res) => {
    await Schema.findByIdAndRemove(req.params.id);
    res.json({status: 'registro eliminado'});
});


module.exports = router;