const resumeString = `
resume:
  header:
    name: Abhiroop Reddy Chattu
    location: Hyderabad, India
    email: abhiroopc84@gmail.com
    phone: +918125744904
    social_networks:
      - network: LinkedIn
        username: abhiroopreddyc
      - network: GitHub
        username: abhiroopc84
  sections:
    Summary:
      type: text
      content:
        - A motivated third-year undergraduate student pursuing a degree in *Computer Science* with a keen interest in full-stack development. Demonstrating a passion for *problem-solving*, I am committed to leveraging my skills and knowledge to tackle any challenges in software development.  
    Education:
      type: education
      content:
        - institution: Chaitanya Bharathi Institute of Technology
          location: Telangana, India
          degree: BE
          field: Computer Science Engineering
          start_date: 2021-11
          end_date: 2025-06
          current: true
          highlights:
            - 'GPA: 8.38/10'
        - institution: Excellencia Junior College
          location: Telangana, India
          degree: XII
          field: TSBIE
          start_date: 2019-04
          end_date: 2021-05
          current: false
          highlights:
            - 'GPA: 9.76/10'
        - institution: Kendriya Vidyalaya
          location: Telangana, India
          degree: X
          field: CBSE
          start_date: 2011-06
          end_date: 2019-03
          current: false
          highlights:
            - 'GPA: 9.58/10'
    Projects:
      type: general
      content:
        - name: ForgeCV
          date: 2024-03
          highlights:
            - Developed a web application for resume creation with React and Node.
            - Implemented RenderCV in Javascript
        - name: LiMS
          date: 2023-07
          highlights:
            - Developed a web application for basic library management with Django.
            - Implemented user and admin interface.
    Skills:
      type: oneline
      content:
        - label: Programming
          details: JavaScript, Python, C
        - label: Frameworks and Libraries
          details: React, NextJS, ExpressJS, Django
        - label: Databases
          details: Postgres, MongoDB
        - label: Tools & Technologies
          details: Git
    Experience:
      type: experience
      content:
        - company: AWS APAC on Forage
          location: Remote
          position: Solutions Architecture Virtual Experience Program
          start_date: 2024-03
          end_date: 2024-03
          current: false
          highlights:
            - Designed and simple and scalable hosting architecture based on Elastic
              Beanstalk for a client experiencing significant growth and slow response
              times.
            - Described my proposed architecture in plain language ensuring my client
              understood how it works and how costs will be calculated for it.
    Certifications:
      type: general
      content:
        - name: Introduction to Quantum Computing
          location: Remote
          institution: Qubit by Qubit & IBM
          date: 2022-04
          highlights:
            - Learnt to code quantum gates and circuits.
            - Implement quantum algorithms.
            - Ran code on a real quantum computer using IBM Quantum Lab.
`

const latexCode = `\\documentclass{resume}

    \\usepackage[left=0.4 in,top=0.4in,right=0.4 in,bottom=0.4in]{geometry}
    \\newcommand{\\tab}[1]{\\hspace{.2667\\textwidth}\\rlap{#1}} 
    \\newcommand{\\itab}[1]{\\hspace{0em}\\rlap{#1}}
    \\name{Abhiroop Reddy Chattu}
    \\address{918125744904 \\\\ Hyderabad, India \\\\ 
    \\href{mailto:abhiroopc84@gmail.com}{abhiroopc84@gmail.com}}
    \\address{
        {LinkedIn: abhiroopreddyc} \\\\ {GitHub: abhiroopc84} 
        }
    
    \\begin{document}
    
        \\begin{rSection}{Summary}
        {A motivated third-year undergraduate student pursuing a degree in *Computer Science* with a keen interest in full-stack development. Demonstrating a passion for *problem-solving*, I am committed to leveraging my skills and knowledge to tackle any challenges in software development.}
        \\end{rSection}
        
        \\begin{rSection}{Education}
        \\begin{itemize}
        
    \\item {\\bf Chaitanya Bharathi Institute of Technology} \\hfill 
    {\\textit{Telangana, India}}\\\\
    \\textit{BE} in \\textit{Computer Science Engineering} \\hfill
    {Nov. 2021 - Jun. 2025}
    \\begin{itemize}
        \\itemsep -3pt {} \\item GPA: 8.38/10
    \\end{itemize}
    
    \\item {\\bf Excellencia Junior College} \\hfill 
    {\\textit{Telangana, India}}\\\\
    \\textit{XII} in \\textit{TSBIE} \\hfill
    {Apr. 2019 - May. 2021}
    \\begin{itemize}
        \\itemsep -3pt {} \\item GPA: 9.76/10
    \\end{itemize}
    
    \\item {\\bf Kendriya Vidyalaya} \\hfill 
    {\\textit{Telangana, India}}\\\\
    \\textit{X} in \\textit{CBSE} \\hfill
    {Jun. 2011 - Mar. 2019}
    \\begin{itemize}
        \\itemsep -3pt {} \\item GPA: 9.58/10
    \\end{itemize}
    
    \\end{itemize}
        \\end{rSection}
        
        \\begin{rSection}{Projects}
        \\begin{itemize}
        
            \\item \\textbf{ForgeCV} \\hfill Mar. 2024
            
            \\begin{itemize}
                \\itemsep -3pt {} 
                
                \\item Developed a web application for resume creation with React and Node.
                \\item Implemented RenderCV in Javascript
             \\end{itemize}
            \\item \\textbf{LiMS} \\hfill Jul. 2023
            
            \\begin{itemize}
                \\itemsep -3pt {} 
                
                \\item Developed a web application for basic library management with Django.
                \\item Implemented user and admin interface.
             \\end{itemize}
        \\end{itemize}
        \\end{rSection}
        
        \\begin{rSection}{Skills}
        \\begin{tabular}{ @{} >{\\bfseries}l @{\\hspace{6ex}} l }
        Programming & JavaScript, Python, C\\\\
        Frameworks and Libraries & React, NextJS, ExpressJS, Django\\\\
        Databases & Postgres, MongoDB\\\\
        Tools \\& Technologies & Git
        \\end{tabular}
        \\end{rSection}
        
        \\begin{rSection}{Experience}
        \\begin{itemize}
        
            \\item \\textbf{Solutions Architecture Virtual Experience Program} \\hfill Mar. 2024 - Mar. 2024\\\\
            AWS APAC on Forage \\hfill \\textit{Remote}
            \\begin{itemize}
                \\itemsep -3pt {} 
                
                \\item Designed and simple and scalable hosting architecture based on Elastic Beanstalk for a client experiencing significant growth and slow response times.
                \\item Described my proposed architecture in plain language ensuring my client understood how it works and how costs will be calculated for it.
             \\end{itemize}
        \\end{itemize}
        \\end{rSection}
        
        \\begin{rSection}{Certifications}
        \\begin{itemize}
        
            \\item \\textbf{Introduction to Quantum Computing} \\hfill Apr. 2022
            \\\\Qubit by Qubit \\& IBM \\hfill \\textit{Remote}
            \\begin{itemize}
                \\itemsep -3pt {} 
                
                \\item Learnt to code quantum gates and circuits.
                \\item Implement quantum algorithms.
                \\item Ran code on a real quantum computer using IBM Quantum Lab.
             \\end{itemize}
        \\end{itemize}
        \\end{rSection}
        
    \\end{document}
  `

  export default latexCode;


const resume = `
resume:
  header:
    name: Abhiroop Reddy Chattu
    location: Hyderabad, India
    email: abhiroopc84@gmail.com
    phone: +918125744904
    social_networks:
      - network: LinkedIn
        username: abhiroopreddyc
      - network: GitHub
        username: abhiroopc84
  sections:
    Summary:
      type: text
      content:
        - A motivated third-year undergraduate student pursuing a degree in *Computer Science* with a keen interest in full-stack development. Demonstrating a passion for *problem-solving*, I am committed to leveraging my skills and knowledge to tackle any challenges in software development.  
    Education:
      type: education
      content:
        - institution: Chaitanya Bharathi Institute of Technology
          location: Telangana, India
          degree: BE
          field: Computer Science Engineering
          start_date: 2021-11
          end_date: 2025-06
          highlights:
            - 'GPA: 8.38/10'
        - institution: Excellencia Junior College
          location: Telangana, India
          degree: XII
          field: TSBIE
          start_date: 2019-04
          end_date: 2021-05
          highlights:
            - 'GPA: 9.76/10'
        - institution: Kendriya Vidyalaya
          location: Telangana, India
          degree: X
          field: CBSE
          start_date: 2011-06
          end_date: 2019-03
          highlights:
            - 'GPA: 9.58/10'
    Projects:
      type: general
      content:
        - name: ForgeCV
          date: 2024-03
          highlights:
            - Developed a web application for resume creation with React and Node.
            - Implemented RenderCV in Javascript
        - name: LiMS
          date: 2023-07
          highlights:
            - Developed a web application for basic library management with Django.
            - Implemented user and admin interface.
    Skills:
      type: oneline
      content:        
        - label: Programming
          details: JavaScript, Python, C
        - label: Frameworks and Libraries
          details: React, NextJS, ExpressJS, Django
        - label: Databases
          details: Postgres, MongoDB
        - label: Tools & Technologies
          details: Git
    Experience:
      type: experience
      content:
        - company: AWS APAC on Forage
          location: Remote
          position: Solutions Architecture Virtual Experience Program
          start_date: 2024-03
          end_date: 2024-03
          current: false
          highlights:
            - Designed and simple and scalable hosting architecture based on Elastic
              Beanstalk for a client experiencing significant growth and slow response
              times.
            - Described my proposed architecture in plain language ensuring my client
              understood how it works and how costs will be calculated for it.
    Certifications:
      type: general
      content:
        - name: Introduction to Quantum Computing
          location: Remote
          institution: Qubit by Qubit & IBM
          date: 2022-04
          highlights:
            - Learnt to code quantum gates and circuits.
            - Implement quantum algorithms.
            - Ran code on a real quantum computer using IBM Quantum Lab.`