const jwt = require("jsonwebtoken");

function createTokenForUser(user) {
  const payload = {
    _id: user._id,
    fullName: user.fullName,
    email: user.email,
    profileImageURL: user.profileImageURL,
    role: user.role,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  return token;
}

function validateToken(token) {
  if (!token) return null;
  try {
    const payload = jwt.verify(token, secret);
    return payload;
  } catch (error) {
    return null;
  }
}

module.exports = { createTokenForUser, validateToken };
