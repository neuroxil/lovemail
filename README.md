# 💗 LoveMail

An interactive **"wanna go on a date with me?"** website with optional Telegram notifications.

LoveMail has two parts:

- 🌐 **Frontend** — the interactive website
- 🤖 **Backend** — Node.js/Express server that can send the submitted date details to Telegram

The frontend can run completely by itself. The backend is only required if you want Telegram notifications or other server-side functionality.

---

# ✨ Features

### Website

- 💗 Romantic interactive UI
- 💕 Animated hearts
- ✨ Particles and effects
- 😭 Evasive **NO** button
- ✅ Interactive **YES** button
- 📍 Place selection
- 🗓️ Date selection
- 🕐 Time selection
- 🎉 Celebration screen
- 📱 Responsive/mobile-friendly
- 🌐 GitHub Pages compatible

### Backend

- 🤖 Telegram notifications
- 📩 Sends completed date details to Telegram
- 🔐 Environment-variable based secrets
- 🚀 Node.js + Express
- 🛡️ Server-side validation
- ⚙️ GitHub Actions deployment support

---

# 📁 Project Structure

The complete project looks like this:

```text
lovemail/
│
├── public/
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   ├── favicon.svg
│   │
│   └── assets/
│       ├── images/
│       │   └── .gitkeep
│       ├── fonts/
│       │   └── .gitkeep
│       └── audio/
│           └── .gitkeep
│
├── server/
│   ├── server.js
│   ├── telegram.js
│   └── validation.js
│
├── data/
│   └── .gitkeep
│
├── .github/
│   └── workflows/
│       └── deploy.yml
│
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── LICENSE
```

> If you're using the **static GitHub Pages version only**, `public/` can instead be the repository root. GitHub Pages cannot run the `server/` backend.

---

# 🌐 Frontend

The frontend is located in:

```text
public/
```

The main files are:

```text
public/
├── index.html
├── style.css
├── script.js
└── assets/
```

## `index.html`

Contains the actual page structure and text.

Change this file when you want to modify:

- Main question
- Button text
- Instructions
- Place/date/time questions
- Final message
- Emojis
- Page title

For example:

```html
<h1>I really like you.</h1>
<p class="subtitle">soooo uh...</p>
<p class="question">wanna go on a date with me?</p>
```

Can become:

```html
<h1>I kinda really like you.</h1>
<p class="subtitle">so...</p>
<p class="question">would you go on a date with me?</p>
```

---

# 🎨 `style.css`

Controls the appearance of the website.

You can change:

- Colors
- Background
- Fonts
- Buttons
- Card design
- Animations
- Shadows
- Spacing
- Mobile layout

For example, the main pink colors can be changed from:

```css
#ff6d9d
#ff3f7d
```

to your own colors.

---

# 🧠 `script.js`

Controls the interactive behavior.

This includes:

- YES button
- NO button
- NO button movement
- Place validation
- Date validation
- Time validation
- Screen transitions
- Celebration animation
- Particles
- Final date display

The **NO button behavior** is primarily controlled here.

---

# 🖼️ Images

Put images in:

```text
public/assets/images/
```

Example:

```text
public/assets/images/photo.jpg
```

Then use:

```html
<img src="./assets/images/photo.jpg" alt="Photo">
```

---

# 🔤 Fonts

Put custom fonts in:

```text
public/assets/fonts/
```

Example:

```text
public/assets/fonts/MyFont.ttf
```

Then add it to `style.css`:

```css
@font-face {
    font-family: "MyFont";
    src: url("./assets/fonts/MyFont.ttf") format("truetype");
}
```

---

# 🎵 Audio

Put audio files in:

```text
public/assets/audio/
```

Example:

```text
public/assets/audio/music.mp3
```

Then:

```html
<audio id="music" src="./assets/audio/music.mp3"></audio>
```

> Modern browsers may prevent audio from automatically playing until the user interacts with the page.

---

# 🤖 Telegram Backend

The backend is located in:

```text
server/
├── server.js
├── telegram.js
└── validation.js
```

## `server.js`

This is the main Express server.

It is responsible for:

- Starting the HTTP server
- Serving the frontend
- Receiving date submissions
- Calling the validation functions
- Sending the information to Telegram

---

## `telegram.js`

Handles communication with the Telegram Bot API.

This is where the application sends information such as:

```text
💗 NEW DATE

📍 Place: ...
🗓️ Date: ...
🕐 Time: ...
```

The Telegram bot token should **never** be placed inside `index.html` or `script.js`.

---

## `validation.js`

Contains server-side validation.

The server should validate:

- Place
- Date
- Time
- Request format
- Required fields
- Maximum lengths

Never rely exclusively on frontend validation.

---

# 🔐 Environment Variables

Create a local `.env` file.

**Do not commit this file to GitHub.**

Example:

```env
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_CHAT_ID=your_chat_id_here
PORT=3000
```

The repository contains:

```text
.env.example
```

as a template.

Copy it to:

```text
.env
```

and replace the placeholder values.

### ⚠️ NEVER put the bot token in frontend JavaScript.

Bad:

```javascript
const BOT_TOKEN = "123456:ABC...";
```

Anyone visiting the website could see it.

Good:

```text
Browser
   ↓
Express server
   ↓
Telegram Bot API
```

The bot token stays on the server.

---

# 🚀 Running the Full Project Locally

Install Node.js first.

Then open a terminal in the project directory:

```bash
npm install
```

Create your environment file:

```bash
cp .env.example .env
```

On Windows, you can simply copy:

```text
.env.example
```

to:

```text
.env
```

Then configure your Telegram credentials.

Start the server:

```bash
npm start
```

The website should then be available at:

```text
http://localhost:3000
```

---

# 🧪 Development Mode

If the project includes a development script, you can use:

```bash
npm run dev
```

This allows the server to automatically restart when backend files change.

---

# 📦 `package.json`

The `package.json` contains the backend dependencies and scripts.

Typical scripts are:

```json
{
  "scripts": {
    "start": "node server/server.js",
    "dev": "node --watch server/server.js"
  }
}
```

Do not manually edit dependency versions unless you know what you're changing.

Use:

```bash
npm install
```

after changing dependencies.

---

# 📂 `data/`

The `data/` directory is reserved for server-side application data.

```text
data/
└── .gitkeep
```

Do not store secrets here.

If you later add persistent date submissions, this directory can contain the application's data files.

---

# ⚙️ GitHub Actions

GitHub Actions configuration is stored in:

```text
.github/workflows/
```

The deployment workflow is:

```text
.github/workflows/deploy.yml
```

This allows GitHub to automatically build/deploy the project when changes are pushed.

---

# 🌐 GitHub Pages

## Important

GitHub Pages can host **static files only**.

It cannot run:

```text
Node.js
Express
Telegram Bot API
server/server.js
```

Therefore, if you're using GitHub Pages, the frontend must be deployed separately from the backend.

### Static-only deployment

Your repository can look like:

```text
lovemail/
├── index.html
├── style.css
├── script.js
├── favicon.svg
├── assets/
├── README.md
├── LICENSE
└── .gitignore
```

Then enable:

```text
Repository
→ Settings
→ Pages
→ Deploy from a branch
→ main
→ / (root)
```

Your site will be:

```text
https://YOUR_USERNAME.github.io/lovemail/
```

---

# ☁️ Full Backend Deployment

If you want Telegram notifications, deploy the Node.js backend to a server that can run Node.js.

The architecture becomes:

```text
                 ┌──────────────────┐
                 │   GitHub Pages   │
                 │                  │
                 │   LoveMail UI    │
                 └────────┬─────────┘
                          │
                          │ HTTPS
                          ▼
                 ┌──────────────────┐
                 │ Node.js /       │
                 │ Express Server   │
                 └────────┬─────────┘
                          │
                          │ Bot API
                          ▼
                 ┌──────────────────┐
                 │     Telegram     │
                 │       Bot        │
                 └──────────────────┘
```

The frontend sends the completed date information to the backend.

The backend then sends it to Telegram.

---

# 🔗 Frontend → Backend

If the backend is hosted separately, configure the API endpoint in:

```text
public/script.js
```

For example:

```javascript
const API_URL = "https://api.example.com";
```

Then the frontend can send the completed date:

```javascript
fetch(`${API_URL}/api/date`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        place: state.place,
        date: state.date,
        time: state.time
    })
});
```

Do **not** put the Telegram bot token here.

Only the public API URL belongs in frontend code.

---

# 🔒 Security

Never commit:

```text
.env
```

or secrets such as:

```text
TELEGRAM_BOT_TOKEN
TELEGRAM_CHAT_ID
```

The `.gitignore` already includes:

```gitignore
.env
.env.*
```

If you accidentally publish a bot token, immediately revoke/regenerate it through Telegram's bot management tools.

---

# 🛠️ What Should I Change?

| What you want to change | File |
|---|---|
| Main question | `public/index.html` |
| Button text | `public/index.html` |
| Final message | `public/index.html` |
| Colors | `public/style.css` |
| Fonts | `public/style.css` |
| Animations | `public/style.css` |
| NO button behavior | `public/script.js` |
| YES button behavior | `public/script.js` |
| Date/time formatting | `public/script.js` |
| Images | `public/assets/images/` |
| Custom fonts | `public/assets/fonts/` |
| Music | `public/assets/audio/` |
| Browser icon | `public/favicon.svg` |
| API/server behavior | `server/server.js` |
| Telegram messages | `server/telegram.js` |
| Input validation | `server/validation.js` |
| Environment configuration | `.env` |
| Dependencies | `package.json` |
| Automatic deployment | `.github/workflows/deploy.yml` |

---

# 🧑‍💻 Technology

LoveMail uses:

### Frontend

- HTML
- CSS
- Vanilla JavaScript

### Backend

- Node.js
- Express
- Telegram Bot API

### Deployment

- GitHub
- GitHub Pages
- GitHub Actions
- Any Node.js-compatible server for the backend

---

# 📜 License

LoveMail is released under the MIT License.

See [`LICENSE`](./LICENSE) for the complete license.
