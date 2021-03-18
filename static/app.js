// Created a constant for the file path to the data json to be read in.

const BellyData = "./data/samples.json";

// Function called when the dropdown of patient ids is changed to a different patient id.  First thing that occurs is reading in the data

function optionChanged(newId) {
    d3.json(BellyData).then((importedData) => {

        // Setting a variable for the metadata and samples portions of the json.

        var demo = importedData.metadata;
        var samples = importedData.samples;

        // Function that sets the patient id chosen from the dropdown as the one to be filtered out of the dataset.

        function filteredIds(data) {
            return data.id == newId;
        }

        // Metadata variable filtered by the patient id selected from the dropdown first, then the necessary id is grabbed from the html using d3

        var filteredMeta = demo.filter(filteredIds);

        var demoBox = d3.select("#sample-metadata");

        // The html is cleared and a table is appended in the html id, the keys are put into an array, each one is looped through to append a 
        // table row that is then appended with a td that contains all the necessary demographic data from the metadata portion of the json.
        //  This displays the demographics of each patient id in the correct box in the html.

        demoBox.html("");
        var addBox = demoBox.append("table");

        var demoKeys = Object.keys(filteredMeta[0]);

        console.log(demoKeys);

        demoKeys.forEach(key => {
            var row = addBox.append("tr");
            row.append("td").text((`${key}: ${filteredMeta[0][key]}`));
        });

        // Samples variable filtered by the patient id selected from the dropdown, the otu id, otu label, and sample value data are set to their 
        // own variables.  All three of these should be a list of equal length for each patient id.

        var filterSamp = samples.filter(filteredIds);

        var otuIds = filterSamp[0].otu_ids;
        var otuLabels = filterSamp[0].otu_labels;
        var sampleValues = filterSamp[0].sample_values;

        // An empty list is created, one of the three lists is looped through its length to create a dictionary list of all three variables
        // so they are all accurately correlated to one another for plotting.

        var sampleArray = [];

        for (var i = 0; i < otuIds.length; i++) {
            var sampleDict = {};

            sampleDict = {"otu_id": otuIds[i], "otu_labels": otuLabels[i], "sample_values": sampleValues[i]};

            sampleArray.push(sampleDict);
        }

        // The dictionary list is sorted in descending order, then sliced to grab the first 10 since the bar graph needs to show the top 10
        // OTUs for each patient.  The top 10 are then reversed since Plotly defaults from the top down.

        var sortSamp = sampleArray.sort((a,b) => b.sample_value - a.sample_value);

        var sliceSamp = sortSamp.slice(0,10);
        var reversedSamp = sliceSamp.reverse();

        // First trace created for the bar graph, using the reversed dictionary list of the top ten OTUs for each patient id, organized as a
        // horizontal bar graph.  Layout created to have a title, set the size, and label axes.

        var trace1 = {
            x: reversedSamp.map(values => values.sample_values),
            y: reversedSamp.map(values => `OTU ${values.otu_id} `),
            text: reversedSamp.map(values => values.otu_labels),
            type: "bar",
            orientation: "h",
            marker: {
                color: "#17BECF"
            }
        };

        var data = [trace1];

        var layout = {
            title: `Patient ID: ${newId} - Top 10 OTUs`,
            height: 600,
            width: 600,
            xaxis: {
                title: "Sample Values"
            },
            yaxis: {
                title: "OTU ID"
            },
            showlegend: false
        };

        //  Plotting the bar graph bar calling the bar id from the html and using the trace, set to data, and the layout created.

        Plotly.newPlot("bar", data, layout);

        // Second trace created for the bubble chart using the values from the variables of the otu ids, otu labels, and their sample values.
        // The size of the markers is set to the sample values for each otu id.  Layout created to set title, size, and axes labels.

        var trace2 = {
            mode: "markers",
            x: otuIds,
            y: sampleValues,
            text: otuLabels,
            marker: {
                color: otuIds,
                size: sampleValues,
                colorscale: "Earth"
            }
        };

        var data2 = [trace2];

        var layout2 = {
            title: `Patient ID: ${newId} Belly Bacteria Breakdown`,
            height: 800,
            width: 1200,
            xaxis: {
                title: "OTU ID"
            },
            yaxis: {
                title: "Sample Values"
            },
            showlegend: false
        };

        // Plotting the bubble chart calling the bubble id from the html and using the second trace, set to data2, and the second layout.

        Plotly.newPlot("bubble", data2, layout2);

    });
}

// Reading in the data json using the d3 library, setting the names portion of the data to a variable, grabbing the dropdown id from the html,
// looping through the length of the names variable and appending the patient ids to the dropdown, then calling the function above on the selected
// patient id from the dropdown.

d3.json(BellyData).then((importedData) => {

    var patients = importedData.names;

    var dropdownMenu = d3.select("#selDataset");

    for (var i = 0; i < patients.length; i++) {
        dropdownMenu.append("option").attr("value", patients[i]).text(patients[i]);
    }

    optionChanged(patients[0]);
    
});