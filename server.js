const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


// app.use((req, res, next) => {
//     res.render('maintenance.hbs',{
//         pageTitle: 'Under Maintenance'
//     })
// })

app.use(express.static(__dirname + '/public'));
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err){
            console.log('Unable to append to server.log');
        }
    });

    next();
});

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})

app.get('/', (req, res) => {
   // res.send('<h1>Hello Express!</h1>');
    // res.send({
    //     name: 'Aniket',
    //     Likes: ['Node', 'music']
    // });
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'You are in a Matrix'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs',{
        pageTitle: 'About Page',
    });
});

app.get('/bad', (req,res) => {

    res.send({
        errorMessage: 'Unable to handle request'
    });
});

app.listen(port,() => {
    console.log(`Server is up on port ${port}` );
});