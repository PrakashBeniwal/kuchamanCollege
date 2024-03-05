'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class syllabus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      models.syllabus.belongsTo(models.course);

    }
  }
  syllabus.init({
    courseId: DataTypes.INTEGER,
    semesterI: DataTypes.TEXT,
    semesterII: DataTypes.TEXT,
    semesterIII: DataTypes.TEXT,
    semesterIV: DataTypes.TEXT,
    semesterV: DataTypes.TEXT,
    semesterVI: DataTypes.TEXT,
    semesterVII: DataTypes.TEXT,
    semesterVIII: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'syllabus',
  });
  return syllabus;
};