const express = require("express");
const { getUserData, getUser3 } = require("../controller/getUserData");
const router = express.Router();



router.get("/",getUserData);
router.get("/option3",getUser3);



module.exports = router