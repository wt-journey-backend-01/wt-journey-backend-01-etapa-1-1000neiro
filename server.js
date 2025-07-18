const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

// Rota GET Raiz
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// Rota GET Sugestão
app.get("/sugestao", (req, res) => {
  const { nome, ingredientes } = req.query;
  if (!nome || !ingredientes) {
    return res.redirect("/not-found");
  }

  const listaIngredientes = ingredientes.split(/[ ,]+/);
  res.send(`
    <h1>Sugestão recebida!</h1>
    <p><strong>Nome:</strong> ${nome}</p>
    <p><strong>Ingredientes:</strong> ${listaIngredientes.join(", ")}</p>
    <a href="/">Voltar para a página inicial</a><br>
    <a href="/contato">Página de Contato</a>
  `);
});

// Rota GET Contato
app.get("/contato", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "contato.html"));
});

// Rota POST Contato
app.post("/contato", (req, res) => {
  const { nome, email, assunto, mensagem } = req.body;
  if (!nome || !email || !assunto || !mensagem) {
    return res.redirect("/not-found");
  }

  const queryParams = new URLSearchParams({ nome, email, assunto, mensagem }).toString();
  res.redirect(303, `/contato-recebido?${queryParams}`);
});

// Rota GET contato-recebido
app.get("/contato-recebido", (req, res) => {
  const { nome, email, assunto, mensagem } = req.query;
  res.send(`
    <!DOCTYPE html>
    <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
        <title>Contato recebido - DevBurger</title>
        <link rel="stylesheet" href="/css/style.css">
      </head>
      <body>
        <h1>Mensagem recebida!</h1>
        <p>Nome: ${nome}</p>
        <p>E-mail: ${email}</p>
        <p>Assunto: ${assunto}</p>
        <p>Mensagem: ${mensagem}</p>
        <a href="/">Voltar ao início</a>
      </body>
    </html>
  `);
});

// Rota GET API Lanches
app.get("/api/lanches", (req, res) => {
  const lanches = [
    {
      id: 1,
      nome: "DevBurger Clássico",
      ingredientes:
        "Pão brioche, Carne 150g, Queijo cheddar, Alface americana, Tomate fresco, Molho especial",
    },
    {
      id: 2,
      nome: "Burger de Bacon",
      ingredientes:
        "Pão australiano, Carne 180g, Queijo prato, Bacon crocante, Cebola caramelizada, Molho barbecue",
    },
    {
      id: 3,
      nome: "Commit Veggie",
      ingredientes:
        "Pão integral, Burger de grão de bico, Queijo vegano, Rúcula, Tomate seco, Maionese de ervas",
    },
  ];
  res.status(200).json(lanches);
});

// Rota GET Not Found
app.get("/not-found", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
});

// Middleware 404
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
});

// Start do Servidor
app.listen(PORT, () => {
  console.log(`Servidor da DevBurger rodando em http://localhost:${PORT}`);
});
