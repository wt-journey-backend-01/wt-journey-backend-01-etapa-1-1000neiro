const { urlencoded } = require("body-parser");
const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

let lastContact = null;

//Middleware
app.use(express.static(path.join(__dirname,"public")));
app.use(urlencoded({extended: true}));

// Rota GET Raiz
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views" , "index.html"));
});

//Rota GET Not Found
app.get("/not-found", (req, res) => {
   res.status(404).send("Página não encontrada"); 
});

//Rota POST Contato
app.post("/contato", (req, res) => {
    lastContact = req.body;
    res.redirect("/contato-recebido");
});

//Rota GET Contato
app.get("/contato-recebido", (req, res) => {
//Logica para contatos recebidos
    if(!lastContact){
    return res.redirect("/not-found");
   }
   const {name , email} = lastContact;
   res.send(`
        <h1>Contato recebido, muito obrigado, ${name}</h1>
        <p>Email : ${email}</p>
   `);
});

//Start do Servidor
app.listen(PORT, () => {
    console.log(`Servidor da DevBurger rodando em localhost:${PORT}`);
});
