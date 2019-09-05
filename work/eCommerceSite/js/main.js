// We create an empty array called pantsArray. We'll store objects in it later.
var pantsArray = [];

// An JavaScript object constructor is created so we can make more pants objects
function Pants(name, image, size, material, stock) { // key parameters with user input assigned value
  this.name = name; // the key, then value - in this case, the name of the type of pants
  this.image = image; // the image assigned to the pants object 
  this.size = size; // the size of the pants 
  this.material = material; // the material of the pants 
  this.stock = stock; // the number of pants we have in stock
}

// we create some Pants objects with differing key attributes 
var jeanPants = new Pants('The Apple Guy', 'img/jeans.png', 'large', 'jeans', 100);
var khakiPants = new Pants('The Life Or Death', 'img/khakis.png', 'medium', 'khaki', 6);
var yogaPants = new Pants('The Enlightened One', 'img/yoga.jpg', 'small', 'polyester', 69);
var rainbowPants = new Pants('The Final Gnarly', 'img/rainbow.png', 'large', 'hemp', 420);
var jncoPants = new Pants('The Last Airbender', 'img/jnco.png', 'large', 'denim', 777);
var pizzaPants = new Pants('The Pepperoni Lord', 'img/pizza.png', 'large', 'cotton', 18);

// We've made our objects, the next step to place them in a specific location so as to reference and access them easier
pantsArray.push(jeanPants, khakiPants, yogaPants, rainbowPants, jncoPants, pizzaPants);

// we create a for loop to build our html elements
for (var i = 0; i < pantsArray.length; i++) {
  var pantsName = document.createTextNode(pantsArray[i].name);
  var pantsImg = pantsArray[i].image; 
  var pantsSize = document.createTextNode('Available size: ' + pantsArray[i].size);
  var pantsMaterial = document.createTextNode('Material: ' + pantsArray[i].material);
  var pantsStock = document.createTextNode('In stock: ' + pantsArray[i].stock);
  var buttonText = document.createTextNode('Buy Now');
  
  // Make HTML elements
  var newItem  = document.createElement('div');
  var newDiv   = document.createElement('div');
  var nameH1 = document.createElement('h1');
  var imgPlace = document.createElement('img');
  var sizeH3 = document.createElement('h3');
  var materialH3 = document.createElement('h3');
  var stockH3 = document.createElement('h3');
  var buyButton = document.createElement('button');
  
  // Assign CSS class names to HTML elements
  nameH1.className = 'header-pants';
  imgPlace.className = 'img-responsive';
  buyButton.className = 'btn btn-lg btn-primary';
  newItem.className = 'col-sm-4 pants-box';
  newDiv.className = 'thumbnail';
  
  // The source will reference the file path in which our image is stored
  imgPlace.src = pantsArray[i].image;
    
  nameH1.appendChild(pantsName);
  sizeH3.appendChild(pantsSize);
  materialH3.appendChild(pantsMaterial);
  stockH3.appendChild(pantsStock);
  buyButton.appendChild(buttonText);
  
  newDiv.appendChild(nameH1);
  newDiv.appendChild(imgPlace);
  newDiv.appendChild(sizeH3);
  newDiv.appendChild(materialH3);
  newDiv.appendChild(stockH3);
  newDiv.appendChild(buyButton);
  
  newItem.appendChild(newDiv);
  document.getElementById('pantsCollection').appendChild(newItem);

}


