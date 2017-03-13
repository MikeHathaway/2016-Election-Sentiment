
//IIFE that controls access to NYT articles
  //This is then piped into the Watson API to generate sentiment data
const nytFunctionality = (function(document){
  const nytFunctionality = {}

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

  nytFunctionality.retreiveArticles = function(){
    let url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    url += '?' + $.param({
      'api-key': "bee376d83aef4bdaa4a5591e1bd2be14"
    });
    $.ajax({
      url: url,
      method: 'GET',
    }).then(function(result) {
      const articles = result.response.docs

      const TrumpArticles = nytFunctionality.searchForCandidate(nytFunctionality.arrayOfAbstracts(articles),'Trump')
      const ClintonArticles = nytFunctionality.searchForCandidate(nytFunctionality.arrayOfAbstracts(articles),'Clinton')

      console.log(nytFunctionality.arrayOfAbstracts(articles))
      console.log(TrumpArticles,ClintonArticles)
    }).catch(function(err) {
      throw err;
    });

  }

  return nytFunctionality
})(document)

nytFunctionality.retreiveArticles()
