var bookXML;

function getXML(document) {
    bookXML = document;
    lookup();
}

function lookup(){
    console.log("called");
    $("#content").empty();
    var lnameToFind = $('#name').val();
    console.log(lnameToFind);
    $(bookXML).find("book").each(function(){
	var lname = $(this).find("author").attr("lname");
	if (lname.indexOf(lnameToFind)>=0) {
	    $("#content").append('<p>ISBN10: '+
				 $(this).attr('isbn10')+
				 '<br /> Title: '+
				 $(this).find('title').text()+
				 '<br /> Author: '+$(this).find('author').text()+
				 '</p>'	);
	}
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


