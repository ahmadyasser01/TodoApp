// this script creates users and tasksimport { faker } from '@faker-js/faker';
import { MongoClient } from 'mongodb'
import { faker } from '@faker-js/faker';
import bcrypt from 'bcryptjs'


const url = 'mongodb://127.0.0.1:27017';


const client = new MongoClient(url);
// Database Name
const dbName = 'test';

async function hashPassword(password){
    return await bcrypt.hash(password,12);
 }
 async function createRandomUser() {
     const hashedPassword = await hashPassword("123456789")
     return {
         username: faker.internet.userName(),
         email:faker.internet.email(),
         password:hashedPassword ,
     }
 }
 
 async function createUsers(n) {
     const users = []
     for(let i=0;i<n;i++)
     {
         const user = await createRandomUser();
         users.push(user);
     }
       return users;
 }
function createRandomTask(id) {
    return {
        title: faker.lorem.word(),
        description:faker.lorem.paragraph(),
        owner:id
    }
}

function createTasks(n,id) {
    const tasks = []
    Array.from({ length: n }).forEach(() => {
        tasks.push(createRandomTask(id));
      });
      return tasks;
}


async function main() {

    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db('test');
    const collection = db.collection('tasks');
    const userCollection = db.collection('users');
    let users = await userCollection.find({}).limit(10).toArray();
    
    if(users.length === 0){
        console.log("No users found,, creating new users");
        users = await createUsers(10);
        await userCollection.insertMany(users);
    }
    for(let user of users)
    {   
        const tasks = createTasks(3,user._id);
        console.log(tasks);
        await collection.insertMany(tasks);
    }

    return 'done.';
  }
  
  main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());

