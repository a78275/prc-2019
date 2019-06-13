# PRC 2019 - SOCCER

Web application to check data about soccer.

## Folder Structure

Structured in 3 main folders:

* datasets
    * csv: contains csv files that contain soccer data
    * ontology: contains the turtle file with the final ontology
    * results: contains the results of the scripts executed over the csv files
    * scripts: contains the Python scripts to turn the data in the csv files into turtle
* soccer: frontend of the application
* soccerREST: backend of the application

## Backend

The server is fetching data from GraphDB (listening on port 7200 in localhost) and DBPedia and responding to port 8090.

## Frontend

Is fetching data from port 8090 in localhost, and responding to port 8080.

## Usage

Make sure you have GraphDB running and the ontology imported in a repository named 'tp'.

On both soccer and soccerREST make:

```bash
npm install
```

On soccerREST make:

```bash
npm start
```

On soccer make:

```bash
npm run serve
```

The application is now available in <http://localhost:8080>.