var request = require("request");

var url = "http://api.namefake.com/";

var jsonEmoji = require('./emoji.json');
var Twit = require('twit');

var config = require('./config');
var T = new Twit(config);
var emojiPeople = jsonEmoji.EmojiDataArray[0].CVCategoryData.Data.split(",");
var emojiAnimal = jsonEmoji.EmojiDataArray[1].CVCategoryData.Data.split(",");
var emojiFood = jsonEmoji.EmojiDataArray[2].CVCategoryData.Data.split(",");
var emojiActivity = jsonEmoji.EmojiDataArray[3].CVCategoryData.Data.split(",");
var emojiPlaces = jsonEmoji.EmojiDataArray[4].CVCategoryData.Data.split(",");
var gender = jsonEmoji.EmojiDataArray[6].CVCategoryData.Data.split(",");
var year = jsonEmoji.EmojiDataArray[7].CVCategoryData.Data.split(",");
var friend = jsonEmoji.EmojiDataArray[8].CVCategoryData.Data.split(",");
var hi = jsonEmoji.EmojiDataArray[9].CVCategoryData.Data.split(",");

var jsonRes;
var name;
var timeout = 1000 * 60 * 60 * 4;

function tweetIt(){
  jsonRes = request({
      url: url,
      json: true
    }, function (error, response, body) {
      if (!error && response.statusCode === 200) {
          name = body.name;
          console.log( "inside: "+ body.name );//or  jsonRes['name']

          var tweet = {
            status: gender[Math.floor(Math.random()*2)]
            + ' is a '
            + emojiPeople[Math.floor(Math.random()*100)]
            + ' baby. "' + hi[Math.floor(Math.random()*6)]+ ', I am '
            + name + '. My favourite food is ' + emojiFood[Math.floor(Math.random()*50)]
            + '. I want a ' + emojiPeople[Math.floor(Math.random()*100)]
            + friend[Math.floor(Math.random()*2)] + ', I wish we have fun with '
            + emojiActivity[Math.floor(Math.random()*64)] + ' everyday."'
          };

        	T.post('statuses/update', tweet, tweeted);

      }
      console.log(tweet);
  });

	function tweeted(err,data,response){
		if(err){
			console.log("something went wrong!");
		}else{
			console.log("it works!");
		}
    setTimeout(tweetIt, timeout);
	}
}


tweetIt();



          // var tweet = {
          //   status: 'Here is a ' + year[Math.floor(Math.random()*99)] + '-year-old '
          //   + emojiPeople[Math.floor(Math.random()*100)] + ' new baby. '
          //   + gender[Math.floor(Math.random()*2)] + ' says: Hi, my name is ' + name
          //   + '. My favourite food is ' + emojiFood[Math.floor(Math.random()*50)]
          //   + ' and I have a very lovely pet ' + emojiAnimal[ Math.floor(Math.random()*100) ]
          //    + '. In the future, I wish my ' + friend[Math.floor(Math.random()*2)]
          //   + ' will be a ' + emojiPeople[Math.floor(Math.random()*100)]
          //   + ' person, and we will have fun with ' + emojiActivity[Math.floor(Math.random()*100)]
          //   + ' everyday. '
        	// };
