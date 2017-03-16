//As an alternative to locally stored scatter plot data (which could be the default setting), could provide a form in which the user can enter a term with which to search the NYT article abstracts.


//this function will return specified json data from firebase
function retreiveData(custom,searchTerm){
  if(custom){
    return database.ref(`${searchTerm}-articles`).once('value', function(data){
      return JSON.stringify(data.val())
  }
  return database.ref(`articles`).once('value', function(data){
    return JSON.stringify(data.val())
}


//this function checks to see that an article is unique
function filterUniqueArticles(){
  const uniqueArticles = []

  return Object.keys(data).filter((article) =>{
    if(uniqueArticles.indexOf(article['_id'] === -1)){
      uniqueArticles.push(article['_id'])
      return article
    }
  })
}

//this function checks to see that an article has a sentiment score
function filterAnalyzedArticles(data){
  return Object.keys(data).filter((article) =>{
    if(article.sentiment !== 0){
      return article
    }
  })
}

//function will call the retreiveData searchTerm based upon input field values
  //used order to attempt to minimize computational cost of data generation

  //need to properly specify parameters
const scatterplotData = d3.json(matchingArticles, function(data){
  matchingArticles = filterAnalyzedArticles(filterUniqueArticles(retreiveData(false)))

  const chart = c3.generate({
    bindto: '#temp-chart',
    data: {
          url: '',
          x: 'pub_date', //nyt key
          type: 'line' //need to identify how to use scatterplot
    },
  })

})




// use c3 to generate scatterplot graphic
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



// const scatterplotData = d3.json("../data/allData.json", function(data){
//   const chart = c3.generate
//
// })



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
