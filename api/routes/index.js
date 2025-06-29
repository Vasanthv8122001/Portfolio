const express = require('express');
const router = express.Router();
const { notification } = require('../controller/notification');
const { sendEmail } = require('../common/mail');

router.post('/notification', notification)
router.post('/sendEmail', sendEmail)

module.exports = router;