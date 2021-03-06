const router = require('express').Router();
const { User } = require('../../models');

router.get("/", async (req, res) => {
    try {
      const allUsers = await User.findAll();
      const userData = allUsers.map((user) => user.get({ plain: true }));
      res.status(200).json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.post('/', async (req, res) => {
    try {
        const newUserData = await User.create({
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
        });
        req.session.save(() => {
            req.session.logged_in = true;
            req.session.username = newUserData.username;
            req.session.user_id = newUserData.id;
            res.status(200).json(newUserData);
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { email: req.body.email } });

        if (!userData) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again.'});
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res
                .status(400)
                .json({ message: 'Incorrect username or password, please try again.'});
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            req.session.username = userData.username;

            res
            .status(200)
            .json({ user: userData, message: 'You are now logged in!' });
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end()
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;