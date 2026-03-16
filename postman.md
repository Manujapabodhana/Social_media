Testing your backend with **Postman** should follow a **clean, structured workflow**, just like your code structure. This makes testing easier, reusable, and professional. 🧪

---

# 🧭 1️⃣ Create a Postman Collection

Open **Postman**

1. Click **Collections**
2. Click **New Collection**
3. Name it:

```
Social Media Backend API
```

Inside the collection create folders:

```
Auth
Posts
Comments
Likes
Shares
```

This follows the **same structure as your backend modules** (clean practice).

---

# 🌐 2️⃣ Set Environment Variables (Clean Testing)

Create a **Postman Environment**

Example variables:

| Variable | Value                                          |
| -------- | ---------------------------------------------- |
| base_url | [http://localhost:5000](http://localhost:5000) |
| token    | (empty initially)                              |

Now you can use:

```
{{base_url}}
```

Example:

```
{{base_url}}/auth/register
```

---

# 👤 3️⃣ Test Authentication APIs

## Register User

**POST**

```
{{base_url}}/auth/register
```

Body → JSON

```json
{
"name": "John",
"email": "john@test.com",
"password": "123456"
}
```

Response:

```json
{
"user": {...},
"token": "JWT_TOKEN"
}
```

Copy the token.

---

## Save Token Automatically (Clean Practice)

In **Postman Tests tab** add:

```javascript
const response = pm.response.json();
pm.environment.set("token", response.token);
```

Now Postman automatically stores the token.

---

# 🔐 4️⃣ Use Token for Protected APIs

Add header:

```
Authorization: Bearer {{token}}
```

Now protected APIs will work.

---

# 📝 5️⃣ Test Posts API

## Create Post

**POST**

```
{{base_url}}/posts
```

Headers:

```
Authorization: Bearer {{token}}
```

Body:

```json
{
"content": "Hello from Postman!"
}
```

Response:

```json
{
"id": 1,
"content": "Hello from Postman!"
}
```

---

## Get All Posts

**GET**

```
{{base_url}}/posts
```

No auth required.

---

# ❤️ 6️⃣ Test Like Post

**POST**

```
{{base_url}}/posts/1/like
```

Headers:

```
Authorization: Bearer {{token}}
```

---

# 💬 7️⃣ Test Comment API

**POST**

```
{{base_url}}/comments/1
```

Body:

```json
{
"text": "Nice post!"
}
```

---

## Get Comments

**GET**

```
{{base_url}}/comments/1
```

---

# 🔁 8️⃣ Test Share Post

**POST**

```
{{base_url}}/posts/1/share
```

Header:

```
Authorization: Bearer {{token}}
```

---

# 📁 Clean Postman Folder Structure

Your Postman collection should look like:

```
Social Media Backend API
│
├── Auth
│   ├── Register
│   └── Login
│
├── Posts
│   ├── Create Post
│   ├── Get Posts
│   ├── Like Post
│   └── Share Post
│
├── Comments
│   ├── Add Comment
│   └── Get Comments
```

This mirrors your backend structure:

```
routes
controllers
services
entities
```

---

# 🧪 9️⃣ Clean API Testing Order

Test APIs in this order:

```
1 Register user
2 Login
3 Create post
4 Get posts
5 Like post
6 Comment post
7 Share post
```

This ensures **dependencies exist**.

Example:

You cannot:

```
like post
```

before a post exists.

---

# ⚡ 10️⃣ Verify Data in Database

Open **MySQL Workbench**

Check tables:

```
users
posts
comments
likes
shares
```

Run:

```sql
SELECT * FROM posts;
```

You should see the post you created.

---

# ✅ What You Have Now

You can fully test your backend:

✔ Register user
✔ Login
✔ JWT authentication
✔ Create posts
✔ View posts
✔ Like posts
✔ Comment posts
✔ Share posts

All tested through **Postman**.

---

💡 If you want, I can also show you **a professional Postman testing setup used in real companies**, including:

* Automatic **JWT token handling**
* **Postman test scripts**
* **Collection export for GitHub**
* **Automated API validation**.
