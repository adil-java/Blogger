import { ClerkExpressWithAuth } from "@clerk/clerk-sdk-node";
import { App, Port } from "./app/app.js";

App.listen(Port, () => {
  console.log(`✅ Server running on port ${Port}`);
});


App.post("/api/users", ClerkExpressWithAuth(), async (req, res) => {
  const { email, name, userId,password } = req.body;
  const token = req.auth?.userId

  if (token !== userId) {
    console.log("Error")
    return res.status(401).json({ message: "Unauthorized" });
  }

  console.log("✅ Synced:", email, name,userId,password);
  res.status(200).json({ message: "User synced" });
});
