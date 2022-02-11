const { sign, verify } = require("jsonwebtoken");

const createTokens = (user) => {
  const accesToken = sign(
    { usermail: user.mail, role: user.role },
    "7bbf207521ad7b523e32d859a8b1b96511f73109c5cab1167d94fc8808d4f49e"
  );
  return accesToken;
};

const validateToken = (req, res, next) => {
  const accessToken = req.cookies["access-token"];
  if (!accessToken) {
    return res.status(400).json({ error: "User not authenticated !" });
  }
  try {
    const validToken = verify(
      accessToken,
      "7bbf207521ad7b523e32d859a8b1b96511f73109c5cab1167d94fc8808d4f49e"
    );
    if (validToken) {
      req.authenticated = true;
      return next();
    }
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};

module.exports = {
  createTokens,
  validateToken,
};
