import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://bjofel:<password>@shopkeep.tz9a4su.mongodb.net/?retryWrites=true&w=majority";
export async function connect(): Promise<MongoClient> {
    return await MongoClient.connect('mongodb://localhost:27017/');
}
