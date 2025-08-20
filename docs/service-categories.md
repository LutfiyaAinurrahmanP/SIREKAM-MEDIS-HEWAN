# SERVICE CATEGORIES API SPEC

## CREATE SERVICE CATEGORIES API

Endpoint : POST /role/service-categories

Request Header :

- TOKEN-SESSION : UUID

Request Body :

```json
{
  "name": "Konsultasi Umum",
  "description": "Pemeriksaan dasar hewan peliharaan oleh dokter hewan",
  "price": 75000.0,
  "is_active": true
}
```

Response Body (Success) :

```json
{
  "status": 201,
  "message": "Data jenis layanan berhasil dibuat!",
  "data": {
    "id": 1,
    "name": "Konsultasi Umum",
    "description": "Pemeriksaan dasar hewan peliharaan oleh dokter hewan",
    "price": 75000.0,
    "is_active": true,
    "created_at": "2025-08-16",
    "updated_at": "2025-08-16"
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
        // jenis layanan
        "name.required": "Nama jenis layanan harus diisi!",
        "name.min": "Nama jenis layanan memiliki minimal 5 karakter!!",
        "name.max": "Nama jenis layanan tidak boleh melebihi 64 karakter!!",
        // harga layanan
        "price.required": "Harga jenis layanan harus diisi!",
        "price.numeric": "Harga jenis layanan harus berupa angka!",
        // status layanan
        "is_active.required": "Status layanan harus diisi!"
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

## LIST SERVICE CATEGORIES API

Endpoint : GET /role/service-categories

Request Header :

- TOKEN-SESSION : UUID

Response Body (Success) :

```json
{
  "status": 200,
  "data": [
    {
      "id": 1,
      "name": "Konsultasi Umum",
      "description": "Pemeriksaan dasar hewan peliharaan oleh dokter hewan",
      "price": 75000.0,
      "is_active": true,
      "created_at": "2025-08-16",
      "updated_at": "2025-08-16"
    },
    {
      "id": 2,
      "name": "Vaksinasi",
      "description": "Layanan vaksinasi rutin untuk kucing, anjing, dan kelinci",
      "price": 120000.0,
      "is_active": true,
      "created_at": "2025-08-16",
      "updated_at": "2025-08-16"
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
      "empty": "Data jenis layanan tidak ditemukan!"
    }
  }
]
```

## GET SERVICE CATEGORIES API

Endpoint : GET /role/service-categories/:id

Request Header :

- TOKEN-SESSION : UUID

Response Body (Success) :

```json
{
  "status": 200,
  "data": {
    "id": 1,
    "name": "Konsultasi Umum",
    "description": "Pemeriksaan dasar hewan peliharaan oleh dokter hewan",
    "price": 75000.0,
    "is_active": true,
    "created_at": "2025-08-16",
    "updated_at": "2025-08-16"
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
      "empty": "Data jenis layanan tidak ditemukan!"
    }
  }
]
```

## UPDATE SERVICE CATEGORIES API

Endpoint : PATCH /role/service-categories/:id

Request Header :

- TOKEN-SESSION : UUID

Request Body :

```json
{
  "name": "Konsultasi Umum",
  "description": "Pemeriksaan dasar hewan peliharaan oleh dokter hewan",
  "price": 75000.0,
  "is_active": true
}
```

Response Body (Success) :

```json
{
  "status": 200,
  "message": "Data jenis layanan berhasil diperbarui!",
  "data": {
    "id": 1,
    "name": "Konsultasi Umum",
    "description": "Pemeriksaan dasar hewan peliharaan oleh dokter hewan",
    "price": 75000.0,
    "is_active": true,
    "created_at": "2025-08-16",
    "updated_at": "2025-08-16"
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
        // jenis layanan
        "name.required": "Nama jenis layanan harus diisi!",
        "name.min": "Nama jenis layanan memiliki minimal 5 karakter!!",
        "name.max": "Nama jenis layanan tidak boleh melebihi 64 karakter!!",
        // harga layanan
        "price.required": "Harga jenis layanan harus diisi!",
        "price.numeric": "Harga jenis layanan harus berupa angka!",
        // status layanan
        "is_active.required": "Status layanan harus diisi!"
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
      "empty": "Data jenis layanan tidak ditemukan!"
    }
  }
]
```

## DELETE SERVICE CATEGORIES API

Endpoint : DELETE /role/service-categories/:id

Request Header :

- TOKEN-SESSION : UUID

Response Body (Success) :

```json
{
  "status": 200,
  "message": "Data jenis layanan berhasil dihapus!"
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
      "empty": "Data jenis layanan tidak ditemukan!"
    }
  }
]
```
