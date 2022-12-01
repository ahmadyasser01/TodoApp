import { faker } from '@faker-js/faker';
import { MongoClient } from 'mongodb'

const url = 'mongodb://127.0.0.1:27017';


const client = new MongoClient(url);
// Database Name
const dbName = 'test';

function createRandomTask() {
    return {
        title: faker.internet.userName(),
        description:faker.internet.email(),
    }
}

function createTasks(n) {
    const tasks = []
    Array.from({ length: n }).forEach(() => {
        tasks.push(createRandomTask());
      });
      return tasks;
}

async function main() {

    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db('test');
    const collection = db.collection('tasks');
    // await collection.drop();
    const tasks = createUsers(10);

    await collection.insertMany(tasks);
    return 'done.';
  }
  
  main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());

