# PETS API SPEC

## CREATE PETS API

Endpoint : POST /pets

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
{
  "errors": {
    "validation": {
      "owner_id.required": "Pemilik hewan peliharaan harus diisi",
      "name.required": "Nama hewan peliharaan harus diisi",
      "animal_type_id.required": "Jenis hewan peliharaan harus diisi",
      "gender.required": "Jenis kelamin hewan peliharaan harus dipilih",
      "weight.required": "Berat hewan peliharaan harus diisi",
      "weight.numeric": "Berat hewan peliharaan harus berupa angka"
    },
    "session": "Sesi tidak valid atau kadaluarsa"
  }
}
```

## LIST PETS API

Endpoint : GET /pets

Request Header :

- TOKEN-SESSION : UUID

Response Body (Success) :

```json
{
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
{
  "errors": {
    "empty": "Data hewan peliharaan tidak ditemukan",
    "session": "Sesi tidak valid atau kadaluarsa"
  }
}
```

## GET PETS API

Endpoint : GET /pets/:id

Request Header :

- TOKEN-SESSION : UUID

Response Body (Success) :

```json
{
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
{
  "errors": {
    "empty": "Data hewan peliharaan tidak ditemukan",
    "session": "Sesi tidak valid atau kadaluarsa"
  }
}
```

## UPDATE PETS API

Endpoint : PATCH /pets/:id

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
{
  "errors": {
    "validation": {
      "owner_id.required": "Pemilik hewan peliharaan harus diisi",
      "name.required": "Nama hewan peliharaan harus diisi",
      "animal_type_id.required": "Jenis hewan peliharaan harus diisi",
      "gender.required": "Jenis kelamin hewan peliharaan harus dipilih",
      "weight.required": "Berat hewan peliharaan harus diisi",
      "weight.numeric": "Berat hewan peliharaan harus berupa angka"
    },
    "session": "Sesi tidak valid atau kadaluarsa"
  }
}
```

## DELETE PETS API

Endpoint : DELETE /pets/:id

Request Header :

- TOKEN-SESSION : UUID

Response Body (Success) :

```json
{
  "message": "Data hewan peliharaan berhasil dihapus!"
}
```

Response Body (Failed) :

```json
{
  "errors": {
    "empty": "Data hewan peliharaan tidak ditemukan",
    "session": "Sesi tidak valid atau kadaluarsa"
  }
}
```
