window.addEventListener('load', () => {
	let long;
	let lat;
	// pass variable info into classes
	let temperatureDescription = document.querySelector(
		'.temperatureDescription'
	);
	let temperatureDegree = document.querySelector('.temperatureDegree');
	let locationTimezone = document.querySelector('.locationTimezone');
	let temperatureSection = document.querySelector('.temperature');
	const temperatureSpan = document.querySelector('.temperature span');

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(position => {
			console.log(position);
			//can be pulled out of position because thats what was loged
			long = position.coords.longitude;
			lat = position.coords.latitude;
			console.log(lat, long);

			const proxy = 'https://cors-anywhere.herokuapp.com/';
			const api = `${proxy}https://api.darksky.net/forecast/caf2375bebb3c01baa548a032581fa3d/${lat},${long}`;

			fetch(api)
				.then(response => {
					console.log(response, 'response');
					return response.json();
				})
				.then(data => {
					//pulling out data from api
					const { temperature, summary, icon } = data.currently;
					temperatureDegree.textContent = temperature;
					temperatureDescription.textContent = summary;
					locationTimezone.textContent = data.timezone;
					//formula for celsius
					let celsius = (temperature - 32) * (5 / 9);
					// set icon
					setIcons(icon, document.querySelector('.icon'));

					temperatureSection.addEventListener('click', () => {
						if (temperatureSpan.textContent === 'F') {
							temperatureSpan.textContent = 'C';
							temperatureDegree.textContent = Math.floor(celsius);
						} else {
							temperatureSpan.textContent = 'F';
							temperatureDegree.textContent = temperature;
						}
					});
				});
		});
	}

	function setIcons(icon, iconID) {
		const skycons = new Skycons({ color: 'black' });
		const currentIcon = icon.replace(/-/g, '_').toUpperCase();
		skycons.play();
		return skycons.set(iconID, Skycons[currentIcon]);
	}
});
