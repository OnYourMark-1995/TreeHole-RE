use `tree-hole`;

select * from user_table;
select * from message_table;

-- 获取所有消息，并查询用户1对每条消息的点赞次数
select mt.message_id, mt.content, like_detail_id
from message_table mt
left join user_table ut on mt.user_id = ut.user_id 
left join like_detail_table ldt on ldt.user_id=1 and mt.message_id = ldt.message_id;