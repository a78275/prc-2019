var express = require('express')
var router = express.Router()
var Soccer = require('../controllers/index')

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

router.get('/leagueTeams/:id', async function (req, res, next) {
  dados = await Soccer.leagueTeams(req.params.id)
  res.jsonp(dados.results.bindings)
})

router.get('/leagueGames/:id', async function (req, res, next) {
  dados = await Soccer.leagueGames(req.params.id)
  res.jsonp(dados.results.bindings)
})

router.get('/teams', async function (req, res, next) {
  dados = await Soccer.teams(req.params.id)
  res.jsonp(dados.results.bindings)
})

router.get('/gamesTeam/:id', async function (req, res, next) {
  dados = await Soccer.gamesTeam(req.params.id)
  res.jsonp(dados.results.bindings)
})

router.get('/internationalTeams', async function (req, res, next) {
  dados = await Soccer.internationalTeams()
  res.jsonp(dados.results.bindings)
})

router.get('/teamComment/:id', async function (req, res, next) {
  url = await Soccer.getUrl(req.params.id)
  if (url.results.bindings.length > 0) {
    if (url.results.bindings.length >= 2)
      url = url.results.bindings[1].url.value
    else if (url.results.bindings.length == 1)
      url = url.results.bindings[0].url.value
    dados = await Soccer.getTeamComment(url, function (result) {
      res.jsonp(result.binding.literal._text)
    })
  }
  else
    res.jsonp("")
})

router.get('/name/:id', async function (req, res, next) {
  name = await Soccer.getName(req.params.id)
  res.jsonp(name.results.bindings[0].name.value)
})

router.get('/teamLogo/:id', async function (req, res, next) {
  logo = await Soccer.getTeamLogo(req.params.id)
  if (logo.results.bindings.length >= 1)
    res.jsonp(logo.results.bindings[0].logo.value)
  else
    res.jsonp({})
})

router.get('/abstract/:id', async function (req, res, next) {
  url = await Soccer.getUrl(req.params.id)
  if (url.results.bindings.length > 0) {
    if (url.results.bindings.length >= 2)
      url = url.results.bindings[1].url.value
    else if (url.results.bindings.length == 1)
      url = url.results.bindings[0].url.value
    dados = await Soccer.getAbstract(url, function (result) {
      if (result.binding)
        res.jsonp(result.binding.literal._text)
      else
        res.jsonp("")
    })
  }
  else
    res.jsonp("")
})

router.get('/teamManagerName/:id', async function (req, res, next) {
  url = await Soccer.getUrl(req.params.id)
  if (url.results.bindings.length > 0) {
    if (url.results.bindings.length >= 2)
      url = url.results.bindings[1].url.value
    else if (url.results.bindings.length == 1)
      url = url.results.bindings[0].url.value
    dados = await Soccer.getTeamManager(url, async function (result) {
      if (result != undefined) {
        name = await Soccer.getTeamManagerName(result.binding.uri._text, function (name) {
          if (name.binding)
            res.jsonp(name.binding.literal._text)
          else
            res.jsonp("")
        })
      }
      else
        res.jsonp("")
    })
  }
  else
    res.jsonp("")
})

router.get('/teamManagerAbstract/:id', async function (req, res, next) {
  url = await Soccer.getUrl(req.params.id)
  if (url.results.bindings.length > 0) {
    if (url.results.bindings.length >= 2)
      url = url.results.bindings[1].url.value
    else if (url.results.bindings.length == 1)
      url = url.results.bindings[0].url.value
    dados = await Soccer.getTeamManager(url, async function (result) {
      if (result != undefined) {
        name = await Soccer.getTeamManagerAbstract(result.binding.uri._text, function (name) {
          if (name.binding)
            res.jsonp(name.binding.literal._text)
          else
            res.jsonp("")
        })
      }
      else
        res.jsonp("")
    })
  }
  else
    res.jsonp("")
})

router.get('/homepage/:id', async function (req, res, next) {
  url = await Soccer.getUrl(req.params.id)
  if (url.results.bindings.length > 0) {
    if (url.results.bindings.length >= 2)
      url = url.results.bindings[1].url.value
    else if (url.results.bindings.length == 1)
      url = url.results.bindings[0].url.value
    dados = await Soccer.getHomepage(url, function (result) {
      if (result != undefined)
        res.jsonp(result.binding.uri._text)
      else
        res.jsonp("")
    })
  }
  else
    res.jsonp("")
})

router.get('/teamNumberGames/:id', async function (req, res, next) {
  games = await Soccer.teamNumberGames(req.params.id)
  res.jsonp(games.results.bindings[0])
})

router.get('/teamScoredGoals/:id', async function (req, res, next) {
  sgoals = await Soccer.teamScoredGoals(req.params.id)
  res.jsonp(sgoals.results.bindings[0])
})

router.get('/teamSufferedGoals/:id', async function (req, res, next) {
  sgoals = await Soccer.teamSufferedGoals(req.params.id)
  res.jsonp(sgoals.results.bindings[0])
})

router.get('/teamVictories/:id', async function (req, res, next) {
  sgoals = await Soccer.teamVictories(req.params.id)
  res.jsonp(sgoals.results.bindings[0])
})

router.get('/teamDefeats/:id', async function (req, res, next) {
  sgoals = await Soccer.teamDefeats(req.params.id)
  res.jsonp(sgoals.results.bindings[0])
})

router.get('/teamTies/:id', async function (req, res, next) {
  sgoals = await Soccer.teamTies(req.params.id)
  res.jsonp(sgoals.results.bindings[0])
})

module.exports = router;
