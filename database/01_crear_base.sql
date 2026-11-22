/* =====================================================================
   Think&Eat - Creación de la base de datos y tablas (SQL Server)
   Ejecutar en SSMS en este orden:
     1) 01_crear_base.sql   (este archivo)
     2) 02_datos.sql        (ingredientes, unidades y recetas)
     3) 03_usuario_app.sql  (opcional: login SQL para la app)
   ===================================================================== */
USE master;
GO

IF DB_ID(N'ThinkEat') IS NULL
BEGIN
    -- CI_AI: las búsquedas ignoran mayúsculas y acentos (limon = Limón)
    CREATE DATABASE ThinkEat COLLATE Modern_Spanish_CI_AI;
END
GO

-- Si no se pudo crear, se frena todo el script (no sigue creando tablas en master)
IF DB_ID(N'ThinkEat') IS NULL
BEGIN
    RAISERROR(N'No se pudo crear la base ThinkEat: el usuario con el que te conectaste no tiene permiso para crear bases. Conectate en SSMS con "Autenticación de Windows" (o con el usuario sa) y volvé a ejecutar este script.', 16, 1);
    SET NOEXEC ON;
END
GO

USE ThinkEat;
GO

IF DB_NAME() <> N'ThinkEat'
BEGIN
    RAISERROR(N'No se pudo entrar a la base ThinkEat. Revisá los permisos de tu usuario.', 16, 1);
    SET NOEXEC ON;
END
GO

-- Si ya existían, se borran en orden inverso a las dependencias
IF OBJECT_ID(N'dbo.RecetaPasos', N'U') IS NOT NULL DROP TABLE dbo.RecetaPasos;
IF OBJECT_ID(N'dbo.RecetaIngredientes', N'U') IS NOT NULL DROP TABLE dbo.RecetaIngredientes;
IF OBJECT_ID(N'dbo.Recetas', N'U') IS NOT NULL DROP TABLE dbo.Recetas;
IF OBJECT_ID(N'dbo.Ingredientes', N'U') IS NOT NULL DROP TABLE dbo.Ingredientes;
IF OBJECT_ID(N'dbo.Unidades', N'U') IS NOT NULL DROP TABLE dbo.Unidades;
IF OBJECT_ID(N'dbo.CategoriasIngrediente', N'U') IS NOT NULL DROP TABLE dbo.CategoriasIngrediente;
GO

CREATE TABLE dbo.CategoriasIngrediente (
    Id      INT IDENTITY(1,1) NOT NULL CONSTRAINT PK_CategoriasIngrediente PRIMARY KEY,
    Nombre  NVARCHAR(80)  NOT NULL CONSTRAINT UQ_CategoriasIngrediente_Nombre UNIQUE,
    Emoji   NVARCHAR(16)  NULL,
    Orden   INT           NOT NULL CONSTRAINT DF_CategoriasIngrediente_Orden DEFAULT (0)
);
GO

CREATE TABLE dbo.Unidades (
    Id            INT IDENTITY(1,1) NOT NULL CONSTRAINT PK_Unidades PRIMARY KEY,
    Nombre        NVARCHAR(40)  NOT NULL,
    NombrePlural  NVARCHAR(40)  NOT NULL,
    Abreviatura   NVARCHAR(20)  NOT NULL CONSTRAINT UQ_Unidades_Abreviatura UNIQUE,
    -- conteo: se cuenta (unidad, docena, diente...) / masa: gramos / volumen: ml / libre: a gusto
    Tipo          NVARCHAR(10)  NOT NULL CONSTRAINT CK_Unidades_Tipo CHECK (Tipo IN (N'conteo', N'masa', N'volumen', N'libre')),
    -- Equivalencia de 1 de esta unidad en la base de su tipo (unidades, gramos o ml)
    FactorBase    DECIMAL(12,4) NOT NULL CONSTRAINT DF_Unidades_FactorBase DEFAULT (1),
    Orden         INT           NOT NULL CONSTRAINT DF_Unidades_Orden DEFAULT (0)
);
GO

-- Los ingredientes base usan Id 1..999. Los que se crean desde la app arrancan en 1000.
CREATE TABLE dbo.Ingredientes (
    Id               INT IDENTITY(1000,1) NOT NULL CONSTRAINT PK_Ingredientes PRIMARY KEY,
    Nombre           NVARCHAR(100) NOT NULL CONSTRAINT UQ_Ingredientes_Nombre UNIQUE,
    NombrePlural     NVARCHAR(100) NULL,
    CategoriaId      INT           NOT NULL CONSTRAINT FK_Ingredientes_Categoria REFERENCES dbo.CategoriasIngrediente(Id),
    Emoji            NVARCHAR(16)  NULL,
    UnidadDefaultId  INT           NOT NULL CONSTRAINT FK_Ingredientes_Unidad REFERENCES dbo.Unidades(Id),
    -- Peso aproximado de 1 unidad mediana (o de 1 paquete, lata o atado)
    PesoUnidadGr     DECIMAL(10,2) NULL,
    TieneTamanio     BIT           NOT NULL CONSTRAINT DF_Ingredientes_TieneTamanio DEFAULT (0),
    -- Básico: sal, pimienta, aceite. Se asume que siempre hay.
    EsBasico         BIT           NOT NULL CONSTRAINT DF_Ingredientes_EsBasico DEFAULT (0),
    Sinonimos        NVARCHAR(500) NULL,
    BusquedaImagen   NVARCHAR(150) NULL,
    ImagenUrl        NVARCHAR(600) NULL,
    EsPersonalizado  BIT           NOT NULL CONSTRAINT DF_Ingredientes_EsPersonalizado DEFAULT (0),
    FechaAlta        DATETIME2(0)  NOT NULL CONSTRAINT DF_Ingredientes_FechaAlta DEFAULT (SYSDATETIME())
);
GO
CREATE INDEX IX_Ingredientes_Categoria ON dbo.Ingredientes(CategoriaId);
GO

CREATE TABLE dbo.Recetas (
    Id              INT IDENTITY(1,1) NOT NULL CONSTRAINT PK_Recetas PRIMARY KEY,
    Nombre          NVARCHAR(120) NOT NULL CONSTRAINT UQ_Recetas_Nombre UNIQUE,
    Descripcion     NVARCHAR(400) NULL,
    Categoria       NVARCHAR(50)  NOT NULL,
    TiempoMin       INT           NOT NULL,
    Dificultad      NVARCHAR(20)  NOT NULL CONSTRAINT CK_Recetas_Dificultad CHECK (Dificultad IN (N'Fácil', N'Media', N'Difícil')),
    Porciones       INT           NOT NULL CONSTRAINT DF_Recetas_Porciones DEFAULT (4),
    Emoji           NVARCHAR(16)  NULL,
    Consejo         NVARCHAR(600) NULL,
    BusquedaImagen  NVARCHAR(150) NULL,
    ImagenUrl       NVARCHAR(600) NULL
);
GO

CREATE TABLE dbo.RecetaIngredientes (
    Id             INT IDENTITY(1,1) NOT NULL CONSTRAINT PK_RecetaIngredientes PRIMARY KEY,
    RecetaId       INT           NOT NULL CONSTRAINT FK_RecetaIngredientes_Receta REFERENCES dbo.Recetas(Id) ON DELETE CASCADE,
    IngredienteId  INT           NOT NULL CONSTRAINT FK_RecetaIngredientes_Ingrediente REFERENCES dbo.Ingredientes(Id),
    Cantidad       DECIMAL(10,2) NULL,  -- NULL cuando la unidad es "a gusto"
    UnidadId       INT           NOT NULL CONSTRAINT FK_RecetaIngredientes_Unidad REFERENCES dbo.Unidades(Id),
    Tamanio        NVARCHAR(10)  NULL CONSTRAINT CK_RecetaIngredientes_Tamanio CHECK (Tamanio IN (N'chico', N'mediano', N'grande')),
    Nota           NVARCHAR(150) NULL,
    EsOpcional     BIT           NOT NULL CONSTRAINT DF_RecetaIngredientes_EsOpcional DEFAULT (0),
    Orden          INT           NOT NULL CONSTRAINT DF_RecetaIngredientes_Orden DEFAULT (0),
    CONSTRAINT UQ_RecetaIngredientes UNIQUE (RecetaId, IngredienteId)
);
GO
CREATE INDEX IX_RecetaIngredientes_Ingrediente ON dbo.RecetaIngredientes(IngredienteId);
GO

CREATE TABLE dbo.RecetaPasos (
    Id           INT IDENTITY(1,1) NOT NULL CONSTRAINT PK_RecetaPasos PRIMARY KEY,
    RecetaId     INT           NOT NULL CONSTRAINT FK_RecetaPasos_Receta REFERENCES dbo.Recetas(Id) ON DELETE CASCADE,
    Numero       INT           NOT NULL,
    Titulo       NVARCHAR(100) NOT NULL,
    Descripcion  NVARCHAR(MAX) NOT NULL,
    Minutos      INT           NULL,
    CONSTRAINT UQ_RecetaPasos UNIQUE (RecetaId, Numero)
);
GO

PRINT N'Base ThinkEat creada. Ahora ejecutá 02_datos.sql';
GO

SET NOEXEC OFF;
GO
