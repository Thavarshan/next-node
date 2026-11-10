import { app } from "./app.js";

const port = Number(process.env.PORT || 4000);
const host = "127.0.0.1"; // local-only intentionally incomplete lab
app.listen(port, host, () => {
  console.log("Learning API: http://" + host + ":" + port);
});
