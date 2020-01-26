const {Router} = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {check, validationResult} = require('express-validator');
const config = require('config');
const router = Router();

const configurationResponse = (res, status, message) => res.status(status).json(message);

router.post(
  '/register',
  [
    check('email', 'Некорректный e-mail').isEmail(),
    check('password', 'Минимальная длина пароля 6 символов')
      .isLength({min: 6})
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return configurationResponse(res, 400, {
          errors: errors.array(),
          message: 'Некоректные данные при регистрации!'
        });
      }

      const {email, password} = req.body;

      const candidate = await User.findOne({email});

      if (candidate) {
        configurationResponse(res, 400, {
          message: 'Такой пользователь уже существует!'
        });
      }

      const hashPassword = await bcrypt.hash(password, 12);

      const user = new User({
        email,
        password: hashPassword
      });

      await user.save();

      configurationResponse(res, 201, {
        message: 'Пользователь успешно создан.'
      });

    } catch (e) {
      configurationResponse(res, 500, {
        message: 'Что-то пошло не так, попробуйте позднее!'
      });
    }
  }
);

router.post(
  '/login',
  [
    check('email', 'Введите корректный e-mail').normalizeEmail().isEmail(),
    check('password', 'Введите пароль').exists()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return configurationResponse(res, 400, {
          errors: errors.array(),
          message: 'Некоректные данные при входе в систему!'
        });
      }

      const {email, password} = req.body;

      const user = await User.findOne({email});

      if (!user) {
        return configurationResponse(res, 400, {
          message: 'Пользователь не найден.'
        });
      }

      const isMatchPasswords = await bcrypt.compare(password, user.password);

      if (!isMatchPasswords) {
        return configurationResponse(res, 400, {
          message: 'Неверный пароль попробуйте снова!'
        });
      }

      const userId = user.id;
      const token = jwt.sign({userId}, config.get('jwtSalt'), {expiresIn: '1h'});

      res.json({token, userId});

    } catch (e) {
      configurationResponse(res, 500, {
        message: 'Что-то пошло не так, попробуйте позднее!'
      });
    }
  }
);

module.exports = router;
