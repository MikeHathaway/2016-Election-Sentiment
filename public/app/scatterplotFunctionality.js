//As an alternative to locally stored scatter plot data (which could be the default setting), could provide a form in which the user can enter a term with which to search the NYT article abstracts.

// use c3 to generate scatterplot graphics

const scatterplotData = d3.tsv("./data/electionData2016.csv", function(data) {
  console.log(data);

  const chart = c3.generate({
    bindto: '#chart',
    data: {
          url: '/data/2016ElectionData.csv',
          x: 'end_date',
          type: 'line'
    },
    axis: {
      x: {
        type: 'timeseries',

      }
    }


  });

});

const scatterplotData = d3.json("../data/allData.json", function(data){

  const chart = c3.generate

})



d3.json("sample.json", function(data) {
  var modData = [];
  data.results.forEach(function(d, i) {
    var item = ["param-" + d.param];
    d.val.forEach(function(j) {
      item.push(j);
    });
    modData.push(item);
  });

  const chart = c3.generate({
    data: {
      columns: modData

    }
  });
});
