import { MongoClient } from "mongodb";
import { hashPassword } from "../../../lib/auth/auth";

export default async function handler(req: any, res: any) {
  if (req.method === "POST") {
    const { username, email, password } = req.body;
    if (
      !email ||
      !email.includes("@") ||
      !password ||
      !(password.trim().length > 7)
    ) {
      res.status(422).json({ message: "Password too weak" });
      return;
    }

    const client = await MongoClient.connect(process.env.MONGODB_URI!);
    const db = client.db();

    const existingEmail = await db
      .collection("users")
      .findOne({ email: email });

    if (existingEmail) {
      res.status(422).json({ message: "That email address is taken." });
      return;
    }

    const hashedPassword = await hashPassword(password);

    const result = await db.collection("users").insertOne({
      username: username,
      email: email,
      password: hashedPassword,
    });

    console.log(result);
    client.close();
    res.status(201).json({ message: "Created user!" });
  }
}
