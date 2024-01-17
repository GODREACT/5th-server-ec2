const Sequelize = require('sequelize');

class User extends Sequelize.Model{
  static initiate(sequelize) {
    User.init({
      id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      phone: {
        type: Sequelize.INTEGER,
      },
      point:{
        type: Sequelize.INTEGER,
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
  // 보내는 곳
  static associate(db) {
    db.User.hasMany(db.Htmlreview, {foreignKey: 'userid',sourceKey: 'id'});
    // db.User.hasMany(db.Review, {foreignKey: 'userid',sourceKey:'id'})
  }
};

module.exports = User;