export default function handler(req, res) {
  if (req.method === "POST") {
    const email = req.body.email;
    if (!email || !email.includes("@")) {
      res.status(422).json({ message: "Invalud email address." });
      return;
    }
    res.status(201).json({ email: req.body.email });
  }
}
