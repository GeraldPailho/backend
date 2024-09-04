const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        // on extrait/récupère le token du header Authorization de la requête entrante (contenant la clé : Bearer)
        const token = req.headers.authorization.split(' ')[1];// méthode .split pour tout récupérer après l'espace qui suit Bearer
        // vérifie le token avec la clé secrète
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        // on récupère le userId du token décodé
        const userId = decodedToken.userId;
        // on rajoute un champ userId à l'objet request qui sera transmit aux routes
        req.auth = {
            userId: userId
        };
        // on permet l'exécution de la méthode suivant de la route
        next();
    } catch (error) {
        res.status(401).json({ error });
    }
};