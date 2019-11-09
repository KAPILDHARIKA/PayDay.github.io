const dbConnection = require('./mongoConnection');
const data = require('./Employee.js');
//const employee = data.employee;HHH


async function main() {
    const db = await dbConnection();

    // await db.dropDatabase();

    const phil = await data.addEmployee('Zack', 'Barresi', "zack@gmail.com", 45, "millenium", 1000, "parth parab", "2019-10-1", "Software developer", "5512639010", "Zack123", "Zackishell");
    const id = phil._id;

    // await posts.addPost('Hello, class!', 'Today we are creating a blog!', [], id);

    // await posts.addPost(
    //     'Using the seed',
    //     'We use the seed to have some initial data so we can just focus on servers this week', [],
    //     id
    // );
    // await posts.addPost('Using routes', 'The purpose of today is to simply look at some GET routes', [], id);

    console.log('Done seeding database');
    await db.serverConfig.close();
}

main().catch((error) => {
    console.error(error);
    return dbConnection().then((db) => {
        return db.serverConfig.close();
    });
});