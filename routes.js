const router = require("express").Router();

router.post("/add", (req, res) => {
  try {
    const premierNombre = req.body.premierNombre;
    const secondNombre = req.body.secondNombre;
    let resultat;

    setTimeout(() => {
      resultat = premierNombre + secondNombre;

      res.status(200).json({ statut: 200, resultat });
    }, 2000);
  } catch (error) {
    res.status(500).json({ statut: 500, message: error.message });
  }
});

module.exports = router;
