/* Movie Festival

Kreirajti novu JavaScript datoteku nazvanu movie festival.js, upotrebiti striktni mod.
Kreirajti anonimnu funkciju koja se odmah poziva i koja će održati glavno izvršavanje svih programskih poziva. 
Kreirajti konstruktorske funkcije sa svojstvima koja predstavljaju sledeće:
Žanr - ime;
Film - naslov, žanr (primer žanra), dužina;
Program - datum, spisak filmova (na početku prazan) i ukupan broj filmova;
Festival - ime, spisak programa (početno prazan) i broj filmova u svim programima;

Dodati metod getData u Žanr koji vraća formatirani niz kao prvo i poslednje slovo imena žanra
"Akcija" -> AN
"Drama" -> DA
"Komedija" -> CI
"Science Fiction" -> SN

Dodati metod getData u Movie. Trebalo bi da vrati formatirani niz koji se sastoji od naziva filma, dužine i žanra.
Star Wars, 130min, SN
Dodati metod addMovie u Program. Trebalo bi da dobije film i da doda film na listu filmova datog programa.
Dodati addProgram metod na Festival. Trebalo bi dobiti program i dodati program na listu programa datog festivala.
Dodati metod getData u Program. Trebalo bi da vrati formatirani niz svih podataka koji se odnose na program. 
Niz bi trebalo da sadrži datum, dužinu programa (izračunat od dužine svih filmova u spisku) i podatke o filmovima u listi
Prikazivanje podataka o filmu, koristi se Movie getData metod.

Datum, dužina programa iz svih filmova
     Prvi naslov filma, dužina i žanr
     Drugi naslov filma, dužina i žanr
     Treći naslov filma, dužina i žanr
     Četvrto ime filma i dužina i žanr

Dodajte metod getData na Festival koji vraća formatirani niz kao što je ime festivala, broj filmova u svim programima i 
svim programima koji su navedeni. Koristiće se programi getData da bi popisali sve programe. 

Vikendni festival ima 4 naslova filma
28.10.2017., trajanje programa 368min
Spider-Man: Homecoming, 133min, AN
Rat za Planetu majmuna, 140min, DA
Mračni toranj, 95min, VN
29.10.2017, trajanje programa 108min
Deadpool, 108min, CI

Unutar funkcije koja se odmah poziva, dodaje se funkcija createMovie koja prima naslov filma, dužinu filma i žanr (kao niz)
kao parametre i vraća kreirani film.
Unutar funkcije koja se odmah poziva, dodaje se createProgram funkcija koja prima datum i vraća stvoreni program.
*******************************************
Zadaci: Kreirati film.

U svojoj glavnoj programskoj funkciji kreirati instancu objekta.

Kreirati dve instance programa koristeći createProgram funkciju.
Kreirati četiri instance objekta Movie pomoću funkcije createMovie. 
Dodati sve kreirane filmove za oba programa koristeći addMovie metodu.
Dodati stvorene instance programa kreiranoj instanci festivala koristeći metod addProgram festivala.
Prikazati podatke festivala koristeći getData metodu.
Pojašnjenje
Lista je sinonim za niz, pa kada kažemo spisak filmova, to je zapravo niz filmova-elemenata
Koristi se JS ugrađeni datum () objekt da bi se kreirao Date objekat
Koristi se \ t i \ n posebne stringove za formatiranje izlaza
Koriste se ugrađene metode Stringa da bi se prebacio tekst sa malih slova na velika slova
Koriste se Array ugrađene metode za dodavanje i uklanjanje elemenata iz polja
*/
'use strict';

// Predstavljanje žanra filma, konstruktorskom funkcijom
function Genre(genreName) {
    this.name = genreName;
    // Definišemo properties Žanr, Film, Program i Festival
}
Genre.prototype.getData = function () {
    var name = this.name;
    var firstIndex = 0;
    var lastIndex = name.length - 1;
    var genreAbb = name.charAt(firstIndex) + name.charAt(lastIndex);
    return genreAbb.toUpperCase();
};

function Movie(title, genreObj, length) {
    this.title = title;
    this.genreMovie = genreObj;
    this.length = length;
}
Movie.prototype.getData = function () {
    return this.title + ', ' + this.length + 'min, ' + this.genreMovie;
}

function Program(date, listOfMovies) {
    this.date = date;
    this.listOfMovies = [];
}
Program.prototype.addMovie = function (movie) {
    this.listOfMovies.push(movie);
}
// Treba da izračunamo i dužinu trajanja programa
Program.prototype.getProgramDuration = function () {
    var programLength = 0;
    this.listOfMovies.forEach((movie) => {
        programLength += movie.length;
    }, this);
    return programLength;
};
/*Dodati metod getData u Program. Trebalo bi da vrati formatirani niz svih podataka koji se odnose na program.
Niz bi trebalo da sadrži datum, dužinu programa (izračunat od dužine svih filmova u spisku) i podatke o filmovima 
u listi */
Program.prototype.getData = function () {
    var date = this.date;
    var programDuration = this.getProgramDuration();
    var movies = this.listOfMovies;
    var dateStr = date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear();

    var outputStr = dateStr + ', program traje' + programDuration + 'min\n';

    for (var i = 0; i < movies.length; i++) {
        var movie = movies[i];
        outputStr += "\t\t" + movie.getData() + "\n";
    }
    return outputStr;
}
//Dodati addProgram metod na Festival. Trebalo bi dobiti program i dodati program na listu programa datog festivala.
function Festival(name, listOfPrograms) {
    this.name = name;
    this.listOfPrograms = [];
}
Festival.prototype.addProgram = function (program) {
    this.listOfPrograms.push(program);
}
// Returns movie count in all programs
Festival.prototype.getMoviesCount = function () {
    var programs = this.listOfPrograms;
    var moviesCount = 0;

    for (var i = 0; i < programs.length; i++) {
        var program = programs[i];
        moviesCount += program.listOfMovies.length;
    }

    return moviesCount;
};
/* Dodaje metod getData na Festival koji vraća formatirani niz kao što je ime festivala, broj filmova u svim programima i 
 svim programima koji su navedeni. Koristiće se programi getData da bi popisali sve programe. */

// Vraća string sa svim festivalskim informacijama. Koristimo getData da popišemo sve programe.
Festival.prototype.getData = function () {
    var festivalName = this.name;
    var programs = this.listOfPrograms;
    var totalMovCount = this.getMoviesCount();
    var outputStr = festivalName + ' ima' + totalMovCount + ' filmskih naslova \n';

    for (var i = 0; i < programs.length; i++) {
        var program = programs[i];
        outputStr += "\t" + program.getData();
    }
    return outputStr;
};

/*Unutar funkcije koja se odmah poziva, dodaje se funkcija createMovie koja prima naslov filma, dužinu filma i žanr 
(kao niz) kao parametre i vraća kreirani film.
Unutar funkcije koja se odmah poziva, dodaje se createProgram funkcija koja prima datum i vraća stvoreni program.*/
//Ova f-ja vraća kreirani film
(function () {
    function createMovie(mTitle, mLength, genreName) {
        var genreObj = new Genre(genreName);
        // var movie = new Movie(movieTitle, new Genre(genreName), mLength);
        var movie = new Movie(mTitle, genreObj, mLength);

        return movie;
    }
    //Ova f-ja vraća kreirani film za određeni datum
    function createProgram(dateStr) {
        var date = new Date(dateStr);
        var program = new Program(date);

        return program;
    }
    // Kreiramo filmove
    var spiderman = createMovie("Spider-Man: Homecoming", 133, "Action");
    var planetApes = createMovie("War for the Planet of the Apes", 140, "Drama");
    var darkTower = createMovie("The Dark Towe", 95, "Western");
    var deadpool = createMovie("Deadpool", 108, "Comedy");

    // Kreiramo program 
    var actionProgram = createProgram("Oct 28 2017");
    var comedyProgram = createProgram("Oct 29 2017");

    // Add action movies to action program
    actionProgram.addMovie(spiderman);
    actionProgram.addMovie(planetApes);
    actionProgram.addMovie(darkTower);

    // Add comedy movies to comedy program
    comedyProgram.addMovie(deadpool);

    // Kreiramo festival
    var weekendFestival = new Festival("Weekend festival");

    // Add programs to the festival 
    weekendFestival.addProgram(actionProgram);
    weekendFestival.addProgram(comedyProgram);

    // Output festival data 
    console.log(weekendFestival.getData());

})();