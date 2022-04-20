const selectStates = document.querySelector('#states');
const selectCities = document.querySelector('#cities');

const options = {
	method: 'GET',
	mode: 'cors',
	cache: 'default'
};

//fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados`, options);
//.then((response)=>{response.json()})

function populateStateSelect() {
	fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
		.then(res => res.json())
		.then(states => {
			//console.log(states)
			states.map(state => {
				//console.log(state)
				const option = document.createElement('option');
		
				option.setAttribute('value', state.sigla);
				//console.log(option)
				option.textContent = state.sigla;
		
				selectStates.appendChild(option);
			});
		})
}

function populateCitySelect() {
	selectStates.addEventListener('change', () => {
		
		let nodesSelectCities = selectCities.childNodes;
		
		[...nodesSelectCities].map(node => node.remove());
		
		let state = selectStates.options[selectStates.selectedIndex].value;
		
		//fetch(`https://geoapibrasil.herokuapp.com/v1/cities?state=${state}`)
		fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state}/municipios`)
			.then(res => res.json())
			.then(cities => {
				console.log(cities)
				
				selectCities.removeAttribute('disabled');
			
				cities.map(city => {
				
					const option = document.createElement('option');

					option.textContent = city.nome;

					selectCities.appendChild(option);
				});
			})
	});
}

populateStateSelect();
populateCitySelect();