/*

MetBot responds with the top 3 articles on MetLife and the top 3 articles on 
insurance from Google's news API

*/

const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('ac625565dfc847019c3369e3c4b3ea73');

module.exports = function(controller) {

    controller.hears(['news'], 'direct_message', function(bot, message) {

        bot.startConversation(message, function(err, convo) {

                queryToSlack('MetLife', 3).then(function (metNews) {
                
                  console.log(metNews);
                  
                  queryToSlack('Insurance', 3).then(function (insuranceNews) {
                    
                  
                    bot.reply(message, {
                              
                             "attachments": [ metNews ]
                      
                    });
                  
                  });
                
                });
              
                //var insuranceNews = queryToSlack('Insurance', 3);
                //console.log(insuranceNews);
                      
                convo.stop();
          
        });

    });

};


function queryToSlack(q, n) {
  
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
  
  
  return newsapi.v2.everything({
                  
                  q: q,
                  
                  from: weekAgo,
                  
                  to: today,
                  
                  language: 'en',
                  
                  sortBy: 'popularity',
                  
                  page: 1
                  
                }).then(response => {
                  
                    var color;
    
                    if(q == 'Insurance'){ color = "#0090da"; }
                    else if(q == 'MetLife') { color = "#a4ce4e"; }
                    else { color = "#000000"; }
                    
                    if(response.articles[0].title){
                    
                      console.log(response.totalResults + " articles found");
                          
                     var articles = '\{"fallback": "News on ' + q + '"' +
                          ',\n"color": "' + color + 
                          '",\n"author_name": "' + response.articles[0].source.name + 
                          '",\n"title": "' + response.articles[0].title + 
                          '",\n"title_link": "' + response.articles[0].url + 
                          '",\n"text": "' + response.articles[0].description +
                          '",\n"ts": "123456789"\}\n';
                      
                      var i = 1;
                      while(i < n){
                        articles = articles + '\{"fallback": "News on ' + q + '"' +
                          ',\n"color": "' + color + 
                          '",\n"author_name": "' + response.articles[i].source.name + 
                          '",\n"title": "' + response.articles[i].title + 
                          '",\n"title_link": "' + response.articles[i].url + 
                          '",\n"text": "' + response.articles[i].description +
                          '",\n"ts": "123456789"\}\n';
                        
                        i++;
                      }
                      
                      console.log(articles);
                      
                      return articles;
                    
                    } else { 
                      
                      console.log('No articles found');
                      var noArticles = 'No articles on ' + q + ' found this week';
                      
                      return noArticles;
                      
                           }
                   
                }); 
  
}


