/*

WHAT IS THIS?

This module demonstrates simple uses of Botkit's conversation system.

In this example, Botkit hears a keyword, then asks a question. Different paths
through the conversation are chosen based on the user's response.

*/

const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('ac625565dfc847019c3369e3c4b3ea73');
var insuranceArticles;
var metArticles;

module.exports = function(controller) {

    controller.hears(['news'], 'direct_message', function(bot, message) {

        bot.startConversation(message, function(err, convo) {

                //gets todays date in the correct format for API
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
          
                //gets the date 1 week ago in correct format for API
                var oneWeekAgo = new Date();
                oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
          
                dd = oneWeekAgo.getDate();
                mm = oneWeekAgo.getMonth()+1; //January is 0!
                yyyy = oneWeekAgo.getFullYear();

                var weekAgo = yyyy + '-' + mm + '-' + dd;
          
                newsapi.v2.everything({
                  
                  q: 'Insurance',
                  
                  from: weekAgo,
                  
                  to: today,
                  
                  language: 'en',
                  
                  sortBy: 'popularity',
                  
                  page: 1
                  
                }).then(response => {
                  
                    if(response.articles[0].title){
                    
                      console.log(response.totalResults + " articles found");
                          
                      insuranceArticles = '<'+ response.articles[0].url + '|*' + response.articles[0].title + '*>\n*' + 
                          response.articles[0].source.name + '*\n' + response.articles[0].description + '\n';
                      
                      var i = 1;
                      while(i < 3){
                        insuranceArticles = insuranceArticles + '<'+ response.articles[i].url + '|*' + response.articles[i].title + '*>\n*' + 
                          response.articles[i].source.name + '*\n' + response.articles[i].description + '\n';
                        
                        i++;
                      }
                      
                      console.log(insuranceArticles);
                      
                    } else { 
                      
                      console.log('No articles found');
                      
                      convo.say('There were no top articles on insurance this week'); 
                      convo.next();
                      
                           }
                   
                  
                });
          
                
                newsapi.v2.everything({
                  
                  q: 'MetLife',
                  
                  from: weekAgo,
                  
                  to: today,
                  
                  language: 'en',
                  
                  sortBy: 'popularity',
                  
                  page: 1
                  
                }).then(response => {
                  
                    if(response.articles[0].title){
                    
                      console.log(response.totalResults + " articles found");
                          
                      metArticles = '<'+ response.articles[0].url + '|*' + response.articles[0].title + '*>\n*' + 
                          response.articles[0].source.name + '*\n' + response.articles[0].description + '\n';
                      
                      var i = 1;
                      while(i < 3){
                        metArticles = metArticles + '<'+ response.articles[i].url + '|*' + response.articles[i].title + '*>\n*' + 
                          response.articles[i].source.name + '*\n' + response.articles[i].description + '\n';
                        
                        i++;
                      }
                      
                      console.log(metArticles);
                    
                    } else { 
                      
                      console.log('No articles found');
                      metArticles = 'No articles on MetLife this week.'
                      
                           }
                   
                  
                }); 
          
          
                bot.reply(message, {   
                                
                              'text': 'Top Articles on MetLife\n' + metArticles + 'Top Articles on Insurance\n' + insuranceArticles
                      });
                      
                      convo.stop();     
          
        });

    });

};


