// importe le package http natif de node
const http = require('http');
const app = require('./app');

// renvoie un port valide, qu'il soit sous forme d'un entier ou d'une chaine
const normalizePort = val => {
    const port = parseInt(val, 10);
    if (isNaN(port)){
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};
// port fourni par la plateforme de déploiement (variable d'environnement du port grace à process.env.PORT) ou le port par défaut (3000)
const port = normalizePort(process.env.PORT || 3000);
// on indique a l'application Express sur quel port fonctionner
app.set('port', port);


// recherche les différentes erreurs et les gère de manière appropriée. Elle est ensuite enregistrée dans le serveur
const errorHandler = error => {
    if (error.syscall !== 'listen'){ // si l'erreur n'est pas lié à l'opération 'listen'
        throw error;
    }
    const address = server.address(); // retourne l'adresse que le serveur est en train d'écouter
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
        case 'EACCES': // l'application essaie d'utiliser un port ou une ressource réseau sans les privilèges nécessaires
            console.error(bind + ' requires elevated privileges.');
            process.exit(1); // le programme est arrêté
            break;
        case 'EADDRINUSE': // Cette erreur survient si l'adresse ou le port est déjà utilisé par un autre processus
            console.error(bind + ' is already in use.');
            process.exit(1); // le programme est arrêté
            break;
        default:
            throw error;
    }
};

// crée un serveur avec la fonction createServer qui sera exécutée à chaque appel vers ce serveur.
const server = http.createServer(app);

// gère les évènements ("error" et "listening") émis par le serveur http
server.on('error', errorHandler);
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind);
});

// le serveur écoute le port
server.listen(port);