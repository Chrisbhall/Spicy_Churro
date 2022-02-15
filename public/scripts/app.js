// Client facing scripts here
$(document).ready(function() {
$("#cart_display").click(function(){
$("#cart").toggle();
});



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

    const content = "<img src='"+ item.image +"'><h3>"+item.name+"</h3><p>"+item.description+"</p><p>"+item.price+"</p>";
    const output = "<article class='menu'>" + content + "</article>";
    return output;
  };
  // load all the items & move them to the render function to be generated
  const loadItems = function() {
    $.get("/menu", function(data,status) {
      renderItems(data);
    });
  };
  loadItems();
});
