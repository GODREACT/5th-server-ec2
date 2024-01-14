const Sequelize = require('sequelize');

class User extends Sequelize.Model{
  static initiate(sequelize) {
    User.init({
      // 사용자 고유 아이디
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      // 사용자 이름 ( 본명 )
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      // 사용자 이메일 ( 로그인용 )
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      // 비밀번호
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      // 잔고, 가입 시 기본 투자금 1억 지급
      balance : {
        type: Sequelize.BIGINT,
        allowNull: false,
        defaultValue: 100000000
      },
      // 보유 코인
      coin: {
        type: Sequelize.JSON,
        allowNull: true,
      },
    },
    {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'User',
      tableName: 'userTable',
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    })
  }
};

module.exports = User;