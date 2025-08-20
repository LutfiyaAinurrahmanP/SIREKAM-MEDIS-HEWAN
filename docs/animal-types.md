# ANIMAL TYPES API SPEC

## CREATE ANIMAL TYPES API

Endpoint : POST /role/animal-types

Request Header :

- TOKEN-SESSION : UUID

Request Body :

```json
{
  "name": "Kucing",
  "description": "Mamalia kecil dengan bulu halus"
}
```

Response Body (Success) :

```json
{
  "status": 201,
  "message": "Data jenis hewan berhasil dibuat!",
  "data": {
    "id": 1,
    "name": "Kucing",
    "description": "Mamalia kecil dengan bulu halus",
    "created_at": "2025-08-14",
    "updated_at": "2025-08-14"
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
        // jenis hewan
        "name.unique": "Nama jenis hewan sudah dipakai!",
        "name.required": "Data jenis hewan harus diisi!"
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

## LIST ANIMAL TYPES API

Endpoint : GET /role/animal-types

Request Header :

- TOKEN-SESSION : UUID

Response Body (Success) :

```json
{
  "status": 200,
  "data": [
    {
      "id": 1,
      "name": "Kucing",
      "description": "Mamalia kecil dengan bulu halus",
      "created_at": "2025-08-14",
      "updated_at": "2025-08-14"
    },
    {
      "id": 2,
      "name": "Hamster",
      "description": "Hewan pengerat kecil yang aktif di malam hari",
      "created_at": "2025-08-14",
      "updated_at": "2025-08-14"
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
      "empty": "Data jenis hewan tidak ditemukan!"
    }
  }
]
```

## GET ANIMAL TYPES API

Endpoint : GET /role/animal-types/:id

Request Header :

- TOKEN-SESSION : UUID

Response Body (Success) :

```json
{
  "status": 200,
  "data": {
    "id": 1,
    "name": "Kucing",
    "description": "Mamalia kecil dengan bulu halus",
    "created_at": "2025-08-14",
    "updated_at": "2025-08-14"
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
      "empty": "Data jenis hewan tidak ditemukan!"
    }
  }
]
```

## UPDATE ANIMAL TYPES API

Endpoint : PATCH /role/animal-types/:id

Request Header :

- TOKEN-SESSION : UUID

Request Body :

```json
{
  "name": "Kucing",
  "description": "Mamalia kecil dengan bulu halus"
}
```

Response Body (Success) :

```json
{
  "status": 200,
  "message": "Data jenis hewan berhasil diperbarui!",
  "data": {
    "id": 1,
    "name": "Kucing",
    "description": "Mamalia kecil dengan bulu halus",
    "created_at": "2025-08-14",
    "updated_at": "2025-08-14"
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
        // jenis hewan
        "name.unique": "Nama jenis hewan sudah dipakai!",
        "name.required": "Data jenis hewan harus diisi!"
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

## DELETE ANIMAL TYPES API

Endpoint : DELETE /role/animal-types/:id

Request Header :

- TOKEN-SESSION : UUID

Response Body (Success) :

```json
{
  "status": 200,
  "message": "Data jenis hewan berhasil dihapus!"
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
      "empty": "Data jenis hewan tidak ditemukan!"
    }
  }
]
```
