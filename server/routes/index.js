var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('express ok!')
});

router.get('/hello', (req, res) => {
  res.json({
    data: 'hello'
  })
})

module.exports = router;
