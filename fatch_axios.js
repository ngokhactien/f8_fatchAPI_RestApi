var post = 'http://localhost:5555/status';

fetch(post).then( (respont)=>{
    return respont.json() ;
    // nó đã parse qua javascript 
}).then( (posts)=> {
    console.log( posts.name);
    alert(posts.name);
});
console.log('hello');
// const axios = require('axios');

// var post = 'http://localhost:5555/status';

// axios.get(post).then( (res)=>{
//     console.log('hello')
//     console.log(res.data.name);
// }).catch( (err)=>{
//     console.log(err)
// } )




