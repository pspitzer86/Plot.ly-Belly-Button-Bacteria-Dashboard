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

        // console.log(newId);
        // console.log(filteredMeta[0]);

        // var demoKeys = Object.keys(filteredMeta[0]);
        // demoKeys.forEach(key => {
        //     var row = addBox.append("tr");
        //     row.append("td").text((`${key}: ${filteredMeta[0][key]}`));
        // });

        var filterSamp = samples.filter(filteredIds);

        var otuIds = filterSamp[0].otu_ids;
        var otuLabels = filterSamp[0].otu_labels;
        var sampleValues = filterSamp[0].sample_values;

        var sampleArray = [];

        for (i = 0; i < filterSamp.length; i++) {
            sampleDict = {};

            sampleDict = {"otu_id": otuIds[i], "otu_labels": otuLabels[i], "sample_values": sampleValues[i]};

            sampleArray.push(sampleDict);
        }

        console.log(sampleDict);

        var makeBar = d3.select("#bar");

        makeBar.html("");

        var sortSamp = sampleArray.sort(function compareFunction(firstNum, secondNum) {
            // resulting order is (3, 2, 1)
            return secondNum - firstNum;
          });
        
        var sliceSamp = sortSamp.slice(0, 10);
        var reversedSamp = sliceSamp.reverse();

        var trace1 = {
            type: "horizontalbar",
            x: reversedSamp.map(values => values.sample_values),
            y: reversedSamp.map(values => `OTU ${values.otu_ids}`),
            text: reversedSamp.map(values => values.otu_labels),
            line: {
              color: "#17BECF"
            }
          };

          var data = [trace1];

          var layout = {
            title: `Patient ID: ${newId} - Top 10 OTU's`,
            height: 600,
            width: 600,
            xaxis: {
              autorange: true,
              name: "Sample Values"
            },
            yaxis: {
              autorange: true,
              name: "OTU ID"
            },
            showlegend: false
          };
      
          Plotly.newPlot("bar", data, layout);


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
