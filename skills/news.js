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
                  
                  queryToSlack('Insurance', 3).then(function (insuranceNews) {
                    
                    console.log(metNews);
                  
                    var message = '"attachments": [' + 
                                          metNews +
                                          ']'
                    
                    console.log(message);
                    
                    bot.reply(message, {
                      
                          "attachments": [
                                
                            {
                            "fallback": "News on MetLife",

                            "color": "#a4ce4e",

                            "author_name": "Gizmodo.com",

                            "title": "LifeLock Still Gives NRA Discount It Said It Ended After Parkland School Shooting",

                            "title_link": "https://gizmodo.com/lifelock-still-gives-nra-discount-it-said-it-ended-afte-1827556508",

                            "text": "After the Parkland, Florida, school shooting last year, in which 17 students and staff at Marjory Stoneman Douglas High School were killed, a slew of companies sought to distance themselves from the National Rifle Association. Read more...",

                            "ts": "123456789"
                            },

                            {

                            "fallback": "News on MetLife",

                            "color": "#a4ce4e",

                            "author_name": "Deadspin.com",

                            "title": "ROH And NJPW Just Ended WWE's 58-Year Stranglehold On Madison Square Garden",

                            "title_link": "https://deadspin.com/roh-njpw-just-ended-wwes-58-year-stranglehold-on-madi-1827579733",

                            "text": "Decades of pro wrestling history were upended via joint press release on Thursday when Ring of Honor, New Japan, and Madison Square Garden announced a joint show at “The World’s Most Famous Arena” for April 6, 2019. Unless an unannounced (but previously repor…",

                            "ts": "123456789"

                            },

                            {

                            "fallback": "News on MetLife",

                            "color": "#a4ce4e",

                            "author_name": "Smallbiztrends.com",

                            "title": "Job Market Remains Tight Despite Swelling Labor Force, SBE Council Reports",

                            "title_link": "https://smallbiztrends.com/2018/07/2018-june-jobs-report.html",

                            "text": "According to the 2018 June Jobs Report, one of the challenges small businesses are facing in finding talent to spur some growth is a thin pool of talent.",

                            "ts": "123456789"

                            }
                          ]
                      
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
                          
                     var articles = '\{"fallback": "News on ' + q + '"' +
                          ',\n"color": "' + color + 
                          '",\n"author_name": "' + response.articles[0].source.name + 
                          '",\n"title": "' + response.articles[0].title + 
                          '",\n"title_link": "' + response.articles[0].url + 
                          '",\n"text": "' + response.articles[0].description +
                          '",\n"ts": "123456789"\},\n';
                      
                      var i = 1;
                      while(i < n){
                        articles = articles + '\{\n"fallback": "News on ' + q + '"' +
                          ',\n"color": "' + color + 
                          '",\n"author_name": "' + response.articles[i].source.name + 
                          '",\n"title": "' + response.articles[i].title + 
                          '",\n"title_link": "' + response.articles[i].url + 
                          '",\n"text": "' + response.articles[i].description +
                          '",\n"ts": "123456789"\n},\n';
                        
                        i++;
                      }
                      
                      return articles;
                    
                    } else { 
                      
                      console.log('No articles found');
                      var noArticles = 'No articles on ' + q + ' found this week';
                      
                      return noArticles;
                      
                           }
                   
                }); 
  
}


