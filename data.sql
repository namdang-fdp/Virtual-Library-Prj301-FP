------------------------------
-- Clear all data (adjust as needed)
------------------------------
TRUNCATE TABLE user_reports, book_reports, comment_reports, book_genre, book_author, comments, books, genres, authors, users CASCADE;

------------------------------
-- 1. Insert sample users with real avatar URLs
------------------------------
INSERT INTO users (id, username, password, avatar_path, full_name, hobbies, dob, bio, created_at)
VALUES 
  ('c56a4180-65aa-42ec-a945-5fd21dec0538', 'john_doe', '$2a$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36VQCEo8sT3c8dJ26OHWyWy', 'https://prj301.hcm.ss.bfcplatform.vn/avatar/john_doe.png', 'John Doe', 'Reading, Hiking', '1985-05-15', 'Enthusiastic reader and outdoor adventurer.', CURRENT_DATE),
  ('a93c7ad0-f1e5-4b66-8e0a-8e6f13bfa741', 'jane_smith', '$2a$10$7EqJtq98hPqEX7fNZaFWoO71qV6YhD3a4qHj9t3DHZ6b9DwEhUqy.', 'https://prj301.hcm.ss.bfcplatform.vn/avatar/jane_smith.png', 'Jane Smith', 'Traveling, Cooking', '1990-08-22', 'Loves exploring different cuisines and cultures.', CURRENT_DATE),
  ('d76b4f90-02aa-45d3-bfd9-96ce54f3d13a', 'alex_brown', '$2a$10$D4GJtq98hPqEX7fNZaFWoO3sU6YpKkNQv1qfHj9t3DHZ6b9DwEhUqw', 'https://prj301.hcm.ss.bfcplatform.vn/avatar/alex_brown.png', 'Alex Brown', 'Writing, Photography', '1988-11-30', 'Aspiring author and amateur photographer.', CURRENT_DATE),
  ('f0a1b2c3-d4e5-6789-abcd-ef0123456789', 'emily_white', '$2a$10$F7GJtq98hPqEX7fNZaFWoO9xI6YpKkNQv1qfHj9t3DHZ6b9DwEhUqw', 'https://prj301.hcm.ss.bfcplatform.vn/avatar/emily_white.png', 'Emily White', 'Gardening, Painting', '1992-03-10', 'Artist who finds inspiration in nature.', CURRENT_DATE),
  ('8e2c4b90-1c7a-11e4-9c1e-0800200c9a66', 'mike_green', '$2a$10$L2GJtq98hPqEX7fNZaFWoO2sU6YpKkNQv1qfHj9t3DHZ6b9DwEhUqw', 'https://prj301.hcm.ss.bfcplatform.vn/avatar/mike_green.png', 'Mike Green', 'Cycling, Tech', '1980-12-01', 'Tech enthusiast and avid cyclist.', CURRENT_DATE),
  ('9a8b7c6d-5e4f-3a2b-1c0d-9e8f7d6c5b4a', 'sara_connor', '$2a$10$Z1GJtq98hPqEX7fNZaFWoO2vS6YpKkNQv1qfHj9t3DHZ6b9DwEhUqw', 'https://prj301.hcm.ss.bfcplatform.vn/avatar/sara_connor.png', 'Sara Connor', 'Martial Arts, Strategy', '1979-02-28', 'No-nonsense fighter with a secret past.', CURRENT_DATE),
  ('1b2c3d4e-5f6a-7a8b-9c0e-1f2a3b4c5d6e', 'bruce_wayne', '$2a$10$B9GJtq98hPqEX7fNZaFWoO8sU6YpKkNQv1qfHj9t3DHZ6b9DwEhUqw', 'https://prj301.hcm.ss.bfcplatform.vn/avatar/bruce_wayne.png', 'Bruce Wayne', 'Philanthropy, Business', '1975-04-17', 'Businessman by day, vigilante by night.', CURRENT_DATE),
  ('2c3d4e5f-6a7b-8c9d-0e1f-2a3b4c5d6e7f', 'clark_kent', '$2a$10$M3GJtq98hPqEX7fNZaFWoO5vU6YpKkNQv1qfHj9t3DHZ6b9DwEhUqw', 'https://prj301.hcm.ss.bfcplatform.vn/avatar/clark_kent.png', 'Clark Kent', 'Journalism, Flying', '1978-06-18', 'Mild-mannered reporter with extraordinary abilities.', CURRENT_DATE);

------------------------------
-- 2. Insert sample authors
------------------------------
INSERT INTO authors (id, name)
VALUES
  ('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'Stephen King'),
  ('e9b1c94f-711b-4c7a-8e1b-63af4d5d4f12', 'Agatha Christie'),
  ('9d4c2f0a-d4c6-4a1e-8c59-47e5a83c9673', 'J.K. Rowling'),
  ('2a3b4c5d-6e7f-4a1b-8c9d-0f1e2d3c4b5a', 'George R.R. Martin'),
  ('1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d', 'Isaac Asimov'),
  ('3d4e5f60-7a8b-9c0d-1e2f-3a4b5c6d7e8f', 'Dan Brown'),
  ('4e5f6071-8b9c-0d1e-2f3a-4b5c6d7e8f90', 'Ernest Hemingway'),
  ('5f607182-9c0d-1e2f-3a4b-5c6d7e8f9012', 'Mark Twain');

------------------------------
-- 3. Insert sample genres
------------------------------
INSERT INTO genres (id, name)
VALUES
  ('3c7f9e02-4d1a-4c3a-9e8a-123456789abc', 'Mystery'),
  ('4d5e6f70-89ab-4cde-f012-3456789abcde', 'Fantasy'),
  ('5e6f7081-9abc-5def-0123-456789abcdef', 'Science Fiction'),
  ('6a7b8c90-1d2e-3f4a-5b6c-7d8e9f0a1b2c', 'Thriller'),
  ('7b8c9d0e-2f3a-4b5c-6d7e-8f9a0b1c2d3e', 'Historical Fiction');

------------------------------
-- 4. Insert sample books (existing 5 books) with real cover and PDF URLs
------------------------------
INSERT INTO books (id, isbn, posted_user_id, title, cover_path, publication_date, summary, pdf_path, view, total_rating, rating_count, created_at)
VALUES
  ('7f8e9d0c-1b2a-3c4d-5e6f-7890abcdef12', '123456789X', 'c56a4180-65aa-42ec-a945-5fd21dec0538',
   'Mystery of the Old Mansion', 'https://prj301.hcm.ss.bfcplatform.vn/cover/old_mansion.jpg', '2010-10-10',
   'A thrilling mystery set in a secluded mansion full of hidden secrets and unexpected twists.'::text, 'https://prj301.hcm.ss.bfcplatform.vn/pdf/old_mansion.pdf', 150, 45, 10, CURRENT_DATE),
  ('8a9b0c1d-2e3f-4a5b-6c7d-890abcdef123', '9783161484100', 'a93c7ad0-f1e5-4b66-8e0a-8e6f13bfa741',
   'The Secret Garden', 'https://prj301.hcm.ss.bfcplatform.vn/cover/secret_garden.jpg', '2015-04-20',
   'A heartwarming tale of rediscovery and renewal set in a long-forgotten garden.'::text, 'https://prj301.hcm.ss.bfcplatform.vn/pdf/secret_garden.pdf', 300, 90, 20, CURRENT_DATE),
  ('9b0c1d2e-3f4a-5b6c-7d8e-90abcdef1234', '1234567890123', 'd76b4f90-02aa-45d3-bfd9-96ce54f3d13a',
   'Adventures in Time', 'https://prj301.hcm.ss.bfcplatform.vn/cover/adventures_time.jpg', '2018-07-15',
   'A sci-fi adventure exploring the possibilities and pitfalls of time travel.'::text, 'https://prj301.hcm.ss.bfcplatform.vn/pdf/adventures_in_time.pdf', 500, 125, 25, CURRENT_DATE),
  ('a1b2c3d4-5e6f-7890-abcd-ef0123456789', '9780747532743', 'f0a1b2c3-d4e5-6789-abcd-ef0123456789',
   'Enchanted Forest', 'https://prj301.hcm.ss.bfcplatform.vn/cover/enchanted_forest.jpg', '2012-09-01',
   'A magical journey through an ancient forest filled with mythical creatures and lore.'::text, 'https://prj301.hcm.ss.bfcplatform.vn/pdf/enchanted_forest.pdf', 250, 75, 15, CURRENT_DATE),
  ('b2c3d4e5-6f70-8910-bcde-f1234567890a', '9780306406157', '8e2c4b90-1c7a-11e4-9c1e-0800200c9a66',
   'Cyberworld Chronicles', 'https://prj301.hcm.ss.bfcplatform.vn/cover/cyberworld_chronicles.jpg', '2020-01-05',
   'A futuristic tale of technology, society, and the human spirit in the digital age.'::text, 'https://prj301.hcm.ss.bfcplatform.vn/pdf/cyberworld_chronicles.pdf', 1000, 200, 40, CURRENT_DATE);

------------------------------
-- 5. Insert additional books (Books 6 to 10) with real cover and PDF URLs
------------------------------
INSERT INTO books (id, isbn, posted_user_id, title, cover_path, publication_date, summary, pdf_path, view, total_rating, rating_count, created_at)
VALUES
  ('6a7b8c9d-0e1f-2a3b-4c5d-6e7f8a9b0c1d', '9780307474278', '1b2c3d4e-5f6a-7a8b-9c0e-1f2a3b4c5d6e',
   'Secrets of the Vatican', 'https://prj301.hcm.ss.bfcplatform.vn/cover/secrets_of_the_vatican.jpg', '2003-03-18',
   'A gripping thriller delving into hidden codes and ancient conspiracies.'::text, 'https://prj301.hcm.ss.bfcplatform.vn/pdf/secrets_of_the_vatican.pdf', 450, 85, 18, CURRENT_DATE),
  ('7b8c9d0e-1a2b-3c4d-5e6f-7a8b9c0d1e2f', '9780679783275', '2c3d4e5f-6a7b-8c9d-0e1f-2a3b4c5d6e7f',
   'Old Times, New Stories', 'https://prj301.hcm.ss.bfcplatform.vn/cover/old_times_new_stories.jpg', '1998-11-10',
   'A journey through history exploring the complexities of bygone eras.'::text, 'https://prj301.hcm.ss.bfcplatform.vn/pdf/old_times_new_stories.pdf', 320, 70, 14, CURRENT_DATE),
  ('8c9d0e1f-2a3b-4c5d-6e7f-8a9b0c1d2e3f', '9781982137274', '9a8b7c6d-5e4f-3a2b-1c0d-9e8f7d6c5b4a',
   'The Silent Witness', 'https://prj301.hcm.ss.bfcplatform.vn/cover/the_silent_witness.jpg', '2019-06-12',
   'A suspenseful thriller where a reluctant witness uncovers dark secrets.'::text, 'https://prj301.hcm.ss.bfcplatform.vn/pdf/the_silent_witness.pdf', 220, 60, 12, CURRENT_DATE),
  ('9d0e1f2a-3b4c-5d6e-7f8a-9b0c1d2e3f4a', '9783161484101', '8e2c4b90-1c7a-11e4-9c1e-0800200c9a66',
   'Infinite Horizons', 'https://prj301.hcm.ss.bfcplatform.vn/cover/infinite_horizons.jpg', '2021-05-20',
   'An epic journey into the unknown realms of space and time.'::text, 'https://prj301.hcm.ss.bfcplatform.vn/pdf/infinite_horizons.pdf', 780, 150, 30, CURRENT_DATE),
  ('ae1f2b3c-4d5e-6f70-8a9b-0c1d2e3f4b5c', '1234567890128', 'c56a4180-65aa-42ec-a945-5fd21dec0538',
   'Echoes of the Past', 'https://prj301.hcm.ss.bfcplatform.vn/cover/echoes_of_the_past.jpg', '2005-08-25',
   'A detective unravels a mystery that spans decades.'::text, 'https://prj301.hcm.ss.bfcplatform.vn/pdf/echoes_of_the_past.pdf', 400, 95, 19, CURRENT_DATE);

------------------------------
-- 6. Insert into join table for book-author relationships (existing books)
------------------------------
INSERT INTO book_author (book_id, author_id)
VALUES
  ('7f8e9d0c-1b2a-3c4d-5e6f-7890abcdef12', 'f47ac10b-58cc-4372-a567-0e02b2c3d479'),
  ('7f8e9d0c-1b2a-3c4d-5e6f-7890abcdef12', 'e9b1c94f-711b-4c7a-8e1b-63af4d5d4f12'),
  ('8a9b0c1d-2e3f-4a5b-6c7d-890abcdef123', 'e9b1c94f-711b-4c7a-8e1b-63af4d5d4f12'),
  ('8a9b0c1d-2e3f-4a5b-6c7d-890abcdef123', '1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d'),
  ('9b0c1d2e-3f4a-5b6c-7d8e-90abcdef1234', '9d4c2f0a-d4c6-4a1e-8c59-47e5a83c9673'),
  ('9b0c1d2e-3f4a-5b6c-7d8e-90abcdef1234', '2a3b4c5d-6e7f-4a1b-8c9d-0f1e2d3c4b5a'),
  ('a1b2c3d4-5e6f-7890-abcd-ef0123456789', '9d4c2f0a-d4c6-4a1e-8c59-47e5a83c9673'),
  ('b2c3d4e5-6f70-8910-bcde-f1234567890a', '1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d'),
  ('b2c3d4e5-6f70-8910-bcde-f1234567890a', 'f47ac10b-58cc-4372-a567-0e02b2c3d479');

------------------------------
-- 7. Insert into join table for book-author relationships (additional books)
------------------------------
INSERT INTO book_author (book_id, author_id)
VALUES
  ('6a7b8c9d-0e1f-2a3b-4c5d-6e7f8a9b0c1d', '3d4e5f60-7a8b-9c0d-1e2f-3a4b5c6d7e8f'),
  ('7b8c9d0e-1a2b-3c4d-5e6f-7a8b9c0d1e2f', '4e5f6071-8b9c-0d1e-2f3a-4b5c6d7e8f90'),
  ('7b8c9d0e-1a2b-3c4d-5e6f-7a8b9c0d1e2f', '5f607182-9c0d-1e2f-3a4b-5c6d7e8f9012'),
  ('8c9d0e1f-2a3b-4c5d-6e7f-8a9b0c1d2e3f', 'e9b1c94f-711b-4c7a-8e1b-63af4d5d4f12'),
  ('8c9d0e1f-2a3b-4c5d-6e7f-8a9b0c1d2e3f', '3d4e5f60-7a8b-9c0d-1e2f-3a4b5c6d7e8f'),
  ('9d0e1f2a-3b4c-5d6e-7f8a-9b0c1d2e3f4a', '1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d'),
  ('9d0e1f2a-3b4c-5d6e-7f8a-9b0c1d2e3f4a', '9d4c2f0a-d4c6-4a1e-8c59-47e5a83c9673'),
  ('ae1f2b3c-4d5e-6f70-8a9b-0c1d2e3f4b5c', 'f47ac10b-58cc-4372-a567-0e02b2c3d479'),
  ('ae1f2b3c-4d5e-6f70-8a9b-0c1d2e3f4b5c', '2a3b4c5d-6e7f-4a1b-8c9d-0f1e2d3c4b5a');

------------------------------
-- 8. Insert into join table for book-genre relationships (existing books)
------------------------------
INSERT INTO book_genre (book_id, genre_id)
VALUES
  ('7f8e9d0c-1b2a-3c4d-5e6f-7890abcdef12', '3c7f9e02-4d1a-4c3a-9e8a-123456789abc'),
  ('8a9b0c1d-2e3f-4a5b-6c7d-890abcdef123', '4d5e6f70-89ab-4cde-f012-3456789abcde'),
  ('9b0c1d2e-3f4a-5b6c-7d8e-90abcdef1234', '5e6f7081-9abc-5def-0123-456789abcdef'),
  ('9b0c1d2e-3f4a-5b6c-7d8e-90abcdef1234', '4d5e6f70-89ab-4cde-f012-3456789abcde'),
  ('a1b2c3d4-5e6f-7890-abcd-ef0123456789', '4d5e6f70-89ab-4cde-f012-3456789abcde'),
  ('b2c3d4e5-6f70-8910-bcde-f1234567890a', '5e6f7081-9abc-5def-0123-456789abcdef');

------------------------------
-- 9. Insert into join table for book-genre relationships (additional books)
------------------------------
INSERT INTO book_genre (book_id, genre_id)
VALUES
  ('6a7b8c9d-0e1f-2a3b-4c5d-6e7f8a9b0c1d', '6a7b8c90-1d2e-3f4a-5b6c-7d8e9f0a1b2c'),
  ('6a7b8c9d-0e1f-2a3b-4c5d-6e7f8a9b0c1d', '3c7f9e02-4d1a-4c3a-9e8a-123456789abc'),
  ('7b8c9d0e-1a2b-3c4d-5e6f-7a8b9c0d1e2f', '7b8c9d0e-2f3a-4b5c-6d7e-8f9a0b1c2d3e'),
  ('8c9d0e1f-2a3b-4c5d-6e7f-8a9b0c1d2e3f', '3c7f9e02-4d1a-4c3a-9e8a-123456789abc'),
  ('8c9d0e1f-2a3b-4c5d-6e7f-8a9b0c1d2e3f', '6a7b8c90-1d2e-3f4a-5b6c-7d8e9f0a1b2c'),
  ('9d0e1f2a-3b4c-5d6e-7f8a-9b0c1d2e3f4a', '5e6f7081-9abc-5def-0123-456789abcdef'),
  ('ae1f2b3c-4d5e-6f70-8a9b-0c1d2e3f4b5c', '3c7f9e02-4d1a-4c3a-9e8a-123456789abc'),
  ('ae1f2b3c-4d5e-6f70-8a9b-0c1d2e3f4b5c', '7b8c9d0e-2f3a-4b5c-6d7e-8f9a0b1c2d3e');

------------------------------
-- 10. Insert sample comments (existing)
------------------------------
INSERT INTO comments (id, user_id, book_id, content, created_at)
VALUES
  ('c3d4e5f6-7a8b-9c0d-1e2f-34567890abcd', 'a93c7ad0-f1e5-4b66-8e0a-8e6f13bfa741', '7f8e9d0c-1b2a-3c4d-5e6f-7890abcdef12',
   'The plot twists kept me on the edge of my seat!', CURRENT_DATE),
  ('d4e5f6a7-8b9c-0d1e-2f3a-4567890abcde', 'd76b4f90-02aa-45d3-bfd9-96ce54f3d13a', '8a9b0c1d-2e3f-4a5b-6c7d-890abcdef123',
   'A beautifully written story with vivid descriptions.', CURRENT_DATE),
  ('e5f6a7b8-9c0d-1e2f-3a4b-567890abcdef', 'f0a1b2c3-d4e5-6789-abcd-ef0123456789', '9b0c1d2e-3f4a-5b6c-7d8e-90abcdef1234',
   'The time travel concept was mind-blowing!', CURRENT_DATE),
  ('f6a7b8c9-0d1e-2f3a-4b5c-67890abcdef1', '8e2c4b90-1c7a-11e4-9c1e-0800200c9a66', 'a1b2c3d4-5e6f-7890-abcd-ef0123456789',
   'A truly enchanting experience.', CURRENT_DATE),
  ('a7b8c9d0-1e2f-3a4b-5c6d-7890abcdef12', 'c56a4180-65aa-42ec-a945-5fd21dec0538', 'b2c3d4e5-6f70-8910-bcde-f1234567890a',
   'The narrative perfectly captures the futuristic vibes.', CURRENT_DATE);

------------------------------
-- 11. Insert additional comments (for additional books)
------------------------------
INSERT INTO comments (id, user_id, book_id, content, created_at)
VALUES
  ('b8c9d0e1-2f3a-4b5c-6d7e-8f9a0b1c2d3e', '1b2c3d4e-5f6a-7a8b-9c0e-1f2a3b4c5d6e', '6a7b8c9d-0e1f-2a3b-4c5d-6e7f8a9b0c1d',
   'Intriguing and fast-paced thriller!', CURRENT_DATE),
  ('c9d0e1f2-3a4b-5c6d-7e8f-9a0b1c2d3e4f', '2c3d4e5f-6a7b-8c9d-0e1f-2a3b4c5d6e7f', '7b8c9d0e-1a2b-3c4d-5e6f-7a8b9c0d1e2f',
   'A masterful recounting of history with a twist.', CURRENT_DATE),
  ('d0e1f2a3-4b5c-6d7e-8f9a-0b1c2d3e4f5f', '9a8b7c6d-5e4f-3a2b-1c0d-9e8f7d6c5b4a', '8c9d0e1f-2a3b-4c5d-6e7f-8a9b0c1d2e3f',
   'Kept me guessing until the very end.', CURRENT_DATE),
  ('e1f2a3b4-5c6d-7e8f-9a0b-1c2d3e4f5a6f', '8e2c4b90-1c7a-11e4-9c1e-0800200c9a66', '9d0e1f2a-3b4c-5d6e-7f8a-9b0c1d2e3f4a',
   'A breathtaking adventure into space.', CURRENT_DATE),
  ('f2a3b4c5-6d7e-8f9a-0b1c-2d3e4f5a6b7c', 'c56a4180-65aa-42ec-a945-5fd21dec0538', 'ae1f2b3c-4d5e-6f70-8a9b-0c1d2e3f4b5c',
   'The mystery unraveled slowly, keeping me hooked.', CURRENT_DATE);

------------------------------
-- 12. Insert sample comment reports
------------------------------
INSERT INTO comment_reports (id, comment_id, reporting_user_id, reason)
VALUES
  ('b3c4d5e6-7f80-9123-4a5b-67890abcdeff', 'd4e5f6a7-8b9c-0d1e-2f3a-4567890abcde', 'c56a4180-65aa-42ec-a945-5fd21dec0538',
   'Off-topic discussion'::text),
  ('f3a4b5c6-7d8e-9f0a-1b2c-3d4e5f607182', 'b8c9d0e1-2f3a-4b5c-6d7e-8f9a0b1c2d3e', 'd76b4f90-02aa-45d3-bfd9-96ce54f3d13a',
   'Inappropriate language'::text);

------------------------------
-- 13. Insert sample book reports
------------------------------
INSERT INTO book_reports (id, book_id, reporting_user_id, reason)
VALUES
  ('c4d5e6f7-8091-2345-6a7b-890abcdef123', '9b0c1d2e-3f4a-5b6c-7d8e-90abcdef1234', '8e2c4b90-1c7a-11e4-9c1e-0800200c9a66',
   'Content is too complex'::text),
  ('a4a5b6c7-8d9e-0f1a-2b3c-4d5e6f708193', '8c9d0e1f-2a3b-4c5d-6e7f-8a9b0c1d2e3f', '1b2c3d4e-5f6a-7a8b-9c0e-1f2a3b4c5d6e',
   'Misleading content'::text);

------------------------------
-- 14. Insert sample user reports
------------------------------
INSERT INTO user_reports (id, user_id, reporting_user_id, reason)
VALUES
  ('d5e6f708-9123-4567-8a9b-0abcdef12346', 'd76b4f90-02aa-45d3-bfd9-96ce54f3d13a', 'c56a4180-65aa-42ec-a945-5fd21dec0538',
   'Inappropriate language in reviews'::text),
  ('c56a4180-65aa-42ec-a945-5fd21dec0538', '9a8b7c6d-5e4f-3a2b-1c0d-9e8f7d6c5b4a', '1b2c3d4e-5f6a-7a8b-9c0e-1f2a3b4c5d6e',
   'Spamming reviews'::text);
