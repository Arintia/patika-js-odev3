const kitchen = ["Korea", "Japan", "China"]; // mutfakları array içerisine aldım sonrasında kullanabilmek adına
const menu = [
  {
    id: 1,
    title: "Tteokbokki",
    category: kitchen[kitchen.indexOf("Korea")], // mutfakları array içerisine aldığım için arrayin elemanlarına eriştim
    price: 10.99,
    img:
      "https://twoplaidaprons.com/wp-content/uploads/2020/09/tteokbokki-top-down-view-of-tteokbokki-in-a-bowl-500x500.jpg",
    desc: `Spicy rice cakes, serving with fish cake.`
  },
  {
    id: 2,
    title: "Chicken Ramen",
    category: kitchen[kitchen.indexOf("Japan")],
    price: 7.99,
    img:
      "https://www.forkknifeswoon.com/wp-content/uploads/2014/10/simple-homemade-chicken-ramen-fork-knife-swoon-01.jpg",
    desc: `Chicken noodle soup, serving with vegetables such as soy bean, green onion. In an optional you can ask for egg. `
  },
  {
    id: 3,
    title: "Bibimbap",
    category: kitchen[kitchen.indexOf("Korea")],
    price: 8.99,
    img:
      "https://dwellbymichelle.com/wp-content/uploads/2020/05/DWELL-bibimbap.jpg",
    desc: `Boiling vegetables, serving with special hot sauce`
  },
  {
    id: 4,
    title: "Dan Dan Mian",
    category: kitchen[kitchen.indexOf("China")],
    price: 5.99,
    img:
      "https://www.savingdessert.com/wp-content/uploads/2019/02/Dan-Dan-Noodles-10.jpg",
    desc: `Dan dan noodle, serving with green onion `
  },
  {
    id: 5,
    title: "Yangzhou Fried Rice",
    category: kitchen[kitchen.indexOf("China")],
    price: 12.99,
    img:
      "https://salu-salo.com/wp-content/uploads/2013/02/Yangzhou-Fried-Rice1.jpg",
    desc: `Yangzhou style fried rice, serving with bean and pickles `
  },
  {
    id: 6,
    title: "Onigiri",
    category: kitchen[kitchen.indexOf("Japan")],
    price: 9.99,
    img:
      "https://www.manusmenu.com/wp-content/uploads/2017/08/Onigiri-3-1-of-1.jpg",
    desc: `Rice Sandwich, serving with soy sauce`
  },
  {
    id: 7,
    title: "Jajangmyeon",
    category: kitchen[kitchen.indexOf("Korea")],
    price: 15.99,
    img:
      "https://www.curiouscuisiniere.com/wp-content/uploads/2020/04/Jajangmyeon-Korean-Noodles-in-Black-Bean-Sauce5.1200H-720x540.jpg",
    desc: `Black bean sauce noodle, serving with green onion `
  },
  {
    id: 8,
    title: "Ma Yi Shang Shu",
    category: kitchen[kitchen.indexOf("China")],
    price: 12.99,
    img:
      "https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/F688C2F6-86EC-46C4-B9C7-A6BA01DF7437/Derivates/32E3E72A-F786-406D-AF7F-B30980A9AC6C.jpg",
    desc: `Hot pepper sauce noodle, serving with soy bean and onion`
  },
  {
    id: 9,
    title: "Doroyaki",
    category: kitchen[kitchen.indexOf("Japan")],
    price: 3.99,
    img:
      "https://www.justonecookbook.com/wp-content/uploads/2011/10/Dorayaki-New-500x400.jpg",
    desc: `Red bean paste dessert, serving with honey.`
  },
];

const buttonDOM = document.querySelector(".btn-container"); // dom elemanına erişim
const menuDOM = document.querySelector(".section-center"); // dom elemanına erişim

// buton oluşturma fonksiyonu bir isim parametresi alıyor
function createButton(name) {
  return `<button class="btn btn-outline-dark btn-item" id="${name}-btn">${name}</button>`;
}

/* all butonunu ayrı ekleyip diğer butonlarımı oluşturduğum mutfak arrayinden ekledim
  bu yaklaşım ile birden fazla buton eklemek istediğinizde tek yapmanız gereken arraye bir eleman eklemek
  sonrasında foreach ile tüm btn classına sahip butonları döngüye sokarak event listener ekledim
*/
function initializeButtons() {
  buttonDOM.innerHTML += createButton("All");
  kitchen.forEach(item => {
    buttonDOM.innerHTML += createButton(item);
  });
  document.querySelectorAll(".btn").forEach(button => {
    button.addEventListener("click", sortItems);
  })
}

// menüdeki tüm itemler arasında döngü yaparak bunları menü domuna ekliyor
function initializeInitialPage() {
  menu.forEach(item => {
    menuDOM.innerHTML += initializeItem(item);
  });
}

// event parametresi kabul ederek event targettan basılan butonun ID'sine ulaştım
function sortItems(event) {
  menuDOM.innerHTML = ""; // fonksiyon her çağrıldığında domun içini sıfırlıyor
  const kitchenName = event.target.id; // event target ile basılan butonun ID'sine ulaşıyor
  if(kitchenName == "All-btn") { // eğer idsi All-btn ise 
    initializeInitialPage(); // tüm itemler arasında döngü yapan fonksiyonu çağrıyor
  } else { // eğer idsi All-btn değilse
    const kitchenOrigin = menu.filter(food => food.category == kitchenName.substring(0, kitchenName.indexOf('-'))); // butonun idsindeki -btn kısmını attıktan sonra kalan All, China, Korea gibi şeyler eşitse o elemanlarla yeni bir array oluşturuyor
    kitchenOrigin.forEach(item => { // yeni arrayimiz içerisinde döngü yaparak o itemleri domda initialize ediyor
      menuDOM.innerHTML += initializeItem(item);
    });
  }
}

function initializeItem(item) { // dom içerisine yazılacak HTML kodumuz
  return  `
            <div class="menu-items col-lg-6 col-sm-12">
              <img src="${item.img}" alt="${item.title}" class="photo">
              <div class="menu-info">
                <div class="menu-title">
                  <h4>${item.title}</h4>
                  <h4 class="price">${item.price}</h4>
                </div>
                <div class="menu-text">
                  ${item.desc}
                </div>
              </div>
            </div>
          `
}

initializeInitialPage(); // sayfa ilk açıldığında "All" butonuna basılmış gibi tüm elemanlar arası döngü yapacak fonksiyonu çağrıyor
initializeButtons(); // sayfa ilk açıldığında butonları oluşturuyor

