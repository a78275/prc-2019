#!/usr/local/bin/python3

#import the CSV module for dealing with CSV files
import csv, re

def cleanText(text):
    text = text.lower()
    text = re.sub(r"\s+","",text)
    text = re.sub(r"[!?'\"\-.;:,#$%&/()\[\]]","",text)
    return text

matchesfile = open('../csv/spi_matches.csv', 'rt')
#create the 'matchesfile' variable and open the CSV file into that
games = csv.reader(matchesfile)

#create a new variable 'outfile' to create a new file that to pass TTL into
outfile = open('../results/games.ttl', 'w')

rownum = 0
for row in games:
    if rownum == 0: #ignore the first row
        pass
    else:
        c = row
        entry = ""
        teams = ""
        #date,league_id,league,team1,team2,spi1,spi2,prob1,prob2,probtie,proj_score1,proj_score2,importance1,importance2,score1,score2,xg1,xg2,nsxg1,nsxg2,adj_score1,adj_score2
        id_game = cleanText(c[3]+c[4]+c[0])
        league = cleanText(c[2])
        team1 = cleanText(c[3])
        team2 = cleanText(c[4])

        entry = ":" + id_game + " a :Game ;\n\t"
        entry += ":hasLeague :" + league + ";\n\t"
        entry += ":hasHomeTeam :" + team1 + ";\n\t"
        entry += ":hasVisitorTeam :" + team2 + ";\n\t"
        entry += ":date \"" + c[0] + "\";\n\t"
        entry += ":importanceHome \"" + c[12] + "\";\n\t"
        entry += ":importanceVisitor \"" + c[13] + "\";\n\t"
        entry += ":scoreHome \"" + c[14] + "\";\n\t"
        entry += ":scoreVisitor \"" + c[15] + "\".\n\n"

        teams += ":" + team1 + " :isHomeTeam :" + id_game + ".\n\n"
        teams += ":" + team2 + " :isVisitorTeam :" + id_game + ".\n\n"
        
        if c[14] > c[15]:
            teams += ":" + team1 + " :hasVictory :" + id_game + " .\n\n"
            teams += ":" + team2 + " :hasDefeat :" + id_game + " .\n\n"
            teams += ":" + id_game + " :hasWinner :" + team1 + " .\n\n"
            teams += ":" + id_game + " :hasLoser :" + team2 + " .\n\n"
        
        elif c[15] > c[14]:
            teams += ":" + team2 + " :hasVictory :" + id_game + " .\n\n"
            teams += ":" + team1 + " :hasDefeat :" + id_game + " .\n\n"
            teams += ":" + id_game + " :hasWinner :" + team2 + " .\n\n"
            teams += ":" + id_game + " :hasLoser :" + team1 + " .\n\n"

        elif c[15] == c[14]:
            teams += ":" + team2 + " :hasDraw :" + id_game + " .\n\n"
            teams += ":" + team1 + " :hasDraw :" + id_game + " .\n\n"
            teams += ":" + id_game + " :hasTie :" + team2 + " .\n\n"
            teams += ":" + id_game + " :hasTie :" + team1 + " .\n\n"

        outfile.write(entry)	#write into the file
        outfile.write(teams)	#write into the file
    rownum += 1

#close the two files
outfile.close()
matchesfile.close()