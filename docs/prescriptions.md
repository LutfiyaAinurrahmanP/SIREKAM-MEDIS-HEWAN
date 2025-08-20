# PRESCRIPTIONS API SPEC

## CREATE PRESCRIPTIONS API

Endpoint : POST /role/prescriptions

Request Header :

- TOKEN-SESSION : UUID

Request Body :

```json
{
  "medical_record_id": 1,
  "veterinarian_id": 1,
  "notes": "Kucing mengalami demam ringan dan kehilangan nafsu makan. Diberikan obat antipiretik"
}
```

Response Body (Success) :

```json
{
  "status": 201,
  "message": "Data resep berhasil dibuat!",
  "data": {
    "id": 1,
    "medical_record_id": 1,
    "veterinarian_id": 1,
    "notes": "Kucing mengalami demam ringan dan kehilangan nafsu makan. Diberikan obat antipiretik",
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
        // rekam medis
        "medical_record_id.required": "Rekam medis harus diisi!",
        // dokter
        "veterinarian_id.required": "Dokter hewan harus diisi!"
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

## LIST PRESCRIPTIONS API

Endpoint : GET /role/prescriptions

Request Header :

- TOKEN-SESSION : UUID

Response Body (Success) :

```json
{
  "status": 200,
  "data": [
    {
      "id": 1,
      "medical_record_id": 1,
      "veterinarian_id": 1,
      "notes": "Kucing mengalami demam ringan dan kehilangan nafsu makan. Diberikan obat antipiretik",
      "created_at": "2025-08-16",
      "updated_at": "2025-08-16"
    },
    {
      "id": 2,
      "medical_record_id": 3,
      "veterinarian_id": 2,
      "notes": "Kelinci diperiksa rutin, kondisi sehat, hanya disarankan untuk memperbaiki pola makan",
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
      "empty": "Data resep tidak ditemukan!"
    }
  }
]
```

## GET PRESCRIPTIONS API

Endpoint : GET /role/prescriptions/:id

Request Header :

- TOKEN-SESSION : UUID

Response Body (Success) :

```json
{
  "status": 200,
  "data": {
    "id": 1,
    "medical_record_id": 1,
    "veterinarian_id": 1,
    "notes": "Kucing mengalami demam ringan dan kehilangan nafsu makan. Diberikan obat antipiretik",
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
      "empty": "Data resep tidak ditemukan!"
    }
  }
]
```

## UPDATE PRESCRIPTIONS API

Endpoint : PATCH /role/prescriptions/:id

Request Header :

- TOKEN-SESSION : UUID

Request Body :

```json
{
  "medical_record_id": 1,
  "veterinarian_id": 1,
  "notes": "Kucing mengalami demam ringan dan kehilangan nafsu makan. Diberikan obat antipiretik"
}
```

Response Body (Success) :

```json
{
  "status": 200,
  "message": "Data resep berhasil diperbarui!",
  "data": {
    "id": 1,
    "medical_record_id": 1,
    "veterinarian_id": 1,
    "notes": "Kucing mengalami demam ringan dan kehilangan nafsu makan. Diberikan obat antipiretik",
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
        // rekam medis
        "medical_record_id.required": "Rekam medis harus diisi!",
        // dokter
        "veterinarian_id.required": "Dokter hewan harus diisi!"
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
      "empty": "Data resep tidak ditemukan!"
    }
  }
]
```

## DELETE PRESCRIPTIONS API

Endpoint : DELETE /role/prescriptions/:id

Request Header :

- TOKEN-SESSION : UUID

Response Body (Success) :

```json
{
  "status": 200,
  "message": "Data resep berhasil dihapus!"
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
      "empty": "Data resep tidak ditemukan!"
    }
  }
]
```
