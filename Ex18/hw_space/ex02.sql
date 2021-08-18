SELECT * FROM food; -- (1)
SELECT fname, expiredate,price FROM food; -- (2)
SELECT fname '食物名稱', expiredate '到期日',price '價格' FROM food; -- (3)
SELECT DISTINCT catalog FROM food; -- (4)
SELECT CONCAT(fname,' ',catalog) AS 'Food Name & catalog' FROM food; -- (5)

SELECT fname, price  -- (6)
	FROM food
    WHERE price>400;
    
SELECT fname, price  -- (7)
	FROM food
    WHERE price BETWEEN 250 AND 530;
    
SELECT fname, price  -- (8)
	FROM food
    WHERE price NOT BETWEEN 250 AND 530;
    
SELECT fname, price,catalog  -- (9)
	FROM food
    WHERE catalog= '點心';
    
SELECT fname, price,catalog  -- (10)
	FROM food
    WHERE catalog IN ('點心','飲料');
    
SELECT fname, price -- (11)
	FROM food
    WHERE placeid IN ('TW','JP');
    
SELECT fname,expiredate,price -- (12)
	FROM food
    WHERE fname LIKE '%油%';
    
SELECT fname,price -- (13)
	FROM food
    WHERE YEAR(expiredate) < YEAR(SYSDATE())+1;
    

SELECT fname,price -- (13)
	FROM food
    WHERE YEAR(expiredate) < YEAR(SYSDATE())+1;
    
SELECT fname,price -- (14)
	FROM food
    WHERE expiredate < '2022-07-01';
    
SELECT fname,price -- (15)
	FROM food
    WHERE expiredate < SYSDATE()+ INTERVAL 6 month;
    
SELECT fname,expiredate,price -- (16)
	FROM food
    ORDER BY price DESC;

SELECT fname,expiredate,price -- (17)
	FROM food
    ORDER BY price DESC LIMIT 3;

SELECT fname,price -- (18)
	FROM food
    WHERE catalog='點心' AND price<= 250
    ORDER BY price;

SELECT fname, price, round(price*1.05) AS 'New Price' -- (19)
	FROM food;
    
SELECT fname, price, round(price*1.05) AS 'New Price',  -- (20)
		round(price*1.05)-price AS 'Increase'
	FROM food;
    
SELECT fname, price, -- (21)
	CASE
		WHEN price<250 THEN price*1.08
        WHEN price BETWEEN 251 AND 500 THEN price*1.05
        ELSE price*1.03
	END 'New Price'
FROM food;

SELECT fname, catalog, DATEDIFF(expiredate,SYSDATE()) 'Days of expired', -- (22)
		IF(DATEDIFF(expiredate,SYSDATE())>0,'未過期','已過期') 'expired or not'
FROM food;

SELECT fname, catalog, DATEDIFF(expiredate,SYSDATE()) 'Days of expired', -- (23)
		IF(DATEDIFF(expiredate,SYSDATE())>0,'未過期','已過期') 'expired or not'
FROM food
ORDER BY DATEDIFF(expiredate,SYSDATE());

SELECT round(MAX(price)) 'Max', round(MIN(price)) 'Min', -- (24)
		round(SUM(price)) 'Sum', round(AVG(price)) 'Avg' 
FROM food;

SELECT catalog,round(MAX(price)) 'Max', round(MIN(price)) 'Min', -- (25)
		round(SUM(price)) 'Sum', round(AVG(price)) 'Avg' 
FROM food
GROUP BY catalog;

SELECT catalog,round(MAX(price)) 'Max', round(MIN(price)) 'Min', -- (26)
		round(SUM(price)) 'Sum', round(AVG(price)) 'Avg' 
FROM food
GROUP BY catalog
HAVING AVG(price)>300
ORDER BY AVG(price) DESC;

SELECT catalog, COUNT(*) -- (27)
FROM food 
GROUP BY catalog;

SELECT placeid, catalog,COUNT(*) -- (28)
FROM food
GROUP BY placeid, catalog;

    

