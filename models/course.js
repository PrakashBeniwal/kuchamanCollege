'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.course.hasOne(models.syllabus)
    }
  }
  course.init({
    name: DataTypes.STRING,
    level: {
      type: DataTypes.ENUM('U.G', 'P.G'),
      defaultValue: 'U.G'
    },
    duration: DataTypes.INTEGER,
    type: {
      type: DataTypes.ENUM('Semester', 'Annual'),
      defaultValue: 'Annual'
    },
    admissionProcess: DataTypes.STRING,
    modeOfAdmission: DataTypes.STRING,
    medium: {
      type: DataTypes.ENUM('English', 'Hindi' ,'English/Hindi'),
      defaultValue: 'English/Hindi'
    },
    regFee: DataTypes.INTEGER,
    fee: DataTypes.INTEGER,
    boysFund: DataTypes.INTEGER,
    totalFee: DataTypes.INTEGER,
    DepartmentId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'course',
  });
  return course;
};