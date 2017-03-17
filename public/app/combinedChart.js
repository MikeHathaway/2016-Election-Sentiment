
d3.json('./data/allData.json', function(error, data) {
  const wrangledData = convertDatesToStrings(arrayFlattener(filterUniqueSentimentalArticles(data)))
  const sentimentData = []
  const sentimentDates = []

  wrangledData.forEach(article =>{
    sentimentData.push(article.sentiment)
    sentimentDates.push(article['pub_date'])
  })

  if (error){
    return console.warn(error);
  }

  //x is Clinton, Y is Trump
  var TrumpPolls = {
    x: electionDates,
    y: finalTrumpNums,
    mode: 'lines',
    type: 'scatter',
    name: 'Trump'
  };

  var ClintonPolls = {
    x: electionDates,
    y: finalClintonNums,
    mode: 'lines',
    yaxis: 'y',
    type: 'scatter',
    name: 'Clinton'
  };

  var ArticleSentiment = {
    x: sentimentDates,
    y: sentimentData,
    yaxis: 'y2',
    mode: 'markers',
    type: 'scatter'
  };

  var data = [TrumpPolls, ClintonPolls, ArticleSentiment];

  var layout = {
    yaxis: {
      title: 'Support'
    },
    yaxis2: {
      title: 'Sentiment Scores',
      side: 'right'
    },
    xaxis: {
      type: 'date',
      title: 'Dates'
    },
    title:'Sentiment and Polls in 2016',
    height: 800,
    width: 800
  };

  Plotly.newPlot('combined-chart', data, layout);

});


//this will be a passed in JSON
// var trace1 = {
//   x: [1, 2, 3, 4],
//   y: [10, 15, 13, 17],
//   mode: 'markers',
//   type: 'scatter'
// };
//
//x is Clinton, Y is Trump
// var TrumpPolls = {
//   x: electionDates,
//   y: finalTrumpNums,
//   mode: 'lines',
//   type: 'scatter'
// };
//
// var ClintonPolls = {
//   x: electionDates,
//   y: finalClintonNums,
//   mode: 'lines',
//   type: 'scatter'
// };
//
// var data = [ TrumpPolls, ClintonPolls];
//
// var layout = {
//   xaxis: {
//     type: 'date'
//   },
//   title:'Sentiment and Polls in 2016',
//   height: 400,
//   width: 600
// };
//
// Plotly.newPlot('combined-chart', data, layout);
//
// console.log('!!!',wrangledData)
//
