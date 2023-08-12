--- user table

CREATE TABLE Users (
    user_id NUMBER PRIMARY KEY,
    name VARCHAR2(255) NOT NULL,
    email VARCHAR2(255) NOT NULL UNIQUE,
    password VARCHAR2(500) 
);

INSERT INTO users(user_id,name,email,password)
values(0,'John doe','johndoe@gmail.com','12345');

--- admin table
CREATE TABLE Admin (
    admin_id NUMBER PRIMARY KEY,
    email VARCHAR2(255) UNIQUE NOT NULL,
    password VARCHAR2(500) NOT NULL
);
INSERT INTO admin(admin_id,email,password)
values(0,'johndoe@admin.com','12345');



----------movie table------------

CREATE TABLE Movies (
    movie_id NUMBER PRIMARY KEY,
    title VARCHAR2(255) NOT NULL,
    description VARCHAR2(1000) NOT NULL,
    release_date DATE NOT NULL,
    posterUrl VARCHAR2(500),
    admin_id NUMBER NOT NULL,
    CONSTRAINT fk_admin_id FOREIGN KEY (admin_id) REFERENCES Admin(admin_id)
);

INSERT INTO movies(movie_id,title,description,release_date,admin_id)
values(0,'john doe','movie added by john doe','30-jul-23',0);

ALTER TABLE Movies RENAME COLUMN posterURL TO poster_url;



----------------booking table---------------------------



CREATE TABLE Bookings (
    booking_id NUMBER PRIMARY KEY,
    user_id NUMBER NOT NULL,
    movie_id NUMBER NOT NULL,
    seat_number NUMBER NOT NULL,
    booking_date DATE NOT NULL,
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(user_id),
    CONSTRAINT fk_movie_id FOREIGN KEY (movie_id) REFERENCES movies(movie_id),
    CONSTRAINT unique_booking_info UNIQUE (user_id, movie_id, seat_number, booking_date)
);


