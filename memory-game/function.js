var shapeDim = 75;
var startPlaying = false
var isNextable = true;
var cols = rows = 2
$(document).ready(function(){
	
	next(cols ,rows);
	
});


function next(c,r){
	
	if(!isNextable )
		return;
		
	isNextable = false;
	//1. clear previous shapes
	$( ".content" ).fadeOut( 1000, 
				// --> on fadeOut complete
				//2. empty previous shapes
				function() { 
						$( ".content" ).empty();
						
						//3. expand container
						$( ".container" ).animate({height: ((shapeDim+8)*r)+"px",width:  ((shapeDim+8)*c)+"px"},1000, 
										 	// --> on animate complete
											//4. create new shapes, add them to content & fadein content
										 	function(){
										 		for(i = 0; i < (c * r); i++)
													$( ".content" ).append(createShape("circle", shapeDim));	
												$( ".content" ).fadeIn(200);
												
												pickRandomShapes();
										 	}
										)									
	 			}
	 );//end fadeOut
}


function createShape(type, r){
	return $("<div>").addClass("shape "+type).width(r).height(r).click(function(){
		if(startPlaying){
			if($(this).attr("selected") == "selected")
				$(this).addClass("selected");
			else
				$(this).addClass("wrong");
			
			var totalSelected = $( ".shape[selected='selected']" ).length
			
			if(($(".selected").length + $(".wrong").length) >= totalSelected){
				startPlaying = false;
				$( ".shape[selected='selected']:not(.selected)" ).addClass("selected");
				
				if($(".wrong").length == 0){
					alert("good");
					
				
								if(cols == rows)
									cols++;
								else if( cols > rows)
									rows++;
								
								if(cols > 6){
									cols = 6;
									rows = 6;
								} 
				}
				next(cols,rows);
			}
		}
	});
}

function pickRandomShapes(){

	var count = 0;
	var length = $( ".content > .shape" ).length
	
	
	for( count = 0; count < Math.ceil(length/3);){
		var random = Math.ceil(Math.random()*length ); 
		if(random < length){
			if(!$( ".content > .shape" ).eq(random).hasClass("selected")){
				$( ".content > .shape" ).eq(random).addClass("selected").attr( "selected", "selected" );;
				count++;
			}
		}
	} 
	window.setTimeout(hideRandomSelectedShapes,1200)
}

function hideRandomSelectedShapes(){
	
	$( ".content > .shape" ).removeClass( "selected" );
	startPlaying = true;
	isNextable = true;
}