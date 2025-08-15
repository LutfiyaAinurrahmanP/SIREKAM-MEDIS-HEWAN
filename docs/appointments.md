# APPOINTMENTS API SPEC

## CREATE APPOINTMENTS API

Endpoint : POST /appointments

Request Header :

- TOKEN-SESSION : UUID

Request Body :

```json
{
  "pet_id": 1,
  "created_by": 1,
  "schedule_date": "2025-08-15",
  "schedule_time": "08:00:00",
  "status": "scheduled",
  "reason": "Vaksinasi rabies",
  "notes": "Vaksinasi rabies tahunan"
}
```

Response Body (Success) :

```json
{
  "message": "Data janji temu berhasil dibuat!",
  "data": {
    "id": 1,
    "pet_id": 1,
    "created_by": 1,
    "schedule_date": "2025-08-15",
    "schedule_time": "08:00:00",
    "status": "scheduled",
    "reason": "Vaksinasi rabies",
    "notes": "Vaksinasi rabies tahunan",
    "created_at": "2025-08-15",
    "updated_at": "2025-08-15"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": {
    "validation": {
      "pet_id.required": "Hewan peliharaan harus dipilih",
      "created_by.required": "Pembuat janji temu harus diisi",
      "schedule_date.required": "Tanggal janji temu harus diisi",
      "schedule_time.required": "Jam janji temu harus diisi",
      "status.required": "Status harus dipilih"
    },
    "session": "Sesi tidak valid atau kadaluarsa"
  }
}
```

## LIST APPOINTMENTS API

Endpoint : GET /appointments

Request Header :

- TOKEN-SESSION : UUID

Response Body (Success) :

```json
{
  "data": [
    {
      "id": 1,
      "pet_id": 1,
      "created_by": 1,
      "schedule_date": "2025-08-15",
      "schedule_time": "08:00:00",
      "status": "scheduled",
      "reason": "Vaksinasi rabies",
      "notes": "Vaksinasi rabies tahunan",
      "created_at": "2025-08-15",
      "updated_at": "2025-08-15"
    },
    {
      "id": 2,
      "pet_id": 2,
      "created_by": 2,
      "schedule_date": "2025-08-15",
      "schedule_time": "08:00:00",
      "status": "scheduled",
      "reason": "Pemeriksaan luka setelah kecelakaan",
      "notes": "Pernah mengalami kecelakaan 2 minggu lalu",
      "created_at": "2025-08-15",
      "updated_at": "2025-08-15"
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
    "empty": "Data janji temu tidak ditemukan",
    "session": "Sesi tidak valid atau kadaluarsa"
  }
}
```

## GET APPOINTMENTS API

Endpoint : GET /appointments/:id

Request Header :

- TOKEN-SESSION : UUID

Response Body (Success) :

```json
{
  "data": {
    "id": 1,
    "pet_id": 1,
    "created_by": 1,
    "schedule_date": "2025-08-15",
    "schedule_time": "08:00:00",
    "status": "scheduled",
    "reason": "Vaksinasi rabies",
    "notes": "Vaksinasi rabies tahunan",
    "created_at": "2025-08-15",
    "updated_at": "2025-08-15"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": {
    "empty": "Data janji temu tidak ditemukan",
    "session": "Sesi tidak valid atau kadaluarsa"
  }
}
```

## UPDATE APPOINTMENTS API

Endpoint : PATCH /appointments/:id

Request Header :

- TOKEN-SESSION : UUID

Request Body :

```json
{
  "pet_id": 1,
  "created_by": 1,
  "schedule_date": "2025-08-15",
  "schedule_time": "08:00:00",
  "status": "scheduled",
  "reason": "Vaksinasi rabies",
  "notes": "Vaksinasi rabies tahunan"
}
```

Response Body (Success) :

```json
{
  "message": "Data janji temu berhasil diperbarui!",
  "data": {
    "id": 1,
    "pet_id": 1,
    "created_by": 1,
    "schedule_date": "2025-08-15",
    "schedule_time": "08:00:00",
    "status": "scheduled",
    "reason": "Vaksinasi rabies",
    "notes": "Vaksinasi rabies tahunan",
    "created_at": "2025-08-15",
    "updated_at": "2025-08-15"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": {
    "validation": {
      "pet_id.required": "Hewan peliharaan harus dipilih",
      "created_by.required": "Pembuat janji temu harus diisi",
      "schedule_date.required": "Tanggal janji temu harus diisi",
      "schedule_time.required": "Jam janji temu harus diisi",
      "status.required": "Status harus dipilih"
    },
    "session": "Sesi tidak valid atau kadaluarsa"
  }
}
```

## DELETE APPOINTMENTS API

Endpoint : DELETE /appointments/:id

Request Header :

- TOKEN-SESSION : UUID

Response Body (Success) :

```json
{
  "message": "Data janji temu berhasil dihapus!"
}
```

Response Body (Failed) :

```json
{
  "errors": {
    "empty": "Data janji temu tidak ditemukan",
    "session": "Sesi tidak valid atau kadaluarsa"
  }
}
```
