# Deployment Guide (Frontend on Vercel + Backend on Render)

Dono frontend (`client`) aur backend (`server`) ko successfully deploy karne ke liye niche diye gaye steps ko follow karein.

---

## 🛠️ Requirements & Prerequisites
1. **GitHub Account** (Jahan aapka code hosted rahega)
2. **Render Account** (Backend hosting ke liye)
3. **Vercel Account** (Frontend hosting ke liye)
4. **MongoDB Atlas URI** (Aapka active database connection string)

---

## 📁 Project Structure Reference
Aapke repo me folders is tarah hone chahiye:
```text
communty_new-main/
├── client/          <-- React (Vite) Frontend
└── server/          <-- Express.js + Socket.io Backend
```

---

## 🚀 Step 1: Code ko GitHub par Push karna
Sabse pehle apne computer ke VS Code terminal me main folder (`communty_new-main`) me jaakar ye commands chalayein:

```bash
# Git initialize aur commit karein
git init
git add .
git commit -m "ready for deployment"

# GitHub repository link karein aur push karein
git remote add origin <your-github-repository-url>
git branch -M main
git push -u origin main
```

---

## ⚙️ Step 2: Backend (Server) ko Render.com par Deploy karna
Render par Express + Node.js backend ko deploy karenge taaki **Socket.io (WebSockets)** bina kisi problem ke kaam kare.

1. **[Render.com](https://render.com/)** par login kijiye.
2. Dashboard par **New +** -> **Web Service** select kijiye.
3. Apni GitHub repository connect kijiye.
4. Settings ko is tarah configure kijiye:
   - **Name:** `egrowth-backend` (Ya koi bhi naam)
   - **Region:** `Singapore` (India ke users ke liye speed fast hogi)
   - **Branch:** `main`
   - **Root Directory:** `server` *(Important: isse Render sirf server folder build karega)*
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. **Environment Variables** (Advanced) me niche diye gaye variables add karein:
   - `DATABASE_URL` = `mongodb+srv://subscription_db_user:7jA5ihArqRUfXZ3U@community.okljxcz.mongodb.net/?appName=community`
   - `AUTH_SECRET` = `ehabF+q+ilB6a40bVDEfH1vqrsirQ9ukEkK3cPYS9GU=`
   - `CLOUDINARY_CLOUD_NAME` = `diwsdon3e`
   - `CLOUDINARY_API_KEY` = `917648755319554`
   - `CLOUDINARY_API_SECRET` = `K1_0ZHcYUDEW6foArWWEtgh7fSY`
   - `EMAIL_USER` = `subscription@swastixa.com`
   - `APP_PASSWORD` = `svyihshsvwapazhl`
   - `FRONTEND_URL` = `http://localhost:5173` *(Ise abhi aise hi chhod dein, client deploy hone ke baad hum ise badlenge)*
6. **Deploy Web Service** par click karein.
7. Deployment complete hone ke baad dashboard par top par aapko ek live URL milega (jaise `https://egrowth-backend.onrender.com`). **Ise copy kar ke save kar lein.**

---

## 💻 Step 3: Frontend (Client) ko Vercel par Deploy karna
Vite + React frontend ko serverless hosting (Vercel) par deploy karenge.

1. **[Vercel](https://vercel.com/)** dashboard par jayein aur login karein.
2. **Add New** -> **Project** par click karein.
3. Apni GitHub repository ko import kijiye.
4. Set Up Project screen par:
   - **Root Directory:** Edit par click karke **`client`** folder select karein.
   - **Framework Preset:** `Vite`
   - **Build and Output Settings:** Default rehne dein.
5. **Environment Variables** dropdown me niche likhe keys add karein:
   - **Key:** `VITE_API_URL`
   - **Value:** `https://egrowth-backend.onrender.com/api/v1` *(Jo URL Step 2 me Render se mila tha uske aage `/api/v1` laga kar add karein)*
6. **Deploy** button par click karein. Deploy hone ke baad aapko ek frontend live URL milega (jaise `https://egrowth-client.vercel.app`). **Ise copy kar lein.**

---

## 🔒 Step 4: Security and CORS Enable karna (Final Step)
Frontend deploy hone ke baad backend ko batana hoga ki client request accept kare.

1. Render Dashboard par jayein.
2. Apne backend service (`egrowth-backend`) par click karein.
3. Left menu me **Environment** settings me jayein.
4. `FRONTEND_URL` ki value ko update kar ke wahan apna naya Vercel frontend URL (jaise `https://egrowth-client.vercel.app`) paste kar dein.
5. **Save Changes** par click karein. Render automatic re-deploy kar dega.

---

🎉 **Congratulations! Aapka Project complete deploy aur live ho chuka hai!**
