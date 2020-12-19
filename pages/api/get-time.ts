import { NextApiRequest, NextApiResponse } from 'next'

export default (_: NextApiRequest, res: NextApiResponse) => {
    const datetime = new Date();
    res.status(200).json({ api: 'get-time', datetime });
}
