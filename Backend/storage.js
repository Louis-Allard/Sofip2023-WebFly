const express = require("express");
const multer = require("multer");
const path = require("path");
const app = express();
const port = 3000; // Remplacez par le port de votre choix

// Configuration de Multer pour gérer les uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "upload/"); // Dossier de destination pour les fichiers téléchargés
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

// Configurez le middleware multer pour gérer les fichiers téléchargés
const upload = multer({ dest: "uploads/" }); // Le répertoire où les fichiers seront stockés temporairement

// Définissez une route pour gérer l'envoi de fichiers
app.post("/upload", upload.single("file"), (req, res) => {
  // Vous pouvez accéder au fichier téléchargé via req.file
  const uploadedFile = req.file;

  if (!uploadedFile) {
    return res.status(400).json({ error: "Aucun fichier n'a été téléchargé." });
  }

  // À ce stade, vous pouvez traiter le fichier comme vous le souhaitez, par exemple, le stocker
  // dans un répertoire permanent ou le traiter d'une autre manière.
  // Vous pouvez également renvoyer une réponse indiquant que le fichier a été traité avec succès.

  return res.json({ message: "Fichier téléchargé avec succès." });
});

app.listen(3000, () => {
  console.log(`Le serveur est en cours d'exécution sur le port ${port}`);
});
