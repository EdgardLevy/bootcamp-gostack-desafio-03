import Sequelize from 'sequelize';
import User from '../app/models/User';
import Student from '../app/models/Student';
import Plan from '../app/models/Plan';
import databaseConfig from '../config/database';

const models = [User, Student, Plan];
// create class to handle connection and start connection
class Database {
  constructor() {
    this.init();
  }

  init() {
    // create connection with configuration
    this.connection = new Sequelize(databaseConfig);
    // assing connection to models
    models.map(model => model.init(this.connection));
  }
}

export default new Database();
