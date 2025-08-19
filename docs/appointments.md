# APPOINTMENTS API SPEC

## CREATE APPOINTMENTS API

Endpoint : POST /role/appointments

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
  "status": 201,
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
[
  {
    "status": 400,
    "errors": {
      "validation": {
        // hewan peliharaan
        "pet_id.required": "Hewan peliharaan harus dipilih!",
        // pembuat janji temu
        "created_by.required": "Pembuat janji temu harus diisi!",
        // tanggal janji temu
        "schedule_date.required": "Tanggal janji temu harus diisi!",
        // jam janji temu
        "schedule_time.required": "Jam janji temu harus diisi!",
        // status janji temu
        "status.required": "Status harus dipilih!"
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

## LIST APPOINTMENTS API

Endpoint : GET /role/appointments

Request Header :

- TOKEN-SESSION : UUID

Response Body (Success) :

```json
{
  "status": 200,
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
      "empty": "Data janji temu tidak ditemukan!"
    }
  }
]
```

## GET APPOINTMENTS API

Endpoint : GET /role/appointments/:id

Request Header :

- TOKEN-SESSION : UUID

Response Body (Success) :

```json
{
  "status": 200,
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
      "empty": "Data janji temu tidak ditemukan!"
    }
  }
]
```

## UPDATE APPOINTMENTS API

Endpoint : PATCH /role/appointments/:id

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
  "status": 200,
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
[
  {
    "status": 400,
    "errors": {
      "validation": {
        // hewan peliharaan
        "pet_id.required": "Hewan peliharaan harus dipilih!",
        // pembuat janji temu
        "created_by.required": "Pembuat janji temu harus diisi!",
        // tanggal janji temu
        "schedule_date.required": "Tanggal janji temu harus diisi!",
        // jam janji temu
        "schedule_time.required": "Jam janji temu harus diisi!",
        // status janji temu
        "status.required": "Status harus dipilih!"
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
      "empty": "Data janji temu tidak ditemukan!"
    }
  }
]
```

## DELETE APPOINTMENTS API

Endpoint : DELETE /role/appointments/:id

Request Header :

- TOKEN-SESSION : UUID

Response Body (Success) :

```json
{
  "status": 200,
  "message": "Data janji temu berhasil dihapus!"
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
      "empty": "Data janji temu tidak ditemukan!"
    }
  }
]
```
