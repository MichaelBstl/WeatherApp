url = 'https://api.openweathermap.org/data/2.5/weather';
if (!navigator.geolocation) {
    var htmlTemp = document.getElementById('temperature');
    htmlTemp.innerHTML = "Geolocation is not supported by this browser.";
    exit;
}
document.body.style.backgroundImage = "url('https://mdbootstrap.com/img/Photos/Horizontal/Nature/full page/img(11).webp')";

if (document.getElementById('currentLocation').checked) {
    navigator.geolocation.getCurrentPosition(currentLocationWeather);
}
else
{

}

function displayWeather(weatherResponse) {
  var htmlTemp = document.getElementById('temperature');
  htmlTemp.innerText = weatherResponse.main.temp;
  var htmlWeather = document.getElementById('weather');
  htmlWeather.innerText = weatherResponse.weather[0].description;
  var htmlLocation = document.getElementById('location');
  htmlLocation.innerText = weatherResponse.name;
  if (weatherResponse.main.temp > 100)
  {
    document.body.style.backgroundImage = "url('https://static.scientificamerican.com/sciam/cache/file/38A06FAD-787A-4C6E-8EAF7961B4A15286_source.jpg?w=590&h=800&E88BF874-B829-4466-80F6C05B82F21F2D')";
  }
  else
  {
    if (weatherResponse.main.temp > 32)
    {
      document.body.style.backgroundImage = "url('https://mdbootstrap.com/img/Photos/Horizontal/Nature/full page/img(11).webp')";
    }
    else {
      document.body.style.backgroundImage = "url('https://media.istockphoto.com/photos/branches-covered-with-ice-after-freezing-rain-sparkling-ice-covered-picture-id1289449088')";
    }
  }
}

function currentLocationWeather(position){  
  appid = 'b013bd736f797bc3caec75767bee3544';
  htmlSelectedUnits = document.getElementById('selectedUnits');
  units = htmlSelectedUnits.selectedOptions[0].innerText;
  htmlSelectedLanguage = document.getElementById('selectedLanguage');
  languages = htmlSelectedLanguage.selectedOptions[0].value;

    fullUrl = url+'?lat=' + position.coords.latitude + '&lon=' + position.coords.longitude+ '&appid=' + appid +
            '&units=' + units + '&lang=' + languages;
  console.log('fullUrl:' + fullUrl);

  fetch(fullUrl)
  .then(response => response.json())
  .then(data => displayWeather(data));
}
function zipLocationWeather(){  
  appid = 'b013bd736f797bc3caec75767bee3544';
  var countryCode = 'us';
  htmlSelectedUnits = document.getElementById('selectedUnits');
  units = htmlSelectedUnits.selectedOptions[0].innerText;
  htmlSelectedLanguage = document.getElementById('selectedLanguage');
  languages = htmlSelectedLanguage.selectedOptions[0].value;
  htmlSelectedZip = document.getElementById('zipCode')
  zip = htmlSelectedZip.value;

    fullUrl = url + '?zip=' + zip + ',' + countryCode + '&appid=' + appid +
              '&units=' + units + '&lang=' + languages;
  console.log('fullUrl:' + fullUrl);

  fetch(fullUrl)
  .then(response => response.json())
  .then(data => displayWeather(data));
    
}

function unprotectZipCode()
{
  var zipCodeTextBox = document.getElementById("zipCode");
  zipCodeTextBox.disabled = false;
}

function radioCurrentLocation()
{
  var zipCodeTextBox = document.getElementById("zipCode");
  zipCodeTextBox.disabled = true;
  zipCodeTextBox.value = "";
}

function refreshWeather() {
  if (document.getElementById('currentLocation').checked) {
    navigator.geolocation.getCurrentPosition(currentLocationWeather);
}
else
{
}
}
function radioZipCode() {
  zipLocationWeather();
}
