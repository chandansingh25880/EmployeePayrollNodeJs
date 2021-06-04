const employeeModel = require('../models/employee.js');
const { genSaltSync, hashSync } = require("bcrypt");
const bcrypt = require('bcrypt');
require("dotenv").config();

class UserService {

    create = (userData, callback) => {
        console.log("function is created")
        const salt = genSaltSync(10);
        userData.password = hashSync(userData.password, salt);
        employeeModel.create(userData, (error, data) => {
            return (error) ? callback(error, null) : callback(null, data);
        })
    }
   
    findAllEmployees = (callback) => {
        employeeModel.findAllEmployees((error, data) => {
            return (error) ? callback(error, null) : callback(null, data);
        });
    }

    findDataId = (employeObjectId, callback) => {
        employeeModel.findDataId(employeObjectId, (error, data) => {
            return (error) ? callback(error, null) : callback(null, data);
        });
    }

    
    deleteDataUsingId = (userDataId, callback) => {
        employeeModel.deleteDataUsingId(userDataId, error => {
            return (error) ? callback(error) : callback(null);
        });
    }

  
    updateByID = (userId, newUserData, callback) => {
        const salt = genSaltSync(10);
        newUserData.password = hashSync(newUserData.password, salt);
        employeeModel.updateById(userId, newUserData, (error, data) => {
            return (error) ? callback(error, null) : callback(null, data);
        })
    }
}
module.exports = new UserService();