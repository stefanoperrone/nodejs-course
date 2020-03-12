## Node Course

1. **Javascript**
   
    realizzazione di un app con esecuzione con node.js
    
    in questo primo esempio vedremo l'utilizzo dei moduli:
    
        npm i command-line-args --save
        npm i mongodb --save
     
    che consentono:
    
    1. *command-line-args*: l'inserimento di argomenti da riga di comando nel terminale
   
    2. *mongodb*: l'utilizzo del db NO-SQL mongodb per effettuare le operazioni CRUD


### *Guida utilizzo*: 

inserendo da riga di comando i seguenti argomenti per effetturare le operazioni CRUD:

  - *insert*
  - *update*
  - *delete*
  - *find*
  - *exit*

1. *inserimento singolo*: 
   
        node app.js --insert '{ "title": "js", "hours": 10, "level": "basic" }'

2. *inserimento multiplo*:
   
        node app.js --insert '[{ "title": "js", "hours": 10, "level": "basic" },{ "title": "react", "hours": 29, "level": "middle"}]'

3. *ricerca tutti*:
    
        node app.js --find all

4. *ricerca un elemento*:
    
        node app.js --find  '{ "title": "nodejs" }'

5. *aggiorna un elemento*:
    
        node app.js --update '{ "title": "nodejs" }' '{ "level": "low" }'

6. *elimina un elemento*:
    
        node app.js --delete 'one' '{ "title": "nodejs" }' 

7. *elimina elementi per campo*:
    
        node app.js --delete 'many' '{ "level": "high" }' 