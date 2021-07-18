import { ObjectId } from 'mongodb';
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
    if (_.method === "PUT") {
        await client.connect();
        console.log('Connected successfully to server');
        const db = client.db(MONGODB_DB_NAME);
        const collection = db.collection(MONGODB_COLL.cachlyMember);
        const body = _.body;
        if (!body || !body._id) {
            res.status(400).json({message: "request id"});
            return;
        }
        const updateResult = await collection.updateOne({_id: new ObjectId(body._id)}, {$set: {name: body.name, startDate: body.startDate}});
        client.close();
        res.status(200).json({message: updateResult});
    } else {
        // another api
    }
}

