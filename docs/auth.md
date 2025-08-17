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

Endpoint : DELETE /logout

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
