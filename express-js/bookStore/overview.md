### **📚 Overview of the Library Application** (Using **PostgreSQL** & **TypeScript**)  

The **Library Application** is a web-based system that allows users to:  
✔ **Browse books**  
✔ **Purchase books (cart system)**  
✔ **Borrow and return books**  
✔ **Track book availability**  

This system is built with **TypeScript** on the frontend and uses **PostgreSQL** as the database. **There are no user roles** (no admin/user distinction).  

---

## **🔹 Key Features**  

### **1. Book Browsing**
- Users can view a list of books.
- Each book displays:
  - **Title**
  - **Price**
  - **Availability status (number of copies left)**
- If a book is **out of stock**, the **borrow button is disabled**.

### **2. Shopping Cart 🛒**
- Users can **add books** to a cart.
- Users can **remove books** before checkout.
- A **checkout process** confirms the purchase.

### **3. Borrowing System 📚**
- Users can **borrow** books if available.
- Borrowed books are listed in a **separate section**.
- Users can **return borrowed books** anytime.

### **4. Modal Popups 🖼️**
- Two modals:
  - **Cart Modal:** Shows cart items.
  - **Borrowed Books Modal:** Displays borrowed books.

### **5. PostgreSQL Database Integration 🗄️**
The **books table** in **PostgreSQL** includes:

| Column Name   | Data Type  | Description                   |
|--------------|-----------|------------------------------|
| `id`        | `SERIAL`   | Unique book ID              |
| `title`     | `TEXT`     | Book title                  |
| `price`     | `DECIMAL`  | Book price                  |
| `available` | `INTEGER`  | Number of copies available  |

- When a user **borrows** a book, the `available` count decreases.  
- When a book is **returned**, the `available` count increases.  
- If `available = 0`, the **borrow button is disabled**.

---

## **🔹 Technology Stack**
| Component      | Technology Used          |
|--------------|-------------------------|
| **Frontend**  | TypeScript, HTML, CSS   |
| **Backend**   | Node.js (Express + TypeScript) |
| **Database**  | PostgreSQL              |
| **ORM (Optional)** | Prisma / TypeORM |

---

## **🔹 Future Improvements**
- 🔹 **Due Date System**: Automatically notify users when a book is due.  
- 🔹 **Database Optimization**: Add indexing for faster queries.  
- 🔹 **Logging System**: Track borrowing and return history.  

Would you like a **TypeScript-based API** to handle book borrowing and purchasing? 🚀
