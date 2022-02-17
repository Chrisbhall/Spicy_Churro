$(document).ready(function() {
$("#cart_display").click(function(){
$("#cart").toggle();
$(".menu").click(function(event){
 $(".toppings").show();
 $("input#item_id").val(this.id);
  alert(this.id);
})
});


console.log("loading app.js");


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
    console.log(item.id);
    return output;
  };

  $.get('/api/menus').then((data) => {
    renderItems(data.menus);
  }).catch(err => console.log(err))


});
