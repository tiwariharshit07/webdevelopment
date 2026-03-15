const user = require("../models/user")
const bcrypt = require("bcrypt")
const User = require('../models/user')
// controller for new users
const registerUser = async (req, res) => {
    try {
        //taking input from frontend'
        const { username, email, password, role } = req.body
        //now have to check for unique users
        const existingUser = await User.findOne({
            $or: [{ username }, { email }]
        })
        if (existingUser) {
            return res.status(400).json({
                status: false,
                message: 'User with this email id or user name already exist'
            })
        }
        //now have to hash the password

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // now real new user will be save in database
        const savenewuser = new User({
            username: username,
            email: email,
            password: hashedPassword,
            role: role || 'user'
        })
        await savenewuser.save()

        if (savenewuser) {
            res.status(200).json({
                success: true,
                message: 'User registered successfully'
            })
        }
        else {
            res.status(400).json({
                success: false,
                message: 'Something went wrong'
            })
        }
    }
    catch (error) {
        console.log(error)
        res.status(400).json({
            status: false,
            message: 'Something Went Wrong'
        })

    }
}
// controller for login users

const loginUser = async (req, res) => {
    try {
        // get the user details from frontend

        const { username, password } = req.body

      const checkuser = await User.findOne({username})
        if (!checkuser) {
            return res.status(400).json({
                status: false,
                message: 'User with this  user name does not exist'
            })
        }
        const isPasswordMatch = await bcrypt.compare(password, checkuser.password)

        if (!isPasswordMatch) {
            return res.status(400).json({
                status: false,
                message: 'Your entered password is wrong'
            })
        }
        else{
            res.status(200).json({
success:true,
message:"Login successful"
})
        }
    }
    catch (error) {
        console.log(error)
        res.status(400).json({
            status: false,
            message: 'Something Went Wrong'
        })
    }

}
module.exports = { registerUser, loginUser }