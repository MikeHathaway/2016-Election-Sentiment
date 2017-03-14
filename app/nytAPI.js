//More than 20k articles on Trump alone... may need to limit the time span

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
    url += '?' + $.param({
      'api-key': "bee376d83aef4bdaa4a5591e1bd2be14",
    }); //+ '&facet_field=source&facet_filter=true'; //recent addition
    $.ajax({
      url: url, //url,
      method: 'GET',
      data: {
        'q': searchString, //['Trump','Clinton'] -- would be cool to generalize to both
        'begin_date': "20160101",
        'end_date': "20161108"
      }
    }).then(function(result) {
      console.log(result,url)
      const articles = result.response.docs
      const web_url = "web_url"
      const articleURLs = nytFunctionality.genArrayByParam(articles,web_url)

      console.log(articles)

      //insert call to watsonAPI here
      const TrumpArticles = nytFunctionality.arrayOfAbstracts(articles)

      //will call nytFunctionality.storeJSON on this whole function
      TrumpArticles.map(element => {
        return textAnalysis.promiseChain(element)
      })

    }).catch(function(err) {
      throw err;
    });
  }

  nytFunctionality.storeJSON = function(data){

  }

  return nytFunctionality
})(document)

nytFunctionality.retreiveArticles('Trump')
