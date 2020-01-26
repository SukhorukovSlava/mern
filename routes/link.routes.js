const {Router} = require('express');
const config = require('config');
const shortId = require('shortid');
const Link = require('../models/Link');
const auth = require('../middleware/auth.middelware');
const router = Router();

const baseUrl = config.get('baseUrl');
const configurationResponse = (res, status, message) => res.status(status).json(message);

router.post('/create', auth, async (req, res) => {
    try {
      const {from} = req.body;
      const existing = await Link.findOne({from});
      if (existing) {
        return res.json({link: existing});
      }

      const code = shortId.generate();

      const to = baseUrl + '/t/' + code;

      const link = new Link({
        code, to, from, owner: req.user.userId
      });

      await link.save();

      res.status(201).json({link});

    } catch (e) {
      configurationResponse(res, 500, {
        message: 'Что-то пошло не так, попробуйте позднее!'
      });
    }
  }
);

router.get('/', auth, async (req, res) => {
  try {
    const links = await Link.find({owner: req.user.userId});

    res.json(links);

  } catch (e) {
    configurationResponse(res, 500, {
      message: 'Что-то пошло не так, попробуйте позднее!'
    });
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const link = await Link.findById(req.params.id);

    res.json(link);


  } catch (e) {
    configurationResponse(res, 500, {
      message: 'Что-то пошло не так, попробуйте позднее!'
    });
  }
});

module.exports = router;