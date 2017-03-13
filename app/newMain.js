
let url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
url += '?' + $.param({
  'api-key': "bee376d83aef4bdaa4a5591e1bd2be14"
});
$.ajax({
  url: url,
  method: 'GET',
}).done(function(result) {
  const articles = result.response.docs
  console.log(arrayOfAbstracts(articles))
  console.log(searchForCandidate(arrayOfAbstracts(articles),'Trump'))

  const TrumpArticles = searchForCandidate(arrayOfAbstracts(articles),'Trump')
  const ClintonArticles = searchForCandidate(arrayOfAbstracts(articles),'Clinton')
}).fail(function(err) {
  throw err;
});

function arrayOfAbstracts(data){
  return data.reduce((acc,curr) => {
    acc.push(curr.lead_paragraph)
    return acc;
  },[])
}

function searchForCandidate(articles,candidate){
  return articles.filter(article => {
    if(article.includes(candidate)){
      return article
    }
  })
}
