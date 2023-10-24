'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      models.Student.hasMany(models.User,{foreignKey:"firstName"});
      // models.Student.hasMany(models.User);
      models.Student.hasOne(models.department,{
        foreignKey:"id",
        sourceKey:"rollNO"
      })
    }
  }
  Student.init({
    name: DataTypes.STRING,
    class: DataTypes.STRING,
    rollNO: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Student',
  });
  return Student;
};