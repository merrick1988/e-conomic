To view the test tasks, you need to open index.html.
For data storage was used localStorage. For helping user to fill form were used extra plugins. The list of supporting plugins bellow:
 - bootstrap-datepicker for calendar;
 - mask for adding a "limit input";
 - chosen.jquery for  implementing a "enhanced select";
 
This app was tested in the same in Google Chrome 26.0, FireFox 20.0.1, Opera 12.11, Safary 5.1.7.
For IE displays "Attention message";
Tools that were used to work on the test task are listed below

- WebStorm 6.0.1
- Adobe Photoshop CS6
- Google Chrome for main development(Chrome DevTools for debuging)


rem Place this file to your %CATALINA_BASE%\bin
 
rem set this unless you have it alredy in environment variables
set JAVA_OPTS=-Xmx512m
 
rem set path to your Java 6 JDK here
set JAVA_HOME=c:\progra~1\java\jdk1.6.0_35
 
rem these are required for Tomcat debuggig only
set JPDA_TRANSPORT=dt_socket
set JPDA_ADDRESS=8000
 
rem Do not try to setup following as env variables. They need to be configured in %CATALINA_BASE%\bin\setenv.bat
set CATALINA_OPTS=-Xmx1024m -XX:MaxPermSize=512M -Dlog4j.configuration=file:/%CATALINA_BASE%/external-conf/log4j-config.xml
set CLASSPATH=%CATALINA_BASE%\external-conf;%CLASSPATH%
