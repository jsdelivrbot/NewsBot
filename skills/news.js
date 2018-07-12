/*

WHAT IS THIS?

This module demonstrates simple uses of Botkit's conversation system.

In this example, Botkit hears a keyword, then asks a question. Different paths
through the conversation are chosen based on the user's response.

*/

const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('ac625565dfc847019c3369e3c4b3ea73');

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
          
            var obj;
          
                newsapi.v2.topHeadlines({
                  
                  q: 'insurance',
                  
                  category: 'business',
                  
                  language: 'en'
                  
                }).then(response => {
                  
                   console.log(response);
                   convo.say(response.articles[0].author + '\ ' + response.articles[0].author);
                   
                  
                });
          
            convo.next();
        });

    });

};


