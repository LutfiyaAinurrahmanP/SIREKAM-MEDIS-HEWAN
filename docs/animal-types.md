# ANIMAL TYPES API SPEC

## CREATE ANIMAL TYPES API

Endpoint : POST /animal-types

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
{
  "errors": {
    "validation": {
      "name.unique": "Nama jenis hewan sudah dipakai",
      "name.required": "Data jenis hewan harus diisi"
    },
    "session": "Sesi tidak valid atau kadaluarsa"
  }
}
```

## LIST ANIMAL TYPES API

Endpoint : GET /animal-types

Request Header :

- TOKEN-SESSION : UUID

Response Body (Success) :

```json
{
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
    "limit": 10
  }
}
```

Response Body (Failed) :

```json
{
  "errors": {
    "empty": "Data jenis hewan tidak ditemukan",
    "session": "Sesi tidak valid atau kadaluarsa"
  }
}
```

## GET ANIMAL TYPES API

Endpoint : GET /animal-types/:id

Request Header :

- TOKEN-SESSION : UUID

Response Body (Success) :

```json
{
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
{
  "errors": {
    "empty": "Data jenis hewan tidak ditemukan",
    "session": "Sesi tidak valid atau kadaluarsa"
  }
}
```

## UPDATE ANIMAL TYPES API

Endpoint : PATCH /animal-types/:id

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
{
  "errors": {
    "validation": {
      "name.unique": "Nama jenis hewan sudah dipakai",
      "name.required": "Data jenis hewan harus diisi"
    },
    "session": "Sesi tidak valid atau kadaluarsa"
  }
}
```

## DELETE ANIMAL TYPES API

Endpoint : DELETE /animal-types/:id

Request Header :

- TOKEN-SESSION : UUID

Response Body (Success) :

```json
{
  "message": "Data jenis hewan berhasil dihapus!"
}
```

Response Body (Failed) :

```json
{
  "errors": {
    "empty": "Data jenis hewan tidak ditemukan",
    "session": "Sesi tidak valid atau kadaluarsa"
  }
}
```
