import { Mongoose } from "mongoose"
import bcrypt from "bcryptjs"
import User from "../models/User.js"
import { createError } from "../error.js";
import jwt from "jsonwebtoken";

// creating a unique user to db
// to send data we need api (like postman)

export const signup = async (req, res, next) => {
  // console.log(req.body) api json
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    // copy all except pw
    const newUser = new User({ ...req.body, password: hash });

    await newUser.save();
    res.status(200).send("User has been created")
  } catch (err) {
    next(err)
    // next(createError)
  }
}

// verifying data by db
// req.body.pass : sent pw

export const signin = async (req, res, next) => {

  try {

    const user = await User.findOne({ name: req.body.name });
    if (!user) return next(createError(404, "User not found!"));

    // our pass v stored pass (bcrypt decode again to compare)
    const isCorrect = await bcrypt.compare(req.body.password, user.password);
    if (!isCorrect) return next(createError(400, "Wrong Credentials!"));

    // remove password (other contains many thing so other.doc)

    // provide access_token to user as cookie with its id
    // send user info as res 

    const token = jwt.sign({ id: user._id }, process.env.JWT);
    const { password, ...others } = user._doc;

    res.cookie("access_token", token, {
      httpOnly: true,
    }).status(200).json(others);
  } catch (err) {
    next(err);
  }
}
//googlre sign in
// need to set cookie again using jwt
export const googleAuth = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT);
      res.cookie("access_token", token, {
        httpOnly: true,
      }).status(200).json(user._doc);
    } else {
      const newUser = new User({
        ...req.body,
        fromGoogle: true,
      });
      const savedUser = await newUser.save();
      const token = jwt.sign({ id: savedUser._id }, process.env.JWT);
      res.cookie("access_token", token, {
        httpOnly: true,
      }).status(200)
        .json(savedUser._doc);
    }
  } catch (err) {
    next(err);
  }
}


