import "dotenv/config";
import "./db";
import "./models/Video";
import "./models/User";
import app from "./server";

const port = 3000;

function handleListening() {
  console.log(`Server listening on http://localhost:${port}/`);
}

app.listen(port, handleListening);
