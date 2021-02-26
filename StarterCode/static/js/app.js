const select = document.getElementById("selDataset"); 

const selectForm = d3.select("#selDataset");

function getNames() {
    d3.json("samples.json").then(function(data) {
        const names = data.names

    for(let i = 0; i < names.length; i++) {
        let x = names[i];
        let element = document.createElement("option");
        element.textContent = x;
        element.value = +x;
        select.appendChild(element);
    }   
    });
}

getNames();

function buildPlots() {
    d3.json("samples.json").then(function(data) {
    
    console.clear();

    let name = selectForm.property("value");
    console.log(name);

    let array = data.samples.filter(d => d.id == name);
    console.log(array);

    let sampleValues = array[0].sample_values.slice(0,10).reverse();
    let otuIdsStaging = array[0].otu_ids.slice(0,10).reverse();
    let otuLabels = array[0].otu_labels.slice(0,10).reverse();
    let otuIds = otuIdsStaging.map(e => "OTU " + e.toString());

    console.log(sampleValues);
    console.log(otuIds);
    console.log(otuLabels);

    let graph = [{
        type: 'bar',
        x: sampleValues,
        y: otuIds,
        text: otuLabels,
        orientation: 'h'
      }];

    let layout = {
        title: `Sample Values and OTU ID for Subject ${name}`
    };

    Plotly.newPlot('bar', graph, layout);

    }
    );
}

buildPlots()

selectForm.on("change",buildPlots);