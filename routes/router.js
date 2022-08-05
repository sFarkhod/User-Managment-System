const express = require("express");
const router = express.Router();
const users = require("../models/userSchema");
const Role = require("../models/Role");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {check} = require('express-validator');
const {validationResult} = require('express-validator')

const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk'

const authMiddleware = require('../middleware/authMiddleware')
const roleMiddleware = require('../middleware/roleMiddleware')

// for login and register


// router.get("/for/saveDb", async (req,res)=>{
//     console.log("connect");
//     const userRole = new roles();
//     const adminRole = new roles({value: "acitve"});
//     await userRole.save();
//     await adminRole.save();
// });


const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles,
    }
    return jwt.sign(payload, JWT_SECRET, {expiresIn: "15m"});
}



router.post("/api/register", [
    check('name', "Please write your name").notEmpty(),
    check('email', "Please write your email").notEmpty(),
    check('password', "Password should be at least 1 character and should not be mor than 15").isLength({min:1, max:15})
], async (req, res)=> {
    try {

        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({message: 'Please fill all the inputs', errors})
        }

        const {name,email,password} = req.body;
        const candidate = await users.findOne({email})
        
        if(candidate){
            return res.status(400).json({message: 'User already registered'})
        }

        const hashedPassword = bcrypt.hashSync(password, 7);

        const userRole = await Role.findOne({value: "acitve" })

        const user = new users({name,email, password: hashedPassword, statusUser: userRole.value})
        await user.save()
    
        return res.status(200).json({ status: 'ok', message: "User Successfully added" });
    } catch (error) {
        console.log(error);
        res.status(400).json({ status: 'error', error: 'Error while registration' });
    }
    
})


router.post("/api/login", async (req, res)=> {
    const {password,email} = req.body;
    const Users = await users.findOne({email})

    console.log(email);

    const data = await users.updateOne(
        { email: email }, 
        { $set: { lastLogin: new Date().toLocaleString() } }
    );
    console.log(data);

    if (Users) {

        const validPassword = bcrypt.compareSync(password, Users.password);
        
        if(!validPassword){
            res.status(500).json({status: 'oh noes!', message: `Password is not correct`});
        }else {
            const token = generateAccessToken(Users._id, Users.statusUser);
            return res.json(token);    
        }

    


        // const token = jwt.sign(
        //     {
        //         name: Users.name,
        //         email: Users.email,
        //     }, 
        //     'secret123'
        // )

        // console.log(token);

        // res.status(200).json({status:'ok',  user: token});
    } else {
        res.status(500).json({status: 'oh noes!', message: `User with ${email} is not found in our system`});
    }
})




// register user

router.post("/register",async(req,res)=>{
    // console.log(req.body);
    const {name,email,statusUser, password} = req.body;

    if(!name || !email || !statusUser || !password ){
        res.status(422).json("plz fill the data");
    }

    try {
        
        const preuser = await users.findOne({email:email});
        console.log(preuser);

        if(preuser){
            res.status(422).json("This user is already present");
        }else{

            const hashedPassword = bcrypt.hashSync(password, 7);
            
            const adduser = new users({
                name,email,statusUser, password: hashedPassword
            });

    

            await adduser.save();
            res.status(201).json(adduser);
            console.log(adduser);
        }

    } catch (error) {
        res.status(422).json(error);
    }
})


// get userdata

router.get("/getdata", roleMiddleware('acitve'), async(req,res)=>{



    // authentication

    // const token = req.headers['x-access-token']
    // console.log(token);

    // try {
    //     const decoded = jwt.verify(token, 'secret123');
    //     console.log(decoded);
    //     const email = decoded.email
    //     const user = await users.findOne({email: email})
        
    // } catch (error) {
    //     console.log(error);
    //     res.status(500).json({status: 'error', error: 'Invalid token'});
    // }

    // // authentication


    try {
        const userdata = await users.find();
        res.status(201).json(userdata)
        // console.log(userdata);
    } catch (error) {
        res.status(422).json(error);
    }
})

// get individual user

router.get("/getuser/:id",async(req,res)=>{
    try {
        console.log(req.params);
        const {id} = req.params;

        const userindividual = await users.findById({_id:id});
        console.log(userindividual);
        res.status(201).json(userindividual)

    } catch (error) {
        res.status(422).json(error);
    }
})


// update user data

router.patch("/updateuser/:id",async(req,res)=>{
    try {
        const {id} = req.params;

        const updateduser = await users.findByIdAndUpdate(id,req.body,{
            new:true
        });

        console.log(updateduser);
        res.status(201).json(updateduser);

    } catch (error) {
        res.status(422).json(error);
    }
})


// delete user
router.delete("/deleteuser/:id",async(req,res)=>{
    try {
        const {id} = req.params;

        const deletuser = await users.findByIdAndDelete({_id:id})
        console.log(deletuser);
        res.status(201).json(deletuser);

    } catch (error) {
        res.status(422).json(error);
    }
})


// for deleting multiple rows

router.post("/deleteall", async(req,res)=> {
    try {

        const deData = req.body.isCheckUser;
        console.log(deData);

        const deletedData = await users.deleteMany({_id: deData});  
        res.status(200).json(deletedData);  
    } catch (error) {
        console.log(error);
        res.status(404).json( error ,{message: "Critical Error"})
    }
})

// for blocking

router.patch("/block/:id", async(req,res) => {
    try {
        const {id} = req.params;

        const data = await users.updateOne(
            { _id: id }, 
            { $set: { statusUser: req.body.userStatus } }
        );
        console.log(data);
        res.status(201).json(data, {message: "User successfully blocked"});

    } catch (error) {
        res.status(422).json(error);
    }
})


router.patch("/free/:id", async(req,res) => {
    try {
        const {id} = req.params;

        const data = await users.updateOne(
            { _id: id }, 
            { $set: { statusUser: req.body.freeStatus } }
        );
        console.log(data);
        res.status(201).json(data);

    } catch (error) {
        res.status(422).json(error);
    }
})


// router.get("/getdata/login", async(req,res)=>{
//     try {
//         const userdata = await users.find({}, {"name": 0, "email": 0, "password": 0, "lastLogin": 0, "registrationTime": 0, "statusUser": 0});
//         res.status(201).json(userdata)
//         // console.log(userdata);
//     } catch (error) {
//         res.status(422).json(error);
//     }
// })





module.exports = router;










