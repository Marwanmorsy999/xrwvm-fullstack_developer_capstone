# Cars Dealership - Full Stack Capstone Project

A comprehensive full-stack web application for Cars Dealership, a national car retailer in the U.S. This capstone project was developed for IBM's Full Stack Developer Professional Certificate program on Coursera.

## Project Details

- **Project Name**: Cars Dealership Web Application
- **Course**: IBM Full Stack Software Developer Professional Certificate
- **Platform**: Coursera
- **Project Type**: Full Stack Application Development Capstone
- **Technologies**: React, Django, Flask, Node.js, MongoDB, SQLite, Docker, Kubernetes, IBM Cloud Code Engine

![Python](https://img.shields.io/badge/python-v3.12-blue.svg)
![Django](https://img.shields.io/badge/django-v3.2.5-green.svg)
![React](https://img.shields.io/badge/react-v18.2.0-blue.svg)
![Node.js](https://img.shields.io/badge/node.js-v16+-green.svg)
![MongoDB](https://img.shields.io/badge/mongodb-v4.4+-brightgreen.svg)
![Docker](https://img.shields.io/badge/docker-enabled-blue.svg)

## 📖 Overview

This is a comprehensive full-stack web application developed as the capstone project for IBM's Full Stack Application Development course on Coursera. The application provides a complete car dealership management system where users can browse dealerships, view car inventory, read and post reviews, and manage user accounts.

## 🏗️ Architecture

The application follows a modern microservices architecture:

- **Frontend**: React.js with responsive design and Bootstrap CSS
- **Backend**: Django REST API framework
- **Database**: 
  - MongoDB for dealership and review data
  - Django SQLite for user management and car models
- **Microservices**: 
  - Sentiment Analysis Service (Flask + NLTK)
  - Dealership Data Service (Node.js + Express + MongoDB)
- **Containerization**: Docker containers for all services
- **Deployment**: Kubernetes ready with deployment manifests

## ✨ Features

### 🔐 User Management
- User registration and authentication
- Secure login/logout functionality
- Session management
- User profile management

### 🏪 Dealership Management
- Browse all dealerships across different states
- Filter dealerships by state
- View detailed dealership information including:
  - Address and contact details
  - Location coordinates
  - Available inventory

### 🚗 Car Inventory
- Comprehensive car database with:
  - Multiple car makes (Toyota, Honda, Ford, etc.)
  - Various car models and types
  - Year range from 1886 to 2025
  - Car categories: Sedan, SUV, Coupe, Truck, etc.

### 📝 Review System
- Post detailed reviews for dealerships
- Include car purchase information:
  - Car make and model
  - Purchase year
  - Purchase date
- **AI-Powered Sentiment Analysis**:
  - Automatic sentiment detection (Positive/Negative/Neutral)
  - Visual sentiment indicators with emoji icons
  - Powered by NLTK's VADER sentiment analyzer

### 📱 User Interface
- Modern, responsive design
- Bootstrap-powered styling
- Mobile-friendly interface
- Intuitive navigation
- Real-time feedback and alerts

## 🛠️ Technology Stack

### Frontend
- **React.js 18.2.0** - Modern UI library
- **React Router DOM 6.19.0** - Client-side routing
- **Bootstrap CSS** - Responsive styling
- **CSS3** - Custom styling and animations

### Backend
- **Django 3.2.5** - Python web framework
- **Django REST Framework** - API development
- **Gunicorn** - WSGI HTTP Server
- **Python 3.12** - Programming language

### Database & Data Management
- **MongoDB** - NoSQL database for dealerships and reviews
- **Mongoose** - MongoDB object modeling for Node.js
- **SQLite** - Default Django database for user management

### Microservices
- **Flask** - Lightweight Python framework for sentiment analysis
- **Node.js + Express** - Backend service for dealership data
- **NLTK** - Natural Language Toolkit for sentiment analysis
- **VADER Sentiment Analyzer** - Lexicon-based sentiment analysis

### DevOps & Deployment
- **Docker** - Containerization
- **Kubernetes** - Container orchestration
- **Docker Compose** - Multi-container applications
- **IBM Cloud Container Registry** - Container image storage

## 📁 Project Structure

```
capstoneAle/
├── server/
│   ├── djangoproj/                 # Django project configuration
│   │   ├── settings.py             # Django settings
│   │   ├── urls.py                 # URL routing
│   │   └── wsgi.py                 # WSGI application
│   ├── djangoapp/                  # Main Django application
│   │   ├── models.py               # Data models (CarMake, CarModel)
│   │   ├── views.py                # API views and business logic
│   │   ├── restapis.py             # External API integration
│   │   ├── populate.py             # Database population scripts
│   │   └── microservices/          # Sentiment analysis service
│   │       ├── app.py              # Flask sentiment analyzer
│   │       └── requirements.txt    # Python dependencies
│   ├── database/                   # MongoDB service
│   │   ├── app.js                  # Express server
│   │   ├── dealership.js           # Dealership model
│   │   ├── review.js               # Review model
│   │   └── data/                   # JSON data files
│   │       ├── dealerships.json    # Dealership data
│   │       ├── reviews.json        # Review data
│   │       └── car_records.json    # Car inventory
│   ├── frontend/                   # React application
│   │   ├── src/
│   │   │   ├── App.js              # Main app component
│   │   │   └── components/         # React components
│   │   │       ├── Login/          # Login functionality
│   │   │       ├── Register/       # User registration
│   │   │       ├── Dealers/        # Dealership components
│   │   │       └── Header/         # Navigation header
│   │   └── static/                 # Static HTML pages
│   ├── Dockerfile                  # Docker configuration
│   ├── deployment.yaml             # Kubernetes deployment
│   ├── requirements.txt            # Python dependencies
│   └── entrypoint.sh              # Docker entrypoint script
```

## 🚀 Getting Started

### Prerequisites
- Python 3.12+
- Node.js 16+
- MongoDB 4.4+
- Docker (optional but recommended)

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd capstoneAle
   ```

2. **Backend Setup (Django)**
   ```bash
   cd server
   pip install -r requirements.txt
   python manage.py migrate
   python manage.py collectstatic
   python manage.py runserver 8000
   ```

3. **Database Service (MongoDB)**
   ```bash
   cd server/database
   npm install
   node app.js
   ```

4. **Sentiment Analysis Service**
   ```bash
   cd server/djangoapp/microservices
   pip install -r requirements.txt
   python app.py
   ```

5. **Frontend Setup (React)**
   ```bash
   cd server/frontend
   npm install
   npm start
   ```

### 🐳 Docker Deployment

1. **Build and run with Docker Compose**
   ```bash
   cd server/database
   docker-compose up -d
   ```

2. **Build Django application**
   ```bash
   cd server
   docker build -t dealership-app .
   docker run -p 8000:8000 dealership-app
   ```

3. **Deploy to Kubernetes**
   ```bash
   kubectl apply -f deployment.yaml
   ```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the server directory:

```env
DJANGO_SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
MONGODB_URI=mongodb://mongo_db:27017/dealershipsDB
SENTIMENT_ANALYZER_URL=http://localhost:5050/
BACKEND_URL=http://localhost:3030
```

### Database Configuration
- MongoDB runs on port 3030 for the dealership service
- Django SQLite database for user management
- Sentiment analysis service runs on port 5050

## 📊 API Endpoints

### Authentication
- `POST /djangoapp/login` - User login
- `POST /djangoapp/register` - User registration
- `GET /djangoapp/logout` - User logout

### Dealerships
- `GET /djangoapp/get_dealers` - Get all dealerships
- `GET /djangoapp/get_dealers/{state}` - Get dealerships by state
- `GET /djangoapp/dealer/{id}` - Get specific dealership

### Reviews
- `GET /djangoapp/reviews/dealer/{id}` - Get reviews for dealership
- `POST /djangoapp/add_review` - Add new review

### Cars
- `GET /djangoapp/get_cars` - Get all car models

### Sentiment Analysis
- `GET /analyze/{text}` - Analyze sentiment of text

## 🧪 Testing

Run the test suite:

```bash
# Django tests
python manage.py test

# React tests
cd frontend
npm test

# API testing with curl
curl -X GET http://localhost:8000/djangoapp/get_dealers
```

## 🌟 Key Features Implemented

### IBM Cloud Integration
- **IBM Cloud Container Registry** for image storage
- **IBM Kubernetes Service** for deployment
- **Cloud-native architecture** following IBM best practices

### Sentiment Analysis
- **NLTK VADER** sentiment analyzer
- **Real-time sentiment scoring** for reviews
- **Visual sentiment indicators** (positive/negative/neutral)

### Security Features
- **CSRF protection** for forms
- **Authentication middleware** for protected routes
- **Session management** for user state
- **Input validation** and sanitization

### Performance Optimizations
- **Dockerized microservices** for scalability
- **Database indexing** for faster queries
- **Static file serving** optimization
- **Lazy loading** for React components

## 🤝 Contributing

This is a capstone project for educational purposes. The application demonstrates:

- Full-stack development skills
- Microservices architecture
- Cloud deployment practices
- Modern web development frameworks
- Database integration
- API development and consumption
- DevOps practices

## 📝 License

This project is part of the IBM Full Stack Developer Professional Certificate program on Coursera and is intended for educational purposes.

## 👨‍💻 Author

Developed as part of the IBM Full Stack Application Development Capstone Project.

---

**Course**: IBM Full Stack Software Developer Professional Certificate  
**Platform**: Coursera  
**Project Type**: Full Stack Application Development Capstone  

*This application showcases modern full-stack development practices including React frontend, Django backend, microservices architecture, AI integration, and cloud deployment.*