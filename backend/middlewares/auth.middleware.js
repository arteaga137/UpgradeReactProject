const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

async function isAuth(req, res, next) {
    const token = req.cookies.authToken;
//   const token = req.cookies["authToken"];
  console.log(token)
  if (!token) {
    return res.status(401).json({ msg: "not authenticated" });
  } else {
    const tokenDecrypted = jwt.verify(token, process.env.SECRET);
    const userId = tokenDecrypted.userId;
    const foundUser = await User.findById(userId);
    if (!foundUser) {
      return res.status(401).json({ msg: "Token not valid" });
    } else {
      next();
    }
  }
}

// async function isAuth(req, res, next) {
//   // Retrieve token from the Authorization header
//   const authHeader = req.headers.authorization;
//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({ msg: "Not authenticated" });
//   }

//   const token = authHeader.split(" ")[1]; // Extract the token part

//   try {
//     // Verify the token
//     const tokenDecrypted = jwt.verify(token, process.env.SECRET);
//     const userId = tokenDecrypted.userId;

//     // Find the user associated with the token
//     const foundUser = await User.findById(userId);
//     if (!foundUser) {
//       return res.status(401).json({ msg: "Token not valid" });
//     }

//     // Optionally attach user to request object
//     req.user = foundUser;

//     next(); // Token is valid, proceed to the next middleware/route handler
//   } catch (error) {
//     console.error(error);
//     return res.status(401).json({ msg: "Token not valid or expired" });
//   }
// }
module.exports = { isAuth };
