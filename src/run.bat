tasklist /FI "IMAGENAME eq mongod.exe" 2>NUL | find /I /N "mongod.exe">NUL
if NOT "%ERRORLEVEL%"=="0" @start db.bat

@start run.base.bat

@exit