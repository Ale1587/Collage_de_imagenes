const express = require('express');
const app = express();
const expressFileUpload = require('express-fileupload')
const bodyParser = require('body-parser');
const fs = require('fs')



app.listen(3000, () => console.log('Server on'))

app.use(express.static(__dirname + '/assets/img'))

app.use( expressFileUpload({
    limits: { fileSize: 5000000},
    abortOnLimit: true,
    responseOnLimit: 'El peso del archivo que intentas subir supera el limite permitido'
})
);

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res) =>{
    res.sendFile(__dirname + '/formulario.html')
});

app.post('/imagen', (req, res) =>{
    const { target_file } = req.files;
    const { posicion } = req.body
    console.log(req.body);
    target_file.mv(`${__dirname}/assets/img/imagen-${posicion}.jpg`, (err) =>{
        res.redirect('http://localhost:3000/collage')
    })

})

app.get('/deleteImg/:nombre', (req, res) =>{
    const { nombre } = req.params;
    fs.unlink(`${__dirname}/assets/img/${nombre}`, (err) => {
        res.redirect('http://localhost:3000/collage')
    })
})

app.get('/collage', (req, res) =>{
    res.sendFile(__dirname + '/collage.html')
})


