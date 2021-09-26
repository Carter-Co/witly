import fs from 'fs';
import FormData from 'form-data';
import { fetchPerson, fetchPeople, createPerson } from "../api/people.js";

export const fetchPeopleController = async function(req, res) {
    const name = req.query.name;
    let user;
    if (req.isAuthenticated()) {
        user = {
            id: req.user.rows[0].id,
            username: req.user.rows[0].username,
        };
    } else {
        user = null;
    }    
    const peopleData = await fetchPeople(name);
    if (peopleData) {
        const SortedPeopleData = peopleData.sort(function(a,b){
                var nameA = a.name.toUpperCase(); // ignore upper and lowercase
                var nameB = b.name.toUpperCase(); // ignore upper and lowercase
                if (nameA < nameB) {
                  return -1;
                }
                if (nameA > nameB) {
                  return 1;
                }
                // names must be equal
                return 0;
              });

        res.render('index', { 
            people: SortedPeopleData,
            user: user, 
        });
    } else {
        res.send("Not authorized.");
    }
};
//      res.render('index', { 
//          people: peopleData,
//          user:user,
//         });
//     } else {
//         res.send("Not authorized.")
//     }
// }

export const fetchPersonController = async function(req, res) {
    let personId = req.params.id;
    const personData = await fetchPerson(personId);
    let user;
    if (req.isAuthenticated()) {
        user = {
            id: req.user.rows[0].id,
            username: req.user.rows[0].username,
        };
    } else {
        user = null;
    }    
    if (personData) {
        res.render('profile', { person: personData, user: user });
    } else {
        res.send('Not authorized.');
    }
    // const personId = req.params.id;
    // const personData = await fetchPerson(personId)
    // console.log (personData)
    // res.render('profile', { person: personData})
}

export const createPersonFormController = function(req, res) {
    let user;
    if (req.isAuthenticated()) {
        user = {
            id: req.user.rows[0].id,
            username: req.user.rows[0].username,
        };
    } else {
        user = null;
    }
    res.render('newProfile', { person: personData, user: user } )

}

export const createPersonController = async function (req, res) {
    let personData = req.body;
    const form = new FormData();
    form.append('name', personData.name);
    form.append('tagline', personData.tagline);
    form.append('bio', personData.bio);
    const fileStream = fs.createReadStream(req.file.path);
    form.append('photo', fileStream, req.file.originalname);

    let newPerson;
    try {
          newPerson = await createPerson(form);
    } catch (err) {
          console.log(err);
    }
    if (newPerson) {
          res.render('profile', { person: newPerson });
    } else {
          res.send('Error.');
    }
}; 



