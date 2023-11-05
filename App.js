const {Sequelize, Model, DataTypes} = require('sequelize');
const sequelize = new Sequelize("sqlite:db.sqlite", {logging:false});

var express = require('express');
var partials = require('express-partials');
let session = require('express-session');
var app = express();
app.set('view engine', 'ejs');
app.use('/', indexRouter);
app.use(methodOverride('_method', {methods: ["POST", "GET"]}));


/*---------------------------------------------------------------------------*/
const Web3 = require('web3');
const express = require('express');

const app = express();
const port = 3000;

const url = 'https://mainnet.infura.io/cb3647d0ea884b16a9a7263fd0263f49';
const web3 = new Web3(url);
/*---------------------------------------------------------------------------*/

//Para mapear
const erc20Abi = JSON.parse(fs.readFileSync('erc20-abi.json', 'utf8'));
const erc20Address = '';  //Falta

const erc20TokenContract = new web3.eth.Contract(erc20Abi, erc20Address);

/*---------------------------------------------------------------------------*/


//LOGIN
app.use(function (req, res, next) {

  //Si req existe, asignar res con los valores de la sesión ralativos a ...
  res.locals.loginUser = req.session.loginUser && {
    id: req.session.loginUser.id,
    username: req.session.loginUser.username,
    email: req.session.loginUser.email,
    isAdmin: req.session.loginUser.isAdmin
  };
  
  next();
});