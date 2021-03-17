const BellyData = "./data/samples.json";

function optionChanged(newId) {
    d3.json(BellyData).then((importedData) => {

        var demo = importedData.metadata;
        var samples = importedData.samples;

        function filteredIds(data) {
            return data.id == newId;
        }

        var filteredMeta = demo.filter(filteredIds);

        var demoBox = d3.select("#sample-metadata");

        demoBox.html("");
        var addBox = demoBox.append("table");

        var demoKeys = Object.keys(filteredMeta[0]);

        console.log(demoKeys);

        demoKeys.forEach(key => {
            var row = addBox.append("tr");
            row.append("td").text((`${key}: ${filteredMeta[0][key]}`));
        });

        var filterSamp = samples.filter(filteredIds);

        var otuIds = filterSamp[0].otu_ids;
        var otuLabels = filterSamp[0].otu_labels;
        var sampleValues = filterSamp[0].sample_values;

        var sampleArray = [];

        for (var i = 0; i < otuIds.length; i++) {
            var sampleDict = {};

            sampleDict = {"otu_id": otuIds[i], "otu_labels": otuLabels[i], "sample_values": sampleValues[i]};

            sampleArray.push(sampleDict);
        }

        var sortSamp = sampleArray.sort((a,b) => b.sample_value - a.sample_value);

        var sliceSamp = sortSamp.slice(0,10);
        var reversedSamp = sliceSamp.reverse();

        var trace1 = {
            x: reversedSamp.map(values => values.sample_values),
            y: reversedSamp.map(values => `OTU ${values.otu_id}`),
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

        Plotly.newPlot("bar", data, layout);

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

        Plotly.newPlot("bubble", data2, layout2);

    });
}


d3.json(BellyData).then((importedData) => {

    var patients = importedData.names;

    var dropdownMenu = d3.select("#selDataset");

    for (var i = 0; i < patients.length; i++) {
        dropdownMenu.append("option").attr("value", patients[i]).text(patients[i]);
    }

    optionChanged(patients[0]);
    
});