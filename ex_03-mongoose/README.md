## Node Course

1. **Javascript**
   
    realizzazione di un app con esecuzione con node.js
    
    in questo primo esempio vedremo l'utilizzo del modulo:
    
        npm i command-line-args --save
        npm i mongoose --save
     
    che consentono:
    
    1. *command-line-args*: l'inserimento di argomenti da riga di comando nel terminale
   
    2. *mongooose*: l'utilizzo del db NO-SQL mongodb per effettuare le operazioni CRUD
    che consente di effettuare le operazioni CRUD sul db NO-SQL mongodb


### *Guida utilizzo*: 
   
inserendo da riga di comando i seguenti argomenti per effetturare le operazioni CRUD:

  - *insert*
  - *update*
  - *delete*
  - *find*
  - *exit*

1. *inserimento singolo*: 
   
        node server.js --insert '{ "title": "Sincero", "author": "Morgan", "price": 210, "available": true }'

2. *ricerca tutti*:
    
        node server.js --find all '{  "author": "Morgan" }'

3. *ricerca un elemento*:
    
        node server.js --find one '{  "author": "Paolo Rossi" }'

4. *ricerca un elemento by id*:
    
        node server.js --find id '{ "_id": "5e4ff2da63fdd10b77380dd4" }'

5. *aggiorna un elemento*:
    
        node server.js --update '{ "title": "Sincero" }' '{ "author": "Morgan e Bugo" }'

6. *elimina un elemento*:
    
        node server.js --delete '{ "title": "Sincero" }' 

