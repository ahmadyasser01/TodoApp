import { faker } from '@faker-js/faker';
import { MongoClient } from 'mongodb'

const url = 'mongodb://127.0.0.1:27017';


const client = new MongoClient(url);
// Database Name
const dbName = 'test';

function createRandomUser() {
    return {
        username: faker.internet.userName(),
        email:faker.internet.email(),
        password: faker.internet.password(),
    }
}

function createUsers(n) {
    const users = []
    Array.from({ length: 10 }).forEach(() => {
        users.push(createRandomUser());
      });
      return users;
}

async function main() {

    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db('test');
    const collection = db.collection('users');
    // await collection.drop();
    const users = createUsers(10);
    console.log(users);

    await collection.insertMany(users);
    return 'done.';
  }
  
  main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());

