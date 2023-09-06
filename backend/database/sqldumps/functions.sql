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
    RETURN 'not available';
END;


----------------------------------------

--random showtime generator function 

CREATE OR REPLACE FUNCTION random_date RETURN timestamp IS 

	
random_ts timestamp ;

BEGIN 

SELECT TO_TIMESTAMP(
    TO_CHAR(
        TO_DATE('2023-09-02', 'YYYY-MM-DD') +
        DBMS_RANDOM.VALUE(0, 120), -- Random days from September 2 to December 31
        'YYYY-MM-DD'
    )
    || ' ' ||
    TO_CHAR(
        TRUNC(DBMS_RANDOM.VALUE(0, 24)), -- Random hours
        'FM00'
    )
    || ':' ||
    TO_CHAR(
        TRUNC(DBMS_RANDOM.VALUE(0, 60)), -- Random minutes 
        'FM00'
    )
    || ':' ||
    TO_CHAR(
        TRUNC(DBMS_RANDOM.VALUE(0, 0)), -- Random seconds 
        'FM00'
    ) ,
    'YYYY-MM-DD HH24:MI:SS') INTO random_ts 
    FROM DUAL ;
   
dbms_output.put_line(random_ts);

RETURN random_ts ;

END ;

------------data using pl-sql---------------


DECLARE 
mt NUMBER ;
cnt NUMBER ;

BEGIN
	
	cnt := 0 ;
	
	FOR r IN (SELECT g_id,t_id FROM GALLERIES g)
	
	LOOP 
		
		FOR k IN (SELECT mt_id FROM MOVIETHEATRES mt WHERE mt.T_ID=r.t_id)
		
		LOOP 
			
			mt := k.mt_id ;
			
			INSERT INTO showtimes(show_id,mt_id,date_time,g_id) 
			VALUES (cnt,mt,random_date,r.g_id) ;
		
			cnt := cnt+1 ;
		
		    
			
		END LOOP;
		
		
	END LOOP;
	
	
END;