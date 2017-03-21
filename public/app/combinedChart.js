//should wrap this entire page in an IIFE
  //need to look into Javascript classes


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
  //const uniqueArticles datstructure is unnecessary
function filterUniqueSentimentalArticles(data){
  const uniqueArticles = []

  return Object.keys(data).map(page =>{
    return data[page].filter(article => {
      if(uniqueArticles.indexOf(article['_id']) === -1 && article.sentiment !== 0){
        uniqueArticles.push(article['_id'])
        return article
      }
    })
  })
}


//transform from an anonymous function
function arrayFlattener(data){
  return data.reduce((acc,curr) =>{
    return acc.concat(curr)
  },[])
}

function concatArray(array){

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
})


//specify day range
function renderChart(sentimentDataSet,pollData,daysRange = 160){
    // const wrangledData = convertDatesToStrings(arrayFlattener(filterUniqueSentimentalArticles(dataSet)))

    function createChartArrays(sentimentDataSet){}
    const sentimentData = []
    const sentimentDates = []
    const sentimentURL = []
    const sentimentHeadline = []

    //formerly wrangledData
    sentimentDataSet.forEach(article =>{
      if(article !== undefined){
        sentimentData.push(article.sentiment)
        sentimentDates.push(article['pub_date'])
        sentimentURL.push(article['web_url'])
        sentimentHeadline.push(article['headline'].main)
      }
    })


    //generates only HuffPollster forecasts as default value
    const pollAggregator = function(pollData,aggregator = 'HuffPost Pollster'){
      return pollData.data.filter(poll =>{
        if(poll.surveyorg === 'poll aggregator' && poll.forecast === aggregator){
          return poll
        }
      })
    }

    const pollDates = function(){
      return pollAggregator(pollData).map(poll => {
        return poll.fcdate
      })
    }

    const TrumpAverage = function(){
      return pollAggregator(pollData).map(poll => {
        return poll.fcrepvs
      })
    }

    const ClintonAverage = function(){
      return pollAggregator(pollData).map(poll => {
        return poll.fcdemvs
      })
    }


    const daysOfInterest = function(daysRange,pollingData){
      const daysArray = []
      const endDay = "08.11.2016"


      if(daysRange === 160){
        let currentDay
      }

      // while(currentDay < endDay){
      //
      // }
    }

    const averagedPolls = function (pollData){
      return daysOfInterest.map(pollingDay => {
        return pollingDay.reduce((acc,curr) =>{
          if(curr.fcdate){
            return curr
          }
        },[])
      })
    }

    console.log(pollAggregator(pollData))


    //may want to wrap this whole graph generation in function
    var TrumpPolls = {
      x: electionDates,
      y: finalTrumpNums,
      mode: 'markers',
      yaxis: 'y',
      type: 'scatter',
      name: 'Trump',
      fill: 'tonexty', //tozeroy
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
      fill: 'tonexty',
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
        title: 'Support',
        // type: linear,
      },
      yaxis2: {
        title: 'Sentiment Scores',
        overlaying: 'y',
        // type: linear,
        side: 'right'
      },
      xaxis: {
        type: 'date',
        title: 'Dates'
      },
      // title:'Sentiment and Polls in 2016',
      height: 755,
      width: 1500 //formerly 5000
    };

    Plotly.newPlot('combined-chart', data, layout);
}

// const dataToRender = JSON.parse('../data/allData.json')
// renderChart(dataToRender)

//
// const renderChart = function(url){
//   d3.json(url, function(error, data) {
//     const wrangledData = convertDatesToStrings(arrayFlattener(filterUniqueSentimentalArticles(data)))
