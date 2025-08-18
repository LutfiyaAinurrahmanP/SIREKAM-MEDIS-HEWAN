# TRANSACTIONS API SPEC

## CREATE TRANSACTIONS API

Endpoint : POST /role/transactions

Request Header :

- TOKEN-SESSION : UUID

Request Body :

```json
{
  "created_by": 1,
  "pet_id": 1,
  "medical_record_id": 1,
  "total_amount": 280000.0,
  "paid_amount": 300000.0,
  "payment_status": "pending",
  "payment_method": "cash",
  "invoice_date": "2025-08-17",
  "notes": "Perhatikan perkembangan kesehatan hewan peliharaan"
}
```

Response Body (Success) :

```json
{
  "status": 201,
  "message": "Data transaksi berhasil dibuat!",
  "data": {
    "id": 1,
    "created_by": 1,
    "pet_id": 1,
    "medical_record_id": 1,
    "total_amount": 280000.0,
    "paid_amount": 300000.0,
    "payment_status": "pending",
    "payment_method": "cash",
    "invoice_date": "2025-08-17",
    "notes": "Perhatikan perkembangan kesehatan hewan peliharaan",
    "created_at": "2025-08-17",
    "updated_at": "2025-08-17"
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
        // pembuat
        "created_by.required": "Pembuat transaksi harus diisi!",
        // hewan peliharaan
        "pet_id.required": "Hewan peliharaan harus diisi!",
        // total biaya
        "total_amount.required": "Total biaya harus diisi!",
        "total_amount.numeric": "Total biaya harus berupa angka!",
        // biaya transaksi
        "paid_amount.required": "Biaya transaksi harus diisi!",
        "paid_amount.numeric": "Biaya transaksi harus berupa angka!",
        // status pembayaran
        "payment_status.required": "Status pembayaran harus diisi!",
        // metode pembayaran
        "payment_method.required": "Metode pembayaran harus diisi!",
        // tanggal transaksi
        "invoice_date.required": "Tanggal traksaksi harus diisi!"
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

## LIST TRANSACTIONS API

Endpoint : GET /role/transactions

Request Header :

- TOKEN-SESSION : UUID

Response Body (Success) :

```json
{
  "status": 200,
  "data": [
    {
      "id": 1,
      "created_by": 1,
      "pet_id": 1,
      "medical_record_id": 1,
      "total_amount": 280000.0,
      "paid_amount": 300000.0,
      "payment_status": "pending",
      "payment_method": "cash",
      "invoice_date": "2025-08-17",
      "notes": "Perhatikan perkembangan kesehatan hewan peliharaan",
      "created_at": "2025-08-17",
      "updated_at": "2025-08-17"
    },
    {
      "id": 2,
      "created_by": 2,
      "pet_id": 2,
      "medical_record_id": 2,
      "total_amount": 120000.0,
      "paid_amount": 150000.0,
      "payment_status": "paid",
      "payment_method": "transfer",
      "invoice_date": "2025-08-17",
      "notes": "Perhatikan perkembangan kesehatan hewan peliharaan",
      "created_at": "2025-08-17",
      "updated_at": "2025-08-17"
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
      "empty": "Data transaksi tidak ditemukan!"
    }
  }
]
```

## GET TRANSACTIONS API

Endpoint : GET /role/transactions/:id

Request Header :

- TOKEN-SESSION : UUID

Response Body (Success) :

```json
{
  "status": 200,
  "data": {
    "id": 1,
    "created_by": 1,
    "pet_id": 1,
    "medical_record_id": 1,
    "total_amount": 280000.0,
    "paid_amount": 300000.0,
    "payment_status": "pending",
    "payment_method": "cash",
    "invoice_date": "2025-08-17",
    "notes": "Perhatikan perkembangan kesehatan hewan peliharaan",
    "created_at": "2025-08-17",
    "updated_at": "2025-08-17"
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
      "empty": "Data transaksi tidak ditemukan!"
    }
  }
]
```

## UPDATE TRANSACTIONS API

Endpoint : PATCH /role/transactions/:id

Request Header :

- TOKEN-SESSION : UUID

Request Body :

```json
{
  "created_by": 1,
  "pet_id": 1,
  "medical_record_id": 1,
  "total_amount": 280000.0,
  "paid_amount": 300000.0,
  "payment_status": "pending",
  "payment_method": "cash",
  "invoice_date": "2025-08-17",
  "notes": "Perhatikan perkembangan kesehatan hewan peliharaan"
}
```

Response Body (Success) :

```json
{
  "status": 200,
  "message": "Data transaksi berhasil diperbarui!",
  "data": {
    "id": 1,
    "created_by": 1,
    "pet_id": 1,
    "medical_record_id": 1,
    "total_amount": 280000.0,
    "paid_amount": 300000.0,
    "payment_status": "pending",
    "payment_method": "cash",
    "invoice_date": "2025-08-17",
    "notes": "Perhatikan perkembangan kesehatan hewan peliharaan",
    "created_at": "2025-08-17",
    "updated_at": "2025-08-17"
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
        // pembuat
        "created_by.required": "Pembuat transaksi harus diisi!",
        // hewan peliharaan
        "pet_id.required": "Hewan peliharaan harus diisi!",
        // total biaya
        "total_amount.required": "Total biaya harus diisi!",
        "total_amount.numeric": "Total biaya harus berupa angka!",
        // biaya transaksi
        "paid_amount.required": "Biaya transaksi harus diisi!",
        "paid_amount.numeric": "Biaya transaksi harus berupa angka!",
        // status pembayaran
        "payment_status.required": "Status pembayaran harus diisi!",
        // metode pembayaran
        "payment_method.required": "Metode pembayaran harus diisi!",
        // tanggal transaksi
        "invoice_date.required": "Tanggal traksaksi harus diisi!"
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
      "empty": "Data transaksi tidak ditemukan!"
    }
  }
]
```

## DELETE TRANSACTIONS API

Endpoint : DELETE /role/transactions/:id

Request Header :

- TOKEN-SESSION : UUID

Response Body (Success) :

```json
{
  "status": 200,
  "message": "Data transaksi berhasil dihapus!"
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
      "empty": "Data transaksi tidak ditemukan!"
    }
  }
]
```
