INSERT INTO
    sales (
        user_id,
        total,
        payment_method
    )
VALUES ($1, $2, $3)
RETURNING
    *