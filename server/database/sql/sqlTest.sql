use `tree-hole`;

select * from user_table;
select * from message_table;

-- 获取所有消息，并查询 用户1 对每条消息的点赞情况，如果点赞了like_detail_id有值，否则为null
select mt.message_id, mt.content, like_detail_id
from message_table mt
left join user_table ut on mt.user_id = ut.user_id 
left join like_detail_table ldt on ldt.user_id=1 and mt.message_id = ldt.message_id;

-- 上一条语句的分页查询
select mt.message_id, mt.content, like_detail_id
from (select * from message_table where `date` < '2024-5-19 23:55:00' limit 10) mt 
left join user_table ut on mt.user_id = ut.user_id 
left join like_detail_table ldt on ldt.user_id = 1 and mt.message_id = ldt.message_id; 