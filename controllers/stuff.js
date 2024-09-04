const Thing = require('../models/Thing')

exports.createThing = (req, res, next) => {
    // création d'un objet parsé et suppression de son id et son userId
    const thingObject = JSON.parse(req.body.thing);
    delete thingObject._id;
    delete thingObject._userId;
    const thing = new Thing({
        ...thingObject, // opérateur "spread" copie les champs du body de la requête et les détaille
        userId: req.auth.userId, // ajout du userId de l'authentification
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    thing.save() // méthode save() enregistre dans la bd et retourne une promise (then et catch)
        .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
        .catch(error => res.status(400).json({ error }));
};

exports.getOneThing = (req, res, next) => { // rejout de : au segment dynamique de la route pour la rendre accessible en tant que paramètre (id)
    // méthode qui affiche l'élément ayant le même id qui le paramètre de la requête
    Thing.findOne({ _id: req.params.id })
        .then(thing => res.status(200).json(thing))
        .catch(error => res.status(404).json({ error }));
};

exports.mofifyThing = (req, res, next) => {
    const thingObject = req.file ? {
        ...JSON.parse(req.body.thing), imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : {...req.body};

    delete thingObject._userID;
    
    Thing.updateOne({ _id: req.params.id }, {...req.body, _id: req.params.id})
        .then(()=> res.status(200).json('Objet modifié !'))
        .catch(error => res.status(400).json({ error }));
};

exports.deleteThing = (req, res, next) =>{
    Thing.deleteOne({ _id: req.params.id })
        .then(()=> res.status(200).json('Objet supprimé !'))
        .catch(error => res.status(400).json({ error }));
};

exports.getAllStuff = (req, res, next) => {
    // méthode qui affiche tous les éléments "Thing" de la collection "Things" de la DB
    Thing.find()
        .then(things => res.status(200).json(things))
        .catch(error => res.status(400).json({ error }));
};

