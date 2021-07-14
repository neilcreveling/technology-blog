const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    as: 'blog_author',
                    attributes: ['username'],
                },
            ],
        });

    // serialize data
        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in,
            user_id: req.session.user_id,
            username: req.session.username,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    res.render('login');
});
  
router.get("/login", async (req, res) => {
    try {
      if (req.session.logged_in) {
        res.redirect("/");
        return;
      } else {
        res.status(200).render("login");
      }
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
  router.get("/signup", async (req, res) => {
    try {
      res.status(200).render("signup");
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  router.get("/logout", async (req, res) => {
    try {
      res.status(200).json("Logged out!");
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;