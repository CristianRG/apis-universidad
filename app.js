import express from 'express'
import bodyParser from 'body-parser'
import { calcularCURP } from './util/curp.js';

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json({status:200, message: 'OK'})
})

app.post('/api/curp', (req, res) => {
    const data = req.body
    const curp = calcularCURP(data.app, data.apm, data.nombre, new Date(data.fechaN), data.sexo, data.lugarN)
    res.json({status:200, message: 'OK', CURP: curp})
})

app.get('/example/', (req, res) => {
    fetch('http://localhost:3000/api/curp', {
        method: 'POST',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify({"message":"example"})})
    .then(response => response.json())
    .then(response => {console.log(response)})
    res.json({status:200, message: 'All right'})
})


app.listen(3000, ()=> {
    console.log('listening on port 3000')
})