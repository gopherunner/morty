# morty
Postmortem Service

### Requirements

1. Install and Configure MongoDB (it will vary between OS)

2. Install NodeJS

### Installation

1. Clone the repo
    ```sh
   git clone https://github.com/gopherunner/morty.git
   ```
2. Install NPM packages
    ```sh
    cd morty/backend/
    npm install
    ```

### Configuration

1. Create an **.env** file inside the **backend** folder with the following configuration:
    ```sh
    APP_PORT=3000
    APP_SECRET=s3cr3t
    DB_URI=mongodb://localhost:27017/morty
    ADMIN_PASS=m0rty
    ```

2. Start the Backend REST API

    ```sh
    cd morty/backend
    npm start
    ```
    
    Check that the Backend REST API is working
    ```sh
    [INFO] Connecting to the Database...
    [INFO] Database connected to mongodb://localhost:27017/morty
    [INFO] Starting Morty Service, listening on port 3000
    ```
    
3. Once the Backend service is running move forward and open the Warehouse Service on Visual Studio Code, then navigate to the **frontend** folder and start the **live server** and finally open the (postmortem.html) file.
