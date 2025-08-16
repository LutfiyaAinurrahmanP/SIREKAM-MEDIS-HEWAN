# PRESCRIPTIONS API SPEC

## CREATE PRESCRIPTIONS API

Endpoint : POST /prescriptions

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
{
  "errors": {
    "validation": {
      "medical_record_id.required": "Rekam medis harus diisi",
      "veterinarian_id.required": "Dokter hewan harus diisi"
    },
    "session": "Sesi tidak valid atau kadaluarsa"
  }
}
```

## LIST PRESCRIPTIONS API

Endpoint : GET /prescriptions

Request Header :

- TOKEN-SESSION : UUID

Response Body (Success) :

```json
{
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
{
  "errors": {
    "empty": "Data resep tidak ditemukan",
    "session": "Sesi tidak valid atau kadaluarsa"
  }
}
```

## GET PRESCRIPTIONS API

Endpoint : GET /prescriptions/:id

Request Header :

- TOKEN-SESSION : UUID

Response Body (Success) :

```json
{
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
{
  "errors": {
    "empty": "Data resep tidak ditemukan",
    "session": "Sesi tidak valid atau kadaluarsa"
  }
}
```

## UPDATE PRESCRIPTIONS API

Endpoint : PATCH /prescriptions/:id

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
{
  "errors": {
    "validation": {
      "medical_record_id.required": "Rekam medis harus diisi",
      "veterinarian_id.required": "Dokter hewan harus diisi"
    },
    "session": "Sesi tidak valid atau kadaluarsa"
  }
}
```

## DELETE PRESCRIPTIONS API

Endpoint : DELETE /prescriptions/:id

Request Header :

- TOKEN-SESSION : UUID

Response Body (Success) :

```json
{
  "message": "Data resep berhasil dihapus!"
}
```

Response Body (Failed) :

```json
{
  "errors": {
    "empty": "Data resep tidak ditemukan",
    "session": "Sesi tidak valid atau kadaluarsa"
  }
}
```
