// html.js 제목,내용,작성자,작성날짜,이미지,조회수
const Sequelize = require('sequelize');

class Html extends Sequelize.Model{
  static initiate(sequelize) {
    Html.init({
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      content: {
        type: Sequelize.STRING,
        allowNull: false
      },
      author: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"), 
      },
      img_url: {
        type: Sequelize.STRING,
        allowNull: true 
      },
      views: {
        type:Sequelize.DataTypes.INTEGER(10),
        allowNull: false,
        defaultValue : 0
      },
    },
      
    {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'Html',
      tableName: 'HtmlTable',
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }
  // 보내는쪽
  static associate(db) {
    // 보낼곳(지금모델) 받을곳  지정할 이름 
    db.Html.hasMany(db.Htmlreview, {foreignKey: 'reviewid',sourceKey: 'id'});
    // db.User.hasMany(db.Review, {foreignKey: 'userid',sourceKey:'id'})
  }
};

module.exports = Html;