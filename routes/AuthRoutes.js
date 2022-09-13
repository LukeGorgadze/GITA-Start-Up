const { register, login } = require('../controllers/authControllers');
const {locations} = require('../controllers/fetcher')
const {getComments,addComment} = require('../controllers/placesController')
const { checkUser,verifyUser} = require('../middlewares/authmiddlewares');
const router = require('express').Router();

router.post("/",checkUser)
router.post("/register",register)
router.post("/login",login)
router.get("/api/auth/confirm/:confirmationCode",verifyUser)
// router.get("/fetchCafes", locations)
router.post("/comments/get",getComments) 
router.post("/comments/add",addComment)
module.exports = router