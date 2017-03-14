console.log('WatsonAPI Loaded')

//https://watson-api-explorer.mybluemix.net/apis/natural-language-understanding-v1#!/Analyze/analyzeGet

//pass in nyt article as an additional argument to IIFE
const textAnalysis = (function(){
  const textAnalysis = {}
  const username = "5ce08e86-c1d1-4f72-821b-1bed6bb27ec4"
  const password = "BRmyPB5B6rgy"

  // url: "http://galvanize-cors-proxy.herokuapp.com/https://gateway.watsonplatform.net/natural-language-understanding/api/v1/analyze?version=2017-02-27&text=I%20still%20have%20a%20dream%2C%20a%20dream%20deeply%20rooted%20in%20the%20American%20dream%20%E2%80%93%20one%20day%20this%20nation%20will%20rise%20up%20and%20live%20up%20to%20its%20creed%2C%20%22We%20hold%20these%20truths%20to%20be%20self%20evident%3A%20that%20all%20men%20are%20created%20equal.&features=sentiment,keywords"
  console.log(nytFunctionality.retreiveArticles())

  textAnalysis.promiseChain = function(articleAbstract){
    let url = `http://galvanize-cors-proxy.herokuapp.com/https://gateway.watsonplatform.net/natural-language-understanding/api/v1/analyze?version=2017-02-27&text=${articleAbstract}&features=sentiment`
    // `${url}${articleURL}&features=sentiment`

    $.ajax({
        url: url,
        method: "GET",

        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password));
        },
    }).then(response => {
        // console.log(response);
        console.log(response['sentiment']['document']);

    }).catch(error => {
        console.log('???', error);
    })
  }

  return textAnalysis
})()
