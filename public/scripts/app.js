$(document).ready(function() {
  $(".toppings").hide();
  $("#cart").hide();
  $("#cart_display").click(function(){
    $("#cart").toggle();
    $(".toppings").hide();
  });

  console.log("loading app.js");

  const createCartElement = function(item) {

    const content = `<img src=${item.photo_url} width="200"
    height="200"><h3>${item.name} </h3><p>${item.description}</p><p>$ ${item.price_cents/Math.pow(10, 2)}</p>`;
    const output = `<article class='menu' id='${item.id}'>${content}</article>`;
    return output;
  };

  const appendTweetElement = (tweetData) => {
    $('#tweetBox').append(createTweetElement(tweetData));
  }

  const loadTweets = function(url) {
    $.get(url).then((data) => {
      renderTweets(data);
  })
  }


  const createTweetElement = (tweetData) => {
    const layout = `
      <article class="tweets" id="boxShadow">
        <header class="oppositeSide ">
          <div class="picName">
            <div class="imageBox" >
              <img src="${tweetData.user.avatars}" alt="Random Man Face">
            </div>
            <div >
              <p style = "margin-left: 10px;">${tweetData.user.name}</p>
            </div>
          </div>
          <div class="handle">
            <p>${tweetData.user.handle}</p>
          </div>

        </header>
        <p class="tweetContainer">
        ${(htmlEncode(tweetData.content.text))}
        </p>
        <footer class = "oppositeSide small">
          <span> ${timeago.format(Number(tweetData.created_at))}</span>
          <div class = "horizontal">
            <i class="fa-solid fa-flag icon1"></i>
            <i class="fa-solid fa-retweet icon2"></i>
            <i class="fa-solid fa-heart icon3"></i>
          </div>
        </footer>
      </article>
    `
    return layout
  }
  const $form = $('#menuForm');
  $form.on('submit', function (e) {
    console.log('form submitted!');
    let formValues = $(this).serialize();
    $.post("/carts2", formValues,() => {
      console.log('ajax post request went through');
      // loadRecentTweet("/tweets/")
      // document.getElementById('counter').innerHTML = '140';
    });
    // make textbox empty again
    $form[0].reset();

  })
  //generate each item in the array
  const renderItems = function(items) {

    for (let i = 0; i < items.length; i++) {
      //console.log(items[i]);
      const $item = createMenuElement(items[i]);
      $('section.items').append($item);
    }
  };
  // generate the item information into specific elements
  const createMenuElement = function(item) {

    const content = `<img src=${item.photo_url} width="200"
    height="200"><h3>${item.name} </h3><p>${item.description}</p><p>$ ${item.price_cents/Math.pow(10, 2)}</p>`;
    const output = `<article class='menu' id='${item.id}'>${content}</article>`;
    $(".menu").click(function(event){
      if (this.id>=9){
       $("#tomato").hide();
       $("#spice").hide();
       $("#lettuce").hide();
       $("#beans").hide();
       $("#cheese").hide();
       $("#guac").hide();
       $("#cilantro").hide();
       $("#rice").hide();
       $("#noodles").hide();
      }else{
      $(".toppings").show();
      $("input#item_id").val(this.id);
      }
    });
    return output;

  };

  $.get('/api/menus').then((data) => {
    renderItems(data.menus);
  }).catch(err => console.log(err))
});
