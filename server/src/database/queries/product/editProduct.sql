UPDATE products
SET
    name = $1,
    price = $2,
    stock = $3,
    description = $4
WHERE
    id = $5
RETURNING
    *;