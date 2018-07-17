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
                  
                  var news = JSON.parse(metNews);
          
                  
                  
                  bot.reply(message, { attachments: [fallback: 'News on' + q,
                          color: color,
                          author_name: response.articles[i].source.name, 
                          title: response.articles[i].title,
                          title_link: response.articles[i].url, 
                          text: response.articles[i].description,
                          ts: 123456789 }]);
                
                });
      
          
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
                      
                      var i = 0;
                      var articles = '';
                      
                      while(i < n - 1 && n <= response.totalResults){
                        articles = articles + {fallback: 'News on' + q,
                          color: color,
                          author_name: response.articles[i].source.name, 
                          title: response.articles[i].title,
                          title_link: response.articles[i].url, 
                          text: response.articles[i].description,
                          ts: 123456789},
                        
                        i++;
                      }
                      
                      articles = articles + {fallback: 'News on' + q,
                          color: color,
                          author_name: response.articles[i].source.name, 
                          title: response.articles[i].title,
                          title_link: response.articles[i].url, 
                          text: response.articles[i].description,
                          ts: 123456789}
                        
                      
                      return JSON.stringify(articles);
                    
                    } else { 
                      
                      console.log('No articles found');
                      var noArticles = 'No articles on ' + q + ' found this week';
                      
                      return noArticles;
                      
                           }
                   
                }); 
  
}


