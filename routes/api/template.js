const express = require("express");
const router = express.Router();
const passport = require("passport");

// LAOD MODEL

// LOAD VALIDATION

/*  @route      GET api/___/test
    @desc       Tests post route
    @access     Public
*/
router.get("/test", (req, res) => {
  res.json({ msg: "API Route working" });
});
