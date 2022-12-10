create database `article-schema`;
use `article-schema`;
create table article (
	article_id int not null auto_increment,
    article_status ENUM('published', 'unpublished'),
    article_title varchar(255) not null,
    article_content text not null,
    publisher_name varchar(255) not null,
    updated_at datetime not null,
    primary key(article_id)
);