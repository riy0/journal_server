import express from 'express';

const router = express.Router();

router.get('/', (req, res) => res
.status(200).json({
    status: 200,
    data: [
      {
        title: 'I was delighted',
      },
      {
        title: 'clean my room',
      },
    ],
}));

module.exports = router;
