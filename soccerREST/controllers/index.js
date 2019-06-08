const Soccer = module.exports
const axios = require('axios')
var convert = require('xml-js')
var dps = require('dbpedia-sparql-client').default

const prefix = 'prefix : <http://www.semanticweb.org/joana/ontologies/2019/soccer#>\n'
const lhost = 'http://localhost:7200/repositories/tp'

async function execQuery(query) {
    try {
        var encoded = encodeURIComponent(query)
        response = await axios.get(lhost + "?query=" + encoded)
        return (response.data)
    }
    catch (erro) {
        return ('ERRO em \'execQuery\': ' + erro)
    }
}

function xml2json(xml) {
    var json = convert.xml2json(xml, { compact: true, spaces: 4 })
    return json
}

Soccer.getCountryLabels = async (input, _callback) => {
    var q = 'select ?label where { '
    for (i = 0; i < (input.length); i++) {
        q += ' { <' + input[i].pais.value + '> rdfs:label ?label . } '
        if (i < 9)
            q += 'union'
    }
    q += 'filter(lang(?label) = \'en\') }'
    dps.client()
        .query(q)
        .timeout(10000)
        .asXml()
        .then(function (r) {
            var res = JSON.parse(xml2json(r)).sparql.results.result
            _callback(res)
        })
        .catch(function (e) {
            console.log('ERRO: ' + e)
        })
}

Soccer.countryLabels = async (input, _callback) => {
    var non_value = []
    var q = 'select ?label where { '
    for (i = 0; i < (input.length); i++) {
        var url = input[i].country
        if (url != undefined) {
            q += ' { <' + url.value + '> rdfs:label ?label . } '
            if (i < input.length - 1)
                q += 'union'
        }
        else {
            non_value.push(i)
        }
    }
    q += 'filter(lang(?label) = \'en\') }'
    dps.client()
        .query(q)
        .timeout(10000)
        .asXml()
        .then(function (r) {
            var res = JSON.parse(xml2json(r)).sparql.results.result
            _callback(res, non_value)
        })
        .catch(function (e) {
            console.log('ERRO: ' + e)
        })
}

Soccer.top10 = async () => {
    const query = prefix + `select ?rank ?nome ?psi ?off ?def ?league ?pais where { 
        ?team a :LeagueTeam ;
              :name ?nome ;
              :rank ?rank ;
              :playsIn ?liga ;
              :psi ?psi ;
              :offense ?off ;
              :defense ?def .
        ?liga :name ?league .
    	OPTIONAL {?liga :hasCountry ?pais .}
        } 
        order by asc(xsd:integer(?rank))
        limit 10`
    var res = await execQuery(query)
    return res
}

Soccer.englandtop5 = async () => {
    const query = prefix + `select ?name (sum(?res) as ?pnt) (sum(?m) as ?scored) (sum(?s) as ?suffered) where { 
        ?team a :Team .
    	?team :name ?name .
        ?team :playsIn :barclayspremierleague .
        { ?team :isHomeTeam ?game .
          ?game :hasLeague :barclayspremierleague .
          ?game :date ?date .
          FILTER(?date > "2018-07-31")
          FILTER (?date < "2019-06-07")
          ?game :scoreHome ?h .
          ?game :scoreVisitor ?v .
          BIND ( xsd:integer(?h) as ?m )
          BIND ( xsd:integer(?v) as ?s )
          BIND ( IF ( ?h > ?v, xsd:integer("3"), 
                    IF ( ?h < ?v, xsd:integer("0"), 
                       IF ( ?h = ?v, xsd:integer("1"), BNODE() ))
               ) AS ?res )}
        union
        { ?team :isVisitorTeam ?game .
          ?game :hasLeague :barclayspremierleague .
          ?game :date ?date .
          FILTER(?date > "2018-07-31")
          FILTER (?date < "2019-06-07")
          ?game :scoreVisitor ?v .
          ?game :scoreHome ?h .
          BIND ( xsd:integer(?v) as ?m )
          BIND ( xsd:integer(?h) as ?s )
          BIND ( IF ( ?h < ?v, xsd:integer("3"), 
                    IF ( ?h > ?v, xsd:integer("0"), 
                       IF ( ?h = ?v, xsd:integer("1"), BNODE() ))
               ) AS ?res )}
    } 
    group by ?name
    order by desc(?pnt)
    limit 5`
    var res = await execQuery(query)
    return res
}

Soccer.spaintop5 = async () => {
    const query = prefix + `select ?name (sum(?res) as ?pnt) (sum(?m) as ?scored) (sum(?s) as ?suffered) where { 
        ?team a :Team .
    	?team :name ?name .
        ?team :playsIn :spanishprimeradivision .
        { ?team :isHomeTeam ?game .
          ?game :hasLeague :spanishprimeradivision .
          ?game :date ?date .
          FILTER(?date > "2018-07-31")
          FILTER (?date < "2019-06-07")
          ?game :scoreHome ?h .
          ?game :scoreVisitor ?v .
          BIND ( xsd:integer(?h) as ?m )
          BIND ( xsd:integer(?v) as ?s )
          BIND ( IF ( ?h > ?v, xsd:integer("3"), 
                    IF ( ?h < ?v, xsd:integer("0"), 
                       IF ( ?h = ?v, xsd:integer("1"), BNODE() ))
               ) AS ?res )}
        union
        { ?team :isVisitorTeam ?game .
          ?game :hasLeague :spanishprimeradivision .
          ?game :date ?date .
          FILTER(?date > "2018-07-31")
          FILTER (?date < "2019-06-07")
          ?game :scoreVisitor ?v .
          ?game :scoreHome ?h .
          BIND ( xsd:integer(?v) as ?m )
          BIND ( xsd:integer(?h) as ?s )
          BIND ( IF ( ?h < ?v, xsd:integer("3"), 
                    IF ( ?h > ?v, xsd:integer("0"), 
                       IF ( ?h = ?v, xsd:integer("1"), BNODE() ))
               ) AS ?res )}
    } 
    group by ?name
    order by desc(?pnt)
    limit 5`
    var res = await execQuery(query)
    return res
}

Soccer.portugaltop5 = async () => {
    const query = prefix + `select ?name (sum(?res) as ?pnt) (sum(?m) as ?scored) (sum(?s) as ?suffered) where { 
        ?team a :Team .
    	?team :name ?name .
        ?team :playsIn :portugueseliga .
        { ?team :isHomeTeam ?game .
          ?game :hasLeague :portugueseliga .
          ?game :date ?date .
          FILTER(?date > "2018-07-31")
          FILTER (?date < "2019-06-07")
          ?game :scoreHome ?h .
          ?game :scoreVisitor ?v .
          BIND ( xsd:integer(?h) as ?m )
          BIND ( xsd:integer(?v) as ?s )
          BIND ( IF ( ?h > ?v, xsd:integer("3"), 
                    IF ( ?h < ?v, xsd:integer("0"), 
                       IF ( ?h = ?v, xsd:integer("1"), BNODE() ))
               ) AS ?res )}
        union
        { ?team :isVisitorTeam ?game .
          ?game :hasLeague :portugueseliga .
          ?game :date ?date .
          FILTER(?date > "2018-07-31")
          FILTER (?date < "2019-06-07")
          ?game :scoreVisitor ?v .
          ?game :scoreHome ?h .
          BIND ( xsd:integer(?v) as ?m )
          BIND ( xsd:integer(?h) as ?s )
          BIND ( IF ( ?h < ?v, xsd:integer("3"), 
                    IF ( ?h > ?v, xsd:integer("0"), 
                       IF ( ?h = ?v, xsd:integer("1"), BNODE() ))
               ) AS ?res )}
    } 
    group by ?name
    order by desc(?pnt)
    limit 5`
    var res = await execQuery(query)
    return res
}

Soccer.italytop5 = async () => {
    const query = prefix + `select ?name (sum(?res) as ?pnt) (sum(?m) as ?scored) (sum(?s) as ?suffered) where { 
        ?team a :Team .
    	?team :name ?name .
        ?team :playsIn :italyseriea .
        { ?team :isHomeTeam ?game .
          ?game :hasLeague :italyseriea .
          ?game :date ?date .
          FILTER(?date > "2018-07-31")
          FILTER (?date < "2019-06-07")
          ?game :scoreHome ?h .
          ?game :scoreVisitor ?v .
          BIND ( xsd:integer(?h) as ?m )
          BIND ( xsd:integer(?v) as ?s )
          BIND ( IF ( ?h > ?v, xsd:integer("3"), 
                    IF ( ?h < ?v, xsd:integer("0"), 
                       IF ( ?h = ?v, xsd:integer("1"), BNODE() ))
               ) AS ?res )}
        union
        { ?team :isVisitorTeam ?game .
          ?game :hasLeague :italyseriea .
          ?game :date ?date .
          FILTER(?date > "2018-07-31")
          FILTER (?date < "2019-06-07")
          ?game :scoreVisitor ?v .
          ?game :scoreHome ?h .
          BIND ( xsd:integer(?v) as ?m )
          BIND ( xsd:integer(?h) as ?s )
          BIND ( IF ( ?h < ?v, xsd:integer("3"), 
                    IF ( ?h > ?v, xsd:integer("0"), 
                       IF ( ?h = ?v, xsd:integer("1"), BNODE() ))
               ) AS ?res )}
    } 
    group by ?name
    order by desc(?pnt)
    limit 5`
    var res = await execQuery(query)
    return res
}

Soccer.leagues = async () => {
    const query = prefix + `select ?league ?name ?country where { 
        ?league a :League ;
              :name ?name .
        OPTIONAL {?league :hasCountry ?country . } 
    }`
    var res = await execQuery(query)
    return res
}

Soccer.leagueTeams = async (idLeague) => {
    var query = prefix + '\n'
    query += `select ?name (sum(?res) as ?pnt) (count(?vi) as ?victories) (count(?t) as ?ties) (count(?l) as ?losses) (sum(?m) as ?scored) (sum(?s) as ?suffered) where {
        ?team a :Team .
        ?team :name ?name .\n` + '?team :playsIn :' + idLeague + ` .
        {?team :hasVictory ?vi.
    	?vi :hasLeague :` + idLeague + ` .
    	?vi :date ?date .
        FILTER(?date > "2018-07-31")
        FILTER (?date < "2019-06-07")
        }
    	union
    	{?team :hasDraw ?t.
    	?t :hasLeague :` + idLeague + ` .
    	?t :date ?date .
        FILTER(?date > "2018-07-31")
        FILTER (?date < "2019-06-07")
        }
    	union
    	{?team :hasDefeat ?l.
    	?l :hasLeague :` + idLeague + ` .
    	?l :date ?date .
        FILTER(?date > "2018-07-31")
        FILTER (?date < "2019-06-07")
        }
    	union
        { ?team :isHomeTeam ?game .
          ?game :hasLeague :` + idLeague + ` .
          ?game :date ?date .
          FILTER(?date > "2018-07-31")
          FILTER (?date < "2019-06-07")
          ?game :scoreHome ?h .
          ?game :scoreVisitor ?v .
          BIND ( xsd:integer(?h) as ?m )
          BIND ( xsd:integer(?v) as ?s )
          BIND ( IF ( ?h > ?v, xsd:integer("3"),
                    IF ( ?h < ?v, xsd:integer("0"),
                       IF ( ?h = ?v, xsd:integer("1"), BNODE() ))
               ) AS ?res )}
        union
        { ?team :isVisitorTeam ?game .
          ?game :hasLeague :` + idLeague + ` .
          ?game :date ?date .
          FILTER(?date > "2018-07-31")
          FILTER (?date < "2019-06-07")
          ?game :scoreVisitor ?v .
          ?game :scoreHome ?h .
          BIND ( xsd:integer(?v) as ?m )
          BIND ( xsd:integer(?h) as ?s )
          BIND ( IF ( ?h < ?v, xsd:integer("3"),
                    IF ( ?h > ?v, xsd:integer("0"),
                       IF ( ?h = ?v, xsd:integer("1"), BNODE() ))
               ) AS ?res )}
    }
    group by ?name
    order by desc(?pnt)`
    var res = await execQuery(query)
    return res
}

Soccer.leagueGames = async (idLeague) => {
    var query = prefix + '\n'
    query += `select ?game ?homeTeam ?visitorTeam ?date ?scHome ?scVisitor ?impHome ?impVisitor where { 
        ?game a :Game .
    	?game :hasLeague :` + idLeague + ` .
    	?game :date ?date .
    	FILTER(?date > "2018-07-31")
        FILTER (?date < "2019-06-07")
        ?game :hasHomeTeam ?ht .
        ?ht :name ?homeTeam .
        ?game :hasVisitorTeam ?vt .
        ?vt :name ?visitorTeam .
    	?game :scoreHome ?scHome .
    	?game :scoreVisitor ?scVisitor .
    	?game :importanceHome ?impHome .
    	?game :importanceVisitor ?impVisitor .
    } 
    order by desc(?date)`
    var res = await execQuery(query)
    return res
}

Soccer.teams = async () => {
    const query = prefix + `select ?team ?name ?league ?psi where { 
        ?team a :LeagueTeam ;
              :name ?name ;
              :playsIn ?l ;
              :psi ?psi .
    	?l :name ?league .
    }
    order by desc(xsd:float(?psi))`
    var res = await execQuery(query)
    return res
}

Soccer.gamesTeam = async (idTeam) => {
    var query = prefix + '\n'
    query += `select ?name ?date ?game ?league ?home ?away ?scHome ?scVisitor ?impHome ?impVisitor where { 
        :` + idTeam + ` :name ?name .
        { :`+ idTeam + ` :isHomeTeam ?game .
        ?game :hasLeague ?liga .
        ?liga :name ?league .
        ?game :hasVisitorTeam ?team2 .
        ?team2 :name ?away .
        ?game :date ?date .
        ?game :scoreHome ?scHome .
        ?game :scoreVisitor ?scVisitor .
        ?game :importanceHome ?impHome .
        ?game :importanceVisitor ?impVisitor .
        }
        union
        { :` + idTeam + ` :isVisitorTeam ?game .
        ?game :hasLeague ?liga .
        ?liga :name ?league .
        ?game :hasHomeTeam ?team2 .
        ?team2 :name ?home .
        ?game :date ?date .
        ?game :scoreVisitor ?scVisitor .
        ?game :scoreHome ?scHome .
        ?game :importanceHome ?impHome .
        ?game :importanceVisitor ?impVisitor .
        }
    }
    order by desc(?date)`
    var res = await execQuery(query)
    return res
}

Soccer.internationalTeams = async () => {
    const query = prefix + `select ?c ?name ?confed ?rank where { 
        ?c a :CountryTeam;
            :name ?name.
        ?c :hasConfederation ?conf.
        ?conf :name ?confed.
        ?c :rank ?rank.
    }
    order by asc(xsd:integer(?rank))`
    var res = await execQuery(query)
    return res
}