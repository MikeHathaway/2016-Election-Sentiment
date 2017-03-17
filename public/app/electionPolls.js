//this file will contain the functions required to generate the polling data for the 2016 election

// http-server -c-1 .

const likelyVotersData = function(array){
  return array.filter(element =>{
    if(element.sample_subpopulation === "Likely Voters"){
      return element
    }
  })
}

const sortByDate = function(array){
  return array.sort((a,b) =>{
    return b.end_date < a.end_date
  })
}


//sample_subpopulation --1905
  //it is already prefiltered for likely voters, need to change in the csv file
  // "./data/electionData2016.csv"
//
// const huffPollsterData = d3.tsv("./data/electionData2016.csv", function(data) {
//   console.log(data);
//
//   const chart = c3.generate({
//     bindto: '#chart',
//     data: {
//           url: '/data/2016ElectionData.csv',
//           x: 'end_date',
//           type: 'line'
//     },
//     axis: {
//       x: {
//         type: 'timeseries',
// 
//       }
//     }
//
//
//   });
//
//   // console.log(likelyVotersData(data))
//   // likelyVotersData(data)
//
// });
//
// //
// const filteredElectionData = d3.json("./data/pollingData.json", function(data) {
//   // console.log(data);
//
//   const chart = c3.generate({
//     bindto: '#combined-chart',
//     data: {
//           json: './data/pollingData.json',
//           x: 'end_date',
//           value: ['Trump','Clinton'],
//           type: 'line'
//     },
//     axis: {
//       x: {
//         type: 'timeseries',
//
//       }
//     }
//
//
//   });
//
//   // console.log(likelyVotersData(data))
//   // likelyVotersData(data)
//
// });
