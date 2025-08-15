# MEDICINES API SPEC

## CREATE MEDICINES API

Endpoint : POST /medicines

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
{
  "errors": {
    "validation": {
      "name.required": "Nama obat harus diisi",
      "code.required": "Kode obat harus diisi",
      "code.unique": "Kode obat sudah dipakai",
      "type.required": "Tipe obat harus diisi",
      "unit.required": "Unit obat harus diisi",
      "stock_qty.required": "Stok obat harus diisi",
      "stock_qty.numeric": "Stok harus berupa angka",
      "stock_qty.min": "Stok tidak boleh kurang dari 0",
      "price.required": "Harga obat harus diisi",
      "price.numeric": "Harga harus berupa angka",
      "price.min": "Harga tidak boleh kurang dari 0",
      "is_active.required": "Status keaktifan harus diisi",
      "is_active.boolean": "Status keaktifan harus berupa aktif atau tidak aktif"
    },
    "session": "Sesi tidak valid atau kadaluarsa"
  }
}
```

## LIST MEDICINES API

Endpoint : GET /medicines

Request Header :

- TOKEN-SESSION : UUID

Response Body (Success) :

```json
{
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
{
  "errors": {
    "empty": "Data obat tidak ditemukan",
    "session": "Sesi tidak valid atau kadaluarsa"
  }
}
```

## GET MEDICINES API

Endpoint : GET /medicines/:id

Request Header :

- TOKEN-SESSION : UUID

Response Body (Success) :

```json
{
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
{
  "errors": {
    "empty": "Data obat tidak ditemukan",
    "session": "Sesi tidak valid atau kadaluarsa"
  }
}
```

## UPDATE MEDICINES API

Endpoint : PATCH /medicines/:id

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
{
  "errors": {
    "validation": {
      "name.required": "Nama obat harus diisi",
      "code.required": "Kode obat harus diisi",
      "code.unique": "Kode obat sudah dipakai",
      "type.required": "Tipe obat harus diisi",
      "unit.required": "Unit obat harus diisi",
      "stock_qty.required": "Stok obat harus diisi",
      "stock_qty.numeric": "Stok harus berupa angka",
      "stock_qty.min": "Stok tidak boleh kurang dari 0",
      "price.required": "Harga obat harus diisi",
      "price.numeric": "Harga harus berupa angka",
      "price.min": "Harga tidak boleh kurang dari 0",
      "is_active.required": "Status keaktifan harus diisi",
      "is_active.boolean": "Status keaktifan harus berupa aktif atau tidak aktif"
    },
    "session": "Sesi tidak valid atau kadaluarsa"
  }
}
```

## DELETE MEDICINES API

Endpoint : DELETE /medicines/:id

Request Header :

- TOKEN-SESSION : UUID

Response Body (Success) :

```json
{
  "message": "Data obat berhasil dihapus!"
}
```

Response Body (Failed) :

```json
{
  "errors": {
    "empty": "Data obat tidak ditemukan",
    "session": "Sesi tidak valid atau kadaluarsa"
  }
}
```
