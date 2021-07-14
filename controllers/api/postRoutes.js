const router = require('express').Router();
const { User, Post, Comment } = require('../../models');


router.get('/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    as: 'blog_author',
                    attributes: ['username'],
                },
                {
                    model: Comment,
                    as: 'blog_comments',
                    include: {
                        model: User,
                        as: "comment_author",
                        attributes: ['username'],
                    },
                },
        ], 
    });
        const singlePostData = postData.get({ plain: true });

        const commentsData = await Comment.findAll({
            include: [
                {
                    model: User,
                    as: 'comment_author',
                    attributes: ['username'],
                },
            ],
            where: {
                blog_id: req.params.id,
            }
        })

        const postComments = commentsData.map((comment) =>
            comment.get({ plain: true })
        );

        res.status(200).json(singlePostData, postComments);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});





router.post('/', async (req, res) => {
    try {
        const newPost = await Post.create({
            user_id: req.session.user_id,
            title: req.body.title,
            content: req.body.content,
        });
        res.status(200).json(newPost);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put("/:id", async (req, res) => {
    try {
      const updatedBlog = await Blog.update(
        {
          title: req.body.title,
          content: req.body.content,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      res.status(200).json(updatedBlog);
    } catch (err) {
      res.status(400).json(err);
    }
  });

router.delete('/:id', async (req, res) => {
    try {
        const deletedPost = await Post.destroy({
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json(deletedPost);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;