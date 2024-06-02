const jwt = require("jsonwebtoken");

const secret = "$ayu123$sh456";

function createTokenForUser(user) {
  const payload = {
    _id: user._id,
    fullName: user.fullName,
    email: user.email,
    profileImageURL: user.profileImageURL,
    role: user.role,
  };
  const token = jwt.sign(payload, secret);
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
