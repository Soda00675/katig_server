DO
$do$
BEGIN
   IF NOT EXISTS (
      SELECT
      FROM   pg_database
      WHERE  datname = 'katigdb') THEN
      PERFORM dblink_exec('dbname=' || current_database(), 'CREATE DATABASE katigdb');
   END IF;
END
$do$;
