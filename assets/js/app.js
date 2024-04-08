// Data hentes vha. API kald til NASA's APOD gennem en variabel (kaldet apod) med en URL i. URL'en består af hhv. protokol, host, path og en query string som begynder ved spørgsmålstegnet(?). 
// I query string'en er der først beskrevet et query-parameter navn "api-key". Efterfulgt af et lighedstegn(=) og en query-parameter værdi i form af en API-key: "BbjyApGxbJuIkIIsOiKNAMmK9iO41fKAp7XuBR1L".
// Da der er et ekstra query-parameter med navnet "date", samt et lighedstegn(=) og en query-parameter værdi i form af en dato: "2024-04-08"
// er der et og-tegn(&) som adskiller de to query-parametre i query stringen
const apod = "https://api.nasa.gov/planetary/apod?api_key=BbjyApGxbJuIkIIsOiKNAMmK9iO41fKAp7XuBR1L&date=2024-04-08";

// Jeg hapser det element, fra mit HTML dokument, som har id'et "picture".
const pictureEl = document.querySelector('#picture');

// Jeg bruger fetch-metoden til at hente data fra API'et, som jeg har gemt i ovenstående variable, kaldet "apod".
fetch(apod)
    .then(res => res.json()) //MANGLER FORKLARING!
    .then(data => showPicture(data)) //CAlLBACK FUNCTION MANGLER FORKLARING
    .catch(err => console.log("Fejl! Der er desværre sket en fejl", err));




function showPicture(data) {

    const newImg = document.createElement('img');
    newImg.src = data.url;
    const newDate = document.createElement('p');
    newDate.textContent = data.date;

    // Appendchild bruges til at tilføje det nye indhold fra API'en til det eksisterende element(pictureEl) i HTML dokumentet.
    pictureEl.appendChild(newImg);
    pictureEl.appendChild(newDate);
}

