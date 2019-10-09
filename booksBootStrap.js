var bookXML;

function getXML(document) {
    bookXML = document;
    buildMenu();
}

function lookUp(title){
    $("#searchresults").empty();
    console.log(title);
    $(bookXML).find("book").each(function(){
	var thisTitle = $(this).find("title").text();
	console.log("F:"+thisTitle);
	if (thisTitle==title) {
	    console.log("Match");
	    $("#searchresults").append('<p>ISBN10: '+
				 $(this).attr('isbn10')+
				 '<br /> Title: '+
				 $(this).find('title').text()+
				 '<br /> Author: '+$(this).find('author').text()+
				 '</p>'	);
	}
    });
}

function buildMenu(){
    var menuItems="";
    $(bookXML).find("book").each(function(){
	var title = $(this).find("title").text();
	menuItems+="<li><a href='#'>"+title+"</a></li>";
    });
    console.log(menuItems);
    $("#bookList").html(menuItems);

    $(".dropdown-menu li a").click(function(){
	console.log("pick!"+$(this).text());
	$(this).parents(".btn-group").find('.selection').text($(this).text());
	lookUp($(this).text());
    });
}

$(document).ready(function(){
    $.ajax({
	url: 'books.xml', // name of file you want to parse
	dataType: "xml",
	success: getXML,
	error: function(){alert("Error: Something went wrong");}

    });
});


