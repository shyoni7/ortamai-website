CREATE TABLE `cv_submissions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(320) NOT NULL,
	`phone` varchar(50),
	`role` varchar(255),
	`field` varchar(100),
	`cvUrl` text,
	`cvKey` text,
	`message` text,
	`lang` varchar(5) DEFAULT 'he',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `cv_submissions_id` PRIMARY KEY(`id`)
);
