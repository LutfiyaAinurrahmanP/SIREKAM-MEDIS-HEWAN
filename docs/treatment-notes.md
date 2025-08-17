# TREATMENT NOTES API SPEC

## CREATE TREATMENT NOTES API

Endpoint : POST /treatment-notes

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
{
  "errors": {
    "validation": {
      "created_by.required": "Pembuat catatan harus diisi",
      "medical_record_id.required": "Rekam medis harus diisi",
      "notes.required": "Catatan harus diisi"
    },
    "session": "Sesi tidak valid atau kadaluarsa"
  }
}
```

## LIST TREATMENT NOTES API

Endpoint : GET /treatment-notes

Request Header :

- TOKEN-SESSION : UUID

Response Body (Success) :

```json
{
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
{
  "errors": {
    "empty": "Data catatan perawatan tidak ditemukan",
    "session": "Sesi tidak valid atau kadaluarsa"
  }
}
```

## GET TREATMENT NOTES API

Endpoint : GET /treatment-notes/:id

Request Header :

- TOKEN-SESSION : UUID

Response Body (Success) :

```json
{
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
{
  "errors": {
    "empty": "Data catatan perawatan tidak ditemukan",
    "session": "Sesi tidak valid atau kadaluarsa"
  }
}
```

## UPDATE TREATMENT NOTES API

Endpoint : PATCH /treatment-notes/:id

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
{
  "errors": {
    "validation": {
      "created_by.required": "Pembuat catatan harus diisi",
      "medical_record_id.required": "Rekam medis harus diisi",
      "notes.required": "Catatan harus diisi"
    },
    "session": "Sesi tidak valid atau kadaluarsa"
  }
}
```

## DELETE TREATMENT NOTES API

Endpoint : DELETE /treatment-notes/:id

Request Header :

- TOKEN-SESSION : UUID

Response Body (Success) :

```json
{
  "message": "Data catatan perawatan berhasil dihapus!"
}
```

Response Body (Failed) :

```json
{
  "errors": {
    "empty": "Data catatan perawatan tidak ditemukan",
    "session": "Sesi tidak valid atau kadaluarsa"
  }
}
```
