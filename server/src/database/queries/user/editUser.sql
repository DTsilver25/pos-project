UPDATE users
SET
    username = $1,
    password = $2,
    role = $3
WHERE
    id = $4
RETURNING
    *;