import { MongoClient } from 'mongodb';

const test = "mongodb+srv://test:" + "123" + "@shopkeep.tz9a4su.mongodb.net/?retryWrites=true&w=majority"


export async function connect(): Promise<MongoClient> {
    return await MongoClient.connect(test);
}
//'mongodb://localhost:27017/'