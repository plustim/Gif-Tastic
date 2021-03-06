/****************************************************************
*  Gif-Tastic													*
*																*
*  Uses an array of topics to create buttons that generate a	*
*  list of images (using Giphy api) upon click. The images		*
*  must alternate between animated and static when clicked.		*
****************************************************************/		

$(document).ready(function(){

	var topics = ["unicorn", "dragon", "griffon", "centaur", "minotaur"];

	function renderButtons() {
		$("#topic-buttons").empty();
		$.each(topics, function(i, value){
			// since the text of the button is the same as what the query will be, no need to add extra attributes
			var a = $("<button>").addClass("topic").text(value);
			$("#topic-buttons").append(a);
		});
	}

	$("#topic-form").on("submit", function( event ) {
  		event.preventDefault();
  		var newTopic = $("#topic-input").val().trim();
		// only works if the field isn't empty and isn't a repeat
		if( newTopic && $.inArray(newTopic, topics) === -1 ){
			// The topic from the input field is added to topics array
			topics.push( newTopic );
			$("#topic-input").val("");
			// Show the new buttons
			renderButtons();
		}
	});

	$("#topic-buttons").on("click", ".topic", makeGifs);
	function makeGifs(){
		$("#the-gifs").empty();
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + $(this).text() + "&api_key=cd348e08c50247ec84489456201900ba&limit=24";
		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function(response) {
			// construct a div for each item in the returned array (note: I called for 24 images so the page would be fuller)
			$.each(response.data, function(i, val){
				var p = $("<p>").text("Rating: " + val.rating.toUpperCase());
				var gif = $("<img>").attr("data-state", "still").attr("src", val.images.fixed_height_still.url).attr("data-still", val.images.fixed_height_still.url).attr("data-animate", val.images.fixed_height.url);
				var itemDiv = $("<div>").append(p, gif);
				$("#the-gifs").append(itemDiv, " ");
			});
		});
	}

	$("#the-gifs").on("click", "img", function() {
		var state = $(this).attr("data-state");
		if ( state === "still" ){
			$(this).attr("src", $(this).attr("data-animate")).attr("data-state", "animate");
		}else if ( state === "animate" ){
			$(this).attr("src", $(this).attr("data-still")).attr("data-state", "still");
		}
	});

	renderButtons();

});