var express = require('express')
var router = express.Router()
var Soccer = require('../controllers/index')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})

router.get('/top10', async function (req, res, next) {
  var dados = await Soccer.top10()
  await Soccer.getCountryLabels(dados.results.bindings, function (result) {
    for (i = 0; i < result.length; i++) {
      var label = result[i].binding.literal._text
      dados.results.bindings[i].pais.value = label
    }
    res.jsonp(dados.results.bindings)
  })
})

router.get('/englandtop5', async function (req, res, next) {
  dados = await Soccer.englandtop5()
  res.jsonp(dados.results.bindings)
})

router.get('/spaintop5', async function (req, res, next) {
  dados = await Soccer.spaintop5()
  res.jsonp(dados.results.bindings)
})

router.get('/portugaltop5', async function (req, res, next) {
  dados = await Soccer.portugaltop5()
  res.jsonp(dados.results.bindings)
})

router.get('/italytop5', async function (req, res, next) {
  dados = await Soccer.italytop5()
  res.jsonp(dados.results.bindings)
})

router.get('/leagues', async function (req, res, next) {
  dados = await Soccer.leagues()
  await Soccer.countryLabels(dados.results.bindings, function (result, non_value) {
    for (i = 0, j = 0; i < dados.results.bindings.length; i++) {
      if (!non_value.includes(i)) {
        var label = result[j].binding.literal._text
        j++
        dados.results.bindings[i].country.value = label
      }
    }
    res.jsonp(dados.results.bindings)
  })
})

router.get('/leagueteams/:id', async function (req, res, next) {
  dados = await Soccer.leagues()
  res.jsonp(dados.results.bindings)
})

module.exports = router;
