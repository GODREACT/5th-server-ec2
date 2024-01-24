const Sequelize = require('sequelize');

class Stock_detail extends Sequelize.Model{
  static initiate(sequelize){
    Stock_detail.init({

      id: {
        comment:'아이디',
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      img_url: {
        comment:'이미지',
        type: Sequelize.STRING,
        allowNull: false
      },
      kor_name:{
        comment:'한글이름',
        type: Sequelize.STRING,
        allowNull: false
      },
      code:{
        comment:'코드',
        type: Sequelize.STRING,
        allowNull: false
      },
      eng_name:{
        comment:'영어이름',
        type: Sequelize.STRING,
        allowNull: false
      },
      website:{
        comment:'웹사이트',
        type: Sequelize.STRING,
        allowNull: false
      },
      block_inq:{
        comment:'블록조회',
        type: Sequelize.STRING,
        allowNull: false
      },
      orig_white:{
        comment:'원문백서',
        type: Sequelize.STRING,
        allowNull: false
      },
      kor_white:{
        comment:'국문백서',
        type: Sequelize.STRING,
        allowNull: true
      },
      first:{
        comment:'발행날짜',
        type: Sequelize.STRING,
        allowNull: false
      },
      total_limit:{
        comment:'발행한도',
        type: Sequelize.STRING,
        allowNull: true
      },
      intro_digital:{
        comment:'디지털자산소개',
        type: Sequelize.TEXT,
        allowNull: false
      },
      tech:{
        comment:'기술적 특징 데이터',
        type: Sequelize.TEXT,
        allowNull: false
      },
      current_future:{
        comment:'현재와 미래',
        type: Sequelize.TEXT,
        allowNull: false
      },
    },
    {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'fifth_project',
      tableName: 'stocktable',
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    })
  }
};

module.exports = Stock_detail;
