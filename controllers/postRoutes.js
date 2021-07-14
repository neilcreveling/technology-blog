const router = require('express').Router();
const withAuth = require('../utils/auth');
const { User, Post, Comment } = require('../models');

router.get('/create', async (req, res) => {
    try {
        res.render('new-post', {
            logged_in: req.session.logged_in,
            user_id: req.session.user_id,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    as: 'blog_author',
                    attributes: ['username', 'id'],
                },
            ],
        });

        const singlePostData = postData.get({ plain: true });

        const commentsData = await Comment.findAll({
            include: [
                {
                    model: User,
                    as: "blog_author",
                    attributes: ['username', 'id'],
                },
            ],
            where: {
                post_id: req.params.id,
            }
        });

        const blogComments = commentsData.map((comment) =>
            comment.get({ plain: true })
        );

        res.render('singlepost', { 
            singlePostData,
            postComments,
            user_id: req.session.user_id,
            logged_in: req.session.logged_in,
         });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;