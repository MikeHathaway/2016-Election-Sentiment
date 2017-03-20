console.log('WatsonAPI Loaded')

//Convert this into a prototype
const textAnalysis = (function(){
  const textAnalysis = {}
  const username = "5ce08e86-c1d1-4f72-821b-1bed6bb27ec4"
  const password = "BRmyPB5B6rgy"

  textAnalysis.promiseChain = function(articleAbstract){
    let url = `http://galvanize-cors-proxy.herokuapp.com/https://gateway.watsonplatform.net/natural-language-understanding/api/v1/analyze?version=2017-02-27&text=${articleAbstract}&features=sentiment`

    return $.ajax({
        url: url,
        method: "GET",
        beforeSend: function (xhr) {
          xhr.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password));
        },
    }).then(response => {
      return response['sentiment']['document'];
    }).catch(error => {
        console.log('???', error);
    })
  }

  return textAnalysis
})()
