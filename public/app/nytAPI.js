//More than 20k articles on Trump alone... may need to limit the time span

  //Current goals: generate and append to persistent JSON,

  //need to append a property that allows for seeing if the article is primarily about Trump, or Clinton,
    // or allow user to specify whether they want to see articles primarily about Trump, or primarily about Clinton, or all articles


// Initialize Firebase
var config = {
    apiKey: "AIzaSyB5F9w1---vt7Ry_sXGJsnYHbeCa6NZQHw",
    authDomain: "election-sentiment.firebaseapp.com",
    databaseURL: "https://election-sentiment.firebaseio.com",
    storageBucket: "election-sentiment.appspot.com",
    messagingSenderId: "560838721290"
};
    firebase.initializeApp(config);


//DB Code to generate persistent JSON structure
//https://firebase.google.com/docs/database/web/read-and-write
const database = firebase.database();
// let page = 0


//IIFE that controls access to NYT articles
  //This is then piped into the Watson API to generate sentiment data
const nytFunctionality = (function(document){
  const nytFunctionality = {}

  nytFunctionality.genArrayByParam = function(data,parameter){
    return data.reduce((acc,curr) => {
      acc.push(curr[`${parameter}`])
      return acc
    },[])
  }

//Currently stuck on returning the first page of the set of nyt articles that fit the parameter, need to iterate over the whole set
  //page will be a IIFE level counter of the page that matches the query... this can then be updated each on each pass throught the dataset

//http://brooksandrew.github.io/simpleblog/articles/new-york-times-api-to-mongodb/
  function switchArticlePage(){
    console.log(page)
    return page++
  }

  function writeSentimentData(data,searchTerm){
    // return database.ref('articles').update(data)
    return database.ref(`${searchTerm}-articles`).push(data)
  }


  // function writeSentimentData(data){
  //   // return database.ref('articles').update(data)
  //   return database.ref('articles').push(data)
  // }


  nytFunctionality.retreiveArticles = function(searchString,page){
    let url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    let data = {
      'q': searchString, //['Trump','Clinton'] -- would be cool to generalize to both
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

        //insert call to watsonAPI here
        const analyzedArticles = articles.map(article => {
          return textAnalysis.promiseChain(article.lead_paragraph)
            .then((res) => {
              article['sentiment'] = res.score
              return article
            })
        })

        //Storing data would need to occur within here
          //will need to remove switchArticlePage here when generalization is complete
        Promise.all(analyzedArticles)
          .then(function (result) {
            console.log(result);
            // switchArticlePage()

            // return writeSentimentData(result)
            return writeSentimentData(result,searchString)
          })
      })
      .catch(function(err) {
        throw err;
      });
  }

  return nytFunctionality
})(document)


// function makeAPICalls(){
//   const timer = window.setInterval(function () {return nytFunctionality.retreiveArticles('Clinton')}, 2000)
//   window.setTimeout(function(){return window.clearInterval(timer)},30000)
// }
// makeAPICalls()

//need to determine the number of articles that match the total page count

function makeAPICalls(searchTerm,n){
  let page = -1;

  while(++page < n){
    console.log(page)
    nytFunctionality.retreiveArticles(searchTerm,page)
  }
}

makeAPICalls('Russia',2)
