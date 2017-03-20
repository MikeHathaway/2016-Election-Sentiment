//IIFE that controls access to NYT articles
  //This is then piped into the Watson API to generate sentiment data


  //Currently stuck on returning the first page of the set of nyt articles that fit the parameter, need to iterate over the whole set
    //page will be a IIFE level counter of the page that matches the query... this can then be updated each on each pass throught the dataset
    //http://brooksandrew.github.io/simpleblog/articles/new-york-times-api-to-mongodb/

const nytFunctionality = (function(document){
  const nytFunctionality = {}

  nytFunctionality.genArrayByParam = function(data,parameter){
    return data.reduce((acc,curr) => {
      acc.push(curr[`${parameter}`])
      return acc
    },[])
  }

  function writeSentimentData(data,searchTerm){
    return database.ref(`${searchTerm}-articles`).push(data)
  }

  //Add flag to check if information should be sent to firebase
    //local parameter determines whether or not to send information to firebase
  nytFunctionality.retreiveArticles = function(searchString,page,local = true){
    let url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    let data = {
      'q': searchString,
      'begin_date': "20160610",
      'end_date': "20161108",
      'page': page
    }

    url += '?' + $.param({
      'api-key': "bee376d83aef4bdaa4a5591e1bd2be14",
    });

    return $.get(url, data)
      .then(function(result) {
        const articles = result.response.docs

        //Calls Watson API and appends score to article object
        const analyzedArticles = articles.map(article => {
          return textAnalysis.promiseChain(article.lead_paragraph)
            .then((res) => {
              if(res !== undefined){
                article['sentiment'] = res.score
                return article
              }
              console.log('sentiment not added')
            })
        })

        //call the pollData function from renderChart
        Promise.all(analyzedArticles)
          .then(function (result) {
            if(local === false){
              console.log(pollData('polls',100)) //this is not being read
              writeSentimentData(result,searchString)
              return renderChart(result,pollData('polls',100))
            }
            return renderChart(result)
          })
      })
      .catch(function(err) {
        throw err;
      });
  }

  return nytFunctionality
})(document)

function makeAPICalls(searchTerm,n){
  let page = -1;
  console.log('call is going through')

  while(++page < n){
    console.log(page)
    nytFunctionality.retreiveArticles(searchTerm,page)
  }
}

// makeAPICalls('Russia',2)
