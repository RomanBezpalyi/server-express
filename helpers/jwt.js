const jwt = require("jsonwebtoken");
const key = process.env.AUTH_KEY;
const User = require("./../models/User");

module.exports.createToken = user => {
  const { email, role } = user;

  return jwt.sign(
    {
      email,
      role
    },
    key
  );
};

module.exports.verify = (req, res, next) => {
  const { authorization } = req.headers;
  const tokenArr = authorization.split(" ");
  let token;

  if (tokenArr.length === 2) {
    token = tokenArr[1];
  } else {
    return res.status(400).json({ message: "Your bearer token is invalid" });
  }

  jwt.verify(token, key, async (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ message: "Invalid auth" });
    }

    const { email } = decodedToken;
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ message: "There is no user with such id." });
    }

    req.user = user;

    next();
  });
};
