var express = require("express");
var router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req,file,cb) {
        cb(null,'public/uploads/')
    },
    filename: function (req, file, cb) {
        var extentionName = "jpg";

        switch(file.mimetype){
            case 'image/png' :
                extentionName = '.png';
                break;
            case 'image/jpg' :
                extentionName = '.jpg';
                break;
            case 'image/jpeg' :
                extentionName = '.jpg';
                break;
        }

        cb(null, file.fieldname + '_' + Date.now() + extentionName )
    }
});

const upload = multer({ storage: storage })

/* auth controller */
const { register, login  } = require('../controllers/authcontroller');

/* auth routes */
router.post('/register',upload.single("avatar"),(req,res) => {
    register(req,res);
});

router.post('/login',login );



/* export router */
module.exports = router;