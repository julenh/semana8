var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();
app.use(express.static(path.join(__dirname, 'public')));

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// Middleware para el parseo de req.body
app.use(bodyParser.urlencoded( {extended: false}));
app.use(bodyParser.json());

var multer  = require('multer');

var storage = multer.diskStorage({

    // definir restricciones para que los ficheros subidos se guarden en la carpeta public/imgs/
	// tamaño máximo de los ficheros: 2MB
	// sólo se admiten ficheros jpg o png
    // el nombre del fichero que se guarda debe coincidir con el que se envíab

});

var upload = multer({ storage: storage });

var pedido = upload.array('fileselect');

app.post('/pedido/add', (req, res) => {
    pedido(req, res, (err) => {

    // en caso de error, devolver un objeto JSON
    // { sucess:false, error: err  }  

    // en caso de éxito, devolver un objeto JSON que contenga: success:true, la ruta a los ficheros
    // subidos y los valores recibidos en cada campo del formulario POST

    })
});


app.listen(3000, function() {
    console.log("Servidor lanzado en el puerto 3000");
});
