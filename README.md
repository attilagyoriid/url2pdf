# URL2PDF
> Tool capturing website as image and pdf via url given as environment variable
> 

## Table of Contents
- [URL2PDF](#url2pdf)
  - [Table of Contents](#table-of-contents)
  - [General Information](#general-information)
  - [Technologies Used](#technologies-used)
  - [Features](#features)
  - [Setup-Usage](#setup-usage)


## General Information
- Tool capture image and saves pdf from the image via url represented the website to be captured
- Main purpose: To generate pdf representation on the full page of websites - not only the visible viewport


## Technologies Used
- nodejs - javascript
- puppeteer
- images-to-pdf - node package
- pdf-image - node package
- docker - to provide reusable image with proper runtime


## Features
- capture image and save pdf on arbitrary webpage via url provided as env variable
- scheduling load time of the page
- can wait for web element to appear 


## Setup-Usage
**npm script usage:**

1. npm install

2. npm start --URL_TO_CAPTURE='"http://anyurl"' --PDF_NAME='name.pdf' --CSS_SELECTOR_TO_WAIT_FOR=".navigation .class" -- PAGE_LOAD_TIMEOUT=80 --WAIT_FOR_SELECTOR=80 --PAGE_WIDTH=1024

   **Arguments:**

   --URL_TO_CAPTURE: url representing the web page to capture, **mandatory!**

   --PDF_NAME: string, name of the pdf to be saved. *Optional. Default: result.pdf*

   --CSS_SELECTOR_TO_WAIT_FOR: string, css selector to wait for being appeared. *Optional. Default: if not provided it wont wait for a selector to appear.*
      In case of Grafana use: --CSS_SELECTOR_TO_WAIT_FOR=".dashboard-container .layout"

   --PAGE_LOAD_TIMEOUT: integer, Maximum navigation time in milliseconds, pass 0 to disable timeout. *Optional. Default: 60000.* As for dynamic sites sometimes it is not enough, cause it could return as load while parts of the pages still being  load. In that case use --CSS_SELECTOR_TO_WAIT_FOR

   --WAIT_FOR_SELECTOR: integer, Maximum time in milliseconds to wait for the selector defined. *Optional. Default: 8000*

   --PAGE_WIDTH: integer, the with of the page. *Optional. Default: 1920*

   

**Docker image usage:**

1. docker build -t url2pdf . (to build a local image)

2. docker run -e URL_TO_CAPTURE='"http://anyurl"' -e PDF_NAME='name.pdf' -e CSS_SELECTOR_TO_WAIT_FOR=".navigation .class"  -v ${PWD}/out:/app/output url2pdf

   **Arguments:**
   -v ${PWD}/out:/app/output - ${PWD}/out-> this will be the directory where the pdf will be generated - you can change it as you wish
   See entire argument list above 




