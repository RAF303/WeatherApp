function calc() {
	var a = parseInt(document.querySelector('#value1').value);
	var b = parseInt(document.querySelector('#value2').value);
	var op = document.querySelector('#operator').value;
	var calculate;

	switch (op) {
		case 'add':
			alert(a + b);
			break;

		case 'sub':
			alert(a - b);
			break;

		case 'mul':
			alert(a * b);
			break;

		case 'div':
			alert(a / b);
			break;

		default:
			alert('pick 2 numbers');
	}
}
