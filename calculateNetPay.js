const grosspay = (hours, hourlyWage) => {
  return Number(hours * hourlyWage);
};
if (grosspay(8, 10) !== 80) {
  throw new Error('you wrong');
}

const fica = grossPay => Number(grossPay * .062);
if (fica(960).toFixed(2) !== '59.52') {
  throw new Error('you wrong');
}

const medicare = grossPay => Number(grossPay * .0145);
if (medicare(960).toFixed(2) !== '13.92') {
  throw new Error('you wrong');
}

const netPay = (hours, hourlyWage, withheld) => {
  const grossPay = grosspay(hours, hourlyWage);
  const netPay = (grossPay - withheld) - fica(grossPay) - medicare(grossPay);
  return Number(netPay);
};
if (netPay(8, 10, 10).toFixed(2) !== '63.88') {
  debugger;
  throw new Error('you wrong');
}

const update = (id, text) => {
  const $div = document.createElement('div');
  $div.id = id;
  $div.appendChild(document.createTextNode(text));

  const $oldDiv = document.getElementById(id);
  document.getElementById('pay-details').replaceChild($div, $oldDiv);
};

const valueFor = (selector) => {
  return document.getElementById(selector).value
};

const calculateAndShowPayDetails = () => {
  const hours = valueFor('hours');
  const hourlyWage = valueFor('wages');
  const withheld = valueFor('withheld');
  const netPays = netPay(hours, hourlyWage, withheld);
  const grossPay = grosspay(hours, hourlyWage);

  update('name', `Employee Name: ${valueFor('employee-name')}`);
  update('ssn', `Employee SSN: ${valueFor('employee-ssn')}`);
  update('pay-period', `Pay Period: ${valueFor('employee-pay-period')}`);
  update('pay-date', `Pay Date: ${valueFor('employee-pay-date')}`);
  update('total-hours', `Total Hours Worked: ${valueFor('hours')}`);
  update('hourly-wage', `Hourly Wage: ${valueFor('wages')}`);

  update('net-pay', `Net Pay: $ ${netPays.toFixed(2)}`);
  update('gross-pay', `Gross Pay: $ ${grossPay.toFixed(2)}`);
  update('fed-witholding', `Federal Withholding: $ ${withheld}`);
  update('fica', `FICA: $ ${fica(grossPay).toFixed(2)}`);
  update('medicare', `Medicare: $ ${medicare(grossPay).toFixed(2)}`);
};

const printDetails = () => {
  const payDetails = document.getElementById('pay-details').outerHTML;
  const printWindow = window.open('', '', 'height=800,width=1400');
  printWindow.document.write('<html><head><title>Pay Details</title>');
  printWindow.document.write('</head><body >');
  printWindow.document.write(payDetails);
  printWindow.document.write('</body></html>');
  printWindow.document.close();
  // printWindow.print();
};

document.getElementById('calculate').addEventListener('click', () => {
  calculateAndShowPayDetails();
});

document.getElementById('print').addEventListener('click', () => {
  printDetails();
});