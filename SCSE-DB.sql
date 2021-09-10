USE [master]
GO
/****** Object:  Database [SCSE_DB]    Script Date: 09/09/2021 7:39:43 CH ******/
CREATE DATABASE [SCSE_DB]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'SCSE_DB', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\SCSE_DB.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'SCSE_DB_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\SCSE_DB_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [SCSE_DB] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [SCSE_DB].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [SCSE_DB] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [SCSE_DB] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [SCSE_DB] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [SCSE_DB] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [SCSE_DB] SET ARITHABORT OFF 
GO
ALTER DATABASE [SCSE_DB] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [SCSE_DB] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [SCSE_DB] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [SCSE_DB] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [SCSE_DB] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [SCSE_DB] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [SCSE_DB] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [SCSE_DB] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [SCSE_DB] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [SCSE_DB] SET  ENABLE_BROKER 
GO
ALTER DATABASE [SCSE_DB] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [SCSE_DB] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [SCSE_DB] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [SCSE_DB] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [SCSE_DB] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [SCSE_DB] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [SCSE_DB] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [SCSE_DB] SET RECOVERY FULL 
GO
ALTER DATABASE [SCSE_DB] SET  MULTI_USER 
GO
ALTER DATABASE [SCSE_DB] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [SCSE_DB] SET DB_CHAINING OFF 
GO
ALTER DATABASE [SCSE_DB] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [SCSE_DB] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [SCSE_DB] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [SCSE_DB] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'SCSE_DB', N'ON'
GO
ALTER DATABASE [SCSE_DB] SET QUERY_STORE = OFF
GO
USE [SCSE_DB]
GO
/****** Object:  Table [dbo].[Role]    Script Date: 09/09/2021 7:39:43 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Role](
	[IDRole] [int] IDENTITY(1,1) NOT NULL,
	[RoleName] [nvarchar](50) NULL,
 CONSTRAINT [PK_Role] PRIMARY KEY CLUSTERED 
(
	[IDRole] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Account]    Script Date: 09/09/2021 7:39:43 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Account](
	[IDUser] [int] IDENTITY(1,1) NOT NULL,
	[IDRole] [int] NULL,
	[Email] [nvarchar](50) NULL,
	[Username] [nvarchar](50) NULL,
	[Password] [nvarchar](50) NULL,
	[IsActive] [bit] NULL,
	[CreatedByDate] [date] NULL,
	[Phone] [varchar](20) NULL,
	[FullName] [nvarchar](50) NULL,
	[Image] [nvarchar](max) NULL,
	[Sex] [nvarchar](50) NULL,
 CONSTRAINT [PK_Account_1] PRIMARY KEY CLUSTERED 
(
	[IDUser] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  View [dbo].[LoginRole]    Script Date: 09/09/2021 7:39:43 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[LoginRole] AS
SELECT acc.IDUser, acc.Fullname, q.RoleName, acc.Username, acc.Password, acc.Email, acc.CreatedByDate
FROM Account acc, Role q
WHERE q.IDRole = acc.IDRole
GO
/****** Object:  Table [dbo].[BankInformation]    Script Date: 09/09/2021 7:39:43 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BankInformation](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[IDBank] [int] NOT NULL,
	[AccountName] [nvarchar](50) NULL,
	[BankName] [nvarchar](50) NULL,
	[AccountNumber] [varchar](20) NULL,
	[Branch] [nvarchar](50) NULL,
	[Details] [nvarchar](50) NULL,
 CONSTRAINT [PK_BankInformation_1] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Banner]    Script Date: 09/09/2021 7:39:43 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Banner](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NULL,
	[Image] [nvarchar](max) NULL,
	[CreatedByUser] [nvarchar](50) NULL,
	[CreatedByDate] [date] NULL,
	[UpdateByUser] [nvarchar](50) NULL,
	[UpdatedByDate] [date] NULL,
 CONSTRAINT [PK_Banner] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Category]    Script Date: 09/09/2021 7:39:43 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Category](
	[IDCat] [int] IDENTITY(1,1) NOT NULL,
	[CategoryName] [nvarchar](50) NULL,
	[Slug] [nvarchar](max) NULL,
	[IDparent] [int] NULL,
 CONSTRAINT [PK_Category] PRIMARY KEY CLUSTERED 
(
	[IDCat] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Contact]    Script Date: 09/09/2021 7:39:43 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Contact](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[FirstName] [nvarchar](50) NULL,
	[LastName] [nvarchar](50) NULL,
	[Phone] [varchar](20) NULL,
	[Email] [nvarchar](50) NULL,
	[Details] [nvarchar](50) NULL,
	[CreatedByDate] [date] NULL,
	[UpdatedByDate] [date] NULL,
 CONSTRAINT [PK_Contact] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ImgPortfolio]    Script Date: 09/09/2021 7:39:43 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ImgPortfolio](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[IDImg] [int] NOT NULL,
	[ImagePortfolio] [nvarchar](max) NULL,
 CONSTRAINT [PK_ImgPortfolio_1] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[OrganizationConfiguration]    Script Date: 09/09/2021 7:39:43 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[OrganizationConfiguration](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NULL,
	[Field] [nvarchar](50) NULL,
	[Phone] [varchar](20) NULL,
	[Email] [nvarchar](50) NULL,
	[Address] [nvarchar](50) NULL,
	[Logo] [nvarchar](max) NULL,
	[Fanpage] [nvarchar](max) NULL,
	[Youtube] [nvarchar](max) NULL,
	[IDBank] [int] NULL,
	[UpdatedByUser] [nvarchar](50) NULL,
	[UpdatedByDate] [date] NULL,
 CONSTRAINT [PK_OrganizationConfiguration] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Partners]    Script Date: 09/09/2021 7:39:43 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Partners](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NULL,
	[Image] [nvarchar](max) NULL,
	[Field] [nvarchar](50) NULL,
	[Phone] [varchar](20) NULL,
	[Email] [nvarchar](50) NULL,
	[Address] [nvarchar](50) NULL,
	[Link] [nvarchar](max) NULL,
 CONSTRAINT [PK_Partners] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PhotoGallery]    Script Date: 09/09/2021 7:39:43 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PhotoGallery](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[IDCat] [int] NULL,
	[Title] [nvarchar](50) NULL,
	[Slug] [nvarchar](max) NULL,
	[Image] [nvarchar](max) NULL,
	[CreatedByDate] [date] NULL,
	[UpdatedByDate] [nchar](10) NULL,
 CONSTRAINT [PK_PhotoGallery] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Portfolio]    Script Date: 09/09/2021 7:39:43 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Portfolio](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[FullName] [nvarchar](50) NULL,
	[IDImg] [int] NULL,
	[Position] [nvarchar](50) NULL,
	[Details] [nvarchar](50) NULL,
 CONSTRAINT [PK_Portfolio] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Posts]    Script Date: 09/09/2021 7:39:43 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Posts](
	[IDPost] [int] IDENTITY(1,1) NOT NULL,
	[IDCat] [int] NULL,
	[Title] [nvarchar](50) NULL,
	[Slug] [nvarchar](max) NULL,
	[Details] [nvarchar](max) NULL,
	[Image] [nvarchar](max) NULL,
	[Video] [nvarchar](max) NULL,
	[CreatedByDate] [date] NULL,
	[Author] [nvarchar](50) NULL,
	[Status] [bit] NULL,
 CONSTRAINT [PK_Posts] PRIMARY KEY CLUSTERED 
(
	[IDPost] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Volunteer]    Script Date: 09/09/2021 7:39:43 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Volunteer](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[FirstName] [nvarchar](50) NULL,
	[LastName] [nvarchar](50) NULL,
	[DOB] [date] NULL,
	[Phone] [varchar](20) NULL,
	[Email] [nvarchar](50) NULL,
	[Address] [nvarchar](50) NULL,
	[Project] [nvarchar](50) NULL,
	[Purpose] [nvarchar](50) NULL,
	[Status] [nvarchar](50) NULL,
 CONSTRAINT [PK_Volunteer] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Account] ON 

INSERT [dbo].[Account] ([IDUser], [IDRole], [Email], [Username], [Password], [IsActive], [CreatedByDate], [Phone], [FullName], [Image], [Sex]) VALUES (9, NULL, NULL, NULL, NULL, NULL, CAST(N'2021-09-09' AS Date), NULL, NULL, NULL, NULL)
INSERT [dbo].[Account] ([IDUser], [IDRole], [Email], [Username], [Password], [IsActive], [CreatedByDate], [Phone], [FullName], [Image], [Sex]) VALUES (10, NULL, NULL, NULL, NULL, NULL, CAST(N'2021-09-09' AS Date), NULL, NULL, NULL, NULL)
INSERT [dbo].[Account] ([IDUser], [IDRole], [Email], [Username], [Password], [IsActive], [CreatedByDate], [Phone], [FullName], [Image], [Sex]) VALUES (11, NULL, NULL, NULL, NULL, NULL, CAST(N'2021-09-09' AS Date), NULL, NULL, NULL, NULL)
INSERT [dbo].[Account] ([IDUser], [IDRole], [Email], [Username], [Password], [IsActive], [CreatedByDate], [Phone], [FullName], [Image], [Sex]) VALUES (13, 1, N'abc@gmail.com', N'1231a', N'1', NULL, CAST(N'2021-09-09' AS Date), NULL, NULL, NULL, NULL)
INSERT [dbo].[Account] ([IDUser], [IDRole], [Email], [Username], [Password], [IsActive], [CreatedByDate], [Phone], [FullName], [Image], [Sex]) VALUES (15, 1, N'abc@gmail.com', N'1231a', N'1', NULL, CAST(N'2021-09-09' AS Date), NULL, NULL, NULL, NULL)
INSERT [dbo].[Account] ([IDUser], [IDRole], [Email], [Username], [Password], [IsActive], [CreatedByDate], [Phone], [FullName], [Image], [Sex]) VALUES (16, 1, N'abc@gmail.com', N'xyz', N'1', NULL, CAST(N'2021-09-09' AS Date), NULL, NULL, NULL, NULL)
INSERT [dbo].[Account] ([IDUser], [IDRole], [Email], [Username], [Password], [IsActive], [CreatedByDate], [Phone], [FullName], [Image], [Sex]) VALUES (17, 1, N'abc@gmail.com', N'abc', N'1', NULL, CAST(N'2021-09-09' AS Date), NULL, NULL, NULL, NULL)
SET IDENTITY_INSERT [dbo].[Account] OFF
GO
SET IDENTITY_INSERT [dbo].[Category] ON 

INSERT [dbo].[Category] ([IDCat], [CategoryName], [Slug], [IDparent]) VALUES (1, N'abc', N'1', 1)
SET IDENTITY_INSERT [dbo].[Category] OFF
GO
SET IDENTITY_INSERT [dbo].[Role] ON 

INSERT [dbo].[Role] ([IDRole], [RoleName]) VALUES (1, N'Admin')
SET IDENTITY_INSERT [dbo].[Role] OFF
GO
ALTER TABLE [dbo].[Account]  WITH CHECK ADD  CONSTRAINT [FK_Account_Role] FOREIGN KEY([IDRole])
REFERENCES [dbo].[Role] ([IDRole])
GO
ALTER TABLE [dbo].[Account] CHECK CONSTRAINT [FK_Account_Role]
GO
ALTER TABLE [dbo].[Posts]  WITH CHECK ADD  CONSTRAINT [FK_Posts_Category] FOREIGN KEY([IDCat])
REFERENCES [dbo].[Category] ([IDCat])
GO
ALTER TABLE [dbo].[Posts] CHECK CONSTRAINT [FK_Posts_Category]
GO
USE [master]
GO
ALTER DATABASE [SCSE_DB] SET  READ_WRITE 
GO
