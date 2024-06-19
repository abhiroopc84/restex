const sampleResume = `resume:
  header:
    name: John Doe
    location: Bangalore, India
    email: johndoe@example.com
    phone: 9876543210
    social_networks:
      - network: LinkedIn
        username: johndoe
      - network: GitHub
        username: johndoe
  sections:
    Summary:
      type: text
      content:
        - A dedicated third-year undergraduate student in *Software Engineering* with a strong interest in mobile app development. Demonstrating a knack for *innovative solutions*, I am eager to apply my skills and knowledge to overcome challenges in the tech industry.
    Education:
      type: education
      content:
        - institution: National Institute of Technology
          location: Karnataka, India
          degree: B.Tech
          field: Software Engineering
          start_date: 2020-08
          end_date: 2024-05
          current: true
          highlights:
            - 'GPA: 9.12/10'
        - institution: Future Leaders Junior College
          location: Karnataka, India
          degree: Class XII
          start_date: 2018-04
          end_date: 2020-03
          current: false
          highlights:
            - 'GPA: 9.85/10'
        - institution: Sunshine High School
          location: Karnataka, India
          degree: Class X
          start_date: 2010-06
          end_date: 2018-03
          current: false
          highlights:
            - 'GPA: 9.70/10'
    Projects:
      type: general
      content:
        - name: ShopEasy
          date: 2023-02
          highlights:
            - Developed a mobile application for e-commerce using Flutter and Firebase.
            - Implemented user authentication and real-time database functionalities.
        - name: TaskManager Pro
          date: 2022-08
          highlights:
            - Created a task management web application using Angular and Node.js.
            - Designed a responsive user interface with Angular Material.
    Skills:
      type: oneline
      content:
        - label: Programming
          details: Dart, TypeScript, Java
        - label: Frameworks and Libraries
          details: Flutter, Angular, Node.js
        - label: Databases
          details: Firebase, MySQL
        - label: Tools & Technologies
          details: Docker, Jenkins
    Experience:
      type: experience
      content:
        - company: Google India
          location: Remote
          position: Software Engineering Virtual Experience Program
          start_date: 2024-03
          end_date: 2024-03
          current: false
          highlights:
            - Developed a scalable microservices architecture for a sample web application.
            - Created detailed documentation and tutorials to help new developers understand the architecture and deployment process.
    Certifications:
      type: general
      content:
        - name: Advanced Data Structures and Algorithms
          location: Remote
          institution: Coursera
          date: 2022-07
          highlights:
            - Mastered complex data structures and algorithms.
            - Implemented efficient solutions to a variety of computational problems.
    Publications:
      type: publication
      content:
        - title: Efficient Algorithms for Data Processing
          authors:
            - John Doe
            - Priya Kumar
          date: 2023-05
          journal: International Journal of Computer Science
          doi: 10.1234/abcd.5678efgh
          highlights:
            - Presented innovative algorithms for optimizing data processing in distributed systems.
`

export default sampleResume;