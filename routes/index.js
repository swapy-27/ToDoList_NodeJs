const express = require("express");

const router = express.Router();

const homeController =  require('../controller/home_Controller');

router.get('/home',homeController.home)

router.post('/add-task',homeController.addTask)

router.get('/delete-task/:id',homeController.deleteTask)

module.exports=router;