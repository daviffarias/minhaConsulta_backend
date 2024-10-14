const db = require('../db/database');
// Obter consultas com base no papel do usuário
exports.getConsultations = (req, res) => {
  const { role, id: userId } = req.user;  // Supondo que req.user tenha as informações do usuário logado

  let query = 'SELECT * FROM consultations';
  let params = [];

  if (role === 'user') {
    // Se for usuário comum, só pode ver suas próprias consultas
    query += ' WHERE userId = ?';
    params.push(userId);
  }

  db.all(query, params, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
};

// Criar uma nova consulta
exports.createConsultation = (req, res) => {
  const { userId, date, doctor, specialty, status } = req.body;

  db.run(`INSERT INTO consultations (userId, date, doctor, specialty, status) VALUES (?, ?, ?, ?, ?)`,
    [userId, date, doctor, specialty, status],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ id: this.lastID });
    }
  );
};
