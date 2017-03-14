//More than 20k articles on Trump alone... may need to limit the time span

  //Current goals: generate and append to persistent JSON,
    //append the Watson Sentiment Score to each JSON object

//Global analyzed article object
// const fs = require('fs')


//IIFE that controls access to NYT articles
  //This is then piped into the Watson API to generate sentiment data
const nytFunctionality = (function(document){
  const nytFunctionality = {}

  ///// This approach is depracated /////
  nytFunctionality.arrayOfAbstracts = function(data){
    return data.reduce((acc,curr) => {
      acc.push(curr.lead_paragraph)
      return acc;
    },[])
  }

  nytFunctionality.searchForCandidate = function(articles,candidate){
    return articles.filter(article => {
      if(article.includes(candidate)){
        return article
      }
    })
  }

  nytFunctionality.genArrayByParam = function(data,parameter){
    return data.reduce((acc,curr) => {
      acc.push(curr[`${parameter}`])
      return acc
    },[])
  }

//'http://api.nytimes.com/svc/search/v2/articlesearch.json?query=Trump&facets=publication_year&api-key=bee376d83aef4bdaa4a5591e1bd2be14'

  nytFunctionality.retreiveArticles = function(searchString){
    let url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    let data = {
      'q': searchString, //['Trump','Clinton'] -- would be cool to generalize to both
      'begin_date': "20160101",
      'end_date': "20161108"
    }

    url += '?' + $.param({
      'api-key': "bee376d83aef4bdaa4a5591e1bd2be14",
    });

    return $.get(url, data)
      .then(function(result) {
        const articles = result.response.docs
        // const web_url = "web_url"
        // const articleURLs = nytFunctionality.genArrayByParam(articles,web_url)
        // const TrumpArticles = nytFunctionality.arrayOfAbstracts(articles)

        //insert call to watsonAPI here
        const analyzedArticles = articles.map(article => {
          return textAnalysis.promiseChain(article.lead_paragraph)
            .then((res) => {
              article['sentiment'] = res
              console.log('*****', article);
              return article
            })
        })

        //Storing data would need to occur within here
        Promise.all(analyzedArticles)
          .then(function (result) {
            console.log(result);
            nytFunctionality.storeJSON(result)
          })
      })
      .catch(function(err) {
        throw err;
      });
  }

  //http://stackoverflow.com/questions/32546100/how-to-write-data-to-a-json-file-using-javascript
  //need to append each new set of api calls to a global scatterplot json
  nytFunctionality.storeJSON = function(data){
    // return fs.writeFile('testData.json',JSON.stringify(data))

    // const storedArticleSentiment = []
    // storedArticleSentiment.push(data)
    // return localStorage.setItem('myStorage',JSON.stringify(storedArticleSentiment))
  }

  return nytFunctionality
})(document)

nytFunctionality.retreiveArticles('Trump')
