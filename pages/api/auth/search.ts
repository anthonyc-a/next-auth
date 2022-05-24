import { MongoClient } from "mongodb";

export default async function handler(req: any, res: any) {
  if (req.method === "POST") {
    const { value } = req.body;

    const client = await MongoClient.connect(process.env.MONGODB_URI!);
    const db = client.db();

    const searchUsers = db.collection("users").find();

    if (!searchUsers) {
      res.status(201).json({ message: "User not found" });
    } else console.log(searchUsers);
    res.status(201).json({ message: "User found!" });
  }
}
