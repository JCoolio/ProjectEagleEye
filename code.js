$("select").on("click", function (event) {
  if (this.value === "default") {
    return
  } else {
    callnewapi(this.value)
    var encodedGameName = encodeURI(this.value)
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
        console.log(response)
        $('ul.list-group').empty()
        for (var i = 0; i < response.data.length; i++) {
          var responseURL = response.data[i].thumbnail_url.replace('{width}', '920').replace('{height}', '540')
          $('ul.list-group').prepend('<li class="list-group-item col-sm-6"><img class="images" src="' + responseURL + '" /><h4><span><button class="btn btn-danger">' + response.data[i].type.toUpperCase() + '</button>&nbsp' + response.data[i].title + '</span></h4></li>')
        };
      });
    });
  };
});

function callnewapi(term){
  var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.giphy.com/v1/gifs/search?q="+ term + "&api_key=4kpATRurpC7jUXR9xC5hhfZ0oUBfKvxR&limit=1",
  "method": "GET",
  "headers": {
    "cache-control": "no-cache",
    "postman-token": "afef52ec-25c2-d00c-a49a-7c69bde52996"
  }
}

$.ajax(settings).done(function (response) {
  console.log(response.data[0].url);
  var gameIMG = response.data[0].url
  $('.jumbotron').append('<img src='response.data[0].url'>')
  $(".list-group-item").on("click", function (event) {
  $('.jumbotron').empty()

  //$('.jumbotron').append('<iframe src="https://player.twitch.tv/?channel=attach" frameborder="0" allowfullscreen="false" scrolling="no" height="378" width="480">')
  });
});
}
