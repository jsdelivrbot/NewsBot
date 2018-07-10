/*

Botkit Studio Skill module to enhance the "What&#x27;s the news?" script

*/


module.exports = function(controller) {
    // define a before hook
    // you may define multiple before hooks. they will run in the order they are defined.
    // See: https://botkit.ai/docs/readme-studio.html#controllerstudiobefore
    controller.studio.before('What&#x27;s the news?', function(convo, next) {

        // do some preparation before the conversation starts...
        // for example, set variables to be used in the message templates
        // convo.setVar('foo','bar');

        console.log('BEFORE: What&#x27;s the news?');
        // don't forget to call next, or your conversation will never continue.
        next();

    });

    /* Validators */
    // Fire a function whenever a variable is set because of user input
    // See: https://botkit.ai/docs/readme-studio.html#controllerstudiovalidate
    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

  
  controller.hears(['What&#x27;s the news?'], 'direct_message,direct_mention', function(bot, message) {

        bot.startConversation(message, function(err, convo) {
            convo.say('Let me see...');

            convo.ask('What do you want to know?', function(response, convo) {

                convo.say('Cool, I want to know about ' + response.text + ' too!');
                convo.next();

            });
        });

    });


  
    // Validate user input: question_2
    controller.studio.validate('What&#x27;s the news?','question_2', function(convo, next) {

        var value = convo.extractResponse('question_2');

        // test or validate value somehow
        // can call convo.gotoThread() to change direction of conversation

        console.log('VALIDATE: What&#x27;s the news? VARIABLE: question_2');

        // always call next!
        next();

    });

    // Validate user input: question_3
    controller.studio.validate('What&#x27;s the news?','question_3', function(convo, next) {

        var value = convo.extractResponse('question_3');

        // test or validate value somehow
        // can call convo.gotoThread() to change direction of conversation

        console.log('VALIDATE: What&#x27;s the news? VARIABLE: question_3');

        // always call next!
        next();

    });

    /* Thread Hooks */
    // Hook functions in-between threads with beforeThread
    // See: https://botkit.ai/docs/readme-studio.html#controllerstudiobeforethread
    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    // Before the default thread starts, run this:
    controller.studio.beforeThread('What&#x27;s the news?','default', function(convo, next) {

        /// do something fun and useful
        // convo.setVar('name','value');

        console.log('In the script *What&#x27;s the news?*, about to start the thread *default*');

        // always call next!
        next();
    });

    // Before the on_timeout thread starts, run this:
    controller.studio.beforeThread('What&#x27;s the news?','on_timeout', function(convo, next) {

        /// do something fun and useful
        // convo.setVar('name','value');

        console.log('In the script *What&#x27;s the news?*, about to start the thread *on_timeout*');

        // always call next!
        next();
    });


    // define an after hook
    // you may define multiple after hooks. they will run in the order they are defined.
    // See: https://botkit.ai/docs/readme-studio.html#controllerstudioafter
    controller.studio.after('What&#x27;s the news?', function(convo, next) {

        console.log('AFTER: What&#x27;s the news?');

        // handle the outcome of the convo
        if (convo.successful()) {

            var responses = convo.extractResponses();
            // do something with the responses

        }

        // don't forget to call next, or your conversation will never properly complete.
        next();
    });
}
