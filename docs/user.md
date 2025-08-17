# USER API SPEC

## CREATE USER API

Endpoint : POST /users

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
    "validation": {
      "username.unique": "Username sudah dipakai",
      "username.required": "Username harus diisi",
      "fullname.required": "Nama lengkap harus diisi",
      "email.unique": "Email sudah dipakai",
      "email.required": "Email harus diisi",
      "password.required": "Password harus diisi",
      "role.required": "Hak akses harus dipilih",
      "phone.required": "Nomor telp harus diisi",
      "phone.min": "Nomor telp memiliki minimal 11 angka",
      "phone.max": "Nomor telp tidak boleh melebihi 14 angka"
    },
    "session": "Sesi tidak valid atau kadaluarsa"
  }
}
```

## LIST USER API

Endpoint : GET /users

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
  ],
  "meta": {
    "total": 2,
    "page": 1,
    "limit": 10,
    "total_page": 1
  }
}
```

Response Body (Failed) :

```json
{
  "errors": {
    "empty": "Data user tidak ditemukan",
    "session": "Sesi tidak valid atau kadaluarsa"
  }
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
  "errors": {
    "empty": "Data user tidak ditemukan",
    "session": "Sesi tidak valid atau kadaluarsa"
  }
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
  "message": "Data user berhasil diperbarui!",
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
    "validation": {
      "username.unique": "Username sudah dipakai",
      "username.required": "Username harus diisi",
      "fullname.required": "Nama lengkap harus diisi",
      "email.unique": "Email sudah dipakai",
      "email.required": "Email harus diisi",
      "password.required": "Password harus diisi",
      "role.required": "Hak akses harus dipilih",
      "phone.required": "Nomor telp harus diisi",
      "phone.min": "Nomor telp memiliki minimal 11 angka",
      "phone.max": "Nomor telp tidak boleh melebihi 14 angka"
    },
    "session": "Sesi tidak valid atau kadaluarsa"
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

Response Body (Failed) :

```json
{
  "errors": {
    "empty": "Data user tidak ditemukan",
    "session": "Sesi tidak valid atau kadaluarsa"
  }
}
```
