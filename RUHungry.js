//////////////////////////
// R U Hungry Console App
/////////////////////////

// Step 1: Load in Necessary Modules
////////////////////////////////////

// add in the prompt-sync module 
// allows to take in and display users name
const prompt = require('prompt-sync')();

// load in fs module
// allows reading in from text files
const fs = require("fs");

// load open module 
//allows the opening of webpages
const open = require('open');

// Step 2: Create a menu object 
///////////////////////////////

let menu = {
    starters: [],
    mains: [],
    desserts: []
}

// Step 3 Create a factory function to update the Menu object
/////////////////////////////////////////////////////////////

const menuUpdate = (course, dishName, dishLink) => {
    if (course.toLowerCase() === 'starter') {
        let newItem = { dish: dishName, link: dishLink };
        menu.starters.push(newItem);
    } else if (course.toLowerCase() === 'main') {
        let newItem = { dish: dishName, link: dishLink };
        menu.mains.push(newItem);
    } else if (course.toLowerCase() === 'dessert') {
        let newItem = { dish: dishName, link: dishLink };
        menu.desserts.push(newItem);
    } else {
        console.log('You did not enter a valid course.\nCould not update menu');
    }
}

// Step 4: Read in text files of scraped web data
/////////////////////////////////////////////////

const dishes = [menu.starters, menu.mains, menu.desserts];
const filesToRead = ['starters.txt', 'mains.txt', 'desserts.txt'];

function addFiles(course, file) {
    const text = fs.readFileSync(`./menu_files/${file}`);
    const textByLine = text.toString().split("\n");
    for (const line of textByLine) {
        course.push(line);
    }
}

addFiles(dishes[0], filesToRead[0]);
addFiles(dishes[1], filesToRead[1]);
addFiles(dishes[2], filesToRead[2]);

// Step 5: Put it all together
//////////////////////////////

console.log('\n\nFeeling hungry and can\'t decide what to eat? You have come to the right place.')
const name = prompt('What is your name? ');
console.log(`\nWelcome, ${name}!\nWould you like to be:\n1.Presented With a Menu\n2.Add a Dish to the Menu`);
console.log('\nIf you want to add an item to the menu please do this before requesting a menu,\nas after the menu is requested, the program will exit and open the recipes')

let userChoice;

while (true) {
    console.log("\nEnter 1 to get a Menu\nEnter 2 to add a Menu Item\nEnter 3 to exit R U Hungry");
    userChoice = Number(prompt());
    if (userChoice === 1) {
        const starterSelector = Math.floor(Math.random() * menu.starters.length);
        const mainSelector = Math.floor(Math.random() * menu.mains.length);
        const dessertSelector = Math.floor(Math.random() * menu.desserts.length);

        let starterDish = menu.starters[starterSelector].split(',')[0];
        let starterRecipe = menu.starters[starterSelector].split(',')[1];
        let mainDish = menu.mains[mainSelector].split(',')[0];
        let mainRecipe = menu.mains[mainSelector].split(',')[1];
        let dessertDish = menu.desserts[dessertSelector].split(',')[0];
        let dessertRecipe = menu.desserts[dessertSelector].split(',')[1];

        console.log(`\n\n${name}, your Menu is as follows:\n`);
        console.log(`Starter: ${starterDish}`);
        console.log(`Main: ${mainDish}`);
        console.log(`Dessert: ${dessertDish}`);

        console.log('\nWe will direct you to recipes for your selected dishes');

        // creat sleep function to make code pause:
        const sleep = (milliseconds) => {
            return new Promise(resolve => setTimeout(resolve, milliseconds))
        }

        sleep(8000).then(() => {
            // opens the url in the default browser 
            open(starterRecipe);
            open(mainRecipe);
            open(dessertRecipe);

        })

        break;


    } else if (userChoice === 2) {

        let userCourse = prompt('\n\nIs your dish a Starter, Main or Dessert?  ');
        let userDishName = prompt('Great! Please tell me the name of your dish  ');
        let userDishLink = prompt('Please provide the link to the dish recipe ');

        menuUpdate(userCourse, userDishName, userDishLink);

        // write to text file for future use
        switch (userCourse.toLowerCase().trim()) {
            case 'starter':
                fs.appendFile('./menu_files/starters.txt', `${userDishName.trim()},${userDishLink.trim()}`, function (err) {
                    if (err) {
                        console.log('\nCould not add menu item')
                    } else {
                        //
                    }
                })
                break;
            case 'main':
                fs.appendFile('./menu_files/mains.txt', `${userDishName.trim()},${userDishLink.trim()}`, function (err) {
                    if (err) {
                        console.log('\nCould not add menu item')
                    } else {
                        //
                    }
                })
                break;
            default:
                fs.appendFile('./menu_files/desserts.txt', `${userDishName.trim()},${userDishLink.trim()}`, function (err) {
                    if (err) {
                        console.log('\nCould not add menu item')
                    } else {
                        //
                    }
                })
        }


        fs.appendFile('log.txt', 'new data', function (err) {
            if (err) {
                // append failed
            } else {
                // done
            }
        })
        console.log('Menu updated with your dish!');

    } else {
        console.log(`Goodbye, ${name}.`);
        break;
    }

    console.log('\nWould you like to now see a Menu selection?');


}

// End



