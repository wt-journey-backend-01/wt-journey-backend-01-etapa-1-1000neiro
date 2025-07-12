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

//Rota GET Contato
app.get("/contato", (req, res) => {
    res.sendFile(path.join(__dirname,"views","contato.html"));

});
//Rota POST Contato
app.post("/contato", (req, res) => {
      const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.redirect("/not-found");
  }

  res.send(`
    <h1>Obrigado pelo contato, ${name}!</h1>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Assunto:</strong> ${subject}</p>
    <p><strong>Mensagem:</strong> ${message}</p>
    <a href="/">Voltar para o início</a>
  `);
});

app.get("/sugestao", (req, res) => {
  const { nome, ingredientes } = req.query;

  if (!nome || !ingredientes) {
    return res.redirect("/not-found");
  }

  const lista = ingredientes.split(/[ ,]+/);
  const listaHTML = lista.map(item => `<li>${item}</li>`).join("");

  res.send(`
    <h1>Sugestão recebida!</h1>
    <p>Nome: ${nome}</p>
    <p>Ingredientes:</p>
    <ul>${listaHTML}</ul>
    <a href="/">Voltar</a>
  `);
});




//Start do Servidor
app.listen(PORT, () => {
    console.log(`Servidor da DevBurger rodando em localhost:${PORT}`);
});
