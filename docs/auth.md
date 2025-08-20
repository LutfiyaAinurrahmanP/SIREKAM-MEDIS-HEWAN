# AUTH SPEC API

## REGISTER USER API

Endpoint : POST /register

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
  }
]
```

## LOGIN USER API

Endpoint : POST /login

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
  "status": 200,
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
[
  {
    "status": 400,
    "errors": "Username atau kata sandi salah!"
  },
  {
    "status": 401,
    "errors": {
      "session": "Sesi tidak valid atau kadaluarsa!"
    }
  }
]
```

## LOGOUT USER API

Endpoint : DELETE /role/logout

Request Header :

- TOKEN-SESSION : UUID

Response Body (Success) :

```json
{
  "status": 200,
  "message": "Berhasil keluar dari sesi!"
}
```

Response Body (Failed) :

```json
{
  "status": 401,
  "errors": {
    "session": "Sesi tidak valid atau kadaluarsa!"
  }
}
```
