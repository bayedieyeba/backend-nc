const mysql = require('mysql')

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

const getConnection = () => {
    console.log("connexion passed successfully")
    return mysqlConnection;
}

module.exports = {
    getConnection
}