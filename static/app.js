const BellyData = "./data/samples.json";

function optionChanged(newId) {
    d3.json(BellyData).then((importedData) => {
        
        function filteredIds(data) {
            return data.id == newId;
        }

        var demo = importedData.metadata;
        var samples = importedData.samples;

        var filteredMeta = demo.filter(filteredIds);
        var demoBox = d3.select("#sample-metadata");

        demoBox.html("");
        var addBox = demoBox.append("table");

        console.log(newId);
        console.log(filteredMeta[0]);

        var demoKeys = Object.keys(filteredMeta[0]);
        demoKeys.forEach(key => {
            var row = addBox.append("tr");
            row.append("td").text((`${key}: ${filteredMeta[0][key]}`));
        });

        // var filterSamp = samples.filter(filteredIds);
        // var makeBar = d3.select("#bar");

        // makeBar.html("");

        // var sortSamp = filterSamp.sort(function compareFunction(firstNum, secondNum) {
        //     // resulting order is (3, 2, 1)
        //     return secondNum - firstNum;
        //   });
        // var reversedSamp = sortSamp.reverse(10);

        // var trace1 = {
        //     type: "horizontalbar",
        //     x: sample_values,
        //     y: otu_ids,
        //     text: otu_labels,
        //     line: {
        //       color: "#17BECF"
        //     }
        //   };

        //   var data = [trace1];

        //   var layout = {
        //     title: `${newId} Top 10 Belly Bacteria`,
        //     height: 600,
        //     width: 600,
        //     xaxis: {
        //       autorange: true,
        //       name: "Sample Values"
        //     },
        //     yaxis: {
        //       autorange: true,
        //       name: "OTU ID"
        //     },
        //     showlegend: false
        //   };
      
        //   Plotly.newPlot("bar-plot", data, layout);


        //   var makeBubble = d3.select("#bubble");
        //   makeBubble.html("");

        //   var trace2 = {
        //     mode: "markers",
        //     x: otu_ids,
        //     y: sample_values,
        //     text: otu_labels,
        //     marker: {
        //         color: otu_ids,
        //         size: sample_values,
        //     }
        //   };

        //   var data2 = [trace2];

        //   var layout2 = {
        //     title: `${newId} Belly Bacteria`,
        //     height: 600,
        //     width: 1000,
        //     xaxis: {
        //       autorange: true,
        //       name: "OTU ID"
        //     },
        //     yaxis: {
        //       autorange: true,
        //       name: "Sample Value"
        //     },
        //     showlegend: false
        //   };
      
        //   Plotly.newPlot("MyDiv", data2, layout2);
          

    });
}


d3.json(BellyData).then((importedData) => {
    
    var patients = importedData.names;
    d3.selectAll("#selDataset").on("change", optionChanged);

    // Use D3 to select the dropdown menu
    var dropdownMenu = d3.select("#selDataset");

    for (i=0; i < patients.length; i++) {
        dropdownMenu.append("option").attr("value", patients[i]).text(patients[i]);
    }

    optionChanged(patients[0]);

});
