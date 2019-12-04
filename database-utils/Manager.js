const mongoCollections = require('./mongoCollections');
const manager = mongoCollections.manager;
const emp = mongoCollections.employee;
const transaction = mongoCollections.transaction;
const employee = require("./employee");

const ObjectId = require('mongodb').ObjectID;

const exportedMethods = {

    async getManagerById(id) {
        if (!id) throw "You must provide an id to search for";
        if (id.length == 0) throw "Please provide proper length of the id";
        if (typeof id === 'undefined' || id == null) throw "Please provide proper type of id"
        const managerCollection = await manager();
        const empCollection = await emp();

        const managerdata = await managerCollection.findOne({ _id: ObjectId(id) });
        if (managerdata === null || managerdata == undefined) throw "No Manager found of following id";

        var empName = managerdata.employees.length;
        x = 0;
        while(x<empName)
        {
        authID = managerdata.employees[x].id;
        const empo = await empCollection.findOne({_id: ObjectId(authID)});
        const val = {id : authID, name : empo.firstName};
        managerdata.employees[x] = val;
        x++;
        }
        return managerdata;

    },

    async getManagerByName(name) {
        if (!name) throw "You must provide an id to search for";
        if (name.length == 0) throw "Please provide proper length of the id";
        if (typeof name === 'undefined' || name == null  || typeof name !== "string") throw "Please provide proper type of name"

        const managerCollection = await manager();
        const empCollection = await emp();
        const managerdata = await managerCollection.findOne({ firstName: name });
        if (managerdata === null || managerdata == undefined) throw "No Manager found of following id";
        var empName = managerdata.employees.length;
        x = 0;
        while(x<empName)
        {
        authID = managerdata.employees[x].id;
        const empo = await empCollection.findOne({_id: ObjectId(authID)});
        const val = {id : authID, name : empo.firstName};
        managerdata.employees[x] = val;
        x++;
        }
        return ( managerdata);

    },

    async addManager(firstName, lastName, email, budget, user_login_id, hashed_password) {

        if (!firstName ||!lastName ||!email ||!budget ||!user_login_id ||!hashed_password) throw 'Missing Entries';

        var mailformat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (typeof firstName !== 'string') throw 'No title provided';
        if (typeof lastName !== 'string') throw 'I aint got nobody!1';
        if (mailformat.test(email) == false) throw 'Please provide proper  mailid';
        if (isNaN(budget) || budget <= 0) throw 'Entry Valid value for budget';
        if (typeof user_login_id !== 'string') throw 'I aint got nobody!4';
        if (typeof hashed_password !== 'string') throw 'I aint  nobody!5';

        const managerCollection = await manager();

        const newManager = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            budget: budget,
            user_login_id: user_login_id,
            hashed_password: hashed_password,
            employees: []
        };

        const newInsertInformation = await managerCollection.insertOne(newManager);
        const newId = newInsertInformation.insertedId;

        const newManagerDetails = await this.getManagerById(newId);
        return newManagerDetails;
    },

    async addEmptoManager(manager_name, empId, empName, total_salary, paidFlag) {

        if (!manager_name || typeof manager_name!== "string" || manager_name === undefined || manager_name=== null) throw 'Invalid Entry1';
      
        if (!empId || empId === undefined || empId=== null) throw 'Invalid Entry2';
      
        if (!empName || typeof empName!== "string" || empName === undefined || empName=== null) throw 'Invalid Entry3';
        if (!total_salary || typeof total_salary!== "number" || total_salary === undefined || total_salary=== null) throw 'Invalid Entry4';
        if (!paidFlag || typeof paidFlag!== "string" || paidFlag === undefined || paidFlag=== null) throw 'Invalid Entry5';

          let currentUser = await this.getManagerByName(manager_name);
          console.log(currentUser);
      
          const managerCollection = await manager();
          const updateInfo = await managerCollection.updateOne(
            {firstName: manager_name},
            {$addToSet: {employees: {id: empId, Name: empName, total_salary: total_salary, paidFlag: paidFlag}}}
          );
      
          if (!updateInfo.matchedCount && !updateInfo.modifiedCount) throw 'Update failed';
      
          return ("added to manager");
        },

    async renameManager(id, firstName, lastName) {
        if (!id) throw "You must provide an id to search for";
        // if (!id.match("/^[0-9a-fA-f]{24}$")) throw "Please provide proper 12 bytes length of the id";
        if (id.length === 0) throw "Please provide proper legth of the id";
        if (typeof id !== 'string') throw "Please provide proper id"
        if (typeof id === 'undefined') throw "Please provide proper type of id"
        const renamecontent = await this.getManagerById(id.toString());
        const postCollection = await manager();
        const updatedData = {
            firstName: firstName,
            lastName: lastName,
            email: renamecontent.email,
            office: renamecontent.office,
            budget: renamecontent.budget,
            user_login_id: renamecontent.user_login_id,
            hashed_password: renamecontent.hashed_password,
            employees: renamecontent.employees
        };
        const updatedInfo = await postCollection.replaceOne({ _id: ObjectId(id) }, updatedData);
        if (updatedInfo.modifiedCount === 0) {
            throw "could not update dog successfully";
        }

        const upID = updatedInfo.updatedID;
        const updatedDat = await this.getManagerById(id.toString());
        return updatedDat;
    },

    async removeManager(id) {
        if (!id) throw "You must provide an id to search for";
        // if (!id.match("/^[0-9a-fA-f]{24}$")) throw "Please provide proper 12 bytes length of the id";
        if (id.length === 0) throw "Please provide proper legth of the id";
        if (typeof id !== 'string') throw "Please provide proper id"
        if (typeof id === 'undefined') throw "Please provide proper type of id"
        const removecontent = await this.getManagerById(id.toString());
        const managerCollection = await manager();

        const deletionInfo = await managerCollection.deleteOne({ _id: ObjectId(id) });

        if (deletionInfo.deletedCount === 0) {
            throw `Could not delete manager with id of ${id}`;
        }
        return removecontent
    },

    async isPaid(empId)
    {
        if (!empId || empId === undefined || empId=== null) throw 'Invalid Entry';
        const employeeCollection = await emp();
        const managerCollection = await manager();
        const updated = await employee.getEmployeeById(empId.toString());

        const updatedPay = {
            firstName: updated.firstName,
            lastName: updated.lastName,
            email: updated.email,
            total_hours: 0,
            basic_salary: updated.basic_salary,
            total_salary: 0,
            paidFlag: "SALARY PAID",
            manager_name: updated.manager_name,
            payDate: updated.payDate,
            job_title: updated.job_title,
            user_login_id: updated.user_login_id,
            hashed_password: updated.hashed_password
        };
        const updatedInfo = await employeeCollection.replaceOne({ _id: ObjectId(empId) }, updatedPay);
        if (updatedInfo.modifiedCount === 0) {
            throw "could not update dog successfully";
        }

        //adding transaction
        const transactionCollection = await transaction();

        const newTransaction = {
            by: updated.manager_name,
            byPosition: "Manager",
            to: updated.firstName,
            toPosition: "Employee",
            typeOfTransaction: "Paying Salary",
            amount: updated.total_salary,
            hours: "not required"
        };

        const newTransactionInformation = await transactionCollection.insertOne(newTransaction);
        
        //adding transaction


        const search = await managerCollection.findOne({ firstName: updated.manager_name });
        if (search === null) throw 'cannnnnnnooot be null. dungoofed'

        let i = 0;
        for (i; i < search.employees.length; i++) {
            if (search.employees[i].id.toString() == updated._id.toString()) {
                search.employees[i].Name = updated.firstName;
                search.employees[i].total_salary = 0
                search.employees[i].paidFlag = "SALARY PAID"
            }
        }

        const something = await managerCollection.updateOne({ firstName: updated.manager_name }, { $set: { employees: search.employees } })
        return employee.getEmployeeById(updated._id);;

    }



};

module.exports = exportedMethods;