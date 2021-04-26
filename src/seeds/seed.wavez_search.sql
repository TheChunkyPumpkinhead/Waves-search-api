BEGIN; 

TRUNCATE 
  users,
  locations, 
  user_locations,
  ratings, 
  comments
  

  RESTART IDENTITY CASCADE;

INSERT INTO users (id, email, password)
VALUES 
  (1,'emmie@aol.com', '$2a$12$puiYyy7dAMOBuL.vMwp8kephkPWl8puUkGaY40JYvJHNClFWLnZ2G'),
  (2,'yahoo@yahoo.com', '$2a$12$puiYyy7dAMOBuL.vMwp8kephkPWl8puUkGaY40JYvJHNClFWLnZ2G'),
  (3,'cashmew@gmail.com', '$2a$12$puiYyy7dAMOBuL.vMwp8kephkPWl8puUkGaY40JYvJHNClFWLnZ2G');

INSERT INTO locations (id, user_id,  image, title, content, keyword, is_public)  
VALUES

  (1, 3, 'https://picsum.photos/id/1003/200/300', 'location 1', 'info about location 1', 'Sandy River, Oregon', true ),
  (2, 3, 'https://picsum.photos/id/1006/200/300', 'location 2', 'info about location 2', 'San Diego, California', true ),
  (3, 3, 'https://picsum.photos/id/1019/200/300', 'location 3', 'info about location 3', 'Kings Valley, Hawaii', true ),
  (4, 3, 'https://picsum.photos/id/1018/200/300', 'location 4', 'info about location 4', 'Mount Saint Helens, Washington', true );


INSERT INTO ratings (id, location_id, stars)
VALUES 
(1,1,5);

INSERT INTO user_locations (id, user_id, location_id)
VALUES
(1,1,1),
(2,1,3),
(3,1,4);

INSERT INTO comments (id, user_location_id, title, content,author_id)
VALUES 
(1,1,'title','here are some notes',3);



-- this will start the unique id's at 4 since seed files 
SELECT setval('user_locations_id_seq', 4);
SELECT setval('ratings_id_seq', 2);

COMMIT;