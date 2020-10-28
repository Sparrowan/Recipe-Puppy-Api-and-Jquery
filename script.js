$(document).ready(function () {
  $("#form-sub").submit(function (event) {
    performSearch(event);
  });
});

function performSearch(event) {
  var request;
  event.preventDefault();
  // $("#recipe-name").text("Searching ...");
  $("#table").find('td').remove()

  // Send the request
  request = $.ajax({
    url: "https://recipe-puppy.p.rapidapi.com/",
    type: "GET",
    data: { q: $("#recipe").val() },
    headers: {
      "x-rapidapi-host": "recipe-puppy.p.rapidapi.com",
      "x-rapidapi-key": "79b5e3b221mshba3ed0c62164630p1b35d5jsn025fa6afe4a8",
      useQueryString: true,
    },
  });

  // Callback handler for success
  request.done(function (response) {
    formatSearchResults(response);
  });

  // Callback handler for failure
  request.fail(function () {
    $("#table").find('td').remove()
  });
}

function formatSearchResults(jsonObject) {
  var obj = JSON.parse(jsonObject);
  var obj2 = obj.results;

  var table_data = "";
  $.each(obj2, function (key, value) {
    //CONSTRUCTION OF ROWS HAVING
    // DATA FROM JSON OBJECT
    table_data += "<tr>";
    table_data += "<td>" + value.title + "</td>";

    table_data += "<td>" + value.href + "</td>";

    table_data += "<td>" + value.ingredients + "</td>";

    table_data += "<td>" + value.thumbnail + "</td>";

    table_data += "</tr>";
    console.log(value.title);
  });
  $("#table").append(table_data);
}
