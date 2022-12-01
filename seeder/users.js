import { faker } from '@faker-js/faker';
import { MongoClient } from 'mongodb'
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

async function main() {

    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db('test');
    const collection = db.collection('users');
    await collection.drop();
    const users = await createUsers(10);
    console.log(users);

    await collection.insertMany(users);
    return 'done.';
  }
  
  main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());

