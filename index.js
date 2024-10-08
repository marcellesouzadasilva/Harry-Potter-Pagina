const express = require('express');
const path = require('path');
const session = require('express-session');  // Importa sessões
const app = express();
const port = 3002;

// Configura o middleware de sessão
app.use(session({
  secret: 'hogwartsSecretKey', // chave secreta
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Apenas deixe 'secure' como true se estiver usando HTTPS
}));

// Servir arquivos estáticos da pasta atual
app.use(express.static(path.join(__dirname)));


// Middleware para parsear JSON
app.use(express.json());

// Simulação de banco de dados com um usuário
const users = [
  { email: 'harry.potter@hogwarts.com', password: '123Edwiges' },
  { email: 'hermione.granger@hogwarts.com', password: '123Bichento' },
  { email: 'ronald.weasley@hogwarts.com', password: '123Perebas' }
];

// Rota para servir a página de login HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

// Rota para processar o login
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(user => user.email === email && user.password === password);

  if (user) {
    // Armazena o email do usuário na sessão
    req.session.userEmail = email;
    res.redirect('/paginainicial');
  } else {
    res.status(401).json({ message: 'E-mail ou Senha Incorretos!' });
  }
});

// Rota para a página de sucesso
app.get('/paginainicial', (req, res) => {
  res.sendFile(path.join(__dirname, 'paginainicial.html'));
});

// Rota para obter o email do usuário logado
app.get('/getUserEmail', (req, res) => {
  if (req.session.userEmail) {
    res.json({ email: req.session.userEmail });
  } else {
    res.status(401).json({ message: 'Usuário não está logado' });
  }
});

// Rotas para as páginas de perfil
app.get('/harrypotter.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'harrypotter.html'));
});

app.get('/hermionegranger.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'hermionegranger.html'));
});

app.get('/ronyweasley.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'ronyweasley.html'));
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
