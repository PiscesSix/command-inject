const express = require('express');
const { exec } = require('child_process');
const router = express.Router();

// Function to validate IPv4 addresses (basic validation)
const isValidIP = (ip) => {
    const substringsToRemove = ['&', ';', '| ', '-', '$', '(', ')','||','`'];
    let sanitizedIP = ip;
    for (const substr of substringsToRemove) {
      sanitizedIP = sanitizedIP.split(substr).join('');
    }
    const newIp = sanitizedIP;
    return newIp
};

// Handle GET requests for medium route
router.get('/', (req, res) => {
    const ip = isValidIP(req.query.ip || '');
    if (ip) {
        exec(`ping -c 4 ${ip}`, (error, stdout, stderr) => {
        if (error) {
          res.render('command-inject/hard', { output: `Error: ${stderr}` });
        } else {
          res.render('command-inject/hard', { output: stdout });
        }
      });
    } else {
        res.render('command-inject/hard', { output: '' });
    }
});

module.exports = router;
