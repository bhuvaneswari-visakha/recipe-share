const userModel = require("../models/userModel");
const bcryptjs = require("bcrypt"); 
const jwt = require("jsonwebtoken");
const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                message: "All fields are required."
            });
        }
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ 
                message: "User with this email already exists."
            });
        }
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        const newUser = new userModel({
          
            username,
            email,
            password: hashedPassword
        });
      await newUser.save();
        res.status(200).json({ 
        
            message: "Account Created Successfully."
        });

    } catch (error) {
        console.error("Error in user registration:", error); 
        res.status(500).json({
            message: "Something went wrong during registration.",
            error: error.message
        });
    }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
console.log("Received login request body:", req.body);
    if (!username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await userModel.findOne({
      $or: [
        { username: username },
      ],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

module.exports = { register, login};