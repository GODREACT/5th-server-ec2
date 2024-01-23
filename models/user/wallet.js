// 유저 고유 지갑번호를 통해 보유하고 있는 코인의 정보 열람
const Sequelize = require('sequelize');

class Wallet extends Sequelize.Model{
  static initiate(sequelize) {
    Wallet.init({
      // 지갑 코드
      code: {
        type: Sequelize.STRING,
        allowNull: false,
        // primaryKey: true
      },
      // 코인 이름. code
      coin_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      // 코인 코드, fullcode
      fullcode: {
        type: Sequelize.STRING,
        allowNull: false
      },
      // 보유량
      volume: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      // 총 가격
      totalprice: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: new Date()
      }
    },
    {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'Wallet',
      tableName: 'walletTable',
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    })
  }
  static associate(db) {
    db.Wallet.belongsTo(db.User, {foreignKey: 'code', as:'wallet', sourceKey: 'wallet_code'});
  }
}

module.exports = Wallet;