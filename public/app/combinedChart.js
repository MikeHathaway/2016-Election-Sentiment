
function retreiveData(custom,searchTerm){
  if(custom){
    return database.ref(`${searchTerm}-articles`).once('value', function(data){
      return JSON.stringify(data.val())
    })
  }
  return database.ref(`articles`).once('value', function(data){
    return JSON.stringify(data.val())
  })
}


//this function checks to see that an article is unique
  //it stil needs to be gernalized to multiple article types
function filterUniqueSentimentalArticles(data){
  const uniqueArticles = []
  const articlesOfInterest = data.articles

  return Object.keys(articlesOfInterest).map(page =>{
    return articlesOfInterest[page].filter(article => {
      if(uniqueArticles.indexOf(article['_id']) === -1 && article.sentiment !== 0){
        uniqueArticles.push(article['_id'])
        return article
      }
    })
  })
}

function arrayFlattener(data){
  return data.reduce((acc,curr) =>{
    return acc.concat(curr)
  },[])
}

function convertDatesToStrings(dataArray){
  dataArray.forEach(article =>{
    article['pub_date'] = article['pub_date'].split("T")[0] //new Date
  })
  return dataArray
}



d3.tsv('./data/GenElPolls.csv',function(error,pollData){
  const TrumpMVPolls = []
  const ClintonMVPolls = []

  console.log(pollData)

//neede to generate a new object to be pusehd to the accumulator
  //this function is incrdibly screwed up
//   function genMovingAverage(inpArray,candidate1,candidate2){
//     return inpArray.reduce((acc,curr,index,polls) =>{
//       // if(index !== inpArray.length - 1){
//         if(curr['end_date'] === polls[index + 1]['end_date']){
//           curr[candidate1] = (parseInt(curr[candidate1]) + parseInt(polls[index + 1][candidate1])) / 2
//           curr[candidate2] = (parseInt(curr[candidate2]) + parseInt(polls[index + 1][candidate2])) / 2
//           acc.push(curr)
//         }
//       // }
//       return acc
//     },[])
//   }
//
//   //sooooo janky
//   console.log(genMovingAverage(genMovingAverage(genMovingAverage(genMovingAverage(genMovingAverage(genMovingAverage(genMovingAverage(genMovingAverage(genMovingAverage(pollData,'Trump','Clinton'),'Trump','Clinton'),'Trump','Clinton'),'Trump','Clinton'),'Trump','Clinton'),'Trump','Clinton'),'Trump','Clinton'),'Trump','Clinton'),'Trump','Clinton'))
//   // console.log(genMovingAverage('Clinton'))
//
})
//

//replace ./data/allData.json with makeAPICalls() output -> keep local
d3.json('./data/allData.json', function(error, data) {
  const wrangledData = convertDatesToStrings(arrayFlattener(filterUniqueSentimentalArticles(data)))
  const sentimentData = []
  const sentimentDates = []
  const sentimentURL = []
  const sentimentHeadline = []


  wrangledData.forEach(article =>{
    sentimentData.push(article.sentiment)
    sentimentDates.push(article['pub_date'])
    sentimentURL.push(article['web_url'])
    sentimentHeadline.push(article['headline'].main)
  })

  console.log(wrangledData)

  if (error){
    return console.warn(error);
  }

  //x is Clinton, Y is Trump
  var TrumpPolls = {
    x: electionDates,
    y: finalTrumpNums,
    mode: 'markers',
    yaxis: 'y',
    type: 'scatter',
    name: 'Trump',
    line: {
      color: 'rgb(206, 10, 10)'
    }
  };

  var ClintonPolls = {
    x: electionDates,
    y: finalClintonNums,
    mode: 'markers', //formerly lines
    yaxis: 'y',
    type: 'scatter',
    name: 'Clinton',
    line: {
      color: 'rgb(20, 16, 237)'
    }
  };

  var ArticleSentiment = {
    x: sentimentDates,
    y: sentimentData,
    mode: 'markers',
    name: 'sentiment',
    yaxis: 'y2',
    type: 'scatter',
    text: sentimentHeadline,//[sentimentHeadline,sentimentURL],
    hoverinfo: 'text',
  };

  var data = [TrumpPolls, ClintonPolls, ArticleSentiment];

  var layout = {
    yaxis: {
      title: 'Support'
    },
    yaxis2: {
      title: 'Sentiment Scores',
      overlaying: 'y',
      side: 'right'
    },
    xaxis: {
      type: 'date',
      title: 'Dates'
    },
    // title:'Sentiment and Polls in 2016',
    height: 755,
    width: 5000
  };

  Plotly.newPlot('combined-chart', data, layout);

});
