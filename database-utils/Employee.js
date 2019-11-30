const mongoCollections = require('./mongoCollections');
const employee = mongoCollections.employee;
const ObjectId = require('mongodb').ObjectId
const manager = require("./manager");


const exportedMethods = {

    async getEmployeeById(id) {
        if (!id) throw "You must provide an id to search for";
        if (id.length == 0) throw "Please provide proper length of the id";
        if (typeof id === 'undefined' || id == null) throw "Please provide proper type of id"

        const employeeCollection = await employee();
        const empdata = await employeeCollection.findOne({ _id: ObjectId(id) });
        if (empdata === null || empdata == undefined) throw "No Manager found of following id";

        return empdata;

    },

    async addEmployee(firstName, lastName, email, total_hours, basic_salary, manager_name, payDate, job_title, user_login_id, hashed_password) {
        var mailformat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if ((!firstName) || (!lastName) || (!email) || (!total_hours) || (!basic_salary) || (!manager_name) || (!payDate) || (!job_title) || (!user_login_id) || (!hashed_password)) throw 'Please provide all the feilds'
        if (typeof firstName !== 'string') throw 'No title provided';
        if (typeof lastName !== 'string') throw 'I aint got nobody!';
        if (mailformat.test(email) == false) throw 'Please provide proper  mailid';
        if (typeof email !== 'string') throw 'I aint got nobody!';
        if (isNaN(total_hours)) throw 'I aint got nobody!';
        if (isNaN(basic_salary)) throw 'I aint got nobody!';
        if (typeof manager_name !== 'string') throw 'I aint got nobody!';
        if (typeof payDate !== "string") throw 'I aint got nobody!';
        if (typeof job_title !== 'string') throw 'I aint got nobody!';
        if (typeof user_login_id !== 'string') throw 'I aint got nobody!'
        if (typeof hashed_password !== 'string') throw 'I aint got nobody!';
        const employeeCollection = await employee();

        // const userThatPosted = await users.getUserById(posterId);

        const newEmployee = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            total_hours: total_hours,
            basic_salary: basic_salary,
            total_salary: total_hours * basic_salary,
            paidFlag: "Not Paid",
            manager_name: manager_name,
            payDate: payDate,
            job_title: job_title,
            user_login_id: user_login_id,
            hashed_password: hashed_password
        };

        const newInsertInformation = await employeeCollection.insertOne(newEmployee);
        const newId = newInsertInformation.insertedId;

        await manager.addEmptoManager(manager_name, newId, firstName, newEmployee.total_salary, newEmployee.paidFlag);


        const newEmployeeDetails = await this.getEmployeeById(newId);
        return newEmployeeDetails;
            //return await this.getPostById(newId);
    },

    async removeEmployee(id) {
        if (!id) throw "You must provide an id to search for";
        // if (!id.match("/^[0-9a-fA-f]{24}$")) throw "Please provide proper 12 bytes length of the id";
        if (id.length === 0) throw "Please provide proper legth of the id";
        if (typeof id !== 'string') throw "Please provide proper id"
        if (typeof id === 'undefined') throw "Please provide proper type of id"
        const removecontent = await this.getEmployeeById(id.toString());
        const employeeCollection = await employee();

        const deletionInfo = await employeeCollection.deleteOne({ _id: ObjectId(id) });

        if (deletionInfo.deletedCount === 0) {
            throw `Could not delete employee with id of ${id}`;
        }

        return removecontent

    },

    async renameEmployee(id, firstName, lastName) {
        if (!id) throw "You must provide an id to search for";
        // if (!id.match("/^[0-9a-fA-f]{24}$")) throw "Please provide proper 12 bytes length of the id";
        if (id.length === 0) throw "Please provide proper legth of the id";
        if (typeof id !== 'string') throw "Please provide proper id"
        if (typeof id === 'undefined') throw "Please provide proper type of id"
        const renamecontent = await this.getEmployeeById(id.toString());
        const employeeCollection = await employee();
        const updatedData = {
            firstName: firstName,
            lastName: lastName,
            email: renamecontent.email,
            total_hours: renamecontent.total_hours,
            office: renamecontent.office,
            basic_salary: renamecontent.basic_salary,
            manager_name: renamecontent.manager_name,
            payDate: renamecontent.payDate,
            job_title: renamecontent.job_title,
            user_login_id: renamecontent.user_login_id,
            hashed_password: renamecontent.hashed_password
        };
        const updatedInfo = await employeeCollection.replaceOne({ _id: ObjectId(id) }, updatedData);
        if (updatedInfo.modifiedCount === 0) {
            throw "could not update dog successfully";
        }

        const upID = updatedInfo.updatedID;
        const updatedDat = await this.getEmployeeById(id.toString());
        return updatedDat;

    },

    async updateHours(id, total_hour_new) {
        console.log(typeof id)
        if (!id) throw "You must provide an id to search for";
        // if (!id.match("/^[0-9a-fA-f]{24}$")) throw "Please provide proper 12 bytes length of the id";
        if (id.length === 0) throw "Please provide proper legth of the id";
        if (typeof id !== 'string') throw "Please provide proper id"
        if (typeof id === 'undefined') throw "Please provide proper type of id"
        const updated = await this.getEmployeeById(id.toString());
        console.log(typeof updated._id)
        const employeeCollection = await employee();
        const updatedHours = {
            firstName: updated.firstName,
            lastName: updated.lastName,
            email: updated.email,
            total_hours: updated.total_hours + total_hour_new,
            basic_salary: updated.basic_salary,
            total_salary: updated.basic_salary * (updated.total_hours + total_hour_new),
            paidFlag: updated.paidFlag,
            manager_name: updated.manager_name,
            payDate: updated.payDate,
            job_title: updated.job_title,
            user_login_id: updated.user_login_id,
            hashed_password: updated.hashed_password
        };
        const updatedInfo = await employeeCollection.replaceOne({ _id: ObjectId(id) }, updatedHours);
        if (updatedInfo.modifiedCount === 0) {
            throw "could not update dog successfully";
        }

        const managerCollection = await manager();
        const search = await managerCollection.findOne({ firstName: updated.manager_name });
        if (search === null) throw 'cannnnnnnooot be null. dungoofed'



        const updatedData = await this.getEmployeeById(id.toString());
        return updatedData;
    },

};

module.exports = exportedMethods;