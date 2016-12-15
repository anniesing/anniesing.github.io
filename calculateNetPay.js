const netPay = (hours, hourlyWage, withheld) => {
	const grossPay = hours * hourlyWage;
	const netPay = (grossPay - withheld) - (grossPay * .062) - (grossPay * .0145);
	const roundedNet = netPay.toFixed(3);
	return Number(roundedNet);
}

if(netPay(8, 10, 10) !== 63.880) {
	throw new Error('you wrong');
}

const el = document.getElementById('calculate');
el.addEventListener('click', () => {
	const hours = document.getElementById('hours').value;
	const hourlyWage = document.getElementById('wages').value;
	const withheld = document.getElementById('withheld').value;
	const netPays = netPay(hours, hourlyWage, withheld);
	
	const $div = document.createElement('div');
	$div.id = 'net-pay';
	$div.appendChild(document.createTextNode(`Net Pay: $ ${netPays}`));
	
	const $oldDiv = document.getElementById('net-pay');
	document.body.replaceChild($div, $oldDiv);
});
