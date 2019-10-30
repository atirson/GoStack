import Sequelize from 'sequelize';

import Admin from '../app/models/Admin';
import Student from '../app/models/Student';
import Plan from '../app/models/Plan';

import databaseConfig from '../config/database';

const models = [Admin, Student, Plan];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection));
  }
}

export default new Database();
