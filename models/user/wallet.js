const Sequelize = require('sequelize');

class Wallet extends Sequelize.Model{
  static initiate(sequelize) {
    Wallet.init({

    },
    {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'Wallet',
      tableName: 'walletTable',
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    })
  }
}