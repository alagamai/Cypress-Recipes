// promie.all returns if any of the promises is rejected
const BULBASAUR_POKEMONS_URL = 'https://pokeapi.co/api/v2/pokemon/bulbasaur';
const RATICATE_POKEMONS_URL = 'https://pokeapierr.co/api/v2/pokemon/raticate';
const KAKUNA_POKEMONS_URL = 'https://pokeapi.co/api/v2/pokemon/kakuna';

function getPromise(url) {
return new Promise((resolve, reject) => {

	fetch(url).then(resp => {
		return resp.json();	
	}).then(data => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
})
}
let promise_1 = getPromise(BULBASAUR_POKEMONS_URL);
let promise_2 = getPromise(RATICATE_POKEMONS_URL);
let promise_3 = getPromise(KAKUNA_POKEMONS_URL);


Promise.allSettled([promise_1, promise_2, promise_3]).then(result => {
    console.log({result});
}).catch(error => {
    console.log('An Error Occured');
});




