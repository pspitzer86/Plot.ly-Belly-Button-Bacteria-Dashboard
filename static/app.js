const bellyData = "./data/samples.json"

var patients = d3.json(bellyData).then(data => data.names.values);

var dropDown = d3.select("#selDataset");

var patientList = dropDown.append("ul");

for (i = 0; i < patients.length; i++) {
    patientList.append("li").text(pat[i]);
}


// var data = [{
//     type: 'bar',
//     x: [20, 14, 23],
//     y: ['giraffes', 'orangutans', 'monkeys'],
//     orientation: 'h'
//   }];
  
//   Plotly.newPlot('myDiv', data);


