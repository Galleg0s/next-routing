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

  const db = client.db(dbName);
  const collection = db.collection("comments");

  if (req.method === "POST") {
    const eventId = req.query.eventId;

    const { email, name, text } = req.body;

    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      return res.status(422).json({ message: "Invalid Input." });
    }

    const newComment = { eventId, email, name, text };

    try {
      const result = await collection
        .insertOne({ ...newComment })
        .then((result) => {
          return {
            ...newComment,
            id: result.insertedId,
          };
        });

      res.status(201).json({ message: "Added comment", comment: result });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "An error occurred while sending a comment.",
      });
    }
  } else if (req.method === "GET") {
    try {
      const documents = await collection.find().sort({ _id: -1 }).toArray();

      res.status(200).json({ comments: documents });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "An error occurred while getting all the comments.",
      });
    }
  } else {
    return res.status(405).json({ message: "Method not supported" });
  }
}
