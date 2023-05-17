const { MongoClient } = require("mongodb");
import getClient from "../../../utils/db";

export default async function handler(req, res) {
  let client = null;
  const dbName = "events";

  try {
    client = await getClient();
  } catch (err) {
    console.error(`Failed to connect to database: ${err}`);
    return res.status(500).json({ message: `Failed to connect to database.` });
  }

  if (req.method === "POST") {
    const email = req.body.email;

    if (!email || !email.includes("@")) {
      res.status(422).json({ message: "Invalud email address." });
      return;
    }

    const db = await client.db(dbName);
    const collection = await db.collection("emails");

    await collection.insertOne({ email: email }).then((result) => {
      console.log("result", result);
    });

    return res.status(201).json({ email: email });
  }
}
