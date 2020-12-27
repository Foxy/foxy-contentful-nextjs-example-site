export default (req, res) => {
  if (req.method === "POST") {
    try {
      const { _embedded } = req.body;
      const items = _embedded["fx:items"];

      return res.status(200).json(items);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: err.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};
