require("dotenv").config();

const bodyParser = require("body-parser");

const express = require('express');

const app = express();

const path = require("path");

const db = require("./modules/db.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.json())
app.use(express.static(path.join(__dirname, "./public")));

app.get('/', async (req, res) => {

    res.render("home", {
        req: req,
        title: 'URL Shortener'
    })

})

app.get('/:url', async(req, res) => {
    let shortened = req.params.url; // pega o parametro url -> link encurtado

    shortened = await db.checkURL(shortened); // checa o link encurtado.

    if(shortened.valid !== true) return res.redirect('/'); // caso o link encurtado não seja valido redireciona para a página inicial do site.

    res.redirect(shortened.url); // caso seja válido redireciona para o link desejado.

})

app.post('/api/v1/short', async (req, res) => {

    if(req.body.url == null) return res.sendStatus(400); // checa se o link foi enviado no body. (caso não seja retorna status 400)

    let link = req.body.url;

    if(!link.startsWith("https://") && !link.startsWith("http://")) return res.sendStatus(400); // checa se o link a ser encurtado é um url válido. (caso não seja retorna status 400)

    let shorted = await db.shortURL(link); // encurta o url

    res.status(200).send(`{"url": "${shorted}"}`); // retorna status 200 & o link encurtado.

})

port = process.env.PORT || 3000

console.log(`-------------------------------------------------------------`);
app.listen(port, () => console.log(`Listening on port ${port}...`))
db.initialize();