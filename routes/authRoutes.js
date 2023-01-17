const express = require('express');
const authController = require('../controllers/auth_controller');

const router = express.Router();

// Vendor Routes
router.post('/seller/register', authController.registerSeller);
router.post('/seller/login', authController.loginSeller);

// Buyer Routes
router.post('/buyer/register', authController.registerBuyer);
router.post('/buyer/login', authController.loginBuyer);

// Assistant Routes
router.post('/assistant/register', authController.registerBuyer);
router.post('/assistant/login', authController.loginBuyer);

// Admin Routes
router.post('/admin/login', authController.loginAdmin);

module.exports = router;