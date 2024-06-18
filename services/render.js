// const axios = require('axios');
// const path = require('path');
// const fs = require('fs');
// const https = require('https');

// const httpsAgent = new https.Agent({
//     key: fs.readFileSync(path.join(__dirname, '../cert', 'key.pem')),
//     cert: fs.readFileSync(path.join(__dirname, '../cert', 'cert.pem')),
//   });

// exports.homeRoutes = (req, res) => {
//     // Make a get request to /api/users
//     axios.get('https://localhost:1337/product', {httpsAgent})
//         .then(function(response){
//             console.log(response)
//             res.render('product', { product : response.data });
//         })
//         .catch(err =>{
//             res.send(err);
//         })

    
// }

// exports.add_user = (req, res) =>{
//     res.render('add_user');
// }

// exports.update_user = (req, res) =>{
//     axios.get('http://localhost:3000/api/users', { params : { id : req.query.id }})
//         .then(function(userdata){
//             res.render("update_user", { user : userdata.data})
//         })
//         .catch(err =>{
//             res.send(err);
//         })
// }