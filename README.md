

# YouTube Clone

A full-stack YouTube-like application built with **React** (frontend), **Django REST Framework** (backend), and **Tailwind CSS** for styling.  
Features include user authentication, video upload, like/share, watch later, comments, and more.

## Features

- **User Authentication:** Register, login, logout
- **Video Upload:** Upload videos with title and description
- **Browse Videos:** View all uploaded videos on the home page
- **Video Player:** Watch videos on a dedicated page
- **Like & Share:** Like videos and share links
- **Subscribe:** Subscribe to channels (users)
- **Watch Later:** Save videos to watch later
- **Comments:** Add and view comments on videos
- **Categories & Search:** Filter and search videos
- **Responsive UI:** Modern layout with Tailwind CSS

## Project Structure

```
ytclone/
│
├── backend/                  # Django Backend
│   ├── backend/              # Django project settings, urls, wsgi, asgi
│   ├── api/                  # Django app: models, views, serializers, urls
│   ├── media/                # Uploaded videos/thumbnails
│   ├── templates/            # Django templates (for login, etc.)
│   ├── db.sqlite3            # Database
│   └── manage.py
│
├── frontend/                 # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/       # React components (Navbar, Sidebar, Home, etc.)
│   │   ├── App.js
│   │   ├── index.js
│   │   └── axiosConfig.js
│   ├── tailwind.config.js
│   ├── package.json
│   └── README.md
│
└── README.md                 # (This file)
```

## Getting Started

### Prerequisites

- Python 3.10+
- Node.js 18+
- pip, npm
- (Optional) [virtualenv](https://virtualenv.pypa.io/)

### Backend Setup

```bash
cd backend
python -m venv venv
# Activate the virtual environment:
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate

pip install -r requirements.txt
# Or manually:
pip install django djangorestframework django-cors-headers pillow

python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

## API Endpoints

| Method | Endpoint                          | Description                       |
|--------|-----------------------------------|-----------------------------------|
| POST   | `/api/register/`                  | Register a new user               |
| POST   | `/api/login/`                     | Login and get token               |
| GET    | `/api/videos/`                    | List all videos                   |
| POST   | `/api/videos/`                    | Upload a video                    |
| GET    | `/api/videos//`               | Get video details                 |
| POST   | `/api/videos//like/`          | Like/unlike a video               |
| POST   | `/api/videos//watch-later/`   | Toggle watch later                |
| GET    | `/api/watch-later/`               | List user's watch later videos    |
| GET/POST | `/api/videos//comments/`    | List/add comments                 |

## Customization

- **Styling:** All UI uses Tailwind CSS, easily customizable in `tailwind.config.js`.
- **Media:** Uploaded videos and thumbnails are stored in `backend/media/`.
- **Authentication:** Token-based authentication (DRF).

## Credits

- [Django REST Framework](https://www.django-rest-framework.org/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)


---
