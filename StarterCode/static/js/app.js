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
            orientation: 'h',
           
          }];
        var barLayout = {
            title: 'Top 10 Bacteria Cultures Found',
            xaxis: { title: 'Number of Bacteria' },
            height: 500,
            width: 900
          }

          
          Plotly.newPlot("bar", barData, barLayout);


          var trace1 = {
            x: otu_ids,
            y: sample_values,
            mode: 'markers',
            text: otu_labels,
            marker: {
              size: sample_values,
              color: otu_ids,
              colorscale: 'Portland'
            }
          };
          
          var bubbleData = [trace1];
          
          var bubbleLayout = {
            title: 'Bacteria Cultures Per Sample',
            yaxis: {title: 'Number of Bacteria'},
            xaxis: {title: 'OTU ID'}

            
          };
          
          Plotly.newPlot('bubble', bubbleData, bubbleLayout);
          
          
          
         
              
    })
}