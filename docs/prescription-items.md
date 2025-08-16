# PRESCRIPTION ITEMS API SPEC

## CREATE PRESCRIPTION ITEMS API

Endpoint : POST /prescription-items

Request Header :

- TOKEN-SESSION : UUID

Request Body :

```json
{
  "prescription_id": 1,
  "medicine_id": 1,
  "dosage": "500 mg",
  "frequency": "3 kali sehari",
  "duration_days": 7,
  "instructions": "Diminum setelah makan"
}
```

Response Body (Success) :

```json
{
  "message": "Data resep obat berhasil dibuat!",
  "data": {
    "id": 1,
    "prescription_id": 1,
    "medicine_id": 1,
    "dosage": "500 mg",
    "frequency": "3 kali sehari",
    "duration_days": 7,
    "instructions": "Diminum setelah makan",
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
      "prescription_id.required": "Resep harus diisi",
      "medicine_id.required": "Obat harus diisi"
    },
    "session": "Sesi tidak valid atau kadaluarsa"
  }
}
```

## LIST PRESCRIPTION ITEMS API

Endpoint : GET /prescription-items

Request Header :

- TOKEN-SESSION : UUID

Response Body (Success) :

```json
{
  "data": [
    {
      "id": 1,
      "prescription_id": 1,
      "medicine_id": 1,
      "dosage": "500 mg",
      "frequency": "3 kali sehari",
      "duration_days": 7,
      "instructions": "Diminum setelah makan",
      "created_at": "2025-08-16",
      "updated_at": "2025-08-16"
    },
    {
      "id": 2,
      "prescription_id": 2,
      "medicine_id": 4,
      "dosage": "250 mg",
      "frequency": "2 kali sehari",
      "duration_days": 14,
      "instructions": "Jangan dikunyah, telan dengan air putih",
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
    "empty": "Data resep obat tidak ditemukan",
    "session": "Sesi tidak valid atau kadaluarsa"
  }
}
```

## GET PRESCRIPTION ITEMS API

Endpoint : GET /prescription-items/:id

Request Header :

- TOKEN-SESSION : UUID

Response Body (Success) :

```json
{
  "data": {
    "id": 1,
    "prescription_id": 1,
    "medicine_id": 1,
    "dosage": "500 mg",
    "frequency": "3 kali sehari",
    "duration_days": 7,
    "instructions": "Diminum setelah makan",
    "created_at": "2025-08-16",
    "updated_at": "2025-08-16"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": {
    "empty": "Data resep obat tidak ditemukan",
    "session": "Sesi tidak valid atau kadaluarsa"
  }
}
```

## UPDATE PRESCRIPTION ITEMS API

Endpoint : PATCH /prescription-items/:id

Request Header :

- TOKEN-SESSION : UUID

Request Body :

```json
{
  "prescription_id": 1,
  "medicine_id": 1,
  "dosage": "500 mg",
  "frequency": "3 kali sehari",
  "duration_days": 7,
  "instructions": "Diminum setelah makan"
}
```

Response Body (Success) :

```json
{
  "message": "Data resep obat berhasil diperbarui!",
  "data": {
    "id": 1,
    "prescription_id": 1,
    "medicine_id": 1,
    "dosage": "500 mg",
    "frequency": "3 kali sehari",
    "duration_days": 7,
    "instructions": "Diminum setelah makan",
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
      "prescription_id.required": "Resep harus diisi",
      "medicine_id.required": "Obat harus diisi"
    },
    "session": "Sesi tidak valid atau kadaluarsa"
  }
}
```

## DELETE PRESCRIPTION ITEMS API

Endpoint : DELETE /prescription-items/:id

Request Header :

- TOKEN-SESSION : UUID

Response Body (Success) :

```json
{
  "message": "Data resep obat berhasil dihapus!"
}
```

Response Body (Failed) :

```json
{
  "errors": {
    "empty": "Data resep obat tidak ditemukan",
    "session": "Sesi tidak valid atau kadaluarsa"
  }
}
```
