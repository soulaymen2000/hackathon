-- Enable mixed mode authentication and reset sa password
USE [master]
GO
EXEC xp_instance_regwrite N'HKEY_LOCAL_MACHINE', N'Software\Microsoft\MSSQLServer\MSSQLServer', N'LoginMode', REG_DWORD, 2
GO
ALTER LOGIN [sa] WITH PASSWORD=N'azer'
GO
ALTER LOGIN [sa] ENABLE
GO

-- Restart SQL Server for changes to take effect
SHUTDOWN WITH NOWAIT
GO
