
# Face Recognition Web App (React + Node.js + PostgreSQL)

This project is a full-stack face recognition system built with React (frontend), Node.js/Express (backend), and PostgreSQL (database). It allows users to register with facial data and recognize previously registered users.

---

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/BhosaleAkshay8055/face-recognition-using-Js.git
cd face-recognition-using-Js
```

---

### 2. Frontend Setup (React)

```bash
cd my-app
npm install
npm start
```

The app will run on `http://localhost:3000`.

---

### 3. Backend Setup (Node.js + PostgreSQL)

```bash
cd backend
npm install
```

#### PostgreSQL Configuration

- Create a PostgreSQL database named `faceappdb`.
- Create a table using the following SQL:

```sql
CREATE TABLE IF NOT EXISTS faceuserregister (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  descriptor FLOAT8[] NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Start the Backend Server

```bash
node server.js
```

The backend runs on `http://localhost:5000` by default.

---

## 🚀 How to Use

### ➤ Registration

1. Run the frontend and backend as described above.
2. Open the React app in your browser.
3. Enter your **username** and **mobile number** in the form.
4. Click **"Capture & Register"**.
5. You’ll see an alert:  
   ✅ _User registered successfully with name and number._

---

### ➤ Face Recognition

1. Click on the **"Recognise"** button to go to the recognition page.
2. Click on the **"Recognise"** button again to start detection.
3. Possible outcomes in the alert:
   - ✅ _Matched: Your name and number displayed._
   - ❌ _No face match found in database._
   - ⚠️ _Face not detected (please try again)._

---

## 🧰 Tech Stack

- **Frontend**: React, face-api.js
- **Backend**: Node.js, Express
- **Database**: PostgreSQL
- **Other**: HTML5, CSS, JavaScript

---

## 📌 Notes

- Make sure your camera is connected and accessible.
- Face recognition works best in good lighting and a clear front-facing pose.

---

## 📄 License

This project is licensed under the MIT License.
