ALTER TABLE LOCATIONS 
DROP CONSTRAINT fk_locations_theatres;

DELETE FROM THEATRES t ;


BEGIN
	
	FOR r IN (SELECT * FROM LOCATIONS l)
	
	LOOP 
		
		INSERT INTO THEATRES t(t_id,building,road,city)
		values(r.loc_id,r.building,r.road,r.city);
		
	END LOOP;
	
END;