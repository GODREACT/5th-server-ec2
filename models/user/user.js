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
      // 사용자 이름 ( 닉네임 )
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
        allowNull: true
      },
      // 잔고, 가입 시 기본 투자금 1억 지급
      balance : {
        type: Sequelize.BIGINT,
        allowNull: false,
        defaultValue: 100000000
      },
      // 보유 지갑 번호
      wallet_code: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true
      },
      // 어떤 방법으로 회원가입 했는지 ( normal, google, kakao ... )
      method: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      // 신규 생성 날짜
      createdAt: {
        type:Sequelize.DATE,
        defaultValue: new Date()
      },
      // 업데이트 날짜 ( 비밀번호 변경, 닉네임 변경 등 )
      updatedAt: {
        type:Sequelize.DATE,
        defaultValue: new Date()
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
  static associate(db) {
    db.User.hasMany(db.Htmlreview, {foreignKey: 'userid',sourceKey: 'id'});
    db.User.hasMany(db.Wallet, {foreignKey: 'code', as:'wallet', sourceKey:'wallet_code'});
    // db.User.hasMany(db.Review, {foreignKey: 'userid',sourceKey:'id'})
  }
};

module.exports = User;