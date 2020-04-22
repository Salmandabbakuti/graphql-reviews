  $('#getMovies').click();
let apiUrl = 'http://localhost:8080/graphql'
function getMovies(){
axios({
  url: apiUrl,
  method: 'post',
  data: {
    query: `
     query{
     getMovies{
        id
        name
        producer
        rating
        rank
       }
     } `
  }
}).then((result) => {
  //console.log(result.data.data.getMovies)
  let response = result.data.data.getMovies
  let sectionsContent = `<table class="table table-striped table-hover">
   <tr>
    <th>S.No.</th>
   <th>Movie Id</th>
   <th>Name</th>
   <th>Producer</th>
   <th>Rating</th>
    <th>Rank</th>
    </tr>`

      for (let i = 0; i < response.length; i++) {
                  sectionsContent += `<tr>
                      <td>${i+1}</td>
                      <td>${response[i].id}</td>
                      <td>${response[i].name}</td>
                      <td>${response[i].producer}</td>
                      <td>${response[i].rating}</td>
                      <td>${response[i].rank}</td>
                      </tr>`
                }
      let content = sectionsContent + `</table>`
      document.querySelector('#response').innerHTML = content
});
}

function getMovie() {
let movieId = document.getElementById('searchMovieId').value
 axios({
  url: apiUrl,
  method: 'post',
  data: {
    query: `
     query{
     getMovie(id:"${movieId}"){
        id
        name
        producer
        rating
        rank
       }
     } `
  }
}).then((result) => {
  //console.log(result.data.data.getMovie)
  let response = result.data.data.getMovie
  let sectionsContent = `<table class="table table-striped table-hover">
   <tr>
   <th>Movie Id</th>
   <th>Name</th>
   <th>Producer</th>
   <th>Rating</th>
    <th>Rank</th>
    </tr>
     <tr>
    <td>${response.id}</td>
    <td>${response.name}</td>
    <td>${response.producer}</td>
    <td>${response.rating}</td>
    <td>${response.rank}</td>
   </tr></table>`
 document.querySelector('#response').innerHTML = sectionsContent
     });  

}
function addMovie() {
let name = document.getElementById('a-name').value
let producer = document.getElementById('a-producer').value
let rating = document.getElementById('a-rating').value
let rank = document.getElementById('a-rank').value

 axios({
  url: apiUrl,
  method: 'post',
  data: {
    query: `
     mutation{
     addMovie(name:"${name}",producer:"${producer}",rating:${rating},rank:${rank}){
        id
        name
        producer
        rating
        rank
       }
     } `
  }
}).then((result) => {
  //console.log(result.data.data.addMovie)
  let response = result.data.data.addMovie
  let sectionsContent = `<table class="table table-striped table-hover">
   <tr>
   <th>Movie Id</th>
   <th>Name</th>
   <th>Producer</th>
   <th>Rating</th>
    <th>Rank</th>
    </tr>
     <tr>
    <td>${response.id}</td>
    <td>${response.name}</td>
    <td>${response.producer}</td>
    <td>${response.rating}</td>
    <td>${response.rank}</td>
   </tr></table>`
 document.querySelector('#response').innerHTML = sectionsContent
     });  

}
function updateMovie() {
let id = document.getElementById('u-id').value
let name = document.getElementById('u-name').value
let producer = document.getElementById('u-producer').value
let rating = document.getElementById('u-rating').value
let rank = document.getElementById('u-rank').value

 axios({
  url: apiUrl,
  method: 'post',
  data: {
    query: `
     mutation{
     updateMovie(id:"${id}",name:"${name}",producer:"${producer}",rating:${rating},rank:${rank}){
        id
        name
        producer
        rating
        rank
       }
     } `
  }
}).then((result) => {
  console.log(result.data.data.updateMovie)
  let response = result.data.data.updateMovie
  let sectionsContent = `<table class="table table-striped table-hover">
   <tr>
   <th>Movie Id</th>
   <th>Name</th>
   <th>Producer</th>
   <th>Rating</th>
    <th>Rank</th>
    </tr>
     <tr>
    <td>${response.id}</td>
    <td>${response.name}</td>
    <td>${response.producer}</td>
    <td>${response.rating}</td>
    <td>${response.rank}</td>
   </tr></table>`
 document.querySelector('#response').innerHTML = sectionsContent
     });  

}
function deleteMovie() {
let id = document.getElementById('d-id').value
 axios({
  url: apiUrl,
  method: 'post',
  data: {
    query: `
     mutation{
     deleteMovie(id:"${id}"){
        response
       }
     } `
  }
}).then((result) => {
  //console.log(result.data.data.deleteMovie)
  let response = result.data.data.deleteMovie
 document.querySelector('#response').innerHTML = response.response;
     });  

}
