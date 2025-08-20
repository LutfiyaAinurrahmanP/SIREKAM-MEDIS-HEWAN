# USER API SPEC

## CREATE USER API

Endpoint : POST /role/users

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
  "status": 201,
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
[
  {
    "status": 400,
    "errors": {
      "validation": {
        // username
        "username.unique": "Username sudah dipakai!",
        "username.required": "Username harus diisi!",
        "username.min": "Username memiliki minimal 5 karakter!",
        "username.max": "Username tidak boleh melebihi 64 karakter!",
        // fullname
        "fullname.required": "Nama lengkap harus diisi!",
        "fullname.min": "Nama lengkap memiliki minimal 5 karakter!",
        "fullname.max": "Nama lengkap tidak boleh melebihi 64 karakter!",
        // email
        "email.unique": "Email sudah dipakai!",
        "email.required": "Email harus diisi!",
        "email.min": "Email memiliki minimal 5 karakter!",
        "email.max": "Email tidak boleh melebihi 64 karakter!",
        // password
        "password.required": "Password harus diisi!",
        "password.min": "Password memiliki minimal 8 karakter!",
        "password.max": "Password tidak boleh melebihi 64 karakter!",
        // role
        "role.required": "Hak akses harus dipilih!",
        // phone
        "phone.required": "Nomor telp harus diisi!",
        "phone.min": "Nomor telp memiliki minimal 11 angka!",
        "phone.max": "Nomor telp tidak boleh melebihi 14 angka!"
      }
    }
  },
  {
    "status": 401,
    "errors": {
      "session": "Sesi tidak valid atau kadaluarsa!"
    }
  },
  {
    "status": 403,
    "errors": {
      "auth": "Anda tidak memiliki hak akses pada halaman ini!"
    }
  }
]
```

## LIST USER API

Endpoint : GET /role/users

Request Header :

- TOKEN-SESSION : UUID

Response Body (Success) :

```json
{
  "status": 200,
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
[
  {
    "status": 401,
    "errors": {
      "session": "Sesi tidak valid atau kadaluarsa!"
    }
  },
  {
    "status": 403,
    "errors": {
      "auth": "Anda tidak memiliki hak akses pada halaman ini!"
    }
  },
  {
    "status": 404,
    "errors": {
      "empty": "Data user tidak ditemukan!"
    }
  }
]
```

## GET USER API

Endpoint : GET /role/users/:id

Request Header :

- TOKEN-SESSION : UUID

Response Body (Success) :

```json
{
  "status": 200,
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
[
  {
    "status": 401,
    "errors": {
      "session": "Sesi tidak valid atau kadaluarsa!"
    }
  },
  {
    "status": 403,
    "errors": {
      "auth": "Anda tidak memiliki hak akses pada halaman ini!"
    }
  },
  {
    "status": 404,
    "errors": {
      "empty": "Data user tidak ditemukan!"
    }
  }
]
```

## UPDATE USER API

Endpoint : PATCH /role/users/:id

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
  "status": 200,
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
[
  {
    "status": 400,
    "errors": {
      "validation": {
        // username
        "username.unique": "Username sudah dipakai!",
        "username.required": "Username harus diisi!",
        "username.min": "Username memiliki minimal 5 karakter!",
        "username.max": "Username tidak boleh melebihi 64 karakter!",
        // fullname
        "fullname.required": "Nama lengkap harus diisi!",
        "fullname.min": "Nama lengkap memiliki minimal 5 karakter!",
        "fullname.max": "Nama lengkap tidak boleh melebihi 64 karakter!",
        // email
        "email.unique": "Email sudah dipakai!",
        "email.required": "Email harus diisi!",
        "email.min": "Email memiliki minimal 5 karakter!",
        "email.max": "Email tidak boleh melebihi 64 karakter!",
        // password
        "password.required": "Password harus diisi!",
        "password.min": "Password memiliki minimal 8 karakter!",
        "password.max": "Password tidak boleh melebihi 64 karakter!",
        // role
        "role.required": "Hak akses harus dipilih!",
        // phone
        "phone.required": "Nomor telp harus diisi!",
        "phone.min": "Nomor telp memiliki minimal 11 angka!",
        "phone.max": "Nomor telp tidak boleh melebihi 14 angka!"
      }
    }
  },
  {
    "status": 401,
    "errors": {
      "session": "Sesi tidak valid atau kadaluarsa!"
    }
  },
  {
    "status": 403,
    "errors": {
      "auth": "Anda tidak memiliki hak akses pada halaman ini!"
    }
  },
  {
    "status": 404,
    "errors": {
      "empty": "Data user tidak ditemukan!"
    }
  }
]
```

## DELETE USER API

Endpoint : DELETE /role/users/:id

Request Header :

- TOKEN-SESSION : UUID

Response Body (Success) :

```json
{
  "status": 200,
  "message": "Data user berhasil dihapus!"
}
```

Response Body (Failed) :

```json
[
  {
    "status": 401,
    "errors": {
      "session": "Sesi tidak valid atau kadaluarsa!"
    }
  },
  {
    "status": 403,
    "errors": {
      "auth": "Anda tidak memiliki hak akses pada halaman ini!"
    }
  },
  {
    "status": 404,
    "errors": {
      "empty": "Data user tidak ditemukan!"
    }
  }
]
```
