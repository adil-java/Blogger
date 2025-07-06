import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  // console.log("AUTH HEADER:", authHeader); // log 1

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  console.log("TOKEN EXTRACTED:", token); // log 2

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("TOKEN VERIFIED:", decoded); // log 3
    req.user = decoded;
    next();
  } catch (err) {
    console.error("JWT VERIFY ERROR:", err); // log 4
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export default auth;
