const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const AuthenticationError = require('../error/authenticationError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Неверный формат URL',
    },
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Поле "email" должно быть валидным email-адресом',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.static.findUserByCredentials = function (email, password) {
  return this.findOne({ email }) // this - User's model
    .select('+password')
    .then((user) => {
      if (!user) {
      // получаем объект если почта и пароль подошли
      // не нашелся - отклоняем промис
        return Promise.reject(
          new AuthenticationError('Incorrect email or password'),
        );
      }
      // нашелся сравниваем хеши
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            // отклоняем промис
            return Promise.reject(
              new AuthenticationError('Incorrect email or password'),
            );
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
