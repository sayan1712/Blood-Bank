const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../models/userModels');
const jwt = require("jsonwebtoken");
const authMiddleware = require('../middlewares/authMiddleware');
const JWT_SECRET = process.env.jwt_secret || "blood_bank_app";    // stirng is undefined thats why value is given 
 const Inventory =  require ("../models/inventoryModel");
 const  mongoose = require("mongoose");

//Register new user
router.post('/register', async (req, res) => {
    try {
        const userExists = await User.findOne({
            email: req.body.email
        });
        if (userExists) {
            return res.send({
                success: false,
                message: "User Already Exists",
            });
        }

        const salt = await bcrypt.genSalt(10);   // Encrypted the password
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword;
             // Recheck the password
        const user = new User(req.body);
        await user.save();

        return res.send({
            success: true,
            message: "User Registerd Successsfully",
        });
    } catch (error) {
        return res.send({
            success: false,
            message: error.message,
        });
    }
});
//Login user
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.send({
                success: false,
                message: "User not found",
            });
        }

        if(user.userType !== req.body.userType){
             return res.send({
                success: false,
                message: `User is not registered as ${req.body.userType}`,
            });
        }
        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!validPassword) {
            return res.send({
                success: false,
                message: "Invalid Password",
            });
        }
        

        const token = jwt.sign({ userId: user._id }, "blood_bank_app", { expiresIn: "7d" })      //jwt_secret value is directly written

        return res.send({
            success: true,
            message: "User logged in successfully",
            data: token
        });

    }
    catch (error) {
        return res.send({
            success: false,
            message: error.message,
        });
    }
});
// get current user
router.get("/get-Current-User", authMiddleware, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.body.userId });
         
        // Remove the user object password
        //user.password = undefined;
        return res.send({
            success: true,
            message: "User fetched successfully",
            data: user,
        });

    } catch (error) {
        return res.send({
            success: false,
            message: error.message,
        });
    }
});
//get all unique donors
router.get("/get-all-donors",authMiddleware,async(req,res) =>{

        try{
        const organization = new mongoose.Types.ObjectId(req.body.userId);
        const uniqueDonorIds = await Inventory.distinct("donor", {
            organization,
        })

        const donors = await User.find({
            _id: { $in: uniqueDonorIds }
        })
               return res.send({
                        success:true,
                        message: "Donor fetched successfully",
                        data: donors         
                        })         

           } catch (error) {
             return res.send( {
                  success:false,
                  message: error.message,               
 
             });

        }; 
});

router.get("/get-all-hospitals",authMiddleware,async(req,res)=>{
    try{
        //get all unique hospital ids from inventory
        const organization =new mongoose.Types.ObjectId(req.body.userId);
        const uniqueHospitalIds =await Inventory.distinct("hospital",{
            organization,
        });

        const hospitals= await User.find({
        _id: { $in:uniqueHospitalIds  },
         });

         return res.send({
                success: true,
                message : "Hospitals fetched successfully",
                data: hospitals,
         });
       }   catch(error){
          return res.send ({
               success:false,
               message: error.message,
         });
       }
});

router.get("/get-all-organization-for-donor",authMiddleware , async(req,res) =>{
    try{
        // get all unique hospital ids from inventory
        const donor = new mongoose.Types.ObjectId(req.body.userId);
        const uniqueOrganizationIds= await Inventory.distinct("organization",{donor});
        const hospitals=await User.find({_id :{$in:uniqueOrganizationIds},});

        return res.send({
            success: true,
            message: "Hospitals fetched successfully",
            data: hospitals,
        });
    }
    catch(error){
        return res.send({
            success: false,
            message: error.message,
        });
    }
});

router.get("/get-all-organizations-of-a-hospital",authMiddleware , async(req,res) =>{
    try{
        // get all unique hospital ids from inventory
        const hospital =new mongoose.Types.ObjectId(req.body.userId);
        const uniqueOrganizationIds= await Inventory.distinct("organization",{hospital});
        const hospitals=await User.find({_id :{$in:uniqueOrganizationIds},});

        return res.send({
            success: true,
            message: "Hospitals fetched successfully",
            data: hospitals,
        });
    }
    catch(error){
        return res.send({
            success: false,
            message: error.message,
        });
    }
});


module.exports = router;