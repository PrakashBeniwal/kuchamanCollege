'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class college extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  college.init({
    name: DataTypes.STRING,
    university: DataTypes.STRING,
    collegeLogo: DataTypes.STRING,
    universityLogo: DataTypes.STRING,
    photo: DataTypes.STRING,
    simityPhoto: DataTypes.STRING,
    about: DataTypes.TEXT,
    phone: DataTypes.INTEGER,
    email: DataTypes.STRING,
    city: DataTypes.STRING,
    district: DataTypes.STRING,
    state: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'college',
  });
  return college;
};