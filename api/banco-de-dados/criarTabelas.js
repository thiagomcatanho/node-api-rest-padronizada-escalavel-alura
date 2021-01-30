const ModeloTabela = require("../rotas/fornecedores/modeloTabelaFornecedor");

ModeloTabela.sync()
  .then(() => console.log("Tabela Criada com Sucesso"))
  .catch(console.log);
