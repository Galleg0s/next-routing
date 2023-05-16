export default function handler(req, res) {
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
      return res.status(422).json({ message: "Invalid Input" });
    }

    const newComment = { id: new Date().toISOString(), email, name, text };

    res.status(201).json({ message: "Added comment", comment: newComment });
  }

  if (req.method === "GET") {
    const commentsList = [
      {
        id: "e3",
        name: "Mariia",
        email: "test@gmail.com",
        text: "This event is amazing!",
      },
    ];
    res.status(200).json({ comments: commentsList });
  }
}
