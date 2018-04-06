const express = require('express');
const router = express.Router();

router.post('/send', (req, res, next) => {
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey("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");
    const msg = {
      to: req.body.to,
      from: req.body.from,
      subject: req.body.subject,
      text: req.body.text,
      html: req.body.html,
    };
    sgMail.send(msg);
    res.json({success: true, msg:'Mail sent!'});
});



module.exports = router;
