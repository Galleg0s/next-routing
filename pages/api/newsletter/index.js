import getClient from "../../../utils/db";

export default async function handler(req, res) {
  let client = null;
  const dbName = "events";

  try {
    try {
      client = await getClient();
    } catch (err) {
      console.error(`Failed to connect to database: ${err}`);
      return res
        .status(500)
        .json({ message: `Failed to connect to database.` });
    }

    if (req.method === "POST") {
      const email = req.body.email;

      if (!email || !email.includes("@")) {
        res.status(422).json({ message: "Invalud email address." });
        return;
      }

      const db = await client.db(dbName);
      const collection = await db.collection("emails");

      try {
        await collection.insertOne({ email: email });
      } catch (error) {
        res.status(500).json({ message: `Failed to insert email ${error}` });
        return;
      }

      return res.status(201).json({ email: email });
    }
  } catch (error) {
    console.error(`Failed to process request: ${error}`);
    return res.status(500).json({ message: `Failed to process request.` });
  } finally {
    await client.close();
  }
}
