
/* ======= Model ======= */

var model = {
		currentCat: null,
		cats: [
			{
				clickCount : 0,
				name : 'Tabby',
				imgSrc : 'img/cat1.jpg',
				imgAttribution : 'https://www.flickr.com/photos/bigtallguy/434164568'
			},
			{
				clickCount : 0,
				name : 'Tiger',
				imgSrc : 'img/cat2.jpg',
				imgAttribution : 'https://www.flickr.com/photos/xshamx/4154543904'
			},
			{
				clickCount : 0,
				name : 'Scaredy',
				imgSrc : 'img/cat3.jpg',
				imgAttribution : 'https://www.flickr.com/photos/kpjas/22252709'
			},
			{
				clickCount : 0,
				name : 'Shadow',
				imgSrc : 'img/cat4.jpg',
				imgAttribution : 'https://www.flickr.com/photos/malfet/1413379559'
			},
			{
				clickCount : 0,
				name : 'Sleepy',
				imgSrc : 'img/cat5.jpg',
				imgAttribution : 'https://www.flickr.com/photos/onesharp/9648464288'
			}
			],
			adminArea: false
};


/* ======= Octopus ======= */

var octopus = {

		init: function() {
			// set our current cat to the first one in the list
			model.currentCat = model.cats[0];

			// tell our views to initialize
			catListView.init();
			catView.init();
			adminView.init();
		},

		getCurrentCat: function() {
			return model.currentCat;
		},

		getCats: function() {
			return model.cats;
		},

		// set the currently-selected cat to the object passed in
		setCurrentCat: function(cat) {
			model.currentCat = cat;
		},

		// increments the counter for the currently-selected cat
		incrementCounter: function() {
			model.currentCat.clickCount++;
			catView.render();
		},

		hideAdminArea: function(element){
			model.adminArea = false;
			element.style.visibility = "hidden";
		},
		
		showAdminArea: function(element){
			model.adminArea = true;
			element.style.visibility = "visible";
		},
		
		updateCurrentCat: function(cat){
			model.currentCat.name = cat.name;
			model.currentCat.imgSrc = cat.imgSrc;
			model.currentCat.clickCount = cat.clickCount;
			catView.render();
		}
};


/* ======= View ======= */

var catView = {

		init: function() {
			// store pointers to our DOM elements for easy access later
			this.catElem = document.getElementById('cat');
			this.catNameElem = document.getElementById('cat-name');
			this.catImageElem = document.getElementById('cat-img');
			this.countElem = document.getElementById('cat-count');

			this.adminButtonElem = document.getElementById('admin-btn');
			this.adminFormElem = document.getElementById('admin-form');
			this.updateCatNameElem = document.getElementById('name');
			this.updateCatImageElem = document.getElementById('url');
			this.updateCountElem = document.getElementById('clicks');
			this.saveButtonElem = document.getElementById('save-btn');
			this.cancelButtonElem = document.getElementById('cancel-btn');
			
			// on click, increment the current cat's counter
			this.catImageElem.addEventListener('click', function(){
				octopus.incrementCounter();
			});

			// on click, will show admin area 
			this.adminButtonElem.addEventListener('click',function(){
				adminDivElem = document.getElementById('admin-form');
				octopus.showAdminArea(adminDivElem);
			});
			
			// render this view (update the DOM elements with the right values)
			this.render();
		},

		render: function() {
			// update the DOM elements with values from the current cat
			var currentCat = octopus.getCurrentCat();
			this.countElem.textContent = currentCat.clickCount;
			this.catNameElem.textContent = currentCat.name;
			this.catImageElem.src = currentCat.imgSrc;
			
		}
};

var adminView = {
		init: function() {
			// store pointers to our DOM elements for easy access later
			this.catElem = document.getElementById('cat');
			this.catNameElem = document.getElementById('cat-name');
			this.catImageElem = document.getElementById('cat-img');
			this.countElem = document.getElementById('cat-count');

			this.adminFormElem = document.getElementById('admin-form');
			
			this.saveButtonElem = document.getElementById('save-btn');
			this.cancelButtonElem = document.getElementById('cancel-btn');
			

			// on click, will hide admin view 
			document.getElementById('cancel-btn').addEventListener('click',function(){
				adminDivElement = document.getElementById('admin-form');
				octopus.hideAdminArea(adminDivElement);
			});
			
			//on click, will update the cat view data
			document.getElementById('save-btn').addEventListener('click', function(event){
				event.preventDefault();
				var updateCatNameElem = document.getElementById('name').value;
				console.log(updateCatNameElem);
				var updateCatImageElem = document.getElementById('url');
				var updateCountElem = document.getElementById('clicks');
				var currentCat = octopus.getCurrentCat();
				currentCat.name = updateCatNameElem;
				currentCat.imgSrc = updateCatImageElem.value;
				currentCat.clickCount = updateCountElem.value;
				octopus.updateCurrentCat(currentCat);
				adminDivElement = document.getElementById('admin-form');
				octopus.hideAdminArea(adminDivElement);
				catListView.render();
			});

			// render this view (update the DOM elements with the right values)
			this.render();
		},

		render: function() {
			// update the DOM elements with values from the current cat
			var currentCat = octopus.getCurrentCat();
			this.countElem.textContent = currentCat.clickCount;
			this.catNameElem.textContent = currentCat.name;
			this.catImageElem.src = currentCat.imgSrc;
		}
};

var catListView = {

		init: function() {
			// store the DOM element for easy access later
			this.catListElem = document.getElementById('cat-list');

			// render this view (update the DOM elements with the right values)
			this.render();
		},

		render: function() {
			var cat, elem, i;
			// get the cats we'll be rendering from the octopus
			var cats = octopus.getCats();

			// empty the cat list
			this.catListElem.innerHTML = '';

			// loop over the cats
			for (i = 0; i < cats.length; i++) {
				// this is the cat we're currently looping over
				cat = cats[i];

				// make a new cat list item and set its text
				elem = document.createElement('li');
				elem.textContent = cat.name;

				// on click, setCurrentCat and render the catView
				// (this uses our closure-in-a-loop trick to connect the value
				//  of the cat variable to the click event function)
				elem.addEventListener('click', (function(catCopy) {
					return function() {
						octopus.setCurrentCat(catCopy);
						catView.render();
					};
				})(cat));

				// finally, add the element to the list
				this.catListElem.appendChild(elem);
			}
		}
};

//make it go!
octopus.init();