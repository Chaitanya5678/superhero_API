// Getting API URL to hit in order to obtain necessary JSON

const newParams = new URLSearchParams(window.location.search);
const name = newParams.get('mySuperHero');
var url = "https://cors-anywhere.herokuapp.com/https://www.superheroapi.com/api/3195255593905641/search/" + name;

var hero;

//Get request to API's URL

$.get(url, function(data){

  hero = data.results[0];

  var heroDiv = document.getElementById('hero');

  // heroDiv has name header and detailsDiv

  var heroName = document.createElement('h1');
  heroName.innerText = hero["name"];
  heroDiv.appendChild(heroName);

  //detailsDiv is a flex container that has imageDiv, powerStatsDiv and biographyDiv

  var detailsDiv = document.createElement('div');
  detailsDiv.className = 'details';

  //imageDiv contains heroImage

  var imageDiv = document.createElement('div');
  imageDiv.className = 'image-div';

  var heroImage = document.createElement('img');
  heroImage.src = hero["image"].url;
  heroImage.height = '300';
  heroImage.width = '300';
  heroImage.alt= 'Hero-Image';
  imageDiv.appendChild(heroImage);
  detailsDiv.appendChild(imageDiv);

  //powerStatsDiv contains powerstats of character

  var powerStatsDiv = document.createElement('div');
  powerStatsDiv.className = 'powerstats';

  var powerStats = document.createElement('h3');
  powerStats.innerText = 'PowerStats';
  powerStatsDiv.appendChild(powerStats);

  var intelligence = document.createElement('p');
  intelligence.innerText = 'Intelligence: ' + hero["powerstats"]["intelligence"];
  powerStatsDiv.appendChild(intelligence);

  var strength = document.createElement('p');
  strength.innerText = 'Strength: ' + hero["powerstats"]["strength"];
  powerStatsDiv.appendChild(strength);

  var speed = document.createElement('p');
  speed.innerText = 'speed: ' + hero["powerstats"]["speed"];
  powerStatsDiv.appendChild(speed);

  var durability = document.createElement('p');
  durability.innerText = 'Durability: ' + hero["powerstats"]["durability"];
  powerStatsDiv.appendChild(durability);

  var power = document.createElement('p');
  power.innerText = 'Power: ' + hero["powerstats"]["power"];
  powerStatsDiv.appendChild(power);

  var combat = document.createElement('p');
  combat.innerText = 'Combat: ' + hero["powerstats"]["combat"];
  powerStatsDiv.appendChild(combat);

  detailsDiv.appendChild(powerStatsDiv);

  // biographyDiv has details of character's biography

  var biographyDiv = document.createElement('div');
  biographyDiv.className = 'bio-div';


  var biography = document.createElement('h3');
  biography.innerText = 'Biography';
  biographyDiv.appendChild(biography);

  var fullname = document.createElement('p');
  fullname.innerText = 'Full Name: ' + hero["biography"]["full-name"];
  biographyDiv.appendChild(fullname);

  var placeOfBirth = document.createElement('p');
  placeOfBirth.innerText = 'Place Of Birth: ' + hero["biography"]["place-of-birth"];
  biographyDiv.appendChild(placeOfBirth);

  var firstAppearance = document.createElement('p');
  firstAppearance.innerText = 'First Appearance: ' + hero["biography"]["first-appearance"];
  biographyDiv.appendChild(firstAppearance);

  var publisher = document.createElement('p');
  publisher.innerText = 'Publisher: ' + hero["biography"]["publisher"];
  biographyDiv.appendChild(publisher);

  var alignment = document.createElement('p');
  alignment.innerText = 'Alignment: ' + hero["biography"]["alignment"];
  biographyDiv.appendChild(alignment);

  detailsDiv.appendChild(biographyDiv);

  heroDiv.appendChild(detailsDiv);

  // Setting Initial value of Add to Favourites / Remove from Favourites according to storage status

  var favs = JSON.parse(localStorage.getItem("favs") || "[]");
  var favbtn = document.getElementById('fav-btn');

  if(!favs.includes(hero["id"]))
  {
    favbtn.innerText = 'Add to Favourites';
    favbtn.style.backgroundColor = '#1e90ff'
  }
  else
  {
    favbtn.innerText = 'Remove from Favourites';
    favbtn.style.backgroundColor = 'red';
  }
  
});

// Function that Toggles Add and Remove from Favourites

function toggleFav()
{
  //Retrieving favs array from localStorage and toggling according to membership 

  var favs = JSON.parse(localStorage.getItem("favs") || "[]");
  var favbtn = document.getElementById('fav-btn');

  if(!favs.includes(hero["id"]))
  {
    favs.push(hero["id"]);
    favbtn.innerText = 'Remove from Favourites';
    favbtn.style.backgroundColor = 'red';
  }
  else
  {
    favs = favs.filter(e => e !== hero["id"]);
    favbtn.innerText = 'Add to Favourites';
    favbtn.style.backgroundColor = '#1e90ff';
  }

  window.localStorage.setItem("favs", JSON.stringify(favs));
}