# SERVICE CATEGORIES API SPEC

## CREATE SERVICE CATEGORIES API

Endpoint : POST /service-categories

Request Header :

- TOKEN-SESSION : UUID

Request Body :

```json
{
  "name": "Konsultasi Umum",
  "description": "Pemeriksaan dasar hewan peliharaan oleh dokter hewan",
  "price": 75000.0,
  "is_active": true
}
```

Response Body (Success) :

```json
{
  "message": "Data jenis layanan berhasil dibuat!",
  "data": {
    "id": 1,
    "name": "Konsultasi Umum",
    "description": "Pemeriksaan dasar hewan peliharaan oleh dokter hewan",
    "price": 75000.0,
    "is_active": true,
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
      "name.required": "Nama jenis layanan harus diisi",
      "price.required": "Harga jenis layanan harus diisi",
      "is_active.required": "Status layanan harus diisi"
    },
    "session": "Sesi tidak valid atau kadaluarsa"
  }
}
```

## LIST SERVICE CATEGORIES API

Endpoint : GET /service-categories

Request Header :

- TOKEN-SESSION : UUID

Response Body (Success) :

```json
{
  "data": [
    {
      "id": 1,
      "name": "Konsultasi Umum",
      "description": "Pemeriksaan dasar hewan peliharaan oleh dokter hewan",
      "price": 75000.0,
      "is_active": true,
      "created_at": "2025-08-16",
      "updated_at": "2025-08-16"
    },
    {
      "id": 2,
      "name": "Vaksinasi",
      "description": "Layanan vaksinasi rutin untuk kucing, anjing, dan kelinci",
      "price": 120000.0,
      "is_active": true,
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
    "empty": "Data jenis layanan tidak ditemukan",
    "session": "Sesi tidak valid atau kadaluarsa"
  }
}
```

## GET SERVICE CATEGORIES API

Endpoint : GET /service-categories/:id

Request Header :

- TOKEN-SESSION : UUID

Response Body (Success) :

```json
{
  "data": {
    "id": 1,
    "name": "Konsultasi Umum",
    "description": "Pemeriksaan dasar hewan peliharaan oleh dokter hewan",
    "price": 75000.0,
    "is_active": true,
    "created_at": "2025-08-16",
    "updated_at": "2025-08-16"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": {
    "empty": "Data jenis layanan tidak ditemukan",
    "session": "Sesi tidak valid atau kadaluarsa"
  }
}
```

## UPDATE SERVICE CATEGORIES API

Endpoint : PATCH /service-categories/:id

Request Header :

- TOKEN-SESSION : UUID

Request Body :

```json
{
  "name": "Konsultasi Umum",
  "description": "Pemeriksaan dasar hewan peliharaan oleh dokter hewan",
  "price": 75000.0,
  "is_active": true
}
```

Response Body (Success) :

```json
{
  "message": "Data jenis layanan berhasil diperbarui!",
  "data": {
    "id": 1,
    "name": "Konsultasi Umum",
    "description": "Pemeriksaan dasar hewan peliharaan oleh dokter hewan",
    "price": 75000.0,
    "is_active": true,
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
      "name.required": "Nama jenis layanan harus diisi",
      "price.required": "Harga jenis layanan harus diisi",
      "is_active.required": "Status layanan harus diisi"
    },
    "session": "Sesi tidak valid atau kadaluarsa"
  }
}
```

## DELETE SERVICE CATEGORIES API

Endpoint : DELETE /service-categories/:id

Request Header :

- TOKEN-SESSION : UUID

Response Body (Success) :

```json
{
  "message": "Data jenis layanan berhasil dihapus!"
}
```

Response Body (Failed) :

```json
{
  "errors": {
    "empty": "Data jenis layanan tidak ditemukan",
    "session": "Sesi tidak valid atau kadaluarsa"
  }
}
```
