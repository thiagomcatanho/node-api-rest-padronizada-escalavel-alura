const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const config = require("config");

const router = require("./rotas/fornecedores");

const NaoEncontrado = require("./erros/NaoEncontrado");
const CampoInvalido = require("./erros/CampoInvalido");
const DadosNaoFornecidos = require("./erros/DadosNaoFornecidos");
const ValorNaoSuportado = require("./erros/ValorNaoSuportado");
const FormatosAceitos = require("./Serializador").formatosAceitos;
const SerializadorErro = require("./Serializador").SerializadorErro;

app.use(bodyParser.json());

app.use((req, res, next) => {
  let formatoRequisitado = req.header("Accept");

  if (formatoRequisitado === "*/*") {
    formatoRequisitado = "application/json";
  }

  if (FormatosAceitos.indexOf(formatoRequisitado) === -1) {
    res.status(406).end();
    return;
  }

  res.setHeader("Content-Type", formatoRequisitado);
  next();
});

app.use("/api/fornecedores", router);

app.use((erro, req, res, next) => {
  let status = 500;

  if (erro instanceof NaoEncontrado) {
    status = 404;
  }

  if (erro instanceof CampoInvalido || erro instanceof DadosNaoFornecidos) {
    status = 400;
  }

  if (erro instanceof ValorNaoSuportado) {
    status = 406;
  }

  const serializador = new SerializadorErro(res.getHeader("Content-Type"));
  
  res.status(status).send(
    serializador.serializar({
      mensagem: erro.message,
      id: erro.idErro,
    })
  );
});

app.listen(config.get("api.porta"), () =>
  console.log("A API está Funcionando !!")
);
