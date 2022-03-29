const express = require('express');
const router = express.Router();
const auth = require('../../midlewares/auth')


function renderDashboard(req, res) {
  res.render('dashboard', { layout: null })
}

function renderLogin(req, res) {
  res.render('login', { layout: null })
}

router.get('/dashboard', auth,  renderDashboard);
router.get('/receptors', auth,  renderDashboard);
router.get('/reports', auth,  renderDashboard); 
router.post('/logout', renderLogin);

module.exports = router;


