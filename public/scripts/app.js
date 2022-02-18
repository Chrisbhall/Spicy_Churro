$(document).ready(function() {
  $(".toppings").hide();
  $("#cart").hide();
  $("#cart_display").click(function(){
    $("#cart").toggle();
    $(".toppings").hide();
  });

  console.log("loading app.js");

  $('#login_button').click(function() {
    $('#cartElements').html('');

  })
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
    $(".menu").click(function(event){
      if (this.id>=9){
        $(".sec").hide();
        $(".toppings").show();
      $("input#item_id").val(this.id);
      }else{
        $(".sec").show();
      $(".toppings").show();
      $("input#item_id").val(this.id);
      }
    });
  };

  const createCartElement = function(obj) {
    console.log(obj.name)

    const layout = `
        <article>
          <h4>${obj.name}</h4>
          <p>${obj.price_cents}</p>
        </article>
        `
        return layout
  };


  const appendCartElement = (obj) => {
    for(let element of obj) {
      console.log(element)
      $('#cartElements').append(createCartElement(element));
    }
  }
  // generate the item information into specific elements
  const createMenuElement = function(item) {

    const content = `<img src=${item.photo_url} width="200"
    height="200"><h3>${item.name} </h3><p>${item.description}</p><p>$ ${item.price_cents/Math.pow(10, 2)}</p>`;
    const output = `<article class='menu' id='${item.id}'>${content}</article>`;
    $(".menu").click(function(event){
      if (this.id>=9){
        $(".sec").hide();
        $("#item_id").hide();
        $(".toppings").show();
        $("input#item_id").val(this.id);
      }else{
        $(".sec").show();
        $("#item_id").hide();
        $(".toppings").show();
        $("input#item_id").val(this.id);
      }
     });
     return output;

  };

  $.get('/api/menus').then((data) => {
    renderItems(data.menus);
  }).catch(err => console.log(err))

  $.get('api/carts').then((data) => {
    console.log(data.carts)
    appendCartElement(data.carts)
  }).catch(err => console.log(err))

  $.get('/api/cartsum').then((data) => {
    console.log(data.sum)
    $('#subtotal').html(`Subtotal: $${(data.sum[0].sum/100).toFixed(2)}`);
    $('#taxes').html(`Taxes: $${(data.sum[0].sum*0.13/100).toFixed(2)}`);
    $('#totalCost').html(`Total: $${(data.sum[0].sum*1.13/100).toFixed(2)}`);
    $('#totalItems').html(`Total Items: ${data.sum[0].count}`);

//     <p id="subtotal">subtotal: $0</p>
// <p id="taxes"> taxes: $0</p>
// <p id="totalCost">total cost: $0 </p>
// <p id="totalItems">total items: 0 </p>
  })
});
