const Sequelize = require('sequelize');

class Customer_bug extends Sequelize.Model {
  static initiate(sequelize) {
    Customer_bug.init(
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        title: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        content: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        img_url: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn('NOW'),
        },
      },
      {
        sequelize,
        timestamps: false, // createdAt만 활성화, updatedAt 비활성화
        underscored: false,
        modelName: 'fifth_project',
        modelName: 'Bug',
        tableName: 'bugTable',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }
}

module.exports = Customer_bug;