## Node Course

1. **Javascript**
   
    realizzazione di un app con esecuzione con node.js
    
    in questo primo esempio vedremo l'utilizzo del modulo:
    
        npm i bcrypt --save
        npm i body-parser--save
        npm i express --save
        npm i jsonwebtoken --save
        npm i mongoose --save
        npm i swagger-ui-express --save
     
    che consentono:
    
    1. *bcrypt*: modulo per criptare le password
    
    2. *body-parser*: per effettuare il parser delle risposte in json
    
    3. *express*: modulo middleware per la gestione delle funzioni
    
    4. *jsonwebtoken*: modulo per generare un token in seguito all'autenticazione di un utente
       
    5. *mongooose*: l'utilizzo del db NO-SQL mongodb per effettuare le operazioni CRUD che consente di effettuare le operazioni CRUD sul db NO-SQL mongodb
    
    6. *swagger-ui*: intefaccia grafica per interrogare le api
    

### *Guida utilizzo*: 

1. Shell: eseguire il comando per avviare applicativo

        nodemon app.js

2. Browser: aprire un browser ed accedere all'url
   
   *http://localhost:3000/api-docs/#/*
   
   dove sarà disponibile lo swagger per interrogare le api da interfaccia grafica


