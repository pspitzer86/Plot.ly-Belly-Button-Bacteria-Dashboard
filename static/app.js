const BellyData = "./data/samples.json";

function optionChanged(newId) {
    d3.json(BellyData).then(importedData); {
        var demo = importedData.metadata;
        var samples = importedData.samples;

        var filteredMeta = demo.filter(demo.id);
        var demoBox = d3.select("#sample-metadata");

        demoBox.html("");
        var addBox = demoBox.append("table");

        var demoKeys = Object.keys(filteredMeta[0]);
        demoKeys.forEach(key => {
            var row = addBox.append("tr");
            row.append("td").text((`${key}: ${filteredMeta[0][key]}`));
        });

        var filterSamp = samples.filter(samples.id);
        var makeBar = d3.select("#bar");

        makeBar.html("");

        var sortSamp = filterSamp.sort(function compareFunction(firstNum, secondNum) {
            // resulting order is (3, 2, 1)
            return secondNum - firstNum;
          });
        var reversedSamp = sortSamp.reverse(10);

        var trace1 = {
            type: "bar",
            x: ,
            y: ,
            orientation: "h",
            line: {
              color: "#17BECF"
            }
          };

    }
}


var patients = 

// This function is called when a dropdown menu item is selected
function updatePlotly() {
    // Use D3 to select the dropdown menu
    var dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a variable
    var dataset = dropdownMenu.property("value");
  


    numArray.sort(function compareFunction(firstNum, secondNum) {
        // resulting order is (3, 2, 1)
        return secondNum - firstNum;
      });
      var reversedArray = numArray4.reverse()



      var trace1 = {
        type: "scatter",
        mode: "lines",
        name: name,
        x: dates,
        y: closingPrices,
        line: {
          color: "#17BECF"
        }
      };
  
      // Candlestick Trace
      var trace2 = {
        type: "candlestick",
        x: dates,
        high: highPrices,
        low: lowPrices,
        open: openingPrices,
        close: closingPrices
      };


      var layout = {
        title: `${stock} closing prices`,
        xaxis: {
          range: [startDate, endDate],
          type: "date"
        },
        yaxis: {
          autorange: true,
          type: "linear"
        },
        showlegend: false
      };
  
      Plotly.newPlot("plot", data, layout);
  
    });
  }
    