import Sequelize, { Model } from 'sequelize';

class Plan extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        duration: Sequelize.DOUBLE,
        price: Sequelize.DOUBLE,
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

export default Plan;
