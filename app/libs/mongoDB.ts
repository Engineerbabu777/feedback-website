
import { MongoClient } from "mongodb";


const uri = "mongodb+srv://awaismumtaz0099:awaismumtaz0099@cluster0.m2xnkcb.mongodb.net/";
const options = {};

let client;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {

    let globalWithMongo = global as typeof globalThis & {
        _mongoClientPromise: Promise<MongoClient>
    }
    if (!globalWithMongo._mongoClientPromise) {
        client = new MongoClient(uri)
        globalWithMongo._mongoClientPromise = client.connect()
    }
    clientPromise = globalWithMongo._mongoClientPromise
} else {

    // In production mode, it's best to not use a global variable.
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
}

export default clientPromise;