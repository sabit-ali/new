

import { User } from "../models/user.modle.mjs";
import { verifyEmailWithResend } from "../resend.mjs";
import { ApiError, ApiResponse, asyncHandler } from "../utils/apiHelpers.mjs";
import bcrypt from 'bcryptjs'
import { uploadOnCloudinary } from "../utils/cloudinary.mjs";


export const generateAccessTokenAndRefreshTokens = async (userId)=>{
    try {
      const user =  await User.findById(userId)
      const accessToken =  user.generateAccessToken()
      const refreshToken =  user.generateRefreshToken()

      user.refreshToken = refreshToken
      await user.save({validateBeforeSave : false})

      return {accessToken , refreshToken}

    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}

// User Register here,

export const UserRegister = async (req,res)=>{
    try {
        const {name, username,email,password} = req.body
        const avatar = req.file
    
        const existedVerifyedUsername = await User.findOne({
            username,
            isVerified : true,
        })
    
        if(existedVerifyedUsername){
            return res.status(402).json({success : false , message : "username is already taken !"})
        }
    
        const existedUserByEmail = await User.findOne({
            email,
            isVerified : true,
        })
        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString()
    
        if(existedUserByEmail){
            if(existedUserByEmail.isVerified){
                return res.status(403).json({
                    success : false,
                    message : "User email already taken!"
                })
            }else{
                const avatarImg = await uploadOnCloudinary(avatar.path)
                const hasedPassword = await bcrypt.hash(password,10)
    
    
                existedUserByEmail.name = name
                existedUserByEmail.username = username
                existedUserByEmail.avatar = avatarImg.url || ''
                existedUserByEmail.password = hasedPassword
                existedUserByEmail.verifyCode = verifyCode
                existedUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000)
                await existedUserByEmail.save()
            }
        }else{
            const expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours() + 1);
            const avatarImg = await uploadOnCloudinary(avatar.path)
    
         const newUser = new User({
            name,
            username : username.toLowerCase(),
            email,
            avatar : avatarImg.url || '',
            password,
            verifyCode ,
            verifyCodeExpiry: expiryDate,
            isVerified :false,
            
           });
    
            await newUser.save()
    
            //TODO : not show password and refreshToken in frontend
    
        }
    
       await verifyEmailWithResend(username,email,verifyCode)
    
       return res.status(200).json({
        success :true,
        message : 'User successfully register, verify your email'
       })
    
    } catch (error) {
        return res.status(500).json(
            {
                success :false,
                message : `Error : ${error.message}`
            }
        )
    }
    }
    
    
    
/// end UserRegister    

export const loginUser = asyncHandler( async (req,res)=>{
    const {email,password} = req.body

   const user = await User.findOne({
    email,
    isVerified :true
})

    if(!user){
        return res.status(200).json({
            success :false,
            message : "please verify your email"
        })
    }

    const isPasswordValid = await user.isCurrectPassword(password)

    if(!isPasswordValid){
        return res.status(200).json({
            success :false,
            message : 'Invalid user credentials'
        })
    }

  const {accessToken,refreshToken} =  await generateAccessTokenAndRefreshTokens(user._id)

  const loggedInUser = await User.findById(user._id).select(" -password -refreshToken")

  const options = {
    httpOnly : true,
    secure : true,
  }

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(201,
            {
                user : loggedInUser, accessToken , refreshToken
            },
            "User logged in Successfully "
        )
    )
})


export const logoutUser = asyncHandler(async(req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1 // this removes the field from document
                
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"))
})


// update User Profile

export const updateAccountDetails = asyncHandler(async(req, res) => {
    const {name, email} = req.body

    try {
        console.log("name",name)
        if (!name || !email) {
            throw new ApiError(400, "All fields are required")
        }
    
        const user = await User.findByIdAndUpdate(
            req.user?._id,
            {
                $set: {
                    name,
                    email: email
                }
            },
            {new: true}
            
        ).select("-password")
    
        return res
        .status(200)
        .json(new ApiResponse(200, user, "Account details updated successfully"))
    } catch (error) {
        
    }
});

export const updateAvatarProfile = asyncHandler(async (req,res)=>{

    const avatar = req.file
    const profileAvatar = await uploadOnCloudinary(avatar.path)

    if(!avatar){
        return res.status(401).json({
            success:false,
            message : "avatar file is required !"
        })
    }
    if(!profileAvatar){
        return res.status(400).json({
            success:false,
            message : "avatar file uploding error to fetch  !"
        })
    }
     await User.findByIdAndUpdate(
      req.user._id,
        {
            $set : {
                avatar : profileAvatar.url || ''
            }
        },
        {new : true}
    ).select('-password')

    return res.status(200).json({
        success:true,
        message : "Profile avatar change successfully !"
    })

})