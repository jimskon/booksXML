function processResults(results) {
    $('#content').empty();
    $('#content').append('<h3>Search results for author "' + $('#name').val() + '"</h3>');
    $('#content').append(results);
}
function getBooks(){
    console.log($('#name').val());
    $.ajax({
	url: '/cgi-bin/skon_books.cgi?author='+$('#name').val(),
	dataType: 'text',
	success: processResults,
	error: function(){alert("Error: Something went wrong");}
    });
}
