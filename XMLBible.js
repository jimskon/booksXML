// XMLbible.html
// James Skon March 29, 2017
// Kenyon College
// This version uses jquery
//

//Path to the Bible Files
biblePath="/class/softdev/XMLFiles/XMLBible/kjv_by_book/"

$(document).ready(function(){
    // when the search button is pushed, grab the book from the server
    $('#lookup').click(getBook);
});

// getBook - read requested book XML file from server, and then display requested verses
function getBook(){
    var b=$('#book').val();
    var XMLBook = biblePath + b + ".xml"
    console.log(XMLBook)
    $.ajax({
	url: XMLBook, // name of file you want to parse
	dataType: "xml",
	success: bibleLookup,
	error: function(){alert("Error: Something went wrong reading:"+XMLBook);}
    });
}
// bibleLookup - Using the data for the book, chapter, verse, and number of verses found in the input elements
// and the XML of the book, calls display verses
function bibleLookup (XMLBook) {
    var b=$('#book').val();
    var c=$('#chapter').val();
    var v=parseInt($('#verse').val());
    var n=parseInt($('#numVerse').val());
    displayVerses($(XMLBook),b,c,v,n);
}

// displayVerses - given an XML document, a book, chapter, verse and number of verses, display them
function displayVerses(xmlDoc,b,c,v,n){
    var theOutput = "<h1><font color=blue>Results:</font></h1><br>";
    var i = 0;
    try {
	for (i = 0; i < n;i++) {
	    vtext = getVerse(xmlDoc,b,c,v+i);
	    theOutput += "<p>"+vtext+"</p>";
	}
	$("#responseArea").html(theOutput);
    }
    catch(error) {
	console.log("Error:"+error);
	if (error == "no chapter") {
	    console.log("No such chapter "+c);
	    $("#responseArea").html("<b><i>No such chapter "+c+"</i></b>");
	}      
	$("#responseArea").html(theOutput);
	if (error == "no verse") {
	    if (i == 0) {
		console.log("No such verse "+(v+i));
		$("#responseArea").html("<b><i>No such verse "+(v+i)+"</i></b>");
	    }
	}
    }
    
}

// getVerse - get a specific verse, given the XML tree, given the book, chapter, and verse numbers.
function getVerse(xmlDoc,bk,ch,ver) {
    // find the book name 
    var book = xmlDoc.find("book");
    var bookName = book.attr("name"); 
    // find the chapter
    var chap=book.find("chapter[number='"+ch+"']");
    var chapNum = chap.attr("number");		    
    if (chapNum==null) throw "no chapter";
    //Find the given book
    var verse=chap.find("verse[number='"+ver+"']");
    var verseNum = verse.attr("number");
    if (verseNum==null) throw "no verse";
    theOutput = bookName + " " + chapNum + ":" +verseNum + " ";
    // go through the contents of the verse
    verse.contents().each(function(){
  	var type = this.nodeType;
  	// Type 3 is a simple text node.
  	if(type == 3) {
  	    theOutput += $(this).text();
  	    // Type == 1 is a element (strongs or em)
  	} else if (type == 1) {
  	    if ($(this).is("em")) {
  		theOutput += "<i> "+$(this).text()+"</i>";
  	    } else if ($(this).is("strongs[hebrew]")) {
  		theOutput += $(this).text() + "<i><font size=1 color=blue><sub>" + $(this).attr("hebrew") +  "</sub></font></i> ";
  	    } else if ($(this).is("strongs[greek]")) {
  		theOutput += $(this).text() + "<i><font size=1 color=green><sub>" + $(this).attr("greek") +  "</sub></font></i> ";
  	    }  else if ($(this).is("strongs[number]")) {
  		theOutput += $(this).text() + "<i><font size=1 color=green><sub>" + $(this).attr("number") +  "</sub></font></i> ";
  	    }
  	}
    });  
    return(theOutput);
}
