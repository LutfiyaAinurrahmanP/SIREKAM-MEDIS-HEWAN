# MEDICINES API SPEC

## CREATE MEDICINES API

Endpoint : POST /role/medicines

Request Header :

- TOKEN-SESSION : UUID

Request Body :

```json
{
  "name": "Amoxicillin 500mg",
  "code": "OBT-AX500",
  "type": "Antibiotik",
  "unit": "Kapsul",
  "stock_qty": 120,
  "price": 7500,
  "is_active": true
}
```

Response Body (Success) :

```json
{
  "status": 200,
  "message": "Data obat berhasil dibuat!",
  "data": {
    "id": 1,
    "name": "Amoxicillin 500mg",
    "code": "OBT-AX500",
    "type": "Antibiotik",
    "unit": "Kapsul",
    "stock_qty": 120,
    "price": 7500,
    "is_active": true,
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
        // nama
        "name.required": "Nama obat harus diisi!",
        "name.min": "Nama obat memiliki minimal 5 karakter!",
        "name.max": "Nama obat tidak boleh melebihi 64 karakter!",
        // kode obat
        "code.required": "Kode obat harus diisi!",
        "code.unique": "Kode obat sudah dipakai!",
        "code.min": "Kode obat memiliki minimal 5 karakter!",
        "code.max": "Kode obat tidak boleh melebihi 64 karakter!",
        // tipe obat
        "type.required": "Tipe obat harus diisi!",
        // Unit obat
        "unit.required": "Unit obat harus diisi!",
        // stok obat
        "stock_qty.required": "Stok obat harus diisi!",
        "stock_qty.numeric": "Stok harus berupa angka!",
        "stock_qty.min": "Stok tidak boleh kurang dari 0!",
        // harga obat
        "price.required": "Harga obat harus diisi!",
        "price.numeric": "Harga harus berupa angka!",
        "price.min": "Harga tidak boleh kurang dari 0!",
        // status keaktifan obat
        "is_active.required": "Status keaktifan harus diisi!",
        "is_active.boolean": "Status keaktifan harus berupa aktif atau tidak aktif!"
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

## LIST MEDICINES API

Endpoint : GET /role/medicines

Request Header :

- TOKEN-SESSION : UUID

Response Body (Success) :

```json
{
  "status": 200,
  "data": [
    {
      "id": 1,
      "name": "Amoxicillin 500mg",
      "code": "OBT-AX500",
      "type": "Antibiotik",
      "unit": "Kapsul",
      "stock_qty": 120,
      "price": 7500,
      "is_active": true,
      "created_at": "2025-08-15",
      "updated_at": "2025-08-15"
    },
    {
      "id": 2,
      "name": "Paracetamol 500mg",
      "code": "OBT-PC500",
      "type": "Analgesik",
      "unit": "Tablet",
      "stock_qty": 200,
      "price": 1500,
      "is_active": true,
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
      "empty": "Data obat tidak ditemukan!"
    }
  }
]
```

## GET MEDICINES API

Endpoint : GET /role/medicines/:id

Request Header :

- TOKEN-SESSION : UUID

Response Body (Success) :

```json
{
  "status": 200,
  "data": {
    "id": 1,
    "name": "Amoxicillin 500mg",
    "code": "OBT-AX500",
    "type": "Antibiotik",
    "unit": "Kapsul",
    "stock_qty": 120,
    "price": 7500,
    "is_active": true,
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
      "empty": "Data obat tidak ditemukan!"
    }
  }
]
```

## UPDATE MEDICINES API

Endpoint : PATCH /role/medicines/:id

Request Header :

- TOKEN-SESSION : UUID

Request Body :

```json
{
  "name": "Amoxicillin 500mg",
  "code": "OBT-AX500",
  "type": "Antibiotik",
  "unit": "Kapsul",
  "stock_qty": 120,
  "price": 7500,
  "is_active": true
}
```

Response Body (Success) :

```json
{
  "status": 200,
  "message": "Data obat berhasil diperbarui!",
  "data": {
    "id": 1,
    "name": "Amoxicillin 500mg",
    "code": "OBT-AX500",
    "type": "Antibiotik",
    "unit": "Kapsul",
    "stock_qty": 120,
    "price": 7500,
    "is_active": true,
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
        // nama
        "name.required": "Nama obat harus diisi!",
        "name.min": "Nama obat memiliki minimal 5 karakter!",
        "name.max": "Nama obat tidak boleh melebihi 64 karakter!",
        // kode obat
        "code.required": "Kode obat harus diisi!",
        "code.unique": "Kode obat sudah dipakai!",
        "code.min": "Kode obat memiliki minimal 5 karakter!",
        "code.max": "Kode obat tidak boleh melebihi 64 karakter!",
        // tipe obat
        "type.required": "Tipe obat harus diisi!",
        // Unit obat
        "unit.required": "Unit obat harus diisi!",
        // stok obat
        "stock_qty.required": "Stok obat harus diisi!",
        "stock_qty.numeric": "Stok harus berupa angka!",
        "stock_qty.min": "Stok tidak boleh kurang dari 0!",
        // harga obat
        "price.required": "Harga obat harus diisi!",
        "price.numeric": "Harga harus berupa angka!",
        "price.min": "Harga tidak boleh kurang dari 0!",
        // status keaktifan obat
        "is_active.required": "Status keaktifan harus diisi!",
        "is_active.boolean": "Status keaktifan harus berupa aktif atau tidak aktif!"
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
      "empty": "Data obat tidak ditemukan!"
    }
  }
]
```

## DELETE MEDICINES API

Endpoint : DELETE /role/medicines/:id

Request Header :

- TOKEN-SESSION : UUID

Response Body (Success) :

```json
{
  "status": 200,
  "message": "Data obat berhasil dihapus!"
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
      "empty": "Data obat tidak ditemukan!"
    }
  }
]
```
