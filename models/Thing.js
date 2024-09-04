// on utilise mongoose pour créer un schéma de données (import de mongoose)
const mongoose = require('mongoose');

// crée le schéma de données d'un article grace à la fonction .Schema de Mongoose
const thingSchema = mongoose.Schema({
    title: { type: String, required: true},
    description: { type: String, required: true},
    imageUrl: { type: String, required: true},
    userId: { type: String, required: true},
    price: { type: Number, required: true},
});

// export de ce schéma en tant que modèle Mongoose
module.exports = mongoose.model('Thing', thingSchema);