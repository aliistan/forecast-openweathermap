$(document).ready(function(){
    var showError = function(text) {
        $('.error-message p').html(text);
        $(".error-message").css('visibility', 'visible');
    };
    var hideError = function() {
        $(".error-message").css('visibility', 'hidden');
    }
    $("#search").click(function(){
        hideError();
        var searchText = $("#searchText").val().trim();
        if (searchText == '') {
            showError("Please enter correct city name!");
        } else {
            $.ajax("http://api.openweathermap.org/data/2.5/weather?q=" + searchText + "&mode=json&units=metric&appid=96fc61ceeba9348092c60cad07065579")
                .done(function(data, status) {
                    if (status === "success" && data.cod === "404") {
                        showError(data.message);
                    } else {
                        var weather = data.weather, description = [];
                        weather.forEach(function(element) {
                            description.push(element.description);
                        }, this);
                        $("#results").append('<li><span class="bigger-font">' + data.name + '</span>, ' + data.sys.country + ': ' + data.main.temp + '&#8451;, ' + description.join(', ') + '</li>');
                    }
                })
                .fail(function(data, status) {
                    (status === "error" || data.statusText === "Not Found") ? showError("Please enter correct city name!") : console.error("Error");
                })
                .always(function() {
                    $("#searchText").val("");
                });
        } 
    });
    $("#clear").click(function() {
        hideError();
        $("#results").html("");
    });
});
