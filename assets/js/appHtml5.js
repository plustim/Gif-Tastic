/****************************************************************
*  Gif-Tastic													*
*																*
*  Uses an array of topics to create buttons that generate a	*
*  list of images (using Giphy api) upon click. The images		*
*  must alternate between animated and static when clicked.		*
****************************************************************/		

$(document).ready(function(){

	var topics = ["cat", "train", "pizza"];

	function renderButtons() {
		$("#topic-buttons").empty();
		$.each(topics, function(i, value){
			// since the text of the button is the same as what the query will be, no need to add extra attributes
			var a = $("<button>").addClass("topic").text(value);
			$("#topic-buttons").append(a);
		});
	}

	// This function handles events where the add movie button is clicked
	$("#add-topic").on("click", function(event) {
		// only works if the field isn't empty
		if( $("#topic-input").val() ){
			// The topic from the input field is added to topics array
			topics.push( $("#topic-input").val().trim() );
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
				var vid = $("<video>").attr("preload", "none").attr("loop", "loop").attr("poster", val.images.fixed_height_still.url).append("<source src='" + val.images.fixed_height.mp4 + "' type='video/mp4'>");
				var itemDiv = $("<div>").append(p, vid);
				$("#the-gifs").append(itemDiv, " ");
			});
		});
	}

	$("#the-gifs").on("click", "video", function() {
		if ( this.currentTime === 0 || this.paused ){
			this.play();
		}else{
			this.pause();
		}
	});

	renderButtons();

});