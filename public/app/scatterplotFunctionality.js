//As an alternative to locally stored scatter plot data (which could be the default setting), could provide a form in which the user can enter a term with which to search the NYT article abstracts.


//this function will return specified json data from firebase

//function will call the retreiveData searchTerm based upon input field values
  //used order to attempt to minimize computational cost of data generation
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


  //http://c3js.org/samples/chart_scatter.html

  //need to properly specify parameters
  //http://drarmstr.github.io/c3/examples/doc/scatterplot_example.html

const scatterplotData = d3.json('./data/allData.json', function(data){
  // console.log(arrayFlattener(filterUniqueSentimentalArticles(data)))
  // const wrangledData = arrayFlattener(filterUniqueSentimentalArticles(data))
  const wrangledData = convertDatesToStrings(arrayFlattener(filterUniqueSentimentalArticles(data)))
  // console.log(wrangledData)

  const scatterplot = c3.generate({
    bindto: '#temp-chart',
    data: {
      json: wrangledData,
      keys: {
        x: 'pub_date',
        value: ['sentiment']
      },
      type: 'scatter',
      },
    axis: {
      x: {
        type: 'timeseries',
      }
      // type: 'timeseries'
    }
  });

});


//http://stackoverflow.com/questions/27100225/not-able-to-create-scatter-and-line-chart-together-in-c3-js
//http://jocellyn.cz/2014/07/25/simple-charts-with-c3.html
//documentation: http://c3js.org/reference.html#data-url

  //GenElPolls.csv is the new filtered version of the dataset
// const combinedChartData = d3.json('./data/allData.json', function(data){
//   // console.log(arrayFlattener(filterUniqueSentimentalArticles(data)))
//   // const wrangledData = arrayFlattener(filterUniqueSentimentalArticles(data))
//   const wrangledData = convertDatesToStrings(arrayFlattener(filterUniqueSentimentalArticles(data)))
//   const pollData = './data/pollingData.json'
//
//   const scatterplot = c3.generate({
//     bindto: '#combined-chart',
//     data: {
//       rows: pollData,
//       json: wrangledData,
//       // json: {
//       //   url: pollData,
//       //   minmType: 'JSON'
//       // },
//       keys: {
//         x: 'pub_date',
//         value: ['sentiment','Trump','Clinton'],
//       },
//       // xs: {
//       //   sentiment: ['sentiment'],
//       //   trumpPoll: ['Trump'],
//       // },
//       // keys: {
//       //   x: 'pub_date',
//       //   value: ['sentiment']
//       // },
//       type: 'line',
//       types: {
//         wrangledData: 'scatter',
//         electionData: 'line',
//       },
//     },
//     axis: {
//       x: {
//           type: 'timeseries',
//         },
//       }
//   })
//
//
// });
