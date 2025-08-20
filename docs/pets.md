# PETS API SPEC

## CREATE PETS API

Endpoint : POST /role/pets

Request Header :

- TOKEN-SESSION : UUID

Request Body :

```json
{
  "owner_id": 1,
  "name": "Luna",
  "animal_type_id": 2,
  "breed": "Persian",
  "gender": "Betina",
  "birth_date": "2022-05-14",
  "weight": 3.4,
  "color": "Putih",
  "notes": "Kucing sangat aktif, suka bermain bola mainan"
}
```

Response Body (Success) :

```json
{
  "status": 201,
  "message": "Data hewan peliharaan berhasil dibuat!",
  "data": {
    "id": 1,
    "owner_id": 1,
    "name": "Luna",
    "animal_type_id": 2,
    "breed": "Persian",
    "gender": "Betina",
    "birth_date": "2022-05-14",
    "weight": 3.4,
    "color": "Putih",
    "notes": "Kucing sangat aktif, suka bermain bola mainan",
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
        // pemilik hewan peliharaan
        "owner_id.required": "Pemilik hewan peliharaan harus diisi!",
        // nama hewan peliharaan
        "name.required": "Nama hewan peliharaan harus diisi!",
        "name.min": "Nama hewan peliharaan memiliki minimal 5 karakter!",
        "name.max": "Nama hewan peliharaan tidak boleh melebihi 64 karakter!",
        // jenis hewan
        "animal_type_id.required": "Jenis hewan peliharaan harus diisi!",
        // jenis kelamin hewan
        "gender.required": "Jenis kelamin hewan peliharaan harus dipilih!",
        // berat hewan
        "weight.required": "Berat hewan peliharaan harus diisi!",
        "weight.numeric": "Berat hewan peliharaan harus berupa angka!"
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

## LIST PETS API

Endpoint : GET /role/pets

Request Header :

- TOKEN-SESSION : UUID

Response Body (Success) :

```json
{
  "status": 200,
  "data": [
    {
      "id": 1,
      "owner_id": 1,
      "name": "Luna",
      "animal_type_id": 2,
      "breed": "Persian",
      "gender": "Betina",
      "birth_date": "2022-05-14",
      "weight": 3.4,
      "color": "Putih",
      "notes": "Kucing sangat aktif, suka bermain bola mainan",
      "created_at": "2025-08-15",
      "updated_at": "2025-08-15"
    },
    {
      "id": 2,
      "owner_id": 3,
      "name": "Max",
      "animal_type_id": 1,
      "breed": "Golden Retriever",
      "gender": "Jantan",
      "birth_date": "2021-09-08",
      "weight": 28.5,
      "color": "Emas",
      "notes": "Anjing ramah, rutin vaksinasi lengkap",
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
      "empty": "Data hewan peliharaan tidak ditemukan!"
    }
  }
]
```

## GET PETS API

Endpoint : GET /role/pets/:id

Request Header :

- TOKEN-SESSION : UUID

Response Body (Success) :

```json
{
  "status": 200,
  "data": {
    "id": 1,
    "owner_id": 1,
    "name": "Luna",
    "animal_type_id": 2,
    "breed": "Persian",
    "gender": "Betina",
    "birth_date": "2022-05-14",
    "weight": 3.4,
    "color": "Putih",
    "notes": "Kucing sangat aktif, suka bermain bola mainan",
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
      "empty": "Data hewan peliharaan tidak ditemukan!"
    }
  }
]
```

## UPDATE PETS API

Endpoint : PATCH /role/pets/:id

Request Header :

- TOKEN-SESSION : UUID

Request Body :

```json
{
  "owner_id": 1,
  "name": "Luna",
  "animal_type_id": 2,
  "breed": "Persian",
  "gender": "Betina",
  "birth_date": "2022-05-14",
  "weight": 3.4,
  "color": "Putih",
  "notes": "Kucing sangat aktif, suka bermain bola mainan"
}
```

Response Body (Success) :

```json
{
  "status": 200,
  "message": "Data hewan peliharaan berhasil diperbarui!",
  "data": {
    "id": 1,
    "owner_id": 1,
    "name": "Luna",
    "animal_type_id": 2,
    "breed": "Persian",
    "gender": "Betina",
    "birth_date": "2022-05-14",
    "weight": 3.4,
    "color": "Putih",
    "notes": "Kucing sangat aktif, suka bermain bola mainan",
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
        // pemilik hewan peliharaan
        "owner_id.required": "Pemilik hewan peliharaan harus diisi!",
        // nama hewan peliharaan
        "name.required": "Nama hewan peliharaan harus diisi!",
        "name.min": "Nama hewan peliharaan memiliki minimal 5 karakter!",
        "name.max": "Nama hewan peliharaan tidak boleh melebihi 64 karakter!",
        // jenis hewan
        "animal_type_id.required": "Jenis hewan peliharaan harus diisi!",
        // jenis kelamin hewan
        "gender.required": "Jenis kelamin hewan peliharaan harus dipilih!",
        // berat hewan
        "weight.required": "Berat hewan peliharaan harus diisi!",
        "weight.numeric": "Berat hewan peliharaan harus berupa angka!"
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
      "empty": "Data hewan peliharaan tidak ditemukan!"
    }
  }
]
```

## DELETE PETS API

Endpoint : DELETE /role/pets/:id

Request Header :

- TOKEN-SESSION : UUID

Response Body (Success) :

```json
{
  "status": 200,
  "message": "Data hewan peliharaan berhasil dihapus!"
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
      "empty": "Data hewan peliharaan tidak ditemukan!"
    }
  }
]
```
