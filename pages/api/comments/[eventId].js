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

      let newComment = { eventId, email, name, text };

      let result;
      try {
        result = await collection.insertOne({ ...newComment });
      } catch (error) {
        console.error(error);

        res.status(500).json({
          message: "An error occurred while sending a comment.",
        });
        return;
      }

      newComment = {
        ...newComment,
        id: result.insertedId,
      };

      res.status(201).json({ message: "Added comment", comment: newComment });
    } else if (req.method === "GET") {
      let documents;
      const eventId = req.query.eventId;
      try {
        documents = await collection
          .find({ eventId: eventId })
          .sort({ _id: -1 })
          .toArray();
      } catch (error) {
        console.error(error);

        res.status(500).json({
          message: "An error occurred while getting all the comments.",
        });

        return;
      }
      res.status(200).json({ comments: documents });
    } else {
      return res.status(405).json({ message: "Method not supported" });
    }
  } catch (error) {
    console.error(`Failed to process request: ${error}`);
    return res.status(500).json({ message: `Failed to process request.` });
  } finally {
    if (client) {
      await client.close();
    }
  }
}
