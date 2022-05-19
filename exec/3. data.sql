CREATE TABLE house (
	house_id bigint not null auto_increment,
	member_id bigint not null,
	sido_name varchar(100),
    gungu_name varchar(100),
    dong_name varchar(100),
    jibun_address varchar(100),
    address_detail varchar(100),
    latitude double,
    longitude double,
    floor int,
    sale_type varchar(20),
    house_type varchar(20),
    contract_type varchar(20),
    deposit bigint,
    monthly_rent bigint,
    maintenance_fee bigint,
    maintenance_detail varchar(255),
    period int,
    description text,
    expired_at datetime,
    options varchar(100),
    main_image varchar(255),
    created_at datetime not null,
    updated_at datetime,
    deleted_at datetime,
    primary key (house_id)
);

CREATE TABLE image (
	image_id bigint not null auto_increment,
	house_id bigint not null,
    url varchar(255),
	created_at datetime not null,
    updated_at datetime,
    deleted_at datetime,
    primary key (image_id)
);

CREATE TABLE house_like (
	house_like_id bigint not null auto_increment,
	house_id bigint not null,
	member_id bigint not null,
	created_at datetime not null,
    updated_at datetime,
    deleted_at datetime,
    primary key (house_like_id)
);

CREATE TABLE `refresh_token` (
  `refresh_token_id` bigint NOT NULL AUTO_INCREMENT,
  `refresh_token` varchar(512) DEFAULT NULL,
  `subject` varchar(32) DEFAULT NULL,
  `expired_at` datetime DEFAULT NULL,
  PRIMARY KEY (`refresh_token_id`)
);

CREATE TABLE member (
  `member_id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `authority` varchar(255) DEFAULT NULL,
  `login_id` varchar(32) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone_auth` bit(1) DEFAULT NULL,
  `phone_number` varchar(16) DEFAULT NULL,
  `provider` varchar(255) DEFAULT NULL,
  `username` varchar(32) NOT NULL,
  PRIMARY KEY (`member_id`)
);

CREATE TABLE contract_agree (
  `contract_agree_id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `buyer_agree` bit(1) DEFAULT NULL,
  `seller_agree` bit(1) DEFAULT NULL,
  `buyer_id` bigint NOT NULL,
  `seller_id` bigint NOT NULL,
  `house_id` bigint NOT NULL,
  PRIMARY KEY (`contract_agree_id`)
);

CREATE TABLE contract (
  `contract_id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `area` varchar(255) DEFAULT NULL,
  `balance_date` date DEFAULT NULL,
  `balance_payment` varchar(255) DEFAULT NULL,
  `buyer_address` varchar(255) DEFAULT NULL,
  `buyer_birth` date DEFAULT NULL,
  `buyer_name` varchar(255) DEFAULT NULL,
  `buyer_phone` varchar(16) DEFAULT NULL,
  `buyer_signature` blob,
  `contract_end` date DEFAULT NULL,
  `contract_start` date DEFAULT NULL,
  `contract_type` varchar(255) DEFAULT NULL,
  `down_payment` varchar(255) DEFAULT NULL,
  `level` int DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `maintenance_fee` varchar(255) DEFAULT NULL,
  `middle_date` date DEFAULT NULL,
  `middle_payment` varchar(255) DEFAULT NULL,
  `net_leasable_area` varchar(255) DEFAULT NULL,
  `seller_address` varchar(255) DEFAULT NULL,
  `seller_birth` date DEFAULT NULL,
  `seller_name` varchar(255) DEFAULT NULL,
  `seller_phone` varchar(16) DEFAULT NULL,
  `seller_signature` blob,
  `tenancy_deposit` varchar(255) DEFAULT NULL,
  `total_premium` varchar(255) DEFAULT NULL,
  `buyer_id` bigint NOT NULL,
  `seller_id` bigint NOT NULL,
  `house_id` bigint NOT NULL,
  PRIMARY KEY (`contract_id`)
);

CREATE TABLE certify_phone (
  `certify_phone_id` bigint NOT NULL AUTO_INCREMENT,
  `certification_code` varchar(6) DEFAULT NULL,
  `expire_time` datetime DEFAULT NULL,
  `phone_number` varchar(16) DEFAULT NULL,
  `today_count` int DEFAULT NULL,
  `member_id` bigint NOT NULL,
  PRIMARY KEY (`certify_phone_id`)
);

CREATE TABLE certify_password (
  `certify_password_id` bigint NOT NULL AUTO_INCREMENT,
  `certification_code` varchar(6) DEFAULT NULL,
  `change_token` varchar(12) DEFAULT NULL,
  `expire_time` datetime DEFAULT NULL,
  `expired` bit(1) DEFAULT NULL,
  `today_count` int DEFAULT NULL,
  `member_id` bigint NOT NULL,
  PRIMARY KEY (`certify_password_id`)
);