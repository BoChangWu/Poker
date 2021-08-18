SELECT f.fname,f.placeid,p.pname,f.price -- (1)
	FROM food f,place p
    WHERE f.placeid = p.id;
    
SELECT CONCAT(f.fname,' ',p.pname) 'Food name & place'-- (2)
	FROM food f, place p
    WHERE f.placeid = p.id;
    
SELECT f.fname, f.price -- (3)
	FROM food f, place p
    WHERE f.placeid = p.id
    AND p.pname='台灣';
    
SELECT f.fname, f.price -- (4)
	FROM food f, place p
    WHERE f.placeid = p.id
    AND p.pname IN('台灣','日本')
    ORDER BY f.price DESC;
    
SELECT f.fname,f.expiredate, f.price -- (5)
	FROM food f, place p
    WHERE f.placeid = p.id
    AND p.pname='台灣'
    ORDER BY f.price DESC 
    LIMIT 3;
    
SELECT p.pname '產地名稱', round(MAX(f.price)) 'Max', round(MIN(f.price)) 'Min', -- (6)
		round(SUM(f.price)) 'Sum', round(AVG(f.price)) 'Avg' 
	FROM food f, place p
    WHERE f.placeid = p.id
    GROUP BY p.pname;

SELECT p.pname,f.catalog,COUNT(*) 'count'
	FROM food f, place p
    WHERE f.placeid = p.id
    GROUP BY p.pname,f.catalog;
    
