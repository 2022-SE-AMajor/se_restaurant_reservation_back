DROP TABLE `arrivaltime`;
DROP TABLE `Reservation`;
DROP TABLE `User`;
DROP TABLE `Table`;


-- 테이블 생성

CREATE TABLE `User` (
  `id` varchar(32) NOT NULL, -- 로그인 아이디
  `pw` varchar(45) NOT NULL, -- 로그인 비밀번호 
  PRIMARY KEY (`id`)
);


CREATE TABLE `Table` (
  `table_id` int NOT NULL, -- 테이블 번호 
  `places` int Default 4,  -- 테이블 수용가능한 인원 
  PRIMARY KEY (`table_id`)
);


CREATE TABLE `Reservation` (
  `oid` int NOT NULL AUTO_INCREMENT, -- 데이터가 삽입, 삭제될때마다 자동 생성해주는 번호
  `covers` int NOT NULL, -- 예약인원
  `date` date NOT NULL, -- 날짜
  `time` time NOT NULL, -- 시간 
  `table_id` int NOT NULL, -- 테이블번호, 피그마에 따르면 왼쪽위부터 오른쪽아래순으로 1~ 16번까지 범위.
  `name` varchar(32) NOT NULL, -- 사용자 이름
  `phone_number` char(13) NOT NULL, -- 사용자 전화번호
  PRIMARY KEY (`oid`),
  KEY `table_id_idx` (`table_id`),
  CONSTRAINT `table_id` FOREIGN KEY (`table_id`) REFERENCES `table` (`table_id`)
);

CREATE TABLE `arrivaltime` (
  `oid` int NOT NULL,
  `arrival_time` time DEFAULT NULL,
  PRIMARY KEY (`oid`),
  CONSTRAINT `oid` FOREIGN KEY (`oid`) REFERENCES `reservation` (`oid`)
); 

CREATE TABLE `stat` (
  `Year&Month` int(6) NOT NULL, -- 알고 싶은 통계의 날짜
  `month_total` int DEFAULT 0, -- 이번 달 총 예약 횟수
  `no_show` int DEFAULT 0, -- 안 온 놈들
  `Tue` int DEFAULT 0,
  `Wed` int DEFAULT 0,
  `Thu` int DEFAULT 0,
  `Fri` int DEFAULT 0,
  `Sat` int DEFAULT 0,
  `Sun` int DEFAULT 0, -- 요일별 예약 횟수
  `oneC` int DEFAULT 0,
  `twoC` int DEFAULT 0,
  `threeC` int DEFAULT 0,
  `more_than_threeC` int DEFAULT 0, --인원별 예약 횟수
  PRIMARY KEY (`Year&Month`)
);

-- 데이터 삽입
INSERT INTO `user` (id, pw) VALUES ('admin', '1111') ; 



INSERT INTO `table` (table_id, places) VALUES (1, 2) ;
INSERT INTO `table` (table_id, places) VALUES (2, 2) ;
INSERT INTO `table` (table_id, places) VALUES (3, 2) ;
INSERT INTO `table` (table_id, places) VALUES (4, 2) ;
INSERT INTO `table` (table_id, places) VALUES (5, 4) ;
INSERT INTO `table` (table_id, places) VALUES (6, 4) ;
INSERT INTO `table` (table_id, places) VALUES (7, 4) ;
INSERT INTO `table` (table_id, places) VALUES (8, 4) ;
INSERT INTO `table` (table_id, places) VALUES (9, 4) ;
INSERT INTO `table` (table_id, places) VALUES (10, 4) ;

INSERT INTO reservation (covers, date, time, table_id, name, phone_number ) VALUES (4, '2020-04-06', '22:00:00', 1, 'Gihwon', '01022223333') ;
INSERT INTO reservation (covers, date, time, table_id, name, phone_number ) VALUES (3, '2020-04-06', '18:00:00', 3, 'jin', '010-2232-3333') ;
INSERT INTO reservation (covers, date, time, table_id, name, phone_number ) VALUES (4, '2020-04-07', '18:30:00', 2, 'jin', '010-2232-3333') ;
INSERT INTO reservation (covers, date, time, table_id, name, phone_number ) VALUES (2, '2020-04-06', '19:00:00', 4, 'kim', '01022253133') ;
INSERT INTO reservation (covers, date, time, table_id, name, phone_number ) VALUES (2, '2020-04-07', '18:00:00', 3, 'kim', '01022253133') ;
INSERT INTO reservation (covers, date, time, table_id, name, phone_number ) VALUES (3, '2020-04-07', '21:00:00', 2, 'Gihwon', '01022223333') ;
INSERT INTO reservation (covers, date, time, table_id, name, phone_number ) VALUES (3, '2020-04-06', '21:00:00', 6, 'lee', '010-5322-3533') ;
INSERT INTO reservation (covers, date, time, table_id, name, phone_number ) VALUES (4, '2020-04-07', '19:00:00', 7, 'lee', '010-5322-3533') ;
INSERT INTO reservation (covers, date, time, table_id, name, phone_number ) VALUES (3, '2020-04-06', '18:00:00', 5, 'choi', '01012343873') ;
INSERT INTO reservation (covers, date, time, table_id, name, phone_number ) VALUES (4, '2020-04-07', '21:00:00', 8, 'choi', '01012343873') ;

INSERT INTO `arrivaltime` (oid, arrival_time) VALUES (1, '21:30:00') ;
INSERT INTO `arrivaltime` (oid, arrival_time) VALUES (2, '17:50:00') ;
INSERT INTO `arrivaltime` (oid, arrival_time) VALUES (4, '18:40:00') ;

