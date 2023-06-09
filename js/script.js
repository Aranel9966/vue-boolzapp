/*
Milestone 1
Replica della grafica con la possibilità di avere messaggi scritti dall’utente (verdi) e dall’interlocutore (bianco) assegnando due classi CSS diverse
Visualizzazione dinamica della lista contatti: tramite la direttiva v-for, visualizzare nome e immagine di ogni contatto

Milestone 2
Visualizzazione dinamica dei messaggi: tramite la direttiva v-for, visualizzare tutti i messaggi relativi al contatto attivo all’interno del pannello della conversazione
Click sul contatto mostra la conversazione del contatto cliccato

Milestone 3
Aggiunta di un messaggio: l’utente scrive un testo nella parte bassa e digitando “enter” il testo viene aggiunto al thread sopra, come messaggio verde
Risposta dall’interlocutore: ad ogni inserimento di un messaggio, l’utente riceverà un “ok” come risposta, che apparirà dopo 1 secondo.

Milestone 4
Ricerca utenti: scrivendo qualcosa nell’input a sinistra, vengono visualizzati solo i contatti il cui nome contiene le lettere inserite (es, Marco, Matteo Martina -> Scrivo “mar” rimangono solo Marco e Martina)

Milestone 5 - opzionale
Cancella messaggio: cliccando sul messaggio appare un menu a tendina che permette di cancellare il messaggio selezionato

*/

// collegamento luxon per gestire data e ora 
var DateTime = luxon.DateTime;

const { createApp } = Vue

  createApp({
    data() {
      return {
        contacts: [
            {
                name: 'Michele',
                avatar: './img/avatar_1.jpg',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Hai portato a spasso il cane?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Ricordati di stendere i panni',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 16:15:22',
                        message: 'Tutto fatto!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Fabio',
                avatar: './img/avatar_2.jpg',
                visible: true,
                messages: [
                    {
                        date: '20/03/2020 16:30:00',
                        message: 'Ciao come stai?',
                        status: 'sent'
                    },
                    {
                        date: '20/03/2020 16:30:55',
                        message: 'Bene grazie! Stasera ci vediamo?',
                        status: 'received'
                    },
                    {
                        date: '20/03/2020 16:35:00',
                        message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                        status: 'sent'
                    }
                ],
            },
            {
                name: 'Samuele',
                avatar: './img/avatar_3.jpg',
                visible: true,
                messages: [
                    {
                        date: '28/03/2020 10:10:40',
                        message: 'La Marianna va in campagna',
                        status: 'received'
                    },
                    {
                        date: '28/03/2020 10:20:10',
                        message: 'Sicuro di non aver sbagliato chat?',
                        status: 'sent'
                    },
                    {
                        date: '28/03/2020 16:15:22',
                        message: 'Ah scusa!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Alessandro B.',
                avatar: './img/avatar_4.jpg',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Lo sai che ha aperto una nuova pizzeria?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Si, ma preferirei andare al cinema',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Alessandro L.',
                avatar: './img/avatar_5.jpg',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Ricordati di chiamare la nonna',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Va bene, stasera la sento',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Claudia',
                avatar: './img/avatar_5.jpg',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Ciao Claudia, hai novità?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Non ancora',
                        status: 'received'
                    },
                    {
                        date: '10/01/2020 15:51:00',
                        message: 'Nessuna nuova, buona nuova',
                        status: 'sent'
                    }
                ],
            },
            {
                name: 'Federico',
                avatar: './img/avatar_7.jpg',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Fai gli auguri a Martina che è il suo compleanno!',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Grazie per avermelo ricordato, le scrivo subito!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Davide',
                avatar: './img/avatar_8.jpg',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Ciao, andiamo a mangiare la pizza stasera?',
                        status: 'received'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:51:00',
                        message: 'OK!!',
                        status: 'received'
                    }
                ],
            }
        ],

        newChat:0,

        sendMessage:{
            date : DateTime.now().toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS),
            message: '',
            status: 'sent'
        },
        
        arrayMessage:['ciao','come va','okay','va bene','si','no'],

        search:'',

        staScrivendo:'',
        
      }
    },
    
    methods: {
        //funzione che permette di collegare l'indice delle chat 
        selectChat(i){
            this.newChat=i
        },
        // funzione che permette di inviare il testo scritto 
        keyEnter(){
            if(this.sendMessage.message=='' ){
                return
            }else{

                this.contacts[this.newChat].messages.push( this.sendMessage)
                this.sendMessage={
                    date: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS),            
                    message: '',
                    status: 'sent'
                },
    
                this.response(this.newChat) 
                
            }
        },
        // funzione che restituisce un messaggio di risposta 
        response(i){
            this.staScrivendo='sta scrivendo...'
            setTimeout(() => {
                let numberMessage=Math.floor((Math.random()* this.arrayMessage.length-1))+1
                this.contacts[i].messages.push({
                    date: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS),
                    message:this.arrayMessage[numberMessage],
                    status: 'received'
                })
                this.staScrivendo='online'
                setTimeout(() => {
                    this.staScrivendo= ''
                },4000)
                
            }, 2000);

        },
        //funzione che permette di visualizare i dati del messaggio
        infoMessage(index){
            let info =this.contacts[this.newChat]
            alert(
               ` INFO MESSAGGIO: \n 
               tipo:  ${info.messages[index].status} \n
               messaggio: ${info.messages[index].message} \n
               data/ora: ${info.messages[index].date}
                `
            )
        },
        //funzione che permette di eliminare i messaggi 
        deletMessage(index){
            let info =this.contacts[this.newChat]  
           info.messages.splice(index,1)
        },
        //funzione che permette di eliminare tutti i messaggi 
        removeChat(i){
            
            console.log('elimina')
            this.contacts[this.newChat].messages.splice(i, 100);
        }
    },

    // metodo 2 con computed ad ogni rendering si eseguira la funzuone 
    // computed: {
    // funzione che se messa dentro il v-for al posto del'array restituisce l'array filtrato
    //     filteredList() {
    //         return this.contacts.filter(contact => {
    //           return contact.name.toLowerCase().includes(this.search.toLowerCase())
    //         })
    //       }
    // }

  }).mount('#app')

  
  
    