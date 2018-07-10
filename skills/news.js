/*

WHAT IS THIS?

This module demonstrates simple uses of Botkit's conversation system.

In this example, Botkit hears a keyword, then asks a question. Different paths
through the conversation are chosen based on the user's response.

*/


module.exports = function(controller) {

    controller.hears(['news'], 'direct_message,direct_mention', function(bot, message) {

        bot.startConversation(message, function(err, convo) {
            convo.say('Hmm let me think...');

                var today = new Date();
                var dd = today.getDate();
                var mm = today.getMonth()+1; //January is 0!
                var yyyy = today.getFullYear();

                if(dd<10) {
                    dd = '0' + dd
                } 

                if(mm<10) {
                    mm = '0' + mm
                } 

                today = yyyy + '-' + mm + '-' + dd;
                document.write(today);
          
          var url = 'https://newsapi.org/v2/everything?' +
          'q=MetLife&' +
          'from=&' +
          today +
          'sortBy=popularity&' +
          'apiKey=ac625565dfc847019c3369e3c4b3ea73';

          var req = new Request(url);

          fetch(req)
          
              .then(function(response) {
                  console.log(response.json());
              })
            
        });

    });

};

