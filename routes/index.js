const express = require("express");

const router = express.Router();

console.log('router is loaded');

const homeController =  require('../controller/home_Controller');

router.get('/home',homeController.home)

router.post('/add-task',homeController.addTask)


module.exports=router;