const { sign, verify } = require("jsonwebtoken");

const createTokens = (user) => {
  const accesToken = sign(
    { usermail: user.mail, role: user.role },
    process.env.JWT_ACCESS_TOKEN_SERCRET,
    { expiresIn: "15m" }
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
      process.env.JWT_ACCESS_TOKEN_SERCRET
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
