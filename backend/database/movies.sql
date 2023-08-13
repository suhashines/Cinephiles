INSERT INTO movies (m_id, title, release_date, duration, synopsis, poster_url, ad_id, d_id)
VALUES (1, 'Inception', TO_DATE('16-JUL-2010', 'DD-MON-YYYY'), 148, 'A thief enters the dreams of others.', 'poster_url_1', 1, 1);

INSERT INTO movies (m_id, title, release_date, duration, synopsis, poster_url, ad_id, d_id)
VALUES (2, 'The Dark Knight', TO_DATE('18-JUL-2008', 'DD-MON-YYYY'), 152, 'Batman battles the Joker.', 'poster_url_2', 1, 1);

-- Steven Spielberg movies
INSERT INTO movies (m_id, title, release_date, duration, synopsis, poster_url, ad_id, d_id)
VALUES (3, 'Jurassic Park', TO_DATE('11-JUN-1993', 'DD-MON-YYYY'), 127, 'Cloning dinosaurs goes wrong.', 'poster_url_3', 1, 2);

INSERT INTO movies (m_id, title, release_date, duration, synopsis, poster_url, ad_id, d_id)
VALUES (4, 'E.T. the Extra-Terrestrial', TO_DATE('11-JUN-1982', 'DD-MON-YYYY'), 115, 'A boy befriends an alien.', 'poster_url_4', 1, 2);

-- Quentin Tarantino movies
INSERT INTO movies (m_id, title, release_date, duration, synopsis, poster_url, ad_id, d_id)
VALUES (5, 'Pulp Fiction', TO_DATE('14-OCT-1994', 'DD-MON-YYYY'), 154, 'Interconnected stories of crime.', 'poster_url_5', 1, 3);

INSERT INTO movies (m_id, title, release_date, duration, synopsis, poster_url, ad_id, d_id)
VALUES (6, 'Django Unchained', TO_DATE('25-DEC-2012', 'DD-MON-YYYY'), 165, 'A freed slave seeks revenge.', 'poster_url_6', 1, 3);