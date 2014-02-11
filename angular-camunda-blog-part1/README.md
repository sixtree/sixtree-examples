Files needed before starting:

- camunda-bpm-tomcat-7.1.0-alpha1.zip
- NodeJS v0.10.12 or greater (OS install)
- Maven 3.0.4 or greater

Optional:

- For editing/viewing the BPMN flow: camunda-modeler-indigo-latest.zip (alternatively, the Camunda BPM plugin for Eclipse) 

---

*Camunda BPM*

- Unzip camunda-bpm-tomcat-7.1.0-alpha1.zip to INSTALL_DIR\camunda-bpm-tomcat-7.1.0-alpha1
- Edit INSTALL_DIR\camunda-bpm-tomcat-7.1.0-alpha1\server\apache-tomcat-7.0.33\conf\server.xml and change 8080 to 8082
- In the folder camunda-bpm-project run:

		mvn install

- You may need to configure a proxy if the above fails (http://maven.apache.org/guides/mini/guide-proxies.html)

- Copy camunda-bpm-project\target\camunda-bpm-project-0.0.1-SNAPSHOT.war to INSTALL_DIR\camunda-bpm-tomcat-7.1.0-alpha1\server\apache-tomcat-7.0.33\webapps

*NodeJS*

- Install node.js and have 'node' and 'npm' available on the command line

		cd angular-project
		npm install request
		npm install express	
---

- DemoURL : http://localhost:8081/
		
- Start NodeJS:

		cd INSTALL_DIR\angular-project
		node server.js
		
- Start Camunda BPM Tomcat:

		INSTALL_DIR\camunda-bpm-tomcat-7.1.0-alpha1\start-camunda.bat