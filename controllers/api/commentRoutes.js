const { Comment } = require('../../models');
const router = require('express').Router();

// add comment
router.post('/', async (req, res) => {
    try {
        const newComment = await Comment.create({
            user_id: req.params.user_id,
            blog_id: req.params.blog_id,
            content: req.body.content,
        });
        res.status(200).json(newComment);
    } catch (err) {
        res.status(500).json(err);
    }
});

// update comment
router.put('/:id', async (req, res) => {
    try {
        const updatedComment = await Comment.update(
            {
                content: req.body.content
            },
            {
                where: {
                    id: req.params.id,
                },
            }
        );
        res.status(200).json(updatedComment);
    } catch (err) {
        res.status(400).json(err);
    }
});

// delete comment
router.delete('/:id', async (req, res) => {
    try {
        const deletedComment = await Comment.destroy({
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json(deletedComment);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.get("/", async (req, res) => {
    try {
      const allComments = await Comment.findAll();
      const commentData = allComments.map((user) => user.get({ plain: true }));
      res.status(200).json(commentData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;