/* =====================================================================
   Think&Eat - Login SQL para la app (OPCIONAL)
   La app de Node se conecta con usuario y contraseña de SQL Server.
   Si ya usás "sa" u otro login, no hace falta este script.

   Antes de ejecutarlo:
     1) Cambiá la contraseña de abajo por una tuya.
     2) Asegurate de que el servidor tenga habilitada la autenticación
        "SQL Server y Windows" (clic derecho en el servidor > Propiedades >
        Seguridad) y reiniciá el servicio de SQL Server.
   ===================================================================== */
USE master;
GO

IF NOT EXISTS (SELECT 1 FROM sys.server_principals WHERE name = N'thinkeat_app')
    CREATE LOGIN thinkeat_app WITH PASSWORD = N'CambiaEstaClave_123', CHECK_POLICY = OFF;
GO

USE ThinkEat;
GO

IF DB_NAME() <> N'ThinkEat'
BEGIN
    RAISERROR(N'La base ThinkEat no existe o no tenés acceso. Ejecutá primero 01_crear_base.sql conectado con Autenticación de Windows (o con sa).', 16, 1);
    SET NOEXEC ON;
END
GO

IF NOT EXISTS (SELECT 1 FROM sys.database_principals WHERE name = N'thinkeat_app')
    CREATE USER thinkeat_app FOR LOGIN thinkeat_app;
GO

-- Lectura y escritura (la app crea ingredientes nuevos y guarda URLs de imágenes)
ALTER ROLE db_datareader ADD MEMBER thinkeat_app;
ALTER ROLE db_datawriter ADD MEMBER thinkeat_app;
GO

SET NOEXEC OFF;
GO
