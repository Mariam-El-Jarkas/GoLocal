# 🌍 GoLocal - Saida City Discovery Web App

GoLocal connects locals and visitors with Saida’s top gems from food and fun to culture and history.  
Discover Lebanon’s southern city like a true local, easily and authentically.

---

## 📖Project description

**GoLocal** is a city discovery web application designed to help users explore the best of **Saida**, Lebanon.  
The platform highlights top-rated spots including restaurants, cafés, entertainment venues, and cultural landmarks curated by locals for an authentic experience.

This project aims to simplify city exploration by helping people discover Saida’s most recommended and enjoyable places without relying on paid tour guides or generic travel platforms.  
Currently focused on **Saida**, the app is built with scalability in mind for future expansion across other Lebanese cities.

---

## ✨ Features

- 🏙️ **City-Centric Exploration:** Focused on Saida, Lebanon built for locals and visitors alike.  
- 🍽️ **Categorized Listings:** Organized by category (food, cafés, entertainment, history, culture, outdoor, etc.).  
- 💡 **Locally Curated Recommendations:** All places are selected from personal experiences, community opinions, and trusted sources.  
- 📱 **Responsive Design:** Fully responsive layout for mobile and desktop.  
- 🖼️ **Visual Highlights:** Each listing includes descriptions, addresses, and images.  
- 🚀 **Scalable Structure:** Ready for future enhancements such as database integration and city expansion.  

---

## 🧠 Tech Stack

### **Frontend**
| Technology | Purpose |
|------------|---------|
| [React.js](https://react.dev/) | Interactive user interface |
| React Router | Client-side navigation |
| CSS Modules | Component-specific styling |
| Fetch API | REST API communication |

### **Backend**
| Technology | Purpose |
|------------|---------|
| Node.js | Server runtime |
| Express.js | REST API framework |
| PostgreSQL | Relational database |
| pg (node-postgres) | Database connectivity |
| CORS | Cross-origin resource sharing |

### **Infrastructure**
| Service | Purpose |
|---------|---------|
| Render.com | Backend API & Database hosting |
| InfinityFree | Frontend static hosting |
| PostgreSQL | Database management |

---

## 🚀 Live Deployment

### **Frontend Application**
🌐 **URL:** [https://golocal.infinityfree.me](https://golocal.infinityfree.me)

### **Backend API**
🔗 **Base URL:** [https://golocal-2xn2.onrender.com](https://golocal-2xn2.onrender.com)

### **API Endpoints**
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/categories` | GET | Get all categories |
| `/api/categories/:id` | GET | Get specific category |
| `/api/subcategories/:categoryId` | GET | Get subcategories |
| `/api/places` | GET | Get all places |
| `/api/places/:id` | GET | Get specific place |

---

## 🗂️ Project Structure

//to be added

---

## 🧭 Categories

GoLocal currently covers (and can be expanded to include):

- 🍔 **Food & Dining** : Burgers, Lebanese cuisine, street food, fine dining.  
- ☕ **Cafés & Chill Spots**  :  Coffee shops, dessert places, board game cafés.  
- 🎭 **Culture & Heritage**  : Historical landmarks, souks, museums, mosques.  
- 🏖️ **Outdoors & Leisure**  : Beaches, promenades, parks, seaside views.  
- 🎮 **Entertainment**  : Arcades, board game lounges, cinemas, local events.  
- 🛍️ **Shops & Souks**  : Local markets, handmade goods, and crafts.  

---
---

## 🚀 Future Enhancements

- 🔹 Integrate **interactive maps** (Google Maps API or Leaflet).   
- 🔹 Implement **search and filter** by category or rating.  
- 🔹 Expand coverage to **Beirut, Tyre, Tripoli, and other Lebanese cities**.  
- 🔹 Add **authentication** and user profiles for saving favorite spots.  

---

👨‍💻 Author

**Developed by:** Mariam El Jarkas
**Course Project :** CSCI426
**University:** LIU 
**Instructor:** Dr Bassel Dhaini

---

## 🖼️ Screenshots

<img width="1280" height="616" alt="image" src="https://github.com/user-attachments/assets/9fe82aae-52b8-41c0-88f7-8c108241b71e" />
<img width="1280" height="791" alt="image" src="https://github.com/user-attachments/assets/89fc461b-22f9-4193-9b1d-c82a37e090e5" />
<img width="1280" height="805" alt="image" src="https://github.com/user-attachments/assets/1f05e0fe-600d-4ad2-aec9-200bb44b4d97" />
<img width="1280" height="693" alt="image" src="https://github.com/user-attachments/assets/508b74b2-5ef1-46c0-9550-de9d9dafc520" />
<img width="1280" height="884" alt="image" src="https://github.com/user-attachments/assets/3aef7231-ddb6-4604-82d9-8cf79cff2973" />
<img width="1280" height="849" alt="image" src="https://github.com/user-attachments/assets/f7cbd31c-4f0b-409c-99ae-ffd94c7f7fff" />
<img width="1280" height="611" alt="image" src="https://github.com/user-attachments/assets/7e4bfc57-f9f3-4d97-acd2-4d14c03f264e" />


## 🖼️  Responsive Screenshots

<img width="364" height="805" alt="image" src="https://github.com/user-attachments/assets/e492721c-6602-4d96-977c-b97f6caea3c0" />
<img width="376" height="805" alt="image" src="https://github.com/user-attachments/assets/68b8313e-ab91-4542-9a32-cc7991f54748" />
<img width="372" height="794" alt="image" src="https://github.com/user-attachments/assets/12f7c7f5-aab4-4431-b8ec-cde8d881b537" />

 
---

## ⚙️ Installation & Setup

To run the project locally:

```bash
# Clone this repository
git clone https://github.com/<Mariam-El-Jarkas>/golocal.git

# Navigate to the project directory
cd golocal

# Install dependencies
npm install

# Run the development server
npm run dev



