$("input").keydown(function () {

  var gameName = $("input").val()
  $("ul.dropdown-menu").empty()

  var settings = {
    // "async": true,
    // "crossDomain": true,
    "url": "https://api-2445582011268.apicast.io/games/?search=" + encodeURI(gameName) + "&fields=name",
    "method": "GET",
    "headers": {
      // "accept": "application/json",
      "user-key": "88b8944b17a961d17177d3ff396960e1",
      "cache-control": "no-cache"
      // "postman-token": "3c2d753c-483d-66d8-2e0d-1826562cd320",
    }
  }

  $.ajax(settings).done(function (response) {
    for (var i = 0; i < response.length; i++) {
      var newItem = $("<li>");
      var newLink = $("<a href=#>");
      newLink.text(response[i].name);
      newItem.append(newLink);
      $("ul.dropdown-menu").append(newItem);
    }

    $('ul.dropdown-menu li').click(function () {
      var $this = $(this)
      $("input").val($this.text())

      var encodedGameName = encodeURI($this.text())

      var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://api.twitch.tv/helix/games?name=" + encodedGameName,
        "method": "GET",
        "headers": {
          "client-id": "fmeyiqd25l2obw9lhe8uizm8lpg990",
          "cache-control": "no-cache",
          "postman-token": "04c3a2fa-49ae-3de6-c4ea-c78a5f477718",
        }
      }

      $.ajax(settings).done(function (response) {
        var settings = {
          "async": true,
          "crossDomain": true,
          "url": "https://api.twitch.tv/helix/streams?game_id=" + response.data[0].id + "&type=live&first=20",
          "method": "GET",
          "headers": {
            "client-id": "fmeyiqd25l2obw9lhe8uizm8lpg990",
            "cache-control": "no-cache",
            "postman-token": "8941d06b-e389-5d84-254e-828d77d5639f",
          }
        }

        $.ajax(settings).done(function (response) {
          $('#theImg').empty()
          for (var i = 0; i < response.data.length; i++) {
            var responseURL = response.data[i].thumbnail_url.replace('{width}', '400').replace('{height}', '400')
            $('#theImg').prepend('<li><img class="images" src="' + responseURL + '" /></li>')

          }
        });
      });
    })

  });
});
