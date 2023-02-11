# Brief Description:
As per the initial commit, we have a simple webapp that displays a list of ride objects using React on the frontend and Django on the backend.
The communication is done through a REST API, implemented in Django.
The backend folder houses all the Django related files, and the frontend file holds all the React/JavaScript/styling files.

Both servers must be running in order to see the service working correctly, and the actual app can be viewed using the localhost port link provided on npm start.



# To run:
Step 1: Ensure you have React, Django installed.

Step 2: Launch the local Django server
```
cd backend
python manage.py runserver
```

Step 3: Launch the React server.
```
cd ../frontend
npm start
```
