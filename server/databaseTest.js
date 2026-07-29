const { getMessages } = require("./services/databaseService");

async function testDatabase() {
  try {
    const messages = await getMessages();

    console.log("Messages from PostgreSQL:");
    console.log(messages);
  } catch (error) {
    console.error("Database error:", error);
  }
}

testDatabase();

//Test with this command: node server/databaseTest.js