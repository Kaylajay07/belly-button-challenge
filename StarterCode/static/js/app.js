const url = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json";

function main(){
let selector = d3.select("#selDataset")
//Fetch JSON and log it
d3.json(url).then(function(data){
    console.log(data);
let nameslist = data.names;
for (let i = 0;i<nameslist.length;i++){
    selector.append('option').text(nameslist[i]).property("value", nameslist[i]);
}
makeTables(nameslist[0]);
makeCharts(nameslist[0]);
});
};
function optionChanged(newSample){
    makeTables(newSample);
    makeCharts(newSample);
}

main()

function makeTables(sample){
    d3.json(url).then(function(data){
        let meta = data.metadata;
        let metaResult = meta.filter(obj=>obj.id == sample)[0];
        console.log(metaResult)

        let wfreq = metaResult.wfreq
        console.log(wfreq);

        let tableData = d3.select("#sample-metadata")
        tableData.html("");
        for (key in metaResult){tableData.append('h6').text(`${key.toUpperCase()}: ${metaResult[key]}`)}
    })
}

function makeCharts(sample){
    d3.json(url).then(function(data){
        let meta = data.metadata;
        let metaResult = meta.filter(obj=>obj.id == sample)[0];
        console.log(metaResult)

        let wfreq = metaResult.wfreq
        console.log(wfreq);

        let samples = data.samples;
        let sampleResult = samples.filter(obj=>obj.id == sample)[0];
        console.log(sampleResult)

        let otu_ids = sampleResult.otu_ids
        let otu_labels = sampleResult.otu_labels
        let sample_values = sampleResult.sample_values
        let yticks = otu_ids.slice(0,10).map(otu=>`OTU ${otu}`).reverse()
        console.log(wfreq);

        var barData = [{
            type: 'bar',
            x: sample_values.slice(0,10).reverse(),
            y: yticks,
            text: otu_labels.slice(0,10).reverse(),
            orientation: 'h'
          }];
          
          Plotly.newPlot("bar", barData);


          var trace1 = {
            x: otu_ids,
            y: sample_values,
            mode: 'markers',
            marker: {
              size: sample_values
            }
          };
          
          var bubbleData = [trace1];
          
          var bubbleLayout = {
            title: 'Marker Size',
            
          };
          
          Plotly.newPlot('bubble', bubbleData, bubbleLayout);
          
          
          
          var gaugeData = [
            {
              domain: { x: [0, 1], y: [0, 1] },
              value: wfreq,
              title: { text: "Belly Button Wash Frequency" },
              type: "indicator",
              mode: "gauge+number",
              gauge: {
                axis: { range: [null, 10] },
                steps: [
                  { range: [0, 2], color: "lightgray" },
                  { range: [2, 4], color: "gray" },
                  { range: [4, 6], color: "gray" },
                  { range: [6, 8], color: "gray" },
                  { range: [8, 10], color: "gray" },
                ],
                
                
              }
            }
          ];
          
          var gaugeLayout = { width: 600, height: 450, margin: { t: 0, b: 0 } };
          Plotly.newPlot('gauge', gaugeData, gaugeLayout);
              
    })
}