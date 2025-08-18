# TREATMENT NOTES API SPEC

## CREATE TREATMENT NOTES API

Endpoint : POST /role/treatment-notes

Request Header :

- TOKEN-SESSION : UUID

Request Body :

```json
{
  "created_by": 1,
  "medical_record_id": 1,
  "notes": "Lebih sigap dalam menghadapi penanganan awal"
}
```

Response Body (Success) :

```json
{
  "status": 201,
  "message": "Data catatan perawatan berhasil dibuat!",
  "data": {
    "id": 1,
    "created_by": 1,
    "medical_record_id": 1,
    "notes": "Lebih sigap dalam menghadapi penanganan awal",
    "created_at": "2025-08-17",
    "updated_at": "2025-08-17"
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
        // pembuat catatan
        "created_by.required": "Pembuat catatan harus diisi!",
        // rekam medis
        "medical_record_id.required": "Rekam medis harus diisi!",
        // catatan
        "notes.required": "Catatan harus diisi!",
        "notes.min": "Catatan memiliki minimal 5 karakter!"
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

## LIST TREATMENT NOTES API

Endpoint : GET /role/treatment-notes

Request Header :

- TOKEN-SESSION : UUID

Response Body (Success) :

```json
{
  "status": 200,
  "data": [
    {
      "id": 1,
      "created_by": 1,
      "medical_record_id": 1,
      "notes": "Lebih sigap dalam menghadapi penanganan awal",
      "created_at": "2025-08-17",
      "updated_at": "2025-08-17"
    },
    {
      "id": 2,
      "created_by": 2,
      "medical_record_id": 2,
      "notes": "Perhatikan efek samping obat dalam beberapa hari",
      "created_at": "2025-08-17",
      "updated_at": "2025-08-17"
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
      "empty": "Data catatan perawatan tidak ditemukan!"
    }
  }
]
```

## GET TREATMENT NOTES API

Endpoint : GET /role/treatment-notes/:id

Request Header :

- TOKEN-SESSION : UUID

Response Body (Success) :

```json
{
  "status": 200,
  "data": {
    "id": 1,
    "created_by": 1,
    "medical_record_id": 1,
    "notes": "Lebih sigap dalam menghadapi penanganan awal",
    "created_at": "2025-08-17",
    "updated_at": "2025-08-17"
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
      "empty": "Data catatan perawatan tidak ditemukan!"
    }
  }
]
```

## UPDATE TREATMENT NOTES API

Endpoint : PATCH /role/treatment-notes/:id

Request Header :

- TOKEN-SESSION : UUID

Request Body :

```json
{
  "created_by": 1,
  "medical_record_id": 1,
  "notes": "Lebih sigap dalam menghadapi penanganan awal"
}
```

Response Body (Success) :

```json
{
  "status": 200,
  "message": "Data catatan perawatan berhasil diperbarui!",
  "data": {
    "id": 1,
    "created_by": 1,
    "medical_record_id": 1,
    "notes": "Lebih sigap dalam menghadapi penanganan awal",
    "created_at": "2025-08-17",
    "updated_at": "2025-08-17"
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
        // pembuat catatan
        "created_by.required": "Pembuat catatan harus diisi!",
        // rekam medis
        "medical_record_id.required": "Rekam medis harus diisi!",
        // catatan
        "notes.required": "Catatan harus diisi!",
        "notes.min": "Catatan memiliki minimal 5 karakter!"
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
      "empty": "Data catatan perawatan tidak ditemukan!"
    }
  }
]
```

## DELETE TREATMENT NOTES API

Endpoint : DELETE /role/treatment-notes/:id

Request Header :

- TOKEN-SESSION : UUID

Response Body (Success) :

```json
{
  "status": 200,
  "message": "Data catatan perawatan berhasil dihapus!"
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
      "empty": "Data catatan perawatan tidak ditemukan!"
    }
  }
]
```
