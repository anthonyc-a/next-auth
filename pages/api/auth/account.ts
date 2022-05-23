import { MongoClient } from "mongodb";

export default async function handler(req: any, res: any) {
  if (req.method === "POST") {
    const { first, last, age, account } = req.body;

    const client = await MongoClient.connect(process.env.MONGODB_URI!);
    const db = client.db();

    const result =
      last != "" &&
      (await db.collection("users").updateOne(
        { email: account },
        {
          $set: { first: first },
          $currentDate: { lastModified: true },
        }
      ));

    const result1 =
      last != "" &&
      (await db.collection("users").updateOne(
        { email: account },
        {
          $set: { last: last },
          $currentDate: { lastModified: true },
        }
      ));

    const result2 =
      age != "" &&
      (await db.collection("users").updateOne(
        { email: account },
        {
          $set: { age: age },
          $currentDate: { lastModified: true },
        }
      ));

    console.log(result);
    res.status(201).json({ message: "Field added!" });
  }
}
