const { urlencoded } = require("body-parser");
const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

//Middleware
app.use(express.static(path.join(__dirname,"public")));
app.use(urlencoded({extended: true}));

// Rota GET Raiz
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views" , "index.html"));
});


//Rota GET Sugestao
app.get("/sugestao", (req, res)=>{

})

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
    <h1>Contato recebido, muito obrigado, ${name}!</h1>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Assunto:</strong> ${subject}</p>
    <p><strong>Mensagem:</strong> ${message}</p>
    <a href="/">Voltar para o início</a>
  `);
});

//Rota GET Not Found
app.get("/not-found", (req, res) => {
   res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
});

//Rota Get API Lanches
  app.get("/api/lanches", (req, res) => {
       const lanches = [
           { id: 1, nome: "Hambúrguer", ingredientes: ["carne", "queijo", "pão"] },
           { id: 2, nome: "Batata Frita", ingredientes: ["batata", "sal", "óleo"] },
           { id: 3, nome: "Refrigerante", ingredientes: ["água", "açúcar", "gás"] }
       ];
       res.json(lanches);
     });

//Start do Servidor
app.listen(PORT, () => {
    console.log(`Servidor da DevBurger rodando em localhost:${PORT}`);
});
