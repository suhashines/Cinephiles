CREATE TABLE actors (
    a_id NUMBER PRIMARY KEY,
    name VARCHAR2(100),
    country VARCHAR2(100),
    dob DATE
);

CREATE TABLE directors (
    d_id NUMBER PRIMARY KEY,
    name VARCHAR2(100),
    country VARCHAR2(100),
    dob DATE
);


CREATE TABLE genres (
    gn_id NUMBER PRIMARY KEY,
    name VARCHAR2(100)
);

CREATE TABLE admins (
    ad_id NUMBER PRIMARY KEY,
    email VARCHAR2(100),
    password VARCHAR2(256) -- Change the length as required for hashed passwords
);


CREATE TABLE theatres (
    t_id NUMBER PRIMARY KEY,
    name VARCHAR2(100),
    ad_id NUMBER,
    CONSTRAINT fk_theatres_admins
        FOREIGN KEY (ad_id)
        REFERENCES admins (ad_id)
        ON DELETE CASCADE
);


CREATE TABLE locations (
    loc_id NUMBER PRIMARY KEY,
    building VARCHAR2(100),
    road VARCHAR2(100),
    city VARCHAR2(100),
    t_id NUMBER,
    CONSTRAINT fk_locations_theatres
        FOREIGN KEY (t_id)
        REFERENCES theatres (t_id)
        ON DELETE CASCADE
);


CREATE TABLE movies (
    m_id NUMBER PRIMARY KEY,
    title VARCHAR2(100),
    year NUMBER,
    duration NUMBER,
    synopsis VARCHAR2(1000),
    poster_url VARCHAR2(200),
    ad_id NUMBER,
    CONSTRAINT fk_movies_admins
        FOREIGN KEY (ad_id)
        REFERENCES admins (ad_id)
        ON DELETE CASCADE
        
);

ALTER TABLE movies
ADD d_id NUMBER;


ALTER TABLE movies
ADD CONSTRAINT fk_movies_directors
    FOREIGN KEY (d_id)
    REFERENCES directors (d_id)
    ON DELETE CASCADE;
   


CREATE TABLE users (
    u_id NUMBER PRIMARY KEY,
    name VARCHAR2(100),
    email VARCHAR2(100),
    password VARCHAR2(256) -- Adjust the length as necessary for hashed passwords
);



CREATE TABLE ratings (
    r_id NUMBER PRIMARY KEY,
    rating NUMBER,
    review VARCHAR2(1000),
    u_id NUMBER,
    m_id NUMBER,
    CONSTRAINT fk_ratings_users
        FOREIGN KEY (u_id)
        REFERENCES users (u_id)
        ON DELETE CASCADE,
    CONSTRAINT fk_ratings_movies
        FOREIGN KEY (m_id)
        REFERENCES movies (m_id)
        ON DELETE CASCADE
);


CREATE TABLE movieActors (
    ma_id NUMBER PRIMARY KEY,
    m_id NUMBER,
    a_id NUMBER,
    CONSTRAINT fk_movieactors_movies
        FOREIGN KEY (m_id)
        REFERENCES movies (m_id)
        ON DELETE CASCADE,
    CONSTRAINT fk_movieactors_actors
        FOREIGN KEY (a_id)
        REFERENCES actors (a_id)
        ON DELETE CASCADE,
    CONSTRAINT uc_movieactors_unique_combination
        UNIQUE (m_id, a_id)
);


CREATE TABLE movieGenres (
    mg_id NUMBER PRIMARY KEY,
    m_id NUMBER,
    gn_id NUMBER,
    CONSTRAINT fk_moviegenres_movies
        FOREIGN KEY (m_id)
        REFERENCES movies (m_id)
        ON DELETE CASCADE,
    CONSTRAINT fk_moviegenres_genres
        FOREIGN KEY (gn_id)
        REFERENCES genres (gn_id)
        ON DELETE CASCADE,
    CONSTRAINT uc_moviegenres_unique_combination
        UNIQUE (m_id, gn_id)
);



CREATE TABLE timetable (
    time_id NUMBER PRIMARY KEY,
    name VARCHAR2(100),
    starting TIMESTAMP
);





CREATE TABLE movieTheatres (
    mt_id NUMBER PRIMARY KEY,
    m_id NUMBER NOT NULL,
    t_id NUMBER NOT NULL,
    CONSTRAINT fk_movieTheatres_movies
        FOREIGN KEY (m_id)
        REFERENCES movies (m_id),
    CONSTRAINT fk_movieTheatres_theatres
        FOREIGN KEY (t_id)
        REFERENCES theatres (t_id),
    CONSTRAINT uc_movieTheatres_unique_combination
        UNIQUE (m_id, t_id)
);



CREATE TABLE showtimes (
    show_id NUMBER PRIMARY KEY,
    mt_id NUMBER NOT NULL,
    slot DATE NOT NULL,
    time_id NUMBER NOT NULL,
    CONSTRAINT fk_showtimes_movies
        FOREIGN KEY (mt_id)
        REFERENCES movieTheatres (mt_id),
    CONSTRAINT fk_showtimes_timetable
        FOREIGN KEY (time_id)
        REFERENCES timetable (time_id),
    CONSTRAINT uc_showtimes_unique_combination
        UNIQUE (mt_id,slot, time_id)
);


CREATE TABLE galleries (
    g_id NUMBER PRIMARY KEY,
    capacity NUMBER NOT NULL,
    tiers NUMBER NOT NULL,
    t_id NUMBER NOT NULL,
    CONSTRAINT fk_galleries_theatres
        FOREIGN KEY (t_id)
        REFERENCES theatres (t_id)
);


CREATE TABLE seats (
    s_id NUMBER PRIMARY KEY,
    category VARCHAR2(100) NOT NULL,
    price NUMBER NOT NULL,
    g_id NUMBER NOT NULL,
    CONSTRAINT fk_seats_galleries
        FOREIGN KEY (g_id)
        REFERENCES galleries (g_id)
);


CREATE TABLE bookings (

    b_id NUMBER PRIMARY KEY,
    s_id NUMBER NOT NULL,
    show_id NUMBER NOT NULL,
    u_id NUMBER NOT NULL,
    CONSTRAINT fk_bookings_seats
        FOREIGN KEY (s_id)
        REFERENCES seats (s_id),
    CONSTRAINT fk_bookings_showtimes
        FOREIGN KEY (show_id)
        REFERENCES showtimes (show_id),
    CONSTRAINT fk_bookings_users
        FOREIGN KEY (u_id)
        REFERENCES users (u_id),
    CONSTRAINT uc_bookings_unique_combination
        UNIQUE (s_id, show_id,u_id)
       );


CREATE TABLE showtimeGalleries (
    g_id NUMBER NOT NULL,
    show_id NUMBER NOT NULL,
    CONSTRAINT fk_showtimeGalleries_galleries
        FOREIGN KEY (g_id)
        REFERENCES galleries (g_id),
    CONSTRAINT fk_showtimeGalleries_showtimes
        FOREIGN KEY (show_id)
        REFERENCES showtimes (show_id),
    CONSTRAINT uc_showtimeGalleries_unique_galleries_showtimes
        UNIQUE (g_id)
);




ALTER TABLE movies
    RENAME COLUMN year TO release_date;

ALTER TABLE movies
    MODIFY release_date DATE;


ALTER TABLE movies
    ADD back_poster_url VARCHAR2(200); 

-----------------new update-------------------------------------
       
ALTER TABLE ADMINS 

RENAME COLUMN name TO email ;

----- 8/18/23--------

----------------location table update-------------------
ALTER TABLE CINEPHILES.LOCATIONS
ADD CONSTRAINT unique_locations unique(building,road,city);

---------------delete table movie genres-----------

DROP TABLE MOVIEGENRES ;

------------create it again-------------------

CREATE TABLE movieGenres (
    m_id NUMBER,
    gn_id NUMBER,
    PRIMARY key(m_id,gn_id),
    CONSTRAINT fk_moviegenres_movies
        FOREIGN KEY (m_id)
        REFERENCES movies (m_id)
        ON DELETE CASCADE,
    CONSTRAINT fk_moviegenres_genres
        FOREIGN KEY (gn_id)
        REFERENCES genres (gn_id)
        ON DELETE CASCADE
);



-----22-08-23---------------------

drop table bookings,seats;


CREATE TABLE seats (
    s_id varchar2(5) not null,
    category VARCHAR2(100) NOT NULL,
    price NUMBER NOT NULL,
    g_id NUMBER NOT NULL,
    primary key(s_id,g_id),
    CONSTRAINT fk_seats_galleries
        FOREIGN KEY (g_id)
        REFERENCES galleries (g_id)
);


-------- 26-08-23--------------------

CREATE TABLE superAdmin(

    id number primary key,
    email varchar2(100) not null unique,
    password varchar2(100) not null

);

INSERT INTO SUPERADMIN 
VALUES ('1','super@gmail.com','12345');

ALTER TABLE theatres 
ADD city/building,road varchar2(100);

ALTER TABLE THEATRES 
ADD CONSTRAINT location_constraint unique(building,road,city);

----------------more updates at theatres.sql ------------------