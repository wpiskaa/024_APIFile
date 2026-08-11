# 024_APIFile - Dokumentasi API Komik, Genre & Penulis

REST API untuk manajemen data Komik, Genre, dan Penulis dengan autentikasi JWT, file upload cover komik via Multer, dan ORM Sequelize (PostgreSQL / SQLite).

---

## 🛠️ Setup & Cara Menjalankan Project

1. Install dependencies:
   ```bash
   npm install
   ```
2. Jalankan server:
   ```bash
   npm start
   ```
   Server akan berjalan di `http://localhost:3000`.

---

## 🚀 Langkah-Langkah Pengujian Postman

### 1. Register Penulis
**Endpoint**: `POST http://localhost:3000/api/register`  
**Headers**: `Content-Type: application/json`  
**Request Body** (`raw` - `JSON`):
```json
{
  "email": "ac6@gmail.com",
  "password": "12345"
}
```
**Response (201 Created)**:
```json
{
  "message": "Registrasi berhasil.",
  "data": {
    "id": 1,
    "email": "ac6@gmail.com"
  }
}
```
![POST REGISTER](screenshot/POST%20REGISTER.png)

---

### 2. Login Penulis
**Endpoint**: `POST http://localhost:3000/api/login`  
**Headers**: `Content-Type: application/json`  
**Request Body** (`raw` - `JSON`):
```json
{
  "email": "ac6@gmail.com",
  "password": "12345"
}
```
**Response (200 OK)**:
```json
{
  "message": "Login berhasil.",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```
*Copy isi token, paste di bagian Authorization pada Postman dan pastikan memilih **Bearer Token**.*
![LOGIN PENULIS](screenshot/LOGIN%20PENULIS.png)

---

### 3. Post Komik
**Endpoint**: `POST http://localhost:3000/api/komik`  
**Authorization**: `Bearer Token`  
**Headers**: `Content-Type: application/json` (atau multipart `form-data` untuk upload gambar)  
**Request Body** (`raw` - `JSON`):
```json
{
  "judul": "Naruto",
  "sinopsis": "Cerita seorang ninja yang bercita-cita menjadi Hokage.",
  "tahun_terbit": 1999,
  "penulis_id": 1,
  "genre_ids": [1, 2]
}
```
![POST KOMIK](screenshot/POST%20KOMIK.png)

---

### 4. Get Komik
**Endpoint**: `GET http://localhost:3000/api/komik`  
**Authorization**: `Bearer Token`  
![GET KOMIK](screenshot/GET%20KOMIK.png)

---

### 5. Put Komik
**Endpoint**: `PUT http://localhost:3000/api/komik/1`  
**Authorization**: `Bearer Token`  
**Headers**: `Content-Type: application/json`  
**Request Body** (`raw` - `JSON`):
```json
{
  "judul": "Naruto Shippuden",
  "sinopsis": "Lanjutan petualangan ninja Naruto.",
  "tahun_terbit": 2007,
  "penulis_id": 1,
  "genre_ids": [1]
}
```
![PUT KOMIK](screenshot/PUT%20KOMIK.png)

---

### 6. Delete Komik
**Endpoint**: `DELETE http://localhost:3000/api/komik/1`  
**Authorization**: `Bearer Token`  
![DELETE KOMIK](screenshot/DELETE%20KOMIK.png)

---

### 7. Post Genre
**Endpoint**: `POST http://localhost:3000/api/genre`  
**Authorization**: `Bearer Token`  
**Headers**: `Content-Type: application/json`  
**Request Body** (`raw` - `JSON`):
```json
{
  "nama": "Aksi",
  "deskripsi": "Genre pertarungan dan aksi seru"
}
```
![POST GENRE](screenshot/POST%20GENRE.png)

---

### 8. Get Genre
**Endpoint**: `GET http://localhost:3000/api/genre`  
**Authorization**: `Bearer Token`  
![GET GENRE](screenshot/GET%20GENRE.png)

---

### 9. Put Genre
**Endpoint**: `PUT http://localhost:3000/api/genre/1`  
**Authorization**: `Bearer Token`  
**Headers**: `Content-Type: application/json`  
**Request Body** (`raw` - `JSON`):
```json
{
  "nama": "Aksi & Petualangan",
  "deskripsi": "Genre pertarungan penuh petualangan"
}
```
![UPDATE GENRE](screenshot/UPDATE%20GENRE.png)

---

### 10. Delete Genre
**Endpoint**: `DELETE http://localhost:3000/api/genre/1`  
**Authorization**: `Bearer Token`  
![DELETE GENRE](screenshot/DELETE%20GENRE.png)
