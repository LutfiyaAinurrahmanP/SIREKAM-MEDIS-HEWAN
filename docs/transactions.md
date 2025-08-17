# TRANSACTIONS API SPEC

## CREATE TRANSACTIONS API

Endpoint : POST /transactions

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
{
  "errors": {
    "validation": {
      "created_by.required": "Pembuat transaksi harus diisi",
      "pet_id.required": "Hewan peliharaan harus diisi",
      "total_amount.required": "Total biaya harus diisi",
      "total_amount.numeric": "Total biaya harus berupa angka",
      "paid_amount.required": "Biaya transaksi harus diisi",
      "paid_amount.numeric": "Biaya transaksi harus berupa angka",
      "payment_status.required": "Status pembayaran harus diisi",
      "payment_method.required": "Metode pembayaran harus diisi",
      "invoice_date.required": "Tanggal traksaksi harus diisi"
    },
    "session": "Sesi tidak valid atau kadaluarsa"
  }
}
```

## LIST TRANSACTIONS API

Endpoint : GET /transactions

Request Header :

- TOKEN-SESSION : UUID

Response Body (Success) :

```json
{
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
{
  "errors": {
    "empty": "Data transaksi tidak ditemukan",
    "session": "Sesi tidak valid atau kadaluarsa"
  }
}
```

## GET TRANSACTIONS API

Endpoint : GET /transactions/:id

Request Header :

- TOKEN-SESSION : UUID

Response Body (Success) :

```json
{
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
{
  "errors": {
    "empty": "Data transaksi tidak ditemukan",
    "session": "Sesi tidak valid atau kadaluarsa"
  }
}
```

## UPDATE TRANSACTIONS API

Endpoint : PATCH /transactions/:id

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
{
  "errors": {
    "validation": {
      "created_by.required": "Pembuat transaksi harus diisi",
      "pet_id.required": "Hewan peliharaan harus diisi",
      "total_amount.required": "Total biaya harus diisi",
      "total_amount.numeric": "Total biaya harus berupa angka",
      "paid_amount.required": "Biaya transaksi harus diisi",
      "paid_amount.numeric": "Biaya transaksi harus berupa angka",
      "payment_status.required": "Status pembayaran harus diisi",
      "payment_method.required": "Metode pembayaran harus diisi",
      "invoice_date.required": "Tanggal traksaksi harus diisi"
    },
    "session": "Sesi tidak valid atau kadaluarsa"
  }
}
```

## DELETE TRANSACTIONS API

Endpoint : DELETE /transactions/:id

Request Header :

- TOKEN-SESSION : UUID

Response Body (Success) :

```json
{
  "message": "Data transaksi berhasil dihapus!"
}
```

Response Body (Failed) :

```json
{
  "errors": {
    "empty": "Data transaksi tidak ditemukan",
    "session": "Sesi tidak valid atau kadaluarsa"
  }
}
```
