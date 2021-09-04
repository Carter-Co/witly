import express from 'express';
import { peopleData } from './fixtures/people.js' 
import { imageData } from './fixtures/images.js'


const app = express();
app.use(express.static('static'))
app.set('view engine', 'ejs');
app.set('views', './views/pages/');
app.use( express.static( "public" ) );

app.listen(3000, () => {
    console.log('Server started!')

});

app.get('/', (req, res) => {
    // res.send ('Hello, World!')
    console.log(peopleData);
    res.render('index', { people: peopleData});
});

app.get('/profile/:id', (req, res) => {
    // console.log(req)
    let personId = req.params.id;
    let person;
    peopleData.forEach((personData) => {
        if(personData.id == personId) {
            person = personData;
            return false;
        }
    })
    console.log(person);
    res.render('profile', { person: person}); 
    
})