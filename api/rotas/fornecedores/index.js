const router = require("express").Router();
const TabelaFornecedor = require("./TabelaFornecedor");
const Fornecedor = require("./Fornecedor");
const SerializadorFornecedor = require("../../Serializador")
  .SerializadorFornecedor;

router.get("/", async (req, res) => {
  const resultados = await TabelaFornecedor.listar();
  const serializador = new SerializadorFornecedor(
    res.getHeader("Content-Type")
  );
  res.status(200).send(serializador.serializar(resultados));
});

router.post("/", async (req, res, next) => {
  try {
    const dadosRecebidos = req.body;
    const fornecedor = new Fornecedor(dadosRecebidos);
    const serializador = new SerializadorFornecedor(
      res.getHeader("Content-Type")
    );

    await fornecedor.criar();
    res.status(201).send(serializador.serializar(fornecedor));
  } catch (erro) {
    next(erro);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const fornecedor = new Fornecedor({ id: id });
    const serializador = new SerializadorFornecedor(
      res.getHeader("Content-Type"),
      ["email", "dataCriacao", "dataAtualizacao", "versao"]
    );

    await fornecedor.carregar(id);
    res.status(200).send(serializador.serializar(fornecedor));
  } catch (erro) {
    next(erro);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const dadosRecebidos = req.body;
    const dados = Object.assign({}, dadosRecebidos, { id: id });
    const fornecedor = new Fornecedor(dados);
    await fornecedor.atualizar();
    res.status(204).end();
  } catch (erro) {
    next(erro);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const fornecedor = new Fornecedor({ id: id });
    await fornecedor.remover();
    res.status(204).end();
  } catch (erro) {
    next(erro);
  }
});

module.exports = router;
