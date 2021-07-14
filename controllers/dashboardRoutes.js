const router = require('express').Router();
const withAuth = require('../utils/auth');
const { User, Post, Comment } = require('../models');

router.get('/', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
        });

        const user = userData.get({ plain: true });

        const postData = await Post.findAll({
            include: [
                {
                    model: Comment,
                    as: 'post_comments',
                    attributes: ['content'],
                },
            ],
            where: {
                user_id: req.session.user_id,
            }
        });

        const userPost = postData.map((post) => post.get({ plain: true }));

        res.render('dashboard', {
            user,
            userPost,
            comments,
            logged_in: true,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;