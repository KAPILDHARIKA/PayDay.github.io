const manager = require("./database-utils/manager");
const emp = require("./database-utils/employee");
//const tran = require("./database-utils/Transaction")

const connection = require('./database-utils/mongoConnection');

async function main() {

    //------------------------------------------------MANAGER----------------------------------------------------------------


    // try {
    //     var pxp = await manager.addManager("Parth", "Parab", "parthsai@gmail.com", 1000, "lemon123", "123");
    //     console.log(pxp);
    // } catch (e) {
    //     console.log("Error occured: ")
    //     console.log(e);

    // }

    // try {
    //     var ngt = await manager.addManager("Neil", "Gupte", "neilgupte@gmail.com", 1000, "ngt", "123");
    //     console.log(ngt);
    // } catch (e) {
    //     console.log("Error occured: ")
    //     console.log(e);

    // }

    // try {
    //     var dkp = await manager.addManager("Dharika", "Kapil", "dharikakapil@gmail.com", 1000, "dkp", "123");
    //     console.log(dkp);
    // } catch (e) {
    //     console.log("Error occured: ")
    //     console.log(e);

    // }




    //-------------------------------------------------EMPLOYEE--------------------------------------------------------------------



    // try {
    //     var manas = await emp.addEmployee("Manas", "Kulkarni", "manasmsk", "msk@gmail.com", 1, 5, "lemon123", "12/9/2019", "Assistant");
    //     console.log(manas);
    // } catch (e) {
    //     console.log("Error occured: ")
    //     console.log(e);

    // }

    // try {
    //     var manas = await emp.addEmployee("Dharika", "kapil", "dharikaka", "dha@gmail.com", 2, 6, "lemon123", "13/7/2019", "Developer");
    //     console.log(manas);
    // } catch (e) {
    //     console.log("Error occured: ")
    //     console.log(e);

    // }

    // try {
    //     var manas = await emp.addEmployee("Malvika", "Sharma", "malvikasha", "malsha@gmail.com", 3, 7, "lemon123", "18/9/2019", "Tester");
    //     console.log(manas);
    // } catch (e) {
    //     console.log("Error occured: ")
    //     console.log(e);

    // }


    // try {
    //     var prathamesh = await emp.addEmployee("Prathamesh", "Shelke", "prathu", "psh@gmail.com", 1, 5, "ngt", "10/20/2019", "Sales");
    //     console.log(prathamesh);
    // } catch (e) {
    //     console.log("Error occured: ")
    //     console.log(e);

    // }

    // try {
    //     var prathamesh = await emp.addEmployee("Piyush", "Shah", "piyush", "psh@gmail.com", 2, 7, "ngt", "01/04/2019", "Finance");
    //     console.log(prathamesh);
    // } catch (e) {
    //     console.log("Error occured: ")
    //     console.log(e);

    // }

    // try {
    //     var prathamesh = await emp.addEmployee("Kriti", "Malhotra", "krimal", "kam@gmail.com", 4, 9, "ngt", "06/05/2019", "Sales");
    //     console.log(prathamesh);
    // } catch (e) {
    //     console.log("Error occured: ")
    //     console.log(e);

    // }



    // try {
    //     var sagar = await emp.addEmployee("Sagar", "tanna", "sagarst", "sgt@gmail.com", 1, 5, "dkp", "12/12/2019", "Executive");
    //     console.log(sagar);
    // } catch (e) {
    //     console.log("Error occured: ")
    //     console.log(e);

    // }

    // try {
    //     var sagar = await emp.addEmployee("Aman", "patil", "amap", "amn@gmail.com", 1, 7, "dkp", "03/06/2019", "Sales");
    //     console.log(sagar);
    // } catch (e) {
    //     console.log("Error occured: ")
    //     console.log(e);

    // }

    // try {
    //     var sagar = await emp.addEmployee("Smriti", "Sing", "simng", "sim@gmail.com", 6, 5, "dkp", "10/11/2019", "Assistant");
    //     console.log(sagar);
    // } catch (e) {
    //     console.log("Error occured: ")
    //     console.log(e);

    // }


    const db = await connection();
    await db.serverConfig.close();


}

main();