const multer = require('multer');

// défini "un dictionnaire" des 3 mimetypes possibles
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

// on crée un objet de configuration. On utilise la méthode "diskStorage()" pour indiquer comment enregistrer le fichier
const storage = multer.diskStorage({
    // 1er argument, fonction qui indique le dossier de destination
    destination: (req, file, callback) => {
        callback(null, 'images');
    },
    // 2eme argument, fonction qui indique le nom du fichier à utiliser (évite les doublons, ...)
    filename: (req, res, callback) => {
        // enlève les espaces du nom et les remplace par un underscore
        const name = file.originalname.split(' ').join('_');
        // récupère le mimetype du dictionnaire qui correspond à celui du fichier envoyé par frontend
        const extension = MIME_TYPES[file.mimetype];
        // fonction callback qui concatène le name + un timestamp à la miliseconde (pour l'unicité) + un . + extension
        callback(null, name + Date.now() + '.' + extension);
    }
});

// méthode single() qui indique qu'il s'agit d'un seul fichier (non un groupe de fichiers) de type image.
module.exports = multer({ storage }).single('image');