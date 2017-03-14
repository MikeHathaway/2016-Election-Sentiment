
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
      const TrumpArticles = nytFunctionality.searchForCandidate(nytFunctionality.arrayOfAbstracts(articles),'Trump')
      const ClintonArticles = nytFunctionality.searchForCandidate(nytFunctionality.arrayOfAbstracts(articles),'Clinton')

      //insert call to watsonAPI here
      console.log(articles)
      // textAnalysis.promiseChain(articleURLs[1])

      // console.log('!', articleURLs)
      // console.log(nytFunctionality.arrayOfAbstracts(articles))
      // console.log(TrumpArticles,ClintonArticles)
    }).catch(function(err) {
      throw err;
    });
  }

  return nytFunctionality
})(document)

nytFunctionality.retreiveArticles('Clinton')
