const controllerEmployee = require('../controllers/employee.js');

module.exports = (app) => {

    // Create a new employee
    app.post('/add', controllerEmployee.create);
 
    // Retrieve all the employees
    app.get('/employees', controllerEmployee.findAllEmployees);

    // Retrieve a single employee with employeeId
    app.get('/employees/:employeeId', controllerEmployee.findOne);

    // Update a employee with employeeId
    app.put('/update/:employeeId', controllerEmployee.update);

    // Delete a employee with employeeId
    app.delete('/delete/:employeeId', controllerEmployee.delete);
}