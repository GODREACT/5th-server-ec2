// 아이디 : 이메일 형식
// 비밀번호
// 어떤 로그인인지?
// 잔고

const Sequelize = require('sequelize');

class User extends Sequelize.Model{
  static initiate(sequelize) {
    User.init({
      // 사용자 고유 아이디
      id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true
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
      phone: {
        type: Sequelize.INTEGER,
      },
      point:{
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      snsId: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      provider: {
        type: Sequelize.STRING,
        allowNull: true,
      }
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