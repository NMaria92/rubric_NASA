// I rubricen anvendes en "Application Programming Interface (API)". Et API er en metode som er gjort tilgængelig for andre på nettet.
// For at hente data fra API'et, er det første trin, at erklære en variabel.
// Derfor erklærer jeg en variabel af typen "const" og kalder den "apod". I variablen gemmes den URL til API'et, som jeg vil hente data fra.
// I URLen hentes data vha. et API-kald til NASAs server gennem en variabel (kaldet apod) med en URL i. URL'en består af hhv. protokol, host, path og en query string som begynder ved spørgsmålstegnet(?). 
// I query-string'en er der først beskrevet et query-parameter kaldet "api-key". Efterfulgt af et lighedstegn(=) og en query-parameter værdi i form af en API-key: "BbjyApGxbJuIkIIsOiKNAMmK9iO41fKAp7XuBR1L".
const apod = "https://api.nasa.gov/planetary/apod?api_key=BbjyApGxbJuIkIIsOiKNAMmK9iO41fKAp7XuBR1L";

// Jeg hapser det element, fra mit HTML-dokument, som har id'et "picture". Det gør jeg for at kunne tilføje dataen fra API'en til dette element.
const pictureEl = document.querySelector('#picture');

// Fetch-metoden bruges til at hente data fra en URL. Det er en asynkron funktion, som betyder at den ikke blokerer for andre funktioner længere nede i koden, mens den henter dataen.
// Jeg bruger fetch-metoden til at hente data fra API'et, som jeg har gemt i ovenstående variabel, kaldet "apod" og hente det ned til mit eget dokument.
fetch(apod) // i parantesen skrives URL'en til API'en, som jeg vil hente data fra.
.then(res => res.json()) // "then"-metoden bruges til at håndtere det data, som jeg henter fra ovenstående URL. Dataen pakkes i JavaScript Object Notation(JSON) fil-format. 
// dette gøres for at komprimere dataen til et string-objekt og gøre det lettere at transportere fra API'et til mit eget dokument. Res.json() laver stringen om til et JavaScript objekt. 
.then(data => showPicture(data)) // herefter bruges "then"-metoden igen til at sende data-objektet fra res.json() til en funktion kaldet "showPicture".
.catch(err => alert("Fejl! Der er desværre sket en fejl", err)); // "catch"-metoden bruges til at håndtere eventuelle fejl i forbindelse med hentning af dataen. Konkret vil der blive givet en fejlbesked i en alert boks i browseren.


// En funktion anvendes til at undgå repetition af kode - det er altså en blok af kode, som kan genbruges igen og igen (altså for at holde koden "DRY") 
// I denne rubric anvendes der en funktion kaldet "showPicture", som tager udvalgt data fra API'et og viser det i HTML-dokumentet.
function showPicture(data) {
    const newImg = document.createElement('img'); // Jeg opretter et nyt billede-element "img" i HTML-dokumentet vha. "createElement" og gemmer det i en variabel kaldet "newImg".
    newImg.src = data.url; // Jeg tilføjer en source til det nye billede-element, hvis reference stammer fra API'et som jeg har hentet ned.
    const newDate = document.createElement('p'); // Jeg opretter et nyt paragraph-element "p" i HTML-dokumentet vha. "createElement" og gemmer det i en variabel kaldet "newDate".
    newDate.textContent = data.date; // Jeg tilføjer en tekst til "p", hvis reference også stammer fra API'et - stien dertil fandt jeg ved at kigge i inspect-tool, hvor jeg fandt et objekt med en key kaldet "date".
    const newTitle = document.createElement('h2'); // Jeg opretter en "h2" i HTML-dokumentet vha. "createElement" og gemmer det i en variabel kaldet "newTitle".
    newTitle.textContent = data.title; // Jeg tilføjer tekst til min H2, hvis reference også stammer fra API'et - jeg finder stien dertil ved at kigge i inspect-tool - her fandt jeg et objekt med en key kaldet "title". 
    const newExplanation = document.createElement('p'); // Jeg opretter et "p" i HTML-dokumentet vha. "createElement" og gemmer det i en variabel kaldet "newExplanation".
    newExplanation.textContent = data.explanation; // Jeg tilføjer tekst til min "p". På samme måde som ovenstående finder jeg stien dertil ved at kigge i inspect-tool - og fandt en key kaldet "explanation".
    
    // Appendchild bruges til at tilføje det nye indhold fra API'et til det eksisterende element "pictureEl", i HTML-dokumentet.
    pictureEl.appendChild(newImg);
    pictureEl.appendChild(newDate);
    pictureEl.appendChild(newTitle);
    pictureEl.appendChild(newExplanation);
}


// YDERLIGERE FUNKTIONALITET
// KNAP DER TILFØJER FLERE BILLEDER: + COUNTER DER TRACKER HVOR MANGE GANGE DER ER BLEVET TILFØJET BILLEDER:
let pictureDate = new Date(); // Jeg opretter en variabel kaldet "pictureDate" og tildeler den datoen for i dag. For at gøre datoen dynamisk anvendes "new Date()". "new Date()" er en funktion, der henter datoen for i dag i browseren.

const previous = document.querySelector('#moreContentBtn'); // Jeg opretter en variabel kaldet "previous" og tildeler den et element fra HTML-dokumentet med id'et "moreContentBtn".
previous.addEventListener("click", displayMoreContent); // Jeg tilføjer en eventlistener til knappen. Når der klikkes på knappen, skal funktionen "displayMoreContent" køres.

const moreContent = document.querySelector('#extra'); // Jeg opretter en variabel kaldet "moreContent" og tildeler den et element fra mit HTML-dokumentet med id'et "extra".


let counter = document.querySelector('#counter'); // Jeg ønsker at lave en counter og opretter derfor en variabel kaldet "counter". Jeg tildeler den et element fra HTML-dokumentet med id'et "counter".
let count = 0; // Jeg opretter en variabel kaldet "count" og tildeler den værdien 0. 

function displayMoreContent() { //  Her oprettes en funktion som jeg kalder "displayMoreContent".
    pictureDate.setDate(pictureDate.getDate() - 1); // Her bruger jeg en funktion (inde i en funktion) til at ændre datoen og for at få adgang til et ældre billede fra API'en. 
    // Jeg trækker en dag fra datoen for i dag. "pictureDate.setDate" er en metode, der bruges til at ændre datoen for variablen "pictureDate". 
    // pictureDate.getDate er en metode der kalder datoen for variablen "pictureDate". Tallet "-1" trækker en dag fra den pågældende der er beskrevet i funktionen.
    
    const urlWithDate = "https://api.nasa.gov/planetary/apod?api_key=BbjyApGxbJuIkIIsOiKNAMmK9iO41fKAp7XuBR1L&date=" + pictureDate.toJSON().slice(0, 10); // Her opretter jeg en variabel kaldet "urlWithDate" og tildeler den en URL, som henter data fra API'en (lige som tidligere). 
    // Da jeg har valgt at bruge et ekstra parameter, er der i query-stringen en ekstra parameter med navnet "date", samt et lighedstegn(=).
    // Jeg ønsker at hente data fra en tilfældig dato, og har derfor tilføjet "pictureDate" vha. et +tegn.
    // ".toJSON()" anvender jeg for at konvertere datoen til en JSON-string så den kan tilføjes til URL'en (der i forvejen er en string).
    // ".slice(0, 10)" bruges til at udtrække de første 10 tegn fra JSON-strengen, som er datoen for i dag. Havde jeg ikke gjort dette, ville datoen også blive skrevet med tidszone og klokkeslæt - hvilket er data som NASAs server ikke kan læse.
    
    fetch(urlWithDate)
    .then(res => res.json())
    .then(data => showPrevious(data))
    .catch(err => alert("Fejl! Der er desværre sket en fejl", err));
    
    count = count + 1; // I min counter tæller jeg op med +1 for hver gang der klikkes på knappen.
    counter.innerHTML = `You have loaded images ${count} times!`; // Der tilføjes en tekst-streng til HTML-dokumentet, der viser counteren. Jeg bruger "${count}" for at indsætte JavaScript i din string, samt for at gøre counteren dynamisk.
}

function showPrevious(data) { // Jeg opretter en funktion kaldet "showPrevious" som tager dataen fra API'en og viser det i HTML-dokumentet, når der klikkes på knappen.
    const preImg = document.createElement('img');
    preImg.src = data.url;
    const preDate = document.createElement('p');
    preDate.textContent = data.date;
    const preTitle = document.createElement('h2');
    preTitle.textContent = data.title;
    const preExplanation = document.createElement('p');
    preExplanation.textContent = data.explanation;
    
    moreContent.appendChild(preImg);
    moreContent.appendChild(preDate);
    moreContent.appendChild(preTitle);
    moreContent.appendChild(preExplanation);
}

// KNAP DER RESETTER INDHOLDET:
const resetButton = document.querySelector('#resetBtn'); // Jeg opretter en variabel kaldet "resetButton" - vha. querySelector finder jeg et element i HTML-dokumentet med id'et "resetBtn" som jeg tildeler variablen til.
resetButton.addEventListener("click", resetContent); // Jeg tilføjer en eventlistener til knappen, med en funktion kaldet "resetContent".
const reset = document.querySelector('#reset'); // Jeg opretter en variabel kaldet "reset". Jeg finder id'et "reset" i HTML-dokumentet, som jeg tildeler variablen til.

function resetContent() { // Funktionen "resetContent" oprettes.
    moreContent.innerHTML = ""; // For at resette counteren tilføjes en tom string til "moreContent".
    count = 0; // Count resettes til værdien 0.
    counter.innerHTML = `You have loaded images ${count} times!`; // Herudover nulstilles counteren i HTML-dokumentet. Hvis ikke dette gøres, vil counteren fortsætte med at tælle op.
}