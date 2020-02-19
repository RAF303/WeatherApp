window.addEventListener('load', () => {
	let long;
	let lat;

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(position => {
			console.log(position);
			//can be pulled out of position because thats what was loged
			long = position.coords.longitude;
			lat = position.coords.latitude;
			console.log(lat, long);

			const proxy = 'https://cors-anywhere.herokuapp.com/';
			const api = `${proxy}https://api.darksky.net/forecast/caf2375bebb3c01baa548a032581fa3d/${lat},${long}`;

			fetch(api).then(response => {
				console.log(response, 'response');
				return response.json();
			});
		});
	}
});

window.addEventListener('load', () => {
// 	let long;
// 	let lat;

// 	if (navigator.geolocation) {
// 		navigator.geolocation.getCurrentPosition(position => {
// 			console.log(position);

// 			long = position.coords.longitude;
// 			lat = position.coords.latitude;

// 			const proxy = 'https://cors-anywhere.herokuapp.com/';
// 			const api = `${proxy}https://api.darksky.net/forecast/caf2375bebb3c01baa548a032581fa3d/${lat},${long}`;

// 			fetch(api).then(response => {
// 				return response.json();
// 			});
// 		});
// 	}
// });
