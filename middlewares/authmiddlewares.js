const User = require("../models/UserModel")

const jwt = require("jsonwebtoken")

const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  console.log(token)
  if (token) {
    console.log("Cookie YES")
    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        res.json({ status: false })
        next()
      } else {
        const user = await User.findById(decodedToken.id);
        if (user) res.json({ status: true, user: user.email });
        else res.json({ status: false });
        next()
      }
    })
  } else {
    res.json({ status: false })
    console.log("Cookie NO")
    next();
  }
}
const verifyUser = (req, res, next) => {
  User.findOne({
    confirmationCode: req.params.confirmationCode,
  })
    .then((user) => {
      if (!user) {
        console.log("not found your fucking user")
        return res.status(404).send({ message: "User Not found." });
      }
      console.log(user.password,"authmiddleware")
      console.log(user,"authmiddleware")
      user.status = "Active";
      user.save((err) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
      });
    })
    .catch((e) => console.log("error", e));
};

module.exports = { checkUser, verifyUser }