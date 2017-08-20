# A ready-to-print CV written in AngularJs

This web application has been designed to be an interactive CV ready to be printed 
from the web browser. Interaction provided are :

- The ability to have, on the same page structure, a version for different languages
- The ability to slightly customise the CV with block that can be displayed or hidden 
  according a `resumeId`


## Context of the project

As I studied quite a lot of topics in Computer Science, from a bit of development to
network administration, security and even telecommunication maths and electronics.
So are my working experiences, I used to work on the Verification and Validation 
in the V-lifecycle of avionic software.

On my free time, I wanted to extend my panel of knowledge/skills by learning how to
develop modern web application.

### Choice of the language

Six month ago, I decided to learn more about *Javascript*, why it was becoming 
such a popular language, why it was both hated an beloved by web programmers and 
finally because it was a language I never used before, far from the OOP paradigm. 

Learning Javascript was the opportunity for me to not only learn the language, but 
also prototype-based inheritance, basics of functional programing, client heavy 
applications, RESTful API ... **So, this project is my first Javascript project**.

### Choice of the framework

Because I did not only wanted an interactive CV but also a way to publish my project,
I decided to use *GitHubPages* to host the CV, this constraint implies No Back-End 
programming. In aim to have a code with a MVC structured, I used 
[*AngularJs 1.4*](https://angularjs.org/). In addition, in aim to respect best-practices 
rules, the framework requires to use lots of Javascript specific functions.

As I wanted to build an application with Angular I decided to limit the number of 
angular plugin, such as additional directives or services.

Finally I used [Bootstrap 3](http://getbootstrap.com) (to structure both the web 
page and the page to print), [Chart.js 1.0.2](http://www.chartjs.org/) (to display 
charts in the *Skills* Section and [Font Awesome](http://fontawesome.io/) (to display 
some pictogram). 

## Presentation 

### Page `/resume`

This page requires 2 mandatory parameters `#/resume/:localeId/:resumeId` :

-   `:localeId` is the locale code that will identify the data to be selected in
    `dataCV.Json`
-   `:resumeId` is the identifier of the resume to conditionally display some blocks
    or some fields in the CV

All the angular code of the CV is in `./app/resume/resume.js`, this files includes 
the route configuration, the directive definitions, the filter definitions, the
services and the controller of the page.

