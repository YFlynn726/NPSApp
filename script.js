/* eslint-disable no-undef */
'use strict';

const apiKey = 'yXFguw0bPT2fEHLjTMoQ0pLDdsv5PGJ4z8p4IobD';
const searchURL = 'https://developer.nps.gov/api/v1/parks?';

function formatQueryParams(params){
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
  return queryItems.join('&');
}

function displayResults(responseJson) {
  console.log(responseJson);
  $('#results-list').empty();
  for (let i = 0; i < responseJson.data.length; i++){
    $('#results-list').append(
      `<li><h3>${responseJson.data[i].name}</h3>
        <p>${responseJson.data[i].description}</p>
        <p>${responseJson.data[i].url}</p>
        </li>`
    );};
  $('#results').removeClass('hidden');
};


function getData(input, limit = 10) {
  const params = {
    stateCode: `${input}`,
    limit: limit,
    // eslint-disable-next-line camelcase
    api_key: apiKey,
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
      console.error(err);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      // eslint-disable-next-line no-undef
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

