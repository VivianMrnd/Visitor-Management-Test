const express = require('express');
const router = express.Router();
const logindata = require('../model/details');

router.get('/',(req,res,next)=>{
   logindata.find().then(data=>{
    res.send(data)
   })
})

router.get('/:id',(req,res,next)=>{
    logindata.findById(req.params.id).then(data=>{
     res.send(data)
    }).catch(next)
 })
router.post('/login', (req,res,next)=>{
    logindata.create(req.body).then(data=>{
        res.send("Successfully login data: " + data)
    }).catch(next)
})

router.delete('/:id', (req,res,next)=>{
    logindata.findByIdAndDelete(req.params.id).then(()=>{
        res.send("Successfully deleted data")
    }).catch(next)
})

router.delete('/', (req,res,next)=>{
    logindata.deleteMany().then(()=>{
        res.send("Successfully deleted all data")
    }).catch(next)
})
module.exports = router;