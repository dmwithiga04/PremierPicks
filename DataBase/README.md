# Database Setup

This folder contains configuration and initialization files for setting up the `movieDB` MySQL database in a Docker container.

## Overview

The `movieDB` database stores information about movies, including details such as title, rating, year, certificate, runtime, stars, and genre. The database is initialized using a Docker container defined in the `docker-compose.yml` file, with initial data loaded from `init.sql`.

**Important**: The database is intended for read-only access. Data should only be retrieved (queried), not modified or inserted. All data is initially set up through the provided `init.sql` file.

## Files

- **docker-compose.yml**: Configures and launches a MySQL Docker container to host the `movieDB` database.
- **init.sql**: Contains SQL commands to initialize the database schema and insert sample data into the `movies` table.

## Quick Start

To set up and start the database, follow these steps:

1. **Ensure Docker is installed**: You can download Docker from [Docker's official site](https://www.docker.com/get-started).
2. **Run the Docker Compose command**:
   ```bash
   docker-compose up -d
   ```
   This command will:
   - Pull the MySQL image if it’s not already available locally.
   - Start the MySQL container with the specified configurations.
   - Execute `init.sql` to create the `movies` table and insert initial movie data.

3. **Accessing the Database**:
   - MySQL is exposed on port `3306`
   - Use your MySQL client of choice to connect:
     - **Host**: `localhost`
     - **Password**: `premier-picks`

   Example connection command:
   ```bash
   mysql -h 127.0.0.1 -P 4040 -u exampleUser -p
   ```

## Database Schema

### movies Table

The `movies` table stores information about movies and has the following structure:

| Column       | Type         | Description                       |
|--------------|--------------|-----------------------------------|
| Title        | VARCHAR(100) | Title of the movie               |
| Rating       | DOUBLE       | IMDB or similar rating           |
| Year         | INT          | Year of release                  |
| Certificate  | VARCHAR(50)  | Age certification, e.g., 'PG-13' |
| Runtime      | INT          | Runtime in minutes               |
| Stars        | VARCHAR(200) | Leading actors/actresses         |
| Genre        | VARCHAR(80)  | Genre of the movie               |

## Read-Only Policy

This database is configured for **read-only** access, meaning data should only be queried (retrieved). Any modifications, including `INSERT`, `UPDATE`, or `DELETE` commands, are not allowed. To update the data or schema, modify `init.sql` and re-run the container setup process (see "Customizing the Database" below).

## Customizing the Database

To modify the initial data or database structure, update the `init.sql` file and restart the container:
```bash
docker-compose down
docker-compose up -d
```

This will re-run `init.sql` and apply any updates.

---

**Note**: If `mysql-data` (the data volume) already contains data, changes to `init.sql` may not apply automatically. To apply changes to the schema or data, remove the volume first:
```bash
docker-compose down -v
docker-compose up -d
```

## Troubleshooting

- **Port Conflicts**: Ensure that port `3306` is not in use by other services.
- **Access Issues**: Verify that the credentials in `docker-compose.yml` match those in your MySQL client.

## Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [MySQL Docker Hub](https://hub.docker.com/_/mysql)