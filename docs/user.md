# USER API SPEC

## REGISTER USER API

Endpoint : POST /users/

Request Header :

- TOKEN-SESSION : UUID

Request Body :

```json
{
  "username": "lutfiyapr",
  "fullname": "Lutfiya Ainurrahman Prasetyo",
  "email": "lutfiyapr.stu@pnc.ac.id",
  "password": "password",
  "role": "admin",
  "phone": "081915133813"
}
```

Response Body (Success) :

```json
{
  "message": "Data user berhasil dibuat!",
  "data": {
    "id": 1,
    "username": "lutfiyapr",
    "fullname": "Lutfiya Ainurrahman Prasetyo",
    "email": "lutfiyapr.stu@pnc.ac.id",
    "role": "admin",
    "phone": "081915133813",
    "created_at": "2025-08-14",
    "updated_at": "2025-08-14"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": {
    "username": "Username sudah dipakai",
    "email": "Email sudah dipakai"
  }
}
```

## LIST USER API

Endpoint : GET /users/

Request Header :

- TOKEN-SESSION : UUID

Response Body (Success) :

```json
{
  "data": [
    {
      "id": 1,
      "username": "lutfiyapr",
      "fullname": "Lutfiya Ainurrahman Prasetyo",
      "email": "lutfiyapr.stu@pnc.ac.id",
      "role": "admin",
      "phone": "081915133813",
      "created_at": "2025-08-14",
      "updated_at": "2025-08-14"
    },
    {
      "id": 2,
      "username": "lutfiyapr",
      "fullname": "Lutfiya Ainurrahman Prasetyo",
      "email": "lutfiyapr.stu@pnc.ac.id",
      "role": "admin",
      "phone": "081915133813",
      "created_at": "2025-08-14",
      "updated_at": "2025-08-14"
    }
  ]
}
```

Response Body (Failed) :

```json
{
  "errors": "Data user tidak ditemukan"
}
```

## GET USER API

Endpoint : GET /users/:id

Request Header :

- TOKEN-SESSION : UUID

Response Body (Success) :

```json
{
  "data": {
    "id": 1,
    "username": "lutfiyapr",
    "fullname": "Lutfiya Ainurrahman Prasetyo",
    "email": "lutfiyapr.stu@pnc.ac.id",
    "role": "admin",
    "phone": "081915133813",
    "created_at": "2025-08-14",
    "updated_at": "2025-08-14"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "Data user tidak ditemukan"
}
```

## UPDATE USER API

Endpoint : PATCH /users/:id

Request Header :

- TOKEN-SESSION : UUID

Request Body :

```json
{
  "username": "lutfiyapr",
  "fullname": "Lutfiya Ainurrahman Prasetyo",
  "email": "lutfiyapr.stu@pnc.ac.id",
  "password": "password",
  "role": "admin",
  "phone": "081915133813"
}
```

Response Body (Success) :

```json
{
  "message": "Data user berhasil diperbaharui!",
  "data": {
    "id": 1,
    "username": "lutfiyapr",
    "fullname": "Lutfiya Ainurrahman Prasetyo",
    "email": "lutfiyapr.stu@pnc.ac.id",
    "role": "admin",
    "phone": "081915133813",
    "created_at": "2025-08-14",
    "updated_at": "2025-08-14"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": {
    "username": "Username sudah dipakai",
    "email": "Email sudah dipakai"
  }
}
```

## DELETE USER API

Endpoint : DELETE /users/:id

Request Header :

- TOKEN-SESSION : UUID

Response Body (Success) :

```json
{
  "message": "Data user berhasil dihapus!"
}
```
