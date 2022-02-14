'2018-03-06T08:00:00.000Z'

year = ['2018','2019','2020','2021']
month = ['01','02','03','04','05','06','07','08','09','10','11','12']
day = ['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28']

random_time = ['T08:03:00.000Z','T08:05:00.000Z', 'T08:07:00.000Z', 'T08:01:00.000Z']

let a = [];
let b = [];
user_id = []
for (let i = 1; i <= 3000; i++) {
  let z = Math.ceil(Math.random()*500)
  user_id.push(z);
  let timestamp = `${year[Math.floor(Math.random()*year.length)]}-${month[Math.floor(Math.random()*month.length)]}-${day[Math.floor(Math.random()*day.length)]}`
  a.push(`INSERT INTO carts (id, user_id, time_started) VALUES(${i}, ${z}, '${timestamp}T08:00:00.000Z');`)
  b.push(`INSERT INTO orders (user_id, cart_id, time_placed) VALUES(${z}, ${i}, '${timestamp}${random_time[Math.floor(Math.random()*random_time.length)]}');`)
}

for(let element of a) {
  console.log(element)
}
console.log('----------------------------------------------------------------------')
console.log('----------------------------------------------------------------------')
console.log('----------------------------------------------------------------------')
console.log('----------------------------------------------------------------------')
let c = []
let d = []
let ordered_user_id = []
let nonOrdered_user_id = []
cart_counter1 = []
cart_counter2 = []
for (let i = 0; i < 3000; i++) {
  if (Math.floor(Math.random()*3) === 2) {
    console.log(b[i]);
    c.push(b[i])
    ordered_user_id.push(user_id[i])
    cart_counter1.push(i+1)
  }
  else {
    d.push(b[i])
    nonOrdered_user_id.push(user_id[i])
    cart_counter2.push(i+1)
  }
}

console.log('----------------------------------------------------------------------')
console.log('----------------------------------------------------------------------')
console.log('----------------------------------------------------------------------')
console.log('----------------------------------------------------------------------')

toppings = ['TRUE','FALSE']
size = ['small', 'medium', 'large']
for (let i = 0; i < c.length; i++) {
  for(let j = 0; j < (Math.ceil(Math.random()*6)); j++) {
    let menu_item = Math.ceil(Math.random()*12);
    if (menu_item <= 8) {
      console.log(`INSERT INTO cart_and_ordered_items (user_id, order_id, cart_id, item_id, size, spice_level, tomato, lettuce, beans, cheese, guac, cilantro, rice, noodles) VALUES(${ordered_user_id[i]}, ${i+1}, ${cart_counter1[i]}, ${menu_item},'${size[Math.floor(Math.random()*size.length)]}', ${Math.ceil(Math.random()*5)}, ${toppings[Math.floor(Math.random()*2)]}, ${toppings[Math.floor(Math.random()*2)]}, ${toppings[Math.floor(Math.random()*2)]}, ${toppings[Math.floor(Math.random()*2)]}, ${toppings[Math.floor(Math.random()*2)]}, ${toppings[Math.floor(Math.random()*2)]}, ${toppings[Math.floor(Math.random()*2)]}, ${toppings[Math.floor(Math.random()*2)]});`);
    }
    else{
      console.log(`INSERT INTO cart_and_ordered_items (user_id, order_id, cart_id, item_id, size) VALUES(${ordered_user_id[i]}, ${i+1}, ${cart_counter1[i]}, ${menu_item},'${size[Math.floor(Math.random()*size.length)]}');`);
    }
  }
}
for (let i = 0; i < d.length; i++) {
  for(let j = 0; j < (Math.ceil(Math.random()*6)); j++) {
    let menu_item = Math.ceil(Math.random()*12);
    if (menu_item <= 8) {
      console.log(`INSERT INTO cart_and_ordered_items (user_id, cart_id, item_id, size, spice_level, tomato, lettuce, beans, cheese, guac, cilantro, rice, noodles) VALUES(${nonOrdered_user_id[i]}, ${cart_counter2[i]}, ${menu_item},'${size[Math.floor(Math.random()*size.length)]}', ${Math.ceil(Math.random()*5)}, ${toppings[Math.floor(Math.random()*2)]}, ${toppings[Math.floor(Math.random()*2)]}, ${toppings[Math.floor(Math.random()*2)]}, ${toppings[Math.floor(Math.random()*2)]}, ${toppings[Math.floor(Math.random()*2)]}, ${toppings[Math.floor(Math.random()*2)]}, ${toppings[Math.floor(Math.random()*2)]}, ${toppings[Math.floor(Math.random()*2)]});`);
    }
    else{
      console.log(`INSERT INTO cart_and_ordered_items (user_id, cart_id, item_id, size) VALUES(${nonOrdered_user_id[i]}, ${cart_counter2[i]}, ${menu_item},'${size[Math.floor(Math.random()*size.length)]}');`);
    }
  }
}

