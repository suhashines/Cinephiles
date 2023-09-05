

CREATE OR REPLACE TRIGGER check_booking
BEFORE INSERT ON bookings

FOR EACH ROW 

DECLARE 

show_id NUMBER ;
s_id varchar2(2);
g_id NUMBER ;
cnt NUMBER ;

BEGIN 
	
	show_id := :NEW.show_id ;
	s_id := :NEW.s_id ;
	g_id := :NEW.g_id ;
	cnt := 0 ;

	FOR r IN (SELECT * FROM bookings b WHERE b.show_id=show_id AND b.g_id=g_id AND b.s_id=s_id )
	LOOP 
		
		cnt := cnt + 1 ;
		
	END LOOP;
	
	IF cnt>0 THEN 
		
		:NEW.show_id := NULL ;
		:NEW.S_ID := NULL ;
		:NEW.g_id := NULL ;
	
	END IF ;
	

END;


CREATE OR REPLACE TRIGGER delete_null_bookings 
AFTER INSERT ON bookings 

BEGIN 
	
	DELETE FROM bookings
	WHERE show_id IS NULL
    AND g_id IS NULL
    AND s_id IS NULL;
	
END;


--trigger for movieTheatres that generate mt_id 


CREATE OR REPLACE TRIGGER pk_movie_theatre
BEFORE INSERT ON movieTheatres
FOR EACH ROW 

DECLARE 

id NUMBER ;

BEGIN 
	
	
	SELECT mt_id+1 INTO id
	FROM MOVIETHEATRES mt 
	ORDER BY  mt_id DESC 
	FETCH FIRST 1 ROW ONLY ;

	:NEW.mt_id := id ;
	
	
END;

--for showtime id generation

