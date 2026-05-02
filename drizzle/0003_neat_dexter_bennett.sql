CREATE TABLE `incubator_submissions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`businessName` varchar(255) NOT NULL,
	`firstName` varchar(255) NOT NULL,
	`email` varchar(320) NOT NULL,
	`phone` varchar(50) NOT NULL,
	`about` text,
	`lang` varchar(5) DEFAULT 'he',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `incubator_submissions_id` PRIMARY KEY(`id`)
);
