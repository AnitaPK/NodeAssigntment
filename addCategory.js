var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "TestDb"
});


function SaveCatgories(CategoryName, CategoryType) {
    return new Promise(function(resolve, reject) {
        var sql = "INSERT INTO Categories (Name, Type) VALUES ('" + CategoryName + "'" + ",'" + CategoryType + "'" + ")";
        con.query(sql, function(err, result) {
            if (err) {
                // con.end();
                return reject(err);
            } else {
                // con.end();
                return resolve(result);
            }
        });
    });
}


function ListCatgories() {
    return new Promise(function(resolve, reject) {
        var sql = "SELECT * FROM  Categories";
        con.query(sql, function(err, result) {
            if (err) {
                return reject(err);
            } else {
                return resolve(result);
            }
        });
    });
}

function listProducts() {
    return new Promise(function(resolve, reject) {
        var sql = "SELECT * FROM Products";
        con.query(sql, function(err, result) {
            if (!err) {
                return resolve(JSON.parse(JSON.stringify(result)));
            }
            return reject(err);
        });
    });
}

function SaveProducts(productName, proDescription, Categories) {
    return new Promise(function(resolve, reject) {
        console.log("data is printed");
        var sql = "INSERT INTO  Products (Name, Description, Categories) VALUES ('" + productName + "'" + ",'" + proDescription + "','" + Categories + "'" + ")";

        console.log(sql);
        con.query(sql, function(err, result) {
            if (err) {
                return reject(err);
            } else {
                return resolve(result);
            }
        });
    });
}

module.exports = {
    SaveCatgories,
    ListCatgories,
    listProducts,
    SaveProducts
}