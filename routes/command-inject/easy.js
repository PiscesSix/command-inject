const express = require('express');
const { exec } = require('child_process');
const router = express.Router();

// Function to validate IPv4 addresses (basic validation)
const isValidIP = (ip) => {
    // No check
    return true;
};

// Handle GET requests for easy route
router.get('/', (req, res) => {
  const ip = req.query.ip || '';
  console.log(ip);
  if (ip) {
    if (isValidIP(ip)) {
      exec(`ping -c 4 ${ip}`, (error, stdout, stderr) => {
        if (error) {
          res.render('command-inject/easy', { output: `Error: ${stderr}` });
        } else {
          res.render('command-inject/easy', { output: stdout });
        }
      });
    } else {
      res.render('command-inject/easy', { output: 'Invalid IP address format' });
    }
  } else {
    res.render('command-inject/easy', { output: '' });
  }
});

module.exports = router;
