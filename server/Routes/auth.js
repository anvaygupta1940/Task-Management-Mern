const router = require("express").Router();
const User = require("../../database/models/User.js");
const bcrypt = require("bcrypt");
// this will give us a way to send a user a web token that they can use for authorization
const jwt = require("jsonwebtoken");
const validator = require("email-validator");


/* REGISTER  */
router.post("/register", async (req, res) => {
    const { email, password, username } = req.body;
    try {
        if (!username) return res.status(400).send("Username is required");

        if (!email) return res.status(400).json("Email is required");

        if (!validator.validate(email)) return res.status(400).json("Enter valid email");

        if (!password || password.length < 6) return res.status(400).json("Enter valid password");

        // if user already exist
        const userExist = await User.findOne({ email });
        if (userExist) return res.status(400).json("Account with this email id already exist");

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);


        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });

        const savedUser = await newUser.save();
        console.log("User added successully ...");
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json({ err: `${err} . User has not been added` });
    }
})


/* LOGIN */
router.post("/login", async (req, res) => {

    try {

        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).json({ msg: "User does not exist" });

        // first password is the password which user enter during loggin
        // second password is the password of the user present in the database
        const isMatched = await bcrypt.compare(req.body.password, user.password);

        if (!isMatched) return res.status(400).json({ msg: "Invalid Password" });


        // after login -> creating json web token
        // after login process we provide the user a json token so whenever they make a request regarding
        // updating deleting .. we verify whether its his or not
        const accessToken = jwt.sign(
            {
                id: user._id
            },
            "hiiItsAnvay!",
            { expiresIn: "24h" }  // after 24 hours we should not be able to use this accesstoken and should login again
        )
        const { password, ...others } = user._doc;
        console.log("User logged in successully ...");
        res.status(200).json({ ...others, accessToken });
    } catch (err) {
        res.status(500).json({ err: `${err} . User has not logged in` });
    }
})
module.exports = router;