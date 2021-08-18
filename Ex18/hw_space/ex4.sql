-- 1. 查詢所有比'鳳梨酥'貴的食物名稱、到期日和價格
SELECT fname,expiredate,price
FROM food
WHERE price >(SELECT price
		FROM food
        WHERE fname='鳳梨酥');
        
-- 2. 查詢所有比'曲奇餅乾'便宜且種類是'點心'的食物名稱、到期日和價格
SELECT fname,expiredate,price
FROM food
WHERE price < (SELECT price FROM food WHERE fname='曲奇餅乾')
AND catalog = '點心'

-- 3. 查詢所有和'鳳梨酥'同一年到期的食物名稱、到期日和價格
SELECT fname,expiredate,price
FROM food
WHERE YEAR(expiredate)= (SELECT YEAR(expiredate) FROM food WHERE fname='鳳梨酥');
-- 4. 查詢所有比平均價格高的食物名稱、到期日和價格
SELECT fname,expiredate,price
FROM food
WHERE price>(SELECT AVG(price) FROM food);

SELECT AVG(price) FROM food;
-- 5. 查詢所有比平均價格低的'台灣'食物名稱、到期日和價格
SELECT f.fname,f.expiredate,f.price,p.pname
FROM food f, place p
WHERE f.placeid = p.id AND p.pname='台灣' 
AND price<(SELECT AVG(price)FROM food);

-- 6. 查詢所有種類和'仙貝'相同且價格比'仙貝'便宜的食物名稱、到期日和價格
SELECT fname,expiredate,price
FROM food 
WHERE catalog = (SELECT catalog FROM food WHERE fname='仙貝')
AND price< (SELECT price FROM food WHERE fname='仙貝');

-- 7. 查詢所有產地和'仙貝'相同且過期超過6個月以上的食物名稱、到期日和價格
SELECT fname,expiredate,price
FROM food 
WHERE DATEDIFF(CURDATE(),expiredate) div 30>= 6
AND placeid=(SELECT placeid FROM food WHERE fname='仙貝');

-- 8. 查詢每個產地價格最低的食物名稱、到期日和價格
SELECT fname,expiredate,price
FROM food 
GROUP BY placeid
HAVING (SELECT MIN(price) FROM food GROUP BY placeid);
-- 9. 查詢每個種類的食物價格最高者的食物名稱和價格
-- 10. 查詢所有種類不是'點心'但比種類是'點心'貴的食物名稱、種類和價格，並以價格做降冪排序
