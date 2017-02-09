//////////////////////// JAVASCRIPT FOR VDAY 2015 /////////////////////

var card_data = [{"slug":"blizzard","social":"My heart's reserved for you","artist":"Emma Patti Harris","twitpic":"pic.twitter.com/ywM0xgh4Oe"},{"slug":"divine","social":"You're simply Divine","artist":"Kalani Gordon","twitpic":"pic.twitter.com/Gf6sq7F8xc"},{"slug":"wheelie","social":"I wheelie love you","artist":"Kalani Gordon","twitpic":"pic.twitter.com/FEMqo3Ouib"},{"slug":"lovebirds","social":"Baltimore is for love birds","artist":"Emma Patti Harris","twitpic":"pic.twitter.com/X76teqcC7F"},{"slug":"triplecrown","social":"You're the jewel in my Triple Crown","artist":"Emma Patti Harris","twitpic":"pic.twitter.com/hdQgS0t1JI"},{"slug":"oriolescrush","social":"You are my no. 1 crush","artist":"Greg Kohn ","twitpic":"pic.twitter.com/u5eBK4nec4"},{"slug":"flamingos","social":"You've got me head over heels","artist":"Kalani Gordon","twitpic":"pic.twitter.com/aCVN9BdF3V"},{"slug":"bae","social":"Be my Chesapeake Bae","artist":"Emma Patti Harris","twitpic":"pic.twitter.com/1hcYLXcza9"},{"slug":"hon","social":"Bee mine","artist":"Kalani Gordon","twitpic":"pic.twitter.com/1RDwXrYQK0"},{"slug":"utzboh","social":"I'm so glad I swiped right ;)","artist":"Emma Patti Harris","twitpic":"pic.twitter.com/7RMEOcWnpz"},{"slug":"steer","social":"Nothing can steer me away from you","artist":"Greg Kohn","twitpic":"pic.twitter.com/5Vq7f4aKxq"},{"slug":"cake","social":"You're my perfect 10!","artist":"Dana Amihere","twitpic":"pic.twitter.com/gciEIkWgEu"},{"slug":"hungry","social":"I #stayhungry for your love <3","artist":"Emma Patti Harris","twitpic":"pic.twitter.com/3mOta9x4Aq"},{"slug":"fishers","social":"You make my heart pop","artist":"Emma Patti Harris","twitpic":"pic.twitter.com/woTyRiqKAJ"},{"slug":"marc","social":"You've left a Marc on my heart","artist":"Patrick Maynard","twitpic":"pic.twitter.com/zGrJXOuYmD"},{"slug":"buck","social":"Buckle up for love","artist":"Michael Gold ","twitpic":"pic.twitter.com/oSyIKE5Z0G"},{"slug":"oldbay","social":"Thanks for keepign things spicy!","artist":"Dana Amihere","twitpic":"pic.twitter.com/LVNXn7mkRl"},{"slug":"tucker","social":"I like it when you show a little leg","artist":"Kalani Gordon","twitpic":"pic.twitter.com/2CYxUaL8aN"},{"slug":"domino","social":"You're sweet as...Domino Sugars","artist":"Stokely Baksh","twitpic":"pic.twitter.com/OaSjDq0NNY"},{"slug":"crab","social":"You're a good catch","artist":"Adam Marton","twitpic":"pic.twitter.com/bQD1VVTBFZ"},{"slug":"poe","social":"I think we have romantic Poe-tential","artist":"Stokely Baksh","twitpic":"pic.twitter.com/tLtPL7dxYz"},{"slug":"boh","social":"I'll give you x's & o's, ribbons & bohs","artist":"Adam Marton","twitpic":"pic.twitter.com/ShkCVEFmty"},{"slug":"srb","social":"I think you're smashing!","artist":"Matt Bracken","twitpic":"pic.twitter.com/DDNonGERzx"},{"slug":"surveillance","social":"From: your secret admirer","artist":"Kalani Gordon","twitpic":"pic.twitter.com/kEfnvb3Uoz"},{"slug":"sunk","social":"I'm sunk without you","artist":"Kalani Gordon","twitpic":"pic.twitter.com/oAUhFE3GeW"},{"slug":"endless-summer","social":"Our love is an endless summer","artist":"Kalani Gordon","twitpic":"pic.twitter.com/k1Z7G38yYG"},{"slug":"hayden","social":"My love for you is overdue","artist":"Caroline Pate","twitpic":"pic.twitter.com/0lZyLy8s9L"},{"slug":"waterwheel","social":"I only have eyes for you","artist":"Emma Patti Harris","twitpic":"pic.twitter.com/pZK32QdNut"},{"slug":"phelpsface","social":"Face it, we're meant for each other","artist":"Emma Patti Harris","twitpic":"pic.twitter.com/CiBU8vPCBk"},{"slug":"trimble","social":"You make my heart Trimble","artist":"Emma Patti Harris","twitpic":"pic.twitter.com/gTph6uXwWW"},{"slug":"deray","social":"I'm invested in our love","artist":"Emma Patti Harris","twitpic":"pic.twitter.com/FWsx1GsG6Y"},{"slug":"flacco","social":"You're elite in my playbook","artist":"Emma Patti Harris","twitpic":"pic.twitter.com/ZxBvtVhdpH"}]
var app = {

	init: function(){

		app.load_hash();
		app.fade_in_photos();
		app.lightbox_events();
		app.share_valentine();
		app.share();

	},

	fade_in_photos: function(){

		$("img").load(function(){
			$(this).addClass("visible");
		});

	},

	load_hash: function(){

		var hash = location.hash.slice(1);
		
		//Check the hash against the available slugs; only run if it matches one
		if (app.test_hash(hash)){
			$("#lightbox-tools").attr("data-slug",hash);
			app.place_lightbox();
			app.open_lightbox(hash);
			app.share_valentine();
		}

	},

	test_hash: function(hash){

		for (var key in card_data){
			if (card_data[key].slug === hash){
				return true;
			}
		}

		return false;

	},

	lightbox_events: function(){

		//Position lightbox
		app.place_lightbox();

		//Card click events
		$(".valentine .overlay").on("click", function(){
			var slug = $(this).parent().data("slug");
			app.open_lightbox(slug);

			//Update lightbox with slug to inform the social tools
			$("#lightbox-tools").attr("data-slug",slug);

		});

		$(".valentine .expand").on("click", function(){
			var slug = $(this).parent().data("slug");
			app.open_lightbox(slug);

			//Update lightbox with slug to inform the social tools
			$("#lightbox-tools").attr("data-slug",slug);			
		});

		//Close events
		$("#lightbox .icon-close").on("click", function(){
			app.close_lightbox();
		});

		$("#lightbox-overlay").on("click", function(){
			app.close_lightbox();
		});

		$(window).resize(function(){
			app.place_lightbox();
		});

	},

	place_lightbox: function(){

		//Maximize lightbox size based on window size
		if (window.innerHeight < 850){
			$("#lightbox-img img").css("width", window.innerHeight-50 + "px").css("height", window.innerHeight-50 + "px");
		} else {
			$("#lightbox-img img").css("width", "800px").css("height","800px");			
		}

		//Grab new lightbox size
		var lb_height = $("#lightbox").height();

		//Calculate new position
		var top_position = (window.innerHeight - lb_height)/2;
		$("#lightbox").css("top", top_position+"px");

		//console.log(window.innerHeight, lb_height, top_position);

	},

	open_lightbox: function(slug){

		//Show lightbox and overlay
		$("#lightbox-overlay").addClass("visible");
		$("#lightbox").addClass("visible");

		//Prevent scrolling
		$("body").addClass("frozen");

		//Populate lightbox info
		var chosen = $.grep(card_data, function(e){
				return (e.slug === slug)
			});

		$("#lightbox-img img").attr("src","images/valentines/800x800/"+chosen[0].slug+".jpg");
		$("#lightbox-credit span").text(chosen[0].artist);
		$("#lightbox-tools a").attr("href","http://data.baltimoresun.com/valentines/images/valentines/800x800/"+slug+".jpg");

	},

	close_lightbox: function(){

		$("#lightbox-overlay").removeClass("visible");
		$("#lightbox").removeClass("visible");

		//Remove image to prevent issues if new image is loading
		$("#lightbox-img img").attr("src","");

		$("body").removeClass("frozen");

	},

	tweet_item: function(slug){

		var chosen = $.grep(card_data, function(e){
				return (e.slug === slug)
			});

		var tweet = "From Charm City with <3: Baltimore-themed Valentines. "+chosen[0].twitpic;
		var url = "http://data.baltimoresun.com/valentines%23" + slug;
		var hashtag = "bmorebemine";

		var twitter_url = "https://twitter.com/intent/tweet?text="+tweet+"&url="+url+"&tw_p=tweetbutton&hashtags="+hashtag;
		window.open(twitter_url, 'mywin','left=200,top=200,width=500,height=300,toolbar=1,resizable=0'); return false;

	},

	facebook_item: function(slug){

		var chosen = $.grep(card_data, function(e){
				return (e.slug === slug)
			});

		var picture = "http://data.baltimoresun.com/valentines/images/valentines/300x300/"+slug+".jpg"; //Picture URL
		var title = "Baltimore Valentines"; //Post title
		var description = chosen[0].social; //Post description
		
		//Escape any hashtags with URL encoding
		description = description.replace(/#/g,"%23");

		//Escape any ampersands with URL encoding
		description = description.replace(/&/g,"%26");	

		var url = "http://data.baltimoresun.com/valentines%23" + slug;

		var facebook_url = "https://www.facebook.com/dialog/feed?display=popup&app_id=310302989040998&link="+url+"&picture="+picture+"&name="+title+"&description="+description+"&redirect_uri=http://data.baltimoresun.com";    		
		window.open(facebook_url, 'mywin','left=200,top=200,width=500,height=300,toolbar=1,resizable=0'); return false;

	},

	pin_item: function(slug){

		var chosen = $.grep(card_data, function(e){
				return (e.slug === slug)
			});

		var url = "http://data.baltimoresun.com/valentines%23" + slug;
		var picture = "http://data.baltimoresun.com/valentines/images/valentines/800x800/"+slug+".jpg"; //Picture URL
		var description = chosen[0].social + " | From Charm City with <3: Baltimore-themed Valentines"; //Pin description
		
		//Escape any hashtags with URL encoding
		description = description.replace(/#/g,"%23");

		//Escape any ampersands with URL encoding
		description = description.replace(/&/g,"%26");	

		var pinterest_url = "https://www.pinterest.com/pin/create/button/?url="+url+"&media="+picture+"&description="+description;
		window.open(pinterest_url, 'mywin','left=200,top=200,width=500,height=300,toolbar=1,resizable=0'); return false;

	},

	share_valentine: function(){

		//Via the lightbox

		$("#lightbox-tools .icon-twitter2").on("click", function(){

			var slug = $(this).parent().attr("data-slug");
			app.tweet_item(slug);

		});

		$("#lightbox-tools .icon-facebook2").on("click", function(){

			var slug = $(this).parent().attr("data-slug");
			app.facebook_item(slug);

		});

		$("#lightbox-tools .icon-pinterest").on("click", function(){

			var slug = $(this).parent().attr("data-slug");
			app.pin_item(slug);

		});



		//Via the grid layout

		$(".share-tools .icon-twitter2").on("click", function(){

			var slug = $(this).parent().parent().parent().attr("data-slug");
			app.tweet_item(slug);

		});

		$(".share-tools .icon-facebook2").on("click", function(){

			var slug = $(this).parent().parent().parent().attr("data-slug");
			app.facebook_item(slug);

		});

		$(".share-tools .icon-pinterest").on("click", function(){

			var slug = $(this).parent().parent().parent().attr("data-slug");
			app.pin_item(slug);

		});		

	},	

	share: function(){

		$(".icon-twitter").on("click", function(){

			var tweet = "From Charm City with <3: Baltimore-themed Valentines."
			var url = "http://data.baltimoresun.com/valentines"
			var hashtag = "bmorebemine";

			var twitter_url = "https://twitter.com/intent/tweet?text="+tweet+"&url="+url+"&tw_p=tweetbutton&hashtags="+hashtag;
			window.open(twitter_url, 'mywin','left=200,top=200,width=500,height=300,toolbar=1,resizable=0'); return false;

		});

		$(".icon-facebook").on("click", function(){

			var picture = "http://data.baltimoresun.com/valentines/images/social.jpg"; //Picture URL
			var title = "Baltimore Sun Valentines"; //Post title
			var description = "From Charm City with <3: Baltimore-themed Valentines"; //Post description
			var url = "http://data.baltimoresun.com/valentines" //Interactive URL

	    	var facebook_url = "https://www.facebook.com/dialog/feed?display=popup&app_id=310302989040998&link="+url+"&picture="+picture+"&name="+title+"&description="+description+"&redirect_uri=http://www.facebook.com";    		
			window.open(facebook_url, 'mywin','left=200,top=200,width=500,height=300,toolbar=1,resizable=0'); return false;

		});

	}
	
}


$(document).ready(function(){

	app.init();

});
