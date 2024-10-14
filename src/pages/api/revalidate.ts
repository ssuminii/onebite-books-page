import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await res.revalidate('/')
    return res.json({revalidate: true})
  } catch {
    res.status(500).send("Revalidation Faild")
  }
}