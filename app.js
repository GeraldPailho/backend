// importe les packages express et mongoose
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

// import des routeurs
const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');

// connexion à la base de donnée MongoDB Atlas
mongoose.connect('mongodb+srv://User1:Azerty-123@clustertutonodeexpressm.zzt69.mongodb.net/?retryWrites=true&w=majority&appName=ClusterTutoNodeExpressMongoDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true })
    .then(() => console.log("Connexion à MongoDB réussie !"))
    .catch(() => console.log("Connexion à MongoDB échouée !"));

// on crée l'application
const app = express();

// middleware pour ajouter des headers à l'objet response pour évite les erreurs CORS (CORS : partage des ressources entre origines multiples)
// pas d'adresse en premier paramètre de ce middleware, afin de s'appliquer à toutes les routes
app.use((req, res, next) => {
    // accéder à notre API depuis n'importe quelle origine ( '*' )
    res.setHeader('Access-Control-Allow-Origin', '*');
    // ajouter les headers mentionnés aux requêtes envoyées vers notre API
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    // envoyer des requêtes avec les méthodes mentionnées
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    // permet de basculer sur le middleware suivant
    next();
});

// extrait le json d'une requête pour exéder à leur body
app.use(express.json());

// enregistrement du routeur stuffRoutes pour toutes les demandes vers /api/stuff
app.use('/api/stuff', stuffRoutes);
// enregistrement du routeur userRoutes pour toutes les demandes vers /api/auth
app.use('/api/auth', userRoutes);
// enregistrement pour les routes pour les fichiers statiques
app.use('/images', express.static(path.join(__dirname, 'images')));

// exporte l'application pour y accéder de par d'autre fichier nottement le server node (server.js)
module.exports = app;