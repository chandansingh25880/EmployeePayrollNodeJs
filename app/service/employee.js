const employeeModel = require('../models/employee.js');
const { genSaltSync, hashSync } = require("bcrypt");
const bcrypt = require('bcrypt');
require("dotenv").config();
const helper = require('../middleware/helper.js');

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

     /**
   * @description checkLogindetails used to validate the username and password
   * @param loginData having emailId and password
   * @return callback is used to callback the controller with JsonWebToken or error message
   */
      checkLoginDetails = (credentials, callback) => {
        employeeModel.checkLoginDetails(credentials, (error, data) => {
            if (error) {
                return callback(error, null);
            }
            else if (helper.checkPassword(credentials.password,data.password)) {              
                    let token = helper.generateToken(data.emailId, "5m");
                    return (!token) ? callback("Something wrong while we generating JWT", null) : callback(null, token)                             
            }
            return callback("Invalid Credentials", null);
        });
    }
}

module.exports = new UserService();