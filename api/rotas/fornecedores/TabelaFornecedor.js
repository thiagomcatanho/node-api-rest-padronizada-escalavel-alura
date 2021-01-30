const Modelo = require("./modeloTabelaFornecedor");
const NaoEncontrado = require("../../erros/NaoEncontrado");

module.exports = {
  listar() {
    return Modelo.findAll({
      raw: true,
    });
  },
  inserir(fornecedor) {
    return Modelo.create(fornecedor);
  },
  async pegarPorId(id) {
    const encontrado = await Modelo.findOne({
      where: {
        id: id,
      },
    });

    if (!encontrado) {
      throw new NaoEncontrado();
    }

    return encontrado;
  },
  atualizar(id, dadosParaAtualizar) {
    return Modelo.update(dadosParaAtualizar, {
      where: { id: id },
    });
  },
  deletar(id) {
    return Modelo.destroy({
      where: { id: id },
    });
  },
};
