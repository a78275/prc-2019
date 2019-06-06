#!/usr/local/bin/python3

#import the CSV module for dealing with CSV files
import csv, re

leagueTeams = []
leagues = []
countryTeams = []
confeds = []

def cleanText(text):
    text = text.lower()
    text = re.sub(r"\s+","",text)
    text = re.sub(r"[!?'\"\-.;:,#$%&/()\[\]]","",text)
    return text

teamsNleaguesfile = open('../csv/spi_global_rankings.csv', 'rt')
teamsLeague = csv.reader(teamsNleaguesfile)

countryteamsfile = open('../csv/spi_global_rankings_intl.csv', 'rt')
teamsCountry = csv.reader(countryteamsfile)

outfile = open('../results/teams.ttl', 'w')

#LEAGUE TEAMS
rownum = 0
for row in teamsLeague:
    if rownum == 0: 
        pass
    else:
        c = row
        #rank,prev_rank,name,league,off,def,spi
        idt = cleanText(c[2])
        lg = cleanText(c[3])
        league = ""
        entry = ""
        if idt not in leagueTeams:
            entry = ":" + idt + " a :LeagueTeam ;\n\t"
            entry += ":name \"" + c[2] + "\".\n"  
            leagueTeams.append(idt)
        if lg not in leagues:
            league = ":" + lg + " a :League ;\n\t"
            league += ":name \"" + c[3] + "\".\n"
            leagues.append(lg)
        entry += ":" + idt + " :playsIn :" + lg + ";\n\t"
        entry += ":rank \"" + c[0] + "\";\n\t"
        entry += ":prev_rank \"" + c[1] + "\";\n\t"
        entry += ":offense \"" + c[4] + "\";\n\t"
        entry += ":defense \"" + c[5] + "\";\n\t"
        entry += ":psi \"" + c[6] + "\".\n\n"
        league += ":" + lg + " :hasLeagueTeam :" + idt + ".\n\n"

        outfile.write(entry)
        outfile.write(league)
    rownum += 1

#COUNTRY TEAMS
rownum = 0
for row in teamsCountry:
    if rownum == 0:
        pass
    else:
        c = row
        #rank,name,confed,off,def,spi
        idt = cleanText(c[1])
        conf = cleanText(c[2])
        confed = ""
        entry = ""
        if idt not in countryTeams:
            entry = ":" + idt + " a :CountryTeam ;\n\t"
            entry += ":name \"" + c[1] + "\".\n" 
            countryTeams.append(idt)
        if conf not in confeds:
            confed = ":" + conf + " a :Confederation ;\n\t"
            confed += ":name \"" + c[2] + "\".\n" 
            confeds.append(conf) 
        entry += ":" + idt +  " :hasConfederation :" + conf + ";\n\t"
        entry += ":rank \"" + c[0] + "\";\n\t"
        entry += ":offense \"" + c[3] + "\";\n\t"
        entry += ":defense \"" + c[4] + "\";\n\t"
        entry += ":psi \"" + c[5] + "\".\n\n"
        confed += ":" + conf + " :hasCountryTeam :" + idt + ".\n\n"

        outfile.write(entry)
        outfile.write(confed)
    rownum += 1

outfile.close()
teamsNleaguesfile.close()
countryteamsfile.close()