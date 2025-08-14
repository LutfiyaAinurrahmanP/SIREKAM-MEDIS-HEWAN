# AUTH SPEC API

## LOGIN USER API

Endpoint : POST /auth

Request Body :

```json
{
  "username": "lutfiyapr",
  "password": "password"
}
```

Response Body (Success) :

```json
{
  "message": "Selamat datang Lutfiya Ainurrahman Prasetyo!",
  "data": {
    "id": 1,
    "username": "lutfiyapr",
    "fullname": "Lutfiya Ainurrahman Prasetyo",
    "email": "lutfiyapr.stu@pnc.ac.id",
    "role": "admin",
    "phone": "081915133813",
    "token": "UUID",
    "created_at": "2025-08-14",
    "updated_at": "2025-08-14"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "Username atau kata sandi salah"
}
```

## LOGOUT USER API

Endpoint : DELETE /auth

Request Header :

- TOKEN-SESSION : UUID

Response Body (Success) :

```json
{
  "message": "Berhasil keluar dari sesi!"
}
```

Response Body (Failed) :

```json
{
  "errors": "Sesi tidak valid atau kadaluarsa"
}
```
