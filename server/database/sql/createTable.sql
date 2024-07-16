create database `tree-hole`;

create table user_table (
	user_id int auto_increment, 
	username varchar(30) not null unique comment "用户名是唯一的",
    `password` varchar(30) not null,
    email varchar(30) not null unique,
    gender enum('man', 'woman', 'secret') not null default 'secret' comment "性别，默认为 ‘秘密’",
    avatar_img varchar(50) not null comment "头像图片文件名",
    primary key(user_id)
);

-- 生产环境 密码使用 md5 加密，node原生的加密库 加密的 md5 为 32位
-- alter table user_table modify `password` char(32) not null ;

-- alter table user_table change column sex gender enum('man', 'woman', 'secret') not null default 'secret' comment "性别，默认为 ‘秘密’";

insert into user_table (username, `password`, email, avatar_img) 
values ('asuka', 'Abc123456', '1234@qq.com', 'default.jpg');
insert into user_table (username, `password`, email, avatar_img) 
values ('chan', '654321', 'abc@qq.com', 'default2.jpg');
insert into user_table (username, `password`, email, avatar_img) 
values ('susan说', '8888888', 'abcdef@163.com', 'default2.jpg');
insert into user_table (username, `password`, email, avatar_img) 
values ('i\'m ok', '8888888', 'i\'m_ok@2000.com', 'default.jpg');


create table message_table (
	message_id int auto_increment,
	content text not null comment "消息的内容",
    `date` datetime not null comment "消息的提交时间",
    like_count int default 0 comment "点赞数",
    user_id int not null comment "（外键）发送此条消息的用户id",
    primary key(message_id),
    foreign key (user_id) references user_table(user_id)
);

-- alter table message_table modify `date` datetime not null comment "消息的提交时间";

insert into message_table (content, `date`, user_id) values ("hello world 2!", "2024-4-4", 1);
insert into message_table (content, `date`, user_id) values ("hello world!", "2024-4-4", 2);

-- 点赞表
create table like_detail_table (
	like_detail_id int auto_increment,
    user_id int not null,
    message_id int not null,
    like_date date not null,
    primary key(like_detail_id),
    foreign key(user_id) references user_table(user_id),
    foreign key(message_id) references message_table(message_id)
);

insert into like_detail_table (user_id, message_id, like_date) values (1, 1, "2024-4-5");