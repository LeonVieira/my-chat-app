const express = require("express");
const { getMessages } = require("./services/databaseService");
const cors = require("cors");


const app = express();
const PORT = 3001;
app.use(cors({
  origin: "http://localhost:3000",
}));
app.use(express.json());

app.get("/api/messages", async (req, res) => {
  try {
    const messages = await getMessages();

    res.json(messages);
  } catch (error) {
    console.error("Failed to get messages:", error);

    res.status(500).json({
      error: "Failed to get messages",
    });
  }
});

app.listen(PORT, () => {
  console.log(`LocalChat server running on port ${PORT}`);
});