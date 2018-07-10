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

            convo.ask('What are you interested in?', function(response, convo) {

                convo.say('I am interested in ' + response.text + ' too');
                convo.next();

            });
        });

    });

};

