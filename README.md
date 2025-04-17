# GoSolve Recruitment Task (Python + React)

This is a full stack web application using **Flask** as the backend API and **React** as the frontend.

---

## Project Structure

project-root/   
├── backend/ # Flask API   
│ ├── config/ # Configuration files  
│ ├── services/ # Services to interact with data  
│ ├── tests/ # Automated tests  
│ ├── requirements.txt # Python dependencies file  
│ ├── Dockerfile # Dockerfile for build  
│ └── app.py # Flask application entry point  
├── frontend/ # React  
│ ├── src/ # React source code  
│ │ ├── components/ # Application UI components  
│ │ ├── config/ # Configuration files  
│ │ ├── App.tsx # Application file  
│ │ ├── App.css # Application CSS file  
│ │ ├── index.css # Generic CSS file  
│ │ ├── main.tsx # React entry point  
│ ├── package.json # Frontend application dependencies file  
├── README.md   
└── docker-compose.yml # Docker Compose to orchestrate start up  

### Project Setup

1. Clone this repository

```bash
git clone https://github.com/omarcosalberto/gosolve-recruitment-task.git
```

2. Copy `env-example` to `.env` (optional)

```bash
cp env-example .env
```

3. Run project

```bash
make up
```

4. Access UI on browser

    [http://localhost:3000](http://localhost:3000)