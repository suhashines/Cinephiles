CREATE OR REPLACE FUNCTION getMovieDirector(id in NUMBER)
  RETURN VARCHAR2
IS
  director_name_out VARCHAR2(100);
 
BEGIN
  SELECT name INTO director_name_out
  FROM directors
  WHERE d_id = id ;

  RETURN director_name_out;
 
EXCEPTION
  WHEN NO_DATA_FOUND THEN
    RETURN 'not available'; 
END;

---------------------------------------

CREATE OR REPLACE FUNCTION getMovieGenres(movie_id IN NUMBER)
RETURN VARCHAR2
IS
  genre_names VARCHAR2(1000);
BEGIN
  SELECT LISTAGG(g.name, ', ') WITHIN GROUP (ORDER BY mg.gn_id)
  INTO genre_names
  FROM movieGenres mg
  JOIN genres g ON mg.gn_id = g.gn_id
  WHERE mg.m_id = movie_id;

  RETURN genre_names;
EXCEPTION
  WHEN NO_DATA_FOUND THEN
    RETURN NULL;
END;


----------------------------------------

