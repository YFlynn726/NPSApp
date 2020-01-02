'use strict';

const apiKey = 'rFTc57REZXgLG3GyhDOGaXZyeXln31UGLRxhIxE8';
const searchURL = 'https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=rFTc57REZXgLG3GyhDOGaXZyeXln31UGLRxhIxE8';

function formatQueryParams(params){
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
  return queryItems.join('&');
}

function displayResults(responseJson) {
  //console.log(responseJson);
  $('#results-list').empty();
  for (let i = 0; i < responseJson.items.length; i++){
    $('#results-list').append(
      `<li><h3>${responseJson.items[i].data.fullname}</h3>
        <p>${responseJson.items[i].data.description}</p>
        <p>${responseJson.items[i].data.URL}</p>
        </li>`
    )};
  $('#results').removeClass('hidden');
};


function getData(query, maxResults = 10) {
  const params = {
    key: apiKey,
    q: query,
    part: 'data',
    maxResults,
  };
  const queryString = formatQueryParams(params);
  const url = searchURL + '?' + queryString;

  //console.log('url');

  fetch(url)
    .then(response => {
      if(response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went horribly wrong: ${err.message}`);
    });
}

function watchForm() {
  $('#js-form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    const maxResults = $('#js-max-results').val();
    getData(searchTerm, maxResults);
  });
}

$(watchForm);

