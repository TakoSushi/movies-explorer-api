// Limiter config
const limiterConfig = {
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
};

// Adress
const serverPort = 8080;
const dbAddress = 'mongodb://127.0.0.1:27017/bitfilmsdb';

// Message request and errors
const successAuth = 'Авторизация прошла успешно';
const successSignout = 'Выход успешно выполнен';
const userNotFound = 'Пользователь не найден';
const filmNotFound = 'Фильм не найден';
const filmDeleted = 'Фильм удален';
const noPermission = 'Недостаточно прав';
const needAuth = 'Необходима авторизация';
const incorrectId = 'Некоректный Id';
const userEmailIsExist = 'Пользователь с данной почтой уже существует';
const serverError = 'Ошибка сервера';
const incorrectPath = 'Указан неверный путь';

module.exports = {
  limiterConfig,
  serverPort,
  dbAddress,
  successSignout,
  successAuth,
  userNotFound,
  filmNotFound,
  filmDeleted,
  noPermission,
  needAuth,
  incorrectId,
  userEmailIsExist,
  serverError,
  incorrectPath,
};
