import React from 'react';


let cat1 = {
    id: 1,
    name: 'Mittens',
    description: 'Loves to nap in sunny spots.', 
    color: 'grey', 
    age: 5 
};

let cat2 = { id: 2, 
    name: 'Whiskers', 
    description: 'A fluffy and playful cat.', 
    color: 'orange', 
    age:2 };

let cat3 = { id: 3, 
    name: 'Socks',
    description: 'Adventurous and curious.', 
    color: 'black',
    age:1 };

let cat4 = {
    id: 4,
    name: 'Fluffy', 
    description: 'Sweet and cuddly.', 
    color: 'brown', 
    age: 5 
};

let cat5 = {
    id: 5, 
    name: 'Shadow', 
    description: 'Mysterious and independent.', 
    color: 'grey', 
    age: 3 };

let cat6 = { id: 6, 
    name: 'Tiger', 
    description: 'Striped and playful.', 
    color: 'orange', 
    age:1 }

    let cat7 = {
        id: 7,
        name: 'Oreo',
        description: 'Black and white, loves treats.',
        color: 'grey',
        age: 2
    };
    
    let cat8 = {
        id: 8,
        name: 'Ginger',
        description: 'Orange-colored, enjoys cuddles.',
        color: 'orange',
        age: 3
    };
    
    let cat9 = {
        id: 9,
        name: 'Midnight',
        description: 'Jet black, sleeps during the day.',
        color: 'black',
        age: 4
    };
    
    let cat10 = {
        id: 10,
        name: 'Snowball',
        description: 'White fur, playful and energetic.',
        color: 'white',
        age: 1
    };
    
    let cat11 = {
        id: 11,
        name: 'Simba',
        description: 'Golden fur, king of the house.',
        color: 'golden',
        age: 2
    };
    

let cats = [cat1, cat2, cat3, cat4, cat5, cat6, cat7, cat8, cat9, cat10, cat11];


export function getCats(){
    return cats;
}

export function addCat(cat){
    cats.push(cat);
}

export function deleteCat(index){
    cats.splice(index,1);
    console.log(cats)
}

export function updateCat(index, cat){
    cats[index] = cat
}

// export function getByIndex(index){
//     return cats[index]
// }
