//this page handles pollyVote API requests and generates datasets
  //https://pollyvote.com/wp-content/plugins/pollyvote/data/index.php?time=current&type=markets_combined&displaydays=100


  const pollData = function(type,displaydays){
    let url = "http://galvanize-cors-proxy.herokuapp.com/https://pollyvote.com/wp-content/plugins/pollyvote/data/index.php";
    let data = {
      'time': 'current',
      'type': type,
      'displaydays': displaydays
    }

    return $.get(url, data)
}
