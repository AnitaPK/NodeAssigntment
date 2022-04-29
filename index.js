var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var app = express();
var path = require('path');
const addCategory = require('./addCategory');
const { add } = require('nodemon/lib/rules');

app.get('/', function(req, res) {
    res.render('homepage.pug');
});

app.set('view engine', 'pug');
app.set('views', './views');

// for parsing application/json
app.use(bodyParser.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));
//form-urlencoded


app.post('/', async function(req, res) {
    let result = await addCategory.SaveCatgories(req.body.CategoryName, req.body.CategaryType);
    console.log("result*******", result)
    res.render('homepage');
});

app.get('/ListCategories', async function(req, res) {
    let result = await addCategory.ListCatgories();
    console.log("result*******", result)
    let results = JSON.parse(JSON.stringify(result));
    console.log("asdfafa", results)
    res.render('listCategories', { Categories: results });
});

app.get('/addProducts', async function(req, res) {
    let result = await addCategory.ListCatgories();
    let results = JSON.parse(JSON.stringify(result));
    res.render('addProducts', { Categories: results });
});

app.post('/addProducts', async function(req, res) {
    // console.log("add product", req.body)

    let data = await addCategory.SaveProducts(req.body.ProductName, req.body.ProductDiscription, req.body.Categories);

    let result = await addCategory.ListCatgories();
    let results = JSON.parse(JSON.stringify(result));
    res.render('addProducts', { Categories: results });
});

app.get('/products', async function(req, res) {
    let result = await addCategory.listProducts();
    console.log("result*******", result)
    res.render('products', { Products: result });
});


app.listen(3000);