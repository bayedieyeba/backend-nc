const mysql = require('mysql')
const express = require('express')
const cors = require("cors");
const path = require("path");
var app = express()
const session = require('express-session');
const bodyParser = require('body-parser')
const multer = require('multer')
var nodemailer = require("nodemailer")

app.use(cors({
    
    origin : "*",
    methods : ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.use("/images",express.static("upload/images"))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use('/uploads', express.static('uploads'));

var mysqlConnection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:"",
    database:"bdnc"
})

mysqlConnection.connect((err)=>{
    if(!err)
    console.log("DB connection succede");
    else
        console.log("DB connection failed \n Erro : ", JSON.stringify(err,undefined, 2))
})


app.listen(4000,()=>console.log("Express server  is running at port : 4000"));



// add user 
app.post('/users/add', (req,res)=>{
    const {login, password } =req.body
    const user = {login,password}
    mysqlConnection.query("INSERT INTO users SET ?",[user],(err,rows,fields)=> {
        if(!err)
            res.send(rows)
        else
            console.log(err);
    })
})
// http://localhost:3000/auth
app.post('/users/auth', function(request, response) {
	// Capture the input fields
	let login = request.body.login;
	let password = request.body.password;
	// Ensure the input fields exists and are not empty
	if (login && password) {
		// Execute SQL query that'll select the account from the database based on the specified username and password
		mysqlConnection.query('SELECT * FROM users WHERE login = ? AND password = ?', [login, password], function(error, results, fields) {
			// If there is an issue with the query, output the error
			if (error) throw error;
			// If the account exists
			if (results.length > 0) {
				// Authenticate the user
				request.session.loggedin = true;
				request.session.login = login;

				response.send(results)
				
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});


app.get('/services', (req,res)=>{
    mysqlConnection.query("SELECT * FROM service",(err,rows,fields)=> {
        if(!err)
            res.send(rows)
        else
            console.log(err);
    })
})


// get one service 
app.get('/services/:id', (req,res)=>{
    mysqlConnection.query("SELECT * FROM service WHERE id = ?",[req.params.id],(err,rows,fields)=> {
        if(!err)
            res.send(rows)
        else
            console.log(err);
    })
})

// delete service
app.delete('/services/:id', (req,res)=>{
    mysqlConnection.query("DELETE FROM service WHERE id = ?",[req.params.id],(err,rows,fields)=> {
        if(!err)
            res.send("Deleted successfully")
        else
            console.log(err);
    })
})

// insert service 
app.post('/services', (req,res)=>{
    const {contenu1, titre, contenu2 } =req.body
    const service = {contenu1,titre,contenu2}
    mysqlConnection.query("INSERT INTO service SET ?",[service],(err,rows,fields)=> {
        if(!err)
            res.send(rows)
        else
            console.log(err);
    })
})


const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10000000
    }
})

  const checkFileType = function (file, cb) {
    //Allowed file extensions
    const fileTypes = /jpeg|jpg|png|gif|svg/;
    //check extension names
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);
    if (mimeType && extName) {
      return cb(null, true);
    } else {
      cb("Error: You can Only Upload Images!!");
    }
  };

  app.post("/single", upload.single("image"),(req, res) => {
    if (req.file) {
        const url = ""+req.file.filename;
       
        var sql = "INSERT INTO images (url) VALUES ('" + url +"')";
        mysqlConnection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
        
      res.send("Single file uploaded successfully");
    } else {
      res.status(400).send("Please upload a valid image");
    }
  });

  // get all images 
  app.get('/api/images', (req,res)=>{
    mysqlConnection.query("SELECT * FROM images",(err,rows,fields)=> {
        if(!err)
            res.send(rows)
        else
            console.log(err);
    })
})
app.delete('/images/:id', (req,res)=>{
    mysqlConnection.query("DELETE FROM images WHERE id = ?",[req.params.id],(err,rows,fields)=> {
        if(!err)
            res.send("Deleted successfully")
        else
            console.log(err);
    })
})

//   app.post("/multiple", upload.array("images", 5), (req, res) => {
//   if (req.files) {
    
//     res.send("Muliple files uploaded successfully");
//   } else {
//     res.status(400).send("Please upload a valid images");
//   }
// });


// inscription 
app.post('/service/inscription', (req,res)=>{
    const fullName = req.body.fullName
    const email = req.body.email 
    const num_tel = req.body.num_tel 
    const service = req.body.service

    var from = req.body.email
    var to = "bayedieyeba3@gmail.com"
    var subject = "inscription service"
    var message = "Bonjour je veux m'inscrire sur le service : "+ req.body.service + " . Voici mon numéro de téléphone :"+ req.body.num_tel

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'bayedieyeba3@gmail.com',
          pass: 'gngjgewuxrrvzrcn'
        }
    })

    var mailOptions = {
        from: from,
        to:to,
        subject:subject,
        text:message
    }

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error)
        } else {
            response.send("votre mail a été bien transmis")
        }
    })

    var sql = "INSERT INTO inscription_service (fullName,email,num_tel,service) VALUES ('" + fullName +"', '" + email +"' ,'" + num_tel +"' ,'" + service +"')";
        mysqlConnection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
});

res.send("inscription validé avec succès");
   
})





