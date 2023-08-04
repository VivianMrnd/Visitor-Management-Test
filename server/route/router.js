const express = require('express');
const router = express.Router();
const logindata = require('../model/details');
const multer = require('multer');
// const announcedb = require('../database/upload');


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


/*------------- upload -----------------*/
const storage = multer.diskStorage({
    destination: 'public/uploads',
    filename:  (req, file, cb) =>{
        cb(null,file.originalname);
    },
  });
  
  const upload = multer({ storage: storage })
  .single('announcement')

router.post('/upload', (req, res)=>{
    upload(req, res, (err)=>{
        if(err){
            console.log(err);
        }else{
            const newImage = new logindata({
                name:  res.req.file.filename,
                image: {
                    data:req.file.filename,
                    contentType:'image/png'
                },
                status: "active"

            })
            newImage.save()
            .then(()=>res.send('Successfully uploaded'))
        }
    })
})
// router.get('/upload',(req,res,next)=>{
//     announcedb.find().then(data=>{
//      res.send(data)
//     })
//  })

module.exports = router;