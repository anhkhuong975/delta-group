import { MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { MONGODB_COLL, MONGODB_DB_NAME, MONGODB_URI } from '../../config/constain';

// Connection URL
const client = new MongoClient(MONGODB_URI);

interface Member {
    id: string | number;
    name: string;
    startDate: Date;
}

export default async (_: NextApiRequest, res: NextApiResponse) => {
    if (_.method === "POST") {
        await client.connect();
        console.log('Connected successfully to server');
        const db = client.db(MONGODB_DB_NAME);
        const collection = db.collection(MONGODB_COLL.cachlyMember);
        const insertResult = await collection.insertOne(_.body);
        client.close();
        res.status(200).json({message: insertResult});
    } else {
        // another api
    }
}
