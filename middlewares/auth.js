const config = require("config");
const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("x-auth-token");

  // Check for token
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "No x-auth-token found. Authorization denied",
    });
  }

  try {
    // Token found, verify it
    const decoded = jwt.decode(token, config.get("jwtSecret"));

    if (!decoded)
      return res.status(400).json({
        success: false,
        message: "x-auth-token is invalid or expired",
      });
    // Add the decoded user to request. decoded will only have user id, because we created token only using user id
    req.user = decoded;
  } catch (e) {
    return res.status(400).json({
      success: false,
      message: "x-auth-token is invalid or expired",
    });
  }

  next();
}

module.exports = auth;
