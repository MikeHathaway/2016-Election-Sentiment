//As an alternative to locally stored scatter plot data (which could be the default setting), could provide a form in which the user can enter a term with which to search the NYT article abstracts.


//this function will return specified json data from firebase
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


// function sortByDate(date){
//   return array.reduce((acc,curr) =>{
//     if(curr.tweetDay == date){
//       acc[curr.tweetDay] += value
//       return acc
//     }
//   },[])
// }
//
// sortByDate() * 4


//function will call the retreiveData searchTerm based upon input field values
  //used order to attempt to minimize computational cost of data generation

  //http://c3js.org/samples/chart_scatter.html

  //need to properly specify parameters
  //http://drarmstr.github.io/c3/examples/doc/scatterplot_example.html
const scatterplotData = d3.json('./data/allData.json', function(data){
  // console.log(arrayFlattener(filterUniqueSentimentalArticles(data)))
  const wrangledData = arrayFlattener(filterUniqueSentimentalArticles(data))
  console.log(wrangledData)

  const scatterplot = c3.generate({
    bindto: '#temp-chart',
    data: {
      json: wrangledData,
      keys: {
        y: 'sentiment',
        value: ['sentiment'],//['sentiment'],
        x: 'pub_date',
        value: ['pub_date']
      },
      type: 'scatter',
      },
  });

});


  // const chart = c3.generate({
  //   bindto: '#temp-chart',
  //   data: {
  //     url: './data/allData.json',
  //     x: 'pub_date', //nyt key
  //     y: 'sentiment',
  //     type: 'scatter', //need to identify how to use scatterplot
  //   },
  //   axis: {
  //     x: {
  //       label: 'Date',
  //       type: 'timeseries',
  //     },
  //     y: {
  //       label: 'Sentiment',
  //     }
  //   },
  //
  // });

// });

// const scatterplot = c3.generate({
//   bindto: '#temp-chart',
//   data: {
//     json: jsonfile,
//     keys: {
//       x: 'xvariable',
//       value: ['valuevariable'],
//     },
//     type: 'scatter',
//     },
// });





// use c3 to generate scatterplot graphic
// const scatterplotData = d3.tsv("./data/electionData2016.csv", function(data) {
//   console.log(data);
//
//   const chart = c3.generate({
//     bindto: '#chart',
//     data: {
//           url: '/data/2016ElectionData.csv',
//           x: 'end_date',
//           type: 'line'
//     },
//     axis: {
//       x: {
//         type: 'timeseries',
//
//       }
//     }
//
//
//   });
//
// });
//
//
//
// // const scatterplotData = d3.json("../data/allData.json", function(data){
// //   const chart = c3.generate
// //
// // })
//
//
//
// d3.json("sample.json", function(data) {
//   var modData = [];
//   data.results.forEach(function(d, i) {
//     var item = ["param-" + d.param];
//     d.val.forEach(function(j) {
//       item.push(j);
//     });
//     modData.push(item);
//   });
//
//   const chart = c3.generate({
//     data: {
//       columns: modData
//
//     }
//   });
// });
