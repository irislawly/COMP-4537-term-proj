const express = require("express");
const mysql = require("mysql");
const PORT = process.env.PORT || 8888;
const app = express();
let url = require("url");
const endPointRoot = "/COMP4537/labs/termproject/API/V1/"
const db = mysql.createConnection({
    host: "localhost",
    user: "irislawc_tiffiris",
    password: "nodemysql123",
    database: "irislawc_tiffiris_proj",
});

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-Width');
    next();
});
/**Home.html
 * 
 */

//update likes
app.put(endPointRoot + "home/like", (req, res) => {
    let d = url.parse(req.url, true);
    let data = "";
    let postObj = "";
    req.on('data', function (otherData) {
        data += otherData
    })
    req.on('end', function () {
        req.rawBody = data;
        req.jsonBody = JSON.parse(data);
        postObj = req.jsonBody;

        let query = "" + 'UPDATE post SET likes = "' + postObj.likes + '" where postID =' + postObj.index;
        db.query(query,(err, result) => {
                if (err) {
                    throw err;
                };
                console.log(result);
        });


    })
    updateStat("'PUT'", "'%home/like%'");
});
//submit post
app.post(endPointRoot + "home/submit", (req, res) => {

    let data = "";
    let postObj = "";
    req.on('data', function (otherData) {
        data += otherData
    })
    req.on('end', function () {
        req.rawBody = data;
        req.jsonBody = JSON.parse(data);
        postObj = req.jsonBody;
        let q = "INSERT INTO `post` ( `userID`, `message`, `likes`) VALUES(" + postObj.id+ ", '" + postObj.msg + "', '0')"
       db.query(q,(err, result) => {
                if (err) {
                    throw err;
                };
                console.log(result);
         });

    })
    //update stat table
    updateStat("'POST'", "'%home/submit%'");
});

//delete
app.delete(endPointRoot + "home/delete", (req, res) => {

    let data = "";
    let postObj = "";
    req.on('data', function (otherData) {
        data += otherData
    })
    req.on('end', function () {
        req.rawBody = data;
        req.jsonBody = JSON.parse(data);
        postObj = req.jsonBody;
        console.log("delete" + postObj);
        let q = "DELETE FROM post WHERE postID = '" + postObj.index + "'";
 
        db.query(q,(err, result) => {
                if (err) {
                    throw err;
                };
                console.log(result);
        });

        let q2 = "DELETE FROM commentUserPost WHERE postID = '" + postObj.index + "'";
 
        db.query(q2,(err, result) => {
                if (err) {
                    throw err;
                };
                console.log(result);
        });


    })
    //update stat table
    updateStat("'DELETE'", "'%home/delete%'");
});

//Get Admin table
app.get(endPointRoot + "admin", (req, res) => {
    let objArray = [];

    db.query("SELECT * FROM stats", (err, result) => {
        if (err) throw err;

        for (let i = 0; i < result.length; i++) {
            let createObj = {
                index: result[i].statID,
                method: result[i].method,
                endpoint: result[i].endpoint,
                req: result[i].requests,

            }
            objArray.push(createObj);
        }
        res.json(result);
       // res.send(objArray);
    });
});


//Get posts for homepage
app.get(endPointRoot + "home", (req, res) => {
    let objArray = [];

    db.query("SELECT * FROM post JOIN user ON post.userID = user.userID", (err, result) => {
        if (err) throw err;

        for (let i = 0; i < result.length; i++) {
            let createPostObj = {
                index: result[i].postID,
                username: result[i].username,
                msg: result[i].message,
                likes: result[i].likes,

            }
            objArray.push(createPostObj);
        }

        res.send(objArray);
    });

    //update stat table
    updateStat("'GET'", "'%home%'");
});

/**
 * POST.HTML
 */
//Get post for post page
app.get(endPointRoot + "post", (req, res) => {
    let objArray = [];

    db.query("SELECT * FROM post JOIN user ON post.userID = user.userID", (err, result) => {
        if (err) throw err;

        for (let i = 0; i < result.length; i++) {
            let createPostObj = {
                index: result[i].postID,
                username: result[i].username,
                msg: result[i].message,
                likes: result[i].likes,

            }
            objArray.push(createPostObj);
        }

        res.send(objArray);
    });

    //update stat table
    updateStat("'GET'", "'%post'");

});
//Get Comment
app.post(endPointRoot + "post/comment", (req, res) => {
  
    let data = "";
    let postObj = "";
    req.on('data', function (otherData) {
        data += otherData
    })
    req.on('end', function () {
        req.rawBody = data;
        req.jsonBody = JSON.parse(data);
        postObj = req.jsonBody;
        let objArray = [];
        db.query("SELECT * FROM commentUserPost JOIN user ON commentUserPost.userID = user.userID WHERE commentUserPost.postID = "+postObj.pid+" ", (err, result) => {
            if(result.length == 0){
                res.send(objArray);
            }
            if (err) throw err;
    
            for (let i = 0; i < result.length; i++) {
                let createPostObj = {
                 
                    index: result[i].commentID,
                    name: result[i].username,
                    msg: result[i].msg,
    
                }
                objArray.push(createPostObj);
            }
    
            res.send(objArray);
        })
     });
    //update stat table
    updateStat("'POST'", "'%post/comment%'");
    })


//update likes
app.put(endPointRoot + "post/like", (req, res) => {

    let data = "";
    let postObj = "";
    req.on('data', function (otherData) {
        data += otherData
    })
    req.on('end', function () {
        req.rawBody = data;
        req.jsonBody = JSON.parse(data);
        postObj = req.jsonBody;

        let query = "" + 'UPDATE post SET likes = "' + postObj.likes + '" where postID =' + postObj.index;
        db.query(query,(err, result) => {
                if (err) {
                    throw err;
                };
                console.log(result);
        });


    })
    updateStat("'PUT'", "'%post/like%'");
});

//POST comment
app.post(endPointRoot + "post/submit", (req, res) => {

    let data = "";
    let postObj = "";
    req.on('data', function (otherData) {
        data += otherData
    })
    req.on('end', function () {
        req.rawBody = data;
        req.jsonBody = JSON.parse(data);
        postObj = req.jsonBody;
        let q = "INSERT INTO `commentUserPost` ( `userID`, `postID`, `msg`) VALUES (" + postObj.uid +", " + postObj.pid + ",'" + postObj.msg + "')";
       db.query(q,(err, result) => {
                if (err) {
                    throw err;
                };
                console.log(result);
         });

    })
    //update stat table
    updateStat("'POST'", "'%post/submit%'");
});


/**
 * User page
 */

//check if user is in db
app.post(endPointRoot + "user", (req, res) => {
  
    let data = "";
    let postObj = "";
    req.on('data', function (otherData) {
        data += otherData
    })
    req.on('end', function () {
        req.rawBody = data;
        req.jsonBody = JSON.parse(data);
        postObj = req.jsonBody;
        let objArray = [];
        db.query("SELECT * FROM user WHERE username = '"+postObj.name+"' AND password = '"+ postObj.pass +"'", (err, result) => {
            if(result.length == 0){
                res.send(objArray);
            }
            if (err) throw err;
    
            for (let i = 0; i < result.length; i++) {
                let createPostObj = {
                 
                    id: result[i].userID,
                    name: result[i].username
               
    
                }
                objArray.push(createPostObj);
            }
    
            res.send(objArray);
        })
     });
    //update stat table
    updateStat("'POST'", "'%user'");
    })

    //check if user is in db
app.post(endPointRoot + "user/new", (req, res) => {
  
    let data = "";
    let postObj = "";
    req.on('data', function (otherData) {
        data += otherData
    })
    req.on('end', function () {
        req.rawBody = data;
        req.jsonBody = JSON.parse(data);
        postObj = req.jsonBody;
    //    let q = "INSERT INTO `user` (`username`, `password`, 'admin') VALUES ('"+postObj.name+"', '"+postObj.pass+"', 0);"
    let q = "INSERT INTO `user` ( `username`, `password`, `admin`) VALUES ( '"+postObj.name+"', '"+postObj.pass+"', '0');"
       db.query(q,(err, result) => {
                if (err) {
                    throw err;
                };
                console.log(result);
         });

    })
    //update stat table
   updateStat("'POST'", "'%user/new'");
    })

    //delete comment
    //delete
app.delete(endPointRoot + "post/comment", (req, res) => {

    let data = "";
    let postObj = "";
    req.on('data', function (otherData) {
        data += otherData
    })
    req.on('end', function () {
        req.rawBody = data;
        req.jsonBody = JSON.parse(data);
        postObj = req.jsonBody;
        console.log("delete" + postObj);
        let q = "DELETE FROM commentUserPost WHERE commentID = '" + postObj.index + "'";
 
        db.query(q,(err, result) => {
                if (err) {
                    throw err;
                };
                console.log(result);
        });


    })
    //update stat table
    updateStat("'DELETE'", "'%post/comment%'");
});

//Updates admin stat table
function updateStat(method, ep) {
    db.query("SELECT requests FROM stats WHERE method = " + method + "AND endpoint LIKE " + ep + "", (err, result) => {
        if (err) throw err;
        let num = result[0].requests;
        num++;
        db.query("UPDATE stats SET requests = '" + num + "' WHERE method = " + method + " AND endpoint LIKE " + ep + "", (err, result) => {
            if (err) throw err;
            return;

        });
    });
}


app.listen(PORT, (err) => {
    if (err) throw err;
    console.log("Listening to port", PORT);
});