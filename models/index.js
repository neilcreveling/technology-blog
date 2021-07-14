const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

User.hasMany(Post, {
    foreignKey: 'user_id',
    as: 'blog_author',
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
    as: 'comment_author',
});

Post.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'blog_author',
});

Post.hasMany(Comment, {
    foreignKey: 'comment_id',
    as: 'post_comments'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'comment_author',
});

Comment.belongsTo(Post, {
    foreignKey: 'comment_id',
    as: 'post_comments',
});

module.exports = { User, Post, Comment };