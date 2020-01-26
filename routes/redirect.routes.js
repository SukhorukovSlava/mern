const {Router} = require('express');
const Link = require('../models/Link');

const router = Router();

const configurationResponse = (res, status, message) => res.status(status).json(message);

router.get('/:code', async (req, res) => {
  try {
    const requestCode = req.params.code;
    const link = await Link.findOne({code: requestCode});

    if (link) {
      link.cnt_click++;
      await link.save();

      return res.redirect(link.from);
    }

    res.status(404).json(`Link with code = ${requestCode} not found!`);

  } catch (e) {
    configurationResponse(res, 500, {
      message: 'Что-то пошло не так, попробуйте позднее!'
    });
  }
});

module.exports = router;