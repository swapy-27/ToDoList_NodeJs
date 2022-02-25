const express = require("express");

const router = express.Router();

const homeController =  require('../controller/home_Controller');

router.get('/',homeController.home)

router.post('/add-task',homeController.addTask)

router.get('/delete-task/:id',homeController.deleteTask)

router.post('/toggle-task/:id',homeController.toggleTask)
router.get('/active-tasks',homeController.activeTasks);
router.get('/completed-tasks',homeController.complatedTasks);
router.get('/clear/completed-tasks',homeController.clearCompleted);
module.exports=router;