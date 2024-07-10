use `tree-hole`;

select * from user_table;
select * from message_table;
select * from like_detail_table;

-- 获取所有消息，并查询 用户1 对每条消息的点赞情况，如果点赞了like_detail_id有值，否则为null
select mt.message_id, mt.content, like_detail_id
from message_table mt
left join user_table ut on mt.user_id = ut.user_id 
left join like_detail_table ldt on ldt.user_id=1 and mt.message_id = ldt.message_id;

-- 上一条语句的分页查询，根据消息发送时间分页
select mt.message_id, mt.content, mt.`date`, mt.like_count, ut.avatar_img, ut.username, ldt.like_detail_id
from (select * from message_table where `date` < '2024-5-19 23:55:00' order by `date` desc limit 10) mt 
left join user_table ut on mt.user_id = ut.user_id 
left join like_detail_table ldt on ldt.user_id = 1 and mt.message_id = ldt.message_id; 

-- 根据message_id分页
select mt.message_id, mt.content, mt.`date`, mt.like_count, ut.avatar_img, ut.username, ldt.like_detail_id
from (select * from message_table where message_id < 8 order by message_id desc limit 10) mt 
left join user_table ut on mt.user_id = ut.user_id 
left join like_detail_table ldt on ldt.user_id = 1 and mt.message_id = ldt.message_id; 

-- 获取前10条消息
select mt.message_id, mt.content, mt.`date`, mt.like_count, ut.avatar_img, ut.username, ldt.like_detail_id
from (select * from message_table order by message_id desc limit 10) mt 
left join user_table ut on mt.user_id = ut.user_id 
left join like_detail_table ldt on ldt.user_id = 1 and mt.message_id = ldt.message_id; 

-- 按消息id 获取一条消息数据
SELECT mt.message_id messageId, mt.content, mt.`date`, mt.like_count likeCount, ut.avatar_img avatarImg, ut.username, ldt.like_detail_id likeDetailId 
FROM (select * from message_table where message_id = 18) mt 
LEFT JOIN user_table ut ON mt.user_id = ut.user_id 
LEFT JOIN like_detail_table ldt ON ldt.user_id = 1 AND mt.message_id = ldt.message_id ;

-- 根据 用户id 获取用户发送的消息
SELECT mt.message_id messageId, mt.content, mt.`date`, mt.like_count likeCount, ut.avatar_img avatarImg, ut.username, ldt.like_detail_id likeDetailId 
FROM (SELECT * FROM message_table WHERE message_id < 4 AND user_id = 1 ORDER BY message_id DESC LIMIT 10) mt
LEFT JOIN user_table ut ON mt.user_id = ut.user_id 
LEFT JOIN like_detail_table ldt ON ldt.user_id = 1 AND mt.message_id = ldt.message_id ;

-- 根据 用户id 获取 用户点过赞的消息
SELECT mt.message_id messageId, mt.content, mt.`date`, mt.like_count likeCount, ut.avatar_img avatarImg, ut.username, ldt.like_detail_id likeDetailId
FROM ( SELECT * FROM like_detail_table WHERE user_id = 1 AND like_detail_id < 3 ORDER BY like_detail_id DESC LIMIT 10 ) ldt
LEFT JOIN message_table mt ON mt.message_id = ldt.message_id
LEFT JOIN user_table ut ON ut.user_id = ldt.user_id ;
