window.addEventListener('load', () => {
	let long;
	let lat;
	let temperatureDescription = document.querySelector(
		'.temperature-description'
	);
	let temperatureDegree = document.querySelector('.temperature-degree');
	let loactionTimezone = document.querySelector('.location-timezone');
	let temperatureSection = document.querySelector('.temperature');
	const temperatureSpan = document.querySelector('.temperature span');

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(position => {
			long = position.coords.longitude;
			lat = position.coords.latitude;

			const proxy = 'https://cors-anywhere.herokuapp.com/';
			const api = `${proxy}https://api.darksky.net/forecast/caf2375bebb3c01baa548a032581fa3d/${lat},${long}`;

			fetch(api)
				.then(response => {
					return response.json();
				})
				.then(data => {
					const { temperature, summary, icon } = data.currently;
					// set DOM elements from API
					temperatureDegree.textContent = temperature;
					temperatureDescription.textContent = summary;
					loactionTimezone.textContent = data.timezone;
					//formula for celsius
					let celsius = (temperature - 32) * (5 / 9);
					// set icon
					setIcons(icon, document.querySelector('.icon'));

					//set temp to celsius
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
