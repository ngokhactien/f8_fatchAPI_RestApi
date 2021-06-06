
// fetch Api
var post = 'http://localhost:5555/status';

fetch(post).then( (respont)=>{
    return respont.json() ;
    // nó đã parse qua javascript 
}).then( (posts)=> {
    console.log( posts.name);
    alert(posts.name);
});
console.log('hello');

// axios
const axios = require('axios');

var post = 'http://localhost:5555/status';

axios.get(post).then( (res)=>{
    console.log('hello')
    console.log(res.data.name);
}).catch( (err)=>{
    console.log(err)
} )


//isomorphic-fetch
require('isomorphic-fetch');

fetch('//offline-news-api.herokuapp.com/stories')
    .then(function(response) {
        if (response.status >= 400) {
            throw new Error("Bad response from server");
        }
        return response.json();
    })
    .then(function(stories) {
        console.log(stories);
    });



