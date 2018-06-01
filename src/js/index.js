import $ from 'jquery';
import numeral from 'numeral';
import '../styles/index.sass';

window.onload = () => {
  function handlePosition(position) {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    const url = `https://public-api.adsbexchange.com/VirtualRadar/AircraftList.json?lat=${lat}&lng=${lng}&fDstL=0&fDstU=100`;

    $.ajax({
      method: 'GET',
      url,
      dataType: 'jsonp',
      success: (data) => {
        const container = document.getElementById('container');

        data.acList.forEach((aircraft) => {
          const listingItem = document.createElement('div');
          listingItem.setAttribute('id', 'listing-item');
          listingItem.setAttribute('title', 'Click to show more');

          const icon = document.createElement('img');
          icon.setAttribute('id', 'icon');
          icon.setAttribute('src', aircraft.Trak < 180 ? 'img/icon_right.png' : 'img/icon_left.png');

          const altitude = document.createElement('p');
          altitude.setAttribute('id', 'altitude');
          altitude.innerHTML = `Altitude: <b>${numeral(aircraft.Alt).format('0,0')} ft</b>`;

          const flightCode = document.createElement('p');
          flightCode.setAttribute('id', 'flight-code');
          flightCode.innerHTML = `Flight Code: <b>${aircraft.Call}</b>`;

          listingItem.appendChild(icon);
          listingItem.appendChild(altitude);
          listingItem.appendChild(flightCode);

          container.appendChild(listingItem);
        });
      },
    });
  }

  function handleError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        return 'User denied the request for Geolocation.';
      case error.POSITION_UNAVAILABLE:
        return 'Location information is unavailable.';
      case error.TIMEOUT:
        return 'The request to get user location timed out.';
      case error.UNKNOWN_ERROR:
        return 'An unknown error occurred.';
      default:
        return 'Error';
    }
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(handlePosition, handleError);
  } else {
    return 'Your browser doesn\'t support geolocation';
  }
};
