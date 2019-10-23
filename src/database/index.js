import Sequelize from 'sequelize';
import User from '../app/models/User';
import Student from '../app/models/Student';
import Plan from '../app/models/Plan';
import Subscription from '../app/models/Subscription';
import CheckIn from '../app/models/CheckIn';
import HelpOrder from '../app/models/HelpOrder';
import databaseConfig from '../config/database';

const models = [User, Student, Plan, Student, Subscription, CheckIn, HelpOrder];
// create class to handle connection and start connection
class Database {
  constructor() {
    this.init();
  }

  init() {
    // create connection with configuration
    this.connection = new Sequelize(databaseConfig);
    // assing connection to models and after execute associate methods
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
