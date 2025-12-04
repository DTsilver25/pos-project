INSERT INTO
    products (
        name,
        price,
        stock,
        description
    )
VALUES ($1, $2, $3, $4)
RETURNING
    *;