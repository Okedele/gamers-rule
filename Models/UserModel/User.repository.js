var User = require('./User');

exports.createUser = function (req, res, next) {
    console.log(req.body);
    //console.log((req.body.password === req.body.otherpassword))
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.account.email) && (req.body.account.password === req.body.account.otherpassword)) {
        let user = new User(req.body);
        user.save(function (err, save) {
            if (err) {
                res.status(500).send("error signing up");
            } else {
                res.send("welcome to gamers world");
            }
        })
    }else{
        res.status(502).send("email format wrong/password mismatch");
    }
}

exports.getUser = function (req, res, next) {
    User.findOne({'account.name':req.body.username,'account.password':req.body.password}, function (err, user) {
        if (err) {
            res.status(404).send("User not found");
        } else if(user){
            res.send("sucessfull login");
        }else{
            res.status(404).send("User not found");
        }
    })
}