import { MongoClient } from "mongodb";

export default async function handler(req: any, res: any) {
  if (req.method === "POST") {
    const { first, last, age, org, account } = req.body;

    const client = await MongoClient.connect(process.env.MONGODB_URI!);
    const db = client.db();

    const firstName =
      last != "" &&
      (await db.collection("users").updateOne(
        { email: account },
        {
          $set: { first: first },
          $currentDate: { lastModified: true },
        }
      ));

    const lastName =
      last != "" &&
      (await db.collection("users").updateOne(
        { email: account },
        {
          $set: { last: last },
          $currentDate: { lastModified: true },
        }
      ));

    const userAge =
      age != "" &&
      (await db.collection("users").updateOne(
        { email: account },
        {
          $set: { age: age },
          $currentDate: { lastModified: true },
        }
      ));

    const userOrg =
      age != "" &&
      (await db.collection("users").updateOne(
        { email: account },
        {
          $set: { org: org },
          $currentDate: { lastModified: true },
        }
      ));

    console.log(firstName);
    res.status(201).json({ message: "Field added!" });
  }
}
