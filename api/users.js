const express = require('express');
const passport = require('passport');

const auth = require('./auth/auth');
const User = require('./Models/User.model');

const router = express.Router();

async function getMyUsers(req, res) {
  try {
    const users = await User.find();
    return res.send(users);
  } catch (e) {
    return res.status(500).send(e);
  }
}

router.get('/team', getMyUsers);

router.post('/setpassword', async () => {
  const user = await User.findOne({ email: 'jorge@producthackers.es' });
  user.setPassword('C130p@tr@');
  await user.save();
});

router.post('/login', auth.optional, (req, res, next) => {
  const { body: { user } } = req;

  if (!user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if (!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
    if (err) {
      return next(err);
    }

    if (passportUser) {
      const loggedUser = passportUser;
      loggedUser.token = passportUser.generateJWT();

      return res.json({ user: loggedUser.toAuthJSON() });
    }

    return res.status(400).json({ info });
  })(req, res, next);
});

module.exports = router;
