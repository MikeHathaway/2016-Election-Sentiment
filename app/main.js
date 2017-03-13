console.log('application loaded')

'use strict'

var data = null;

const xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {
    console.log(this.responseText);
  }
});

xhr.open("GET", "https://api.nytimes.com/svc/search/v2/articlesearch.json");
xhr.setRequestHeader("api-key", "bee376d83aef4bdaa4a5591e1bd2be14");
xhr.setRequestHeader("cache-control", "no-cache");
xhr.setRequestHeader("postman-token", "1b202d42-cb26-64f1-f274-7b44111f1b50");

xhr.withCredentials = true;

xhr.send(data);
// xhr.send();


//
// const TrumpArticles = searchForCandidate(arrayOfAbstracts(articles),'Trump')
// const ClintonArticles = searchForCandidate(arrayOfAbstracts(articles),'Clinton')
//
// function arrayOfAbstracts(data){
//   return data.reduce((acc,curr) => {
//     acc.push(curr.lead_paragraph)
//     return acc;
//   },[])
// }
//
// function searchForCandidate(articles,candidate){
//   return articles.filter(article => {
//     if(article.includes(candidate)){
//       return article
//     }
//   })
// }

//Need to determine who an article is primarily about

//https://www.ibm.com/watson/developercloud/doc/natural-language-understanding/migrating.html
//https://www.pubnub.com/blog/2017-02-01-analyze-user-sentiment-emotion-context-in-realtime-with-ibm-watson/
