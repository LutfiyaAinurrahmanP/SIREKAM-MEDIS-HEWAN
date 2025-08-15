# MEDICAL RECORDS API SPEC

## CREATE MEDICAL RECORDS API

Endpoint : POST /medical-records

Request Header :

- TOKEN-SESSION : UUID

Request Body :

```json
{
  "pet_id": 1,
  "service_id": 1,
  "appointment_id": 1,
  "veterinarian_id": 1,
  "visit_date": "2025-08-15",
  "subject": "Pemilik melaporkan bahwa kucing tampak sehat, nafsu makan baik, dan tidak ada gejala sakit. Datang untuk vaksinasi rabies tahunan",
  "objective": "Suhu tubuh 38.2°C, detak jantung 120 bpm, napas normal, bulu bersih dan rapi, mata dan telinga dalam kondisi normal",
  "assessment": "Kondisi umum baik, tidak ditemukan kelainan. Layak untuk vaksinasi rabies",
  "plan": "Memberikan vaksin rabies 1 dosis, memberikan kartu vaksin baru, menyarankan pemeriksaan kesehatan rutin setiap 6 bulan",
  "weight": 12.4,
  "temperature_celsius": 38.2,
  "next_visit_date": "2025-08-22",
  "status": "final"
}
```

Response Body (Success) :

```json
{
  "message": "Data rekam medis berhasil dibuat!",
  "data": {
    "id": 1,
    "pet_id": 1,
    "service_id": 1,
    "appointment_id": 1,
    "veterinarian_id": 1,
    "visit_date": "2025-08-15",
    "subject": "Pemilik melaporkan bahwa kucing tampak sehat, nafsu makan baik, dan tidak ada gejala sakit. Datang untuk vaksinasi rabies tahunan",
    "objective": "Suhu tubuh 38.2°C, detak jantung 120 bpm, napas normal, bulu bersih dan rapi, mata dan telinga dalam kondisi normal",
    "assessment": "Kondisi umum baik, tidak ditemukan kelainan. Layak untuk vaksinasi rabies",
    "plan": "Memberikan vaksin rabies 1 dosis, memberikan kartu vaksin baru, menyarankan pemeriksaan kesehatan rutin setiap 6 bulan",
    "weight": 12.4,
    "temperature_celsius": 38.2,
    "next_visit_date": "2025-08-22",
    "status": "final",
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
      "pet_id.required": "Hewan peliharaan harus dipilih",
      "service_id.required": "Kategori layanan harus dipilih",
      "veterinarian_id.required": "Dokter hewan harus dipilih",
      "visit_date.required": "Tanggal kunjungan harus diisi",
      "weight.numeric": "Berat badan harus berupa angka",
      "temperature_celsius.numeric": "Suhu tubuh harus berupa angka",
      "status.required": "Status harus dipilih"
    },
    "session": "Sesi tidak valid atau kadaluarsa"
  }
}
```

## LIST MEDICAL RECORDS API

Endpoint : GET /medical-records

Request Header :

- TOKEN-SESSION : UUID

Response Body (Success) :

```json
{
  "data": [
    {
      "id": 1,
      "pet_id": 1,
      "service_id": 1,
      "appointment_id": 1,
      "veterinarian_id": 1,
      "visit_date": "2025-08-15",
      "subject": "Pemilik melaporkan bahwa kucing tampak sehat, nafsu makan baik, dan tidak ada gejala sakit. Datang untuk vaksinasi rabies tahunan",
      "objective": "Suhu tubuh 38.2°C, detak jantung 120 bpm, napas normal, bulu bersih dan rapi, mata dan telinga dalam kondisi normal",
      "assessment": "Kondisi umum baik, tidak ditemukan kelainan. Layak untuk vaksinasi rabies",
      "plan": "Memberikan vaksin rabies 1 dosis, memberikan kartu vaksin baru, menyarankan pemeriksaan kesehatan rutin setiap 6 bulan",
      "weight": 12.4,
      "temperature_celsius": 38.2,
      "next_visit_date": "2025-08-22",
      "status": "final",
      "created_at": "2025-08-15",
      "updated_at": "2025-08-15"
    },
    {
      "id": 2,
      "pet_id": 2,
      "service_id": 2,
      "appointment_id": 2,
      "veterinarian_id": 2,
      "visit_date": "2025-08-15",
      "subject": "Anjing mengalami pincang pada kaki belakang kiri sejak 3 hari lalu setelah bermain di taman. Pemilik melaporkan anjing menjadi kurang aktif",
      "objective": "Terdapat luka terbuka ±3 cm di kaki belakang kiri, sedikit bengkak, suhu lokal meningkat. Tidak ada patah tulang terdeteksi secara palpasi",
      "assessment": "Luka terbuka ringan dengan inflamasi, kemungkinan akibat goresan benda tajam",
      "plan": "Membersihkan luka dengan antiseptik, memberikan antibiotik topikal, meresepkan obat antiinflamasi selama 5 hari, kontrol ulang 1 minggu",
      "weight": 16.1,
      "temperature_celsius": 36.9,
      "next_visit_date": "2025-08-22",
      "status": "draft",
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
    "empty": "Data rekam medis tidak ditemukan",
    "session": "Sesi tidak valid atau kadaluarsa"
  }
}
```

## GET MEDICAL RECORDS API

Endpoint : GET /medical-records/:id

Request Header :

- TOKEN-SESSION : UUID

Response Body (Success) :

```json
{
  "data": {
    "id": 1,
    "pet_id": 1,
    "service_id": 1,
    "appointment_id": 1,
    "veterinarian_id": 1,
    "visit_date": "2025-08-15",
    "subject": "Pemilik melaporkan bahwa kucing tampak sehat, nafsu makan baik, dan tidak ada gejala sakit. Datang untuk vaksinasi rabies tahunan",
    "objective": "Suhu tubuh 38.2°C, detak jantung 120 bpm, napas normal, bulu bersih dan rapi, mata dan telinga dalam kondisi normal",
    "assessment": "Kondisi umum baik, tidak ditemukan kelainan. Layak untuk vaksinasi rabies",
    "plan": "Memberikan vaksin rabies 1 dosis, memberikan kartu vaksin baru, menyarankan pemeriksaan kesehatan rutin setiap 6 bulan",
    "weight": 12.4,
    "temperature_celsius": 38.2,
    "next_visit_date": "2025-08-22",
    "status": "final",
    "created_at": "2025-08-15",
    "updated_at": "2025-08-15"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": {
    "empty": "Data rekam medis tidak ditemukan",
    "session": "Sesi tidak valid atau kadaluarsa"
  }
}
```

## UPDATE MEDICAL RECORDS API

Endpoint : PATCH /medical-records/:id

Request Header :

- TOKEN-SESSION : UUID

Request Body :

```json
{
  "pet_id": 1,
  "service_id": 1,
  "appointment_id": 1,
  "veterinarian_id": 1,
  "visit_date": "2025-08-15",
  "subject": "Pemilik melaporkan bahwa kucing tampak sehat, nafsu makan baik, dan tidak ada gejala sakit. Datang untuk vaksinasi rabies tahunan",
  "objective": "Suhu tubuh 38.2°C, detak jantung 120 bpm, napas normal, bulu bersih dan rapi, mata dan telinga dalam kondisi normal",
  "assessment": "Kondisi umum baik, tidak ditemukan kelainan. Layak untuk vaksinasi rabies",
  "plan": "Memberikan vaksin rabies 1 dosis, memberikan kartu vaksin baru, menyarankan pemeriksaan kesehatan rutin setiap 6 bulan",
  "weight": 12.4,
  "temperature_celsius": 38.2,
  "next_visit_date": "2025-08-22",
  "status": "final"
}
```

Response Body (Success) :

```json
{
  "message": "Data rekam medis berhasil diperbarui!",
  "data": {
    "id": 1,
    "pet_id": 1,
    "service_id": 1,
    "appointment_id": 1,
    "veterinarian_id": 1,
    "visit_date": "2025-08-15",
    "subject": "Pemilik melaporkan bahwa kucing tampak sehat, nafsu makan baik, dan tidak ada gejala sakit. Datang untuk vaksinasi rabies tahunan",
    "objective": "Suhu tubuh 38.2°C, detak jantung 120 bpm, napas normal, bulu bersih dan rapi, mata dan telinga dalam kondisi normal",
    "assessment": "Kondisi umum baik, tidak ditemukan kelainan. Layak untuk vaksinasi rabies",
    "plan": "Memberikan vaksin rabies 1 dosis, memberikan kartu vaksin baru, menyarankan pemeriksaan kesehatan rutin setiap 6 bulan",
    "weight": 12.4,
    "temperature_celsius": 38.2,
    "next_visit_date": "2025-08-22",
    "status": "final",
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
      "pet_id.required": "Hewan peliharaan harus dipilih",
      "service_id.required": "Kategori layanan harus dipilih",
      "veterinarian_id.required": "Dokter hewan harus dipilih",
      "visit_date.required": "Tanggal kunjungan harus diisi",
      "weight.numeric": "Berat badan harus berupa angka",
      "temperature_celsius.numeric": "Suhu tubuh harus berupa angka",
      "status.required": "Status harus dipilih"
    },
    "session": "Sesi tidak valid atau kadaluarsa"
  }
}
```

## DELETE MEDICAL RECORDS API

Endpoint : DELETE /medical-records/:id

Request Header :

- TOKEN-SESSION : UUID

Response Body (Success) :

```json
{
  "message": "Data rekam medis berhasil dihapus!"
}
```

Response Body (Failed) :

```json
{
  "errors": {
    "empty": "Data rekam medis tidak ditemukan",
    "session": "Sesi tidak valid atau kadaluarsa"
  }
}
```
