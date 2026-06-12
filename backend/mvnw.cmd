@REM ----------------------------------------------------------------------------
@REM Maven Start Up Batch script
@REM ----------------------------------------------------------------------------
@IF "%__MVNW_ARG0_NAME__%"=="" (SET "BASE_DIR=%~dp0") ELSE (SET "BASE_DIR=%__MVNW_ARG0_NAME__%")
@SET MAVEN_PROJECTBASEDIR=%BASE_DIR%
@SET WRAPPER_JAR="%MAVEN_PROJECTBASEDIR%\.mvn\wrapper\maven-wrapper.jar"
@SET WRAPPER_LAUNCHER=org.apache.maven.wrapper.MavenWrapperMain
@SET DOWNLOAD_URL="https://repo.maven.apache.org/maven2/org/apache/maven/wrapper/maven-wrapper/3.2.0/maven-wrapper-3.2.0.jar"

@SET JAVA_HOME_DISCOVERED=
@FOR /F "tokens=*" %%i IN ('where java 2^>NUL') DO (
    @IF "%%i" NEQ "" SET "JAVA_HOME_DISCOVERED=%%~dpi.."
)
@IF NOT "%JAVA_HOME%"=="" SET "JAVA_HOME_DISCOVERED=%JAVA_HOME%"

@SET JAVA_EXE=java
@IF NOT "%JAVA_HOME_DISCOVERED%"=="" SET "JAVA_EXE=%JAVA_HOME_DISCOVERED%\bin\java"

@IF NOT EXIST %WRAPPER_JAR% (
    @ECHO Downloading Maven Wrapper...
    %JAVA_EXE% -cp "" "-Dorg.apache.maven.wrapper.MavenWrapperMain.downloadUrl=%DOWNLOAD_URL%" ^
        -classpath "" org.apache.maven.wrapper.MavenWrapperMain >NUL 2>&1
    powershell -Command "Invoke-WebRequest -Uri %DOWNLOAD_URL% -OutFile %WRAPPER_JAR%"
)

%JAVA_EXE% -classpath %WRAPPER_JAR% %WRAPPER_LAUNCHER% %MAVEN_PROJECTBASEDIR% %*
