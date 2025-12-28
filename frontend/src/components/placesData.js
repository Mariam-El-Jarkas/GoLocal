// // Import images for all the places
// import soubraImg from '../assets/images/soubra.png';
// import senorPizzaImg from '../assets/images/senor-pizza.png';
// import toninosImg from '../assets/images/toninos.png';
// import beitMeryamImg from '../assets/images/beit-meryam.png';
// import multiverseImg from '../assets/images/multiverse.png';
// import diceCafeImg from '../assets/images/dice-cafe.png';
// import soapMuseumImg from '../assets/images/soap-museum.png';
// import debbanePalaceImg from '../assets/images/debbane-palace.png';
// import seaCastleImg from '../assets/images/sea-castle.png';
// import saintLouisCastleImg from '../assets/images/saint-louis-castle.png';
// import saidaCountryClubImg from '../assets/images/saida-country-club.png';
// import saoudiParkImg from '../assets/images/saoudi-park.png';
// import sheikhZayedParkImg from '../assets/images/sheikh-zayed-park.png';
// import starbucksImg from '../assets/images/starbucks.png';
// import dropCafeImg from '../assets/images/drop-cafe.png';
// import blendImg from '../assets/images/blend.png';
// import storiesImg from '../assets/images/stories.png';
// import heyaImg from '../assets/images/heya.png';
// import theSpotImg from '../assets/images/the-spot-saida.png';
// import oscarMallImg from '../assets/images/oscar-mall.png';
// import soukSaidaImg from '../assets/images/souk-saida.png';

// // Main array of places with details, images, and categories
// const placesData = [

//   // Food category
//   {
//     id: 1,
//     name: "Soubra",
//     category: "Food",
//     subCategory: "Burgers",
//     address: "Houssam El‑Deen Rafic Hariri Street, Saïda, Lebanon",
//     image: soubraImg,
//     description: "One of the best burger places in Saida, known for its juicy, flavorful burgers."
//   },
//   {
//     id: 2,
//     name: "Senor Pizza",
//     category: "Food",
//     subCategory: "Pizza",
//     address: "Chamaa Road, B Village, Saïda, Lebanon",
//     image: senorPizzaImg,
//     description: "Famous pizza and pasta restaurant in Saida, authentic Western‑style pizzas."
//   },
//   {
//     id: 3,
//     name: "Toninos",
//     category: "Food",
//     subCategory: "Dessert / Crepes",
//     address: "Murjan Square, Saïda, Lebanon",
//     image: toninosImg,
//     description: "Delicious crepes and sweet treats, a top dessert spot in Saida."
//   },
//   {
//     id: 4,
//     name: "Beit Meryam",
//     category: "Food",
//     subCategory: "Lebanese / Mediterranean",
//     address: "Abra, Saïda, Lebanon",
//     image: beitMeryamImg,
//     description: "A warm, home‑style restaurant in Abra, Saida serving authentic Lebanese and Mediterranean cuisine in a family atmosphere."
//   },

//   // Board Games
//   {
//     id: 5,
//     name: "Multiverse",
//     category: "Board Games",
//     subCategory: "Board / Tabletop / Escape",
//     address: "Oscar Mall, Saïda, Lebanon",
//     image: multiverseImg,
//     description: "A board‑game café where you can play board & card games, join Dungeons & Dragons campaigns, or try escape‑room style adventures."
//   },
//   {
//     id: 6,
//     name: "Dice Cafe",
//     category: "Board Games",
//     subCategory: "Board Games / Café",
//     address: "Hlaliyeh, Saïda, Lebanon",
//     image: diceCafeImg,
//     description: "A cozy café centered around board games, where you can play classics or try new favorites while sipping coffee."
//   },

//   // Culture / Museums
//   {
//     id: 7,
//     name: "Audi Soap Museum",
//     category: "Culture",
//     subCategory: "Museum",
//     address: "Al-Moutran Street, Haret Audi, Old Town Saïda, Lebanon",
//     image: soapMuseumImg,
//     description: "Museum in a historic soap factory, showing traditional soap‑making techniques and Levantine craftsmanship."
//   },
//   {
//     id: 8,
//     name: "Debbane Palace Museum",
//     category: "Culture",
//     subCategory: "Historical Mansion",
//     address: "Old Town Saïda, Lebanon",
//     image: debbanePalaceImg,
//     description: "An elegant Ottoman-era mansion turned museum, showcasing local history and architecture."
//   },

//   // History
//   {
//     id: 9,
//     name: "Sidon Sea Castle",
//     category: "History",
//     subCategory: "Castle",
//     address: "Coastal Road, Saïda, Lebanon",
//     image: seaCastleImg,
//     description: "A historic Crusader fortress built on a small island, connected to the mainland by a bridge."
//   },
//   {
//     id: 10,
//     name: "Castle of Saint Louis & Ziri Lighthouse",
//     category: "History",
//     subCategory: "Castle / Lighthouse",
//     address: "Acropolis Hill / Ziri Island, Saïda, Lebanon",
//     image: saintLouisCastleImg,
//     description: "Ruined Crusader castle on the hill and the nearby lighthouse on Ziri island — key historical landmarks."
//   },

//   // Leisure / Private Pools
//   {
//     id: 11,
//     name: "Saida Country Club",
//     category: "Leisure",
//     subCategory: "Private Pools",
//     address: "Qrayeh Village, Saïda, Lebanon",
//     image: saidaCountryClubImg,
//     description: "Private pool facility — women‑only on Monday‑Wednesday, mixed on other days."
//   },

//   // Parks
//   {
//     id: 12,
//     name: "Eng. Mohammad Zeher Al‑Saoudi Park",
//     category: "Parks",
//     subCategory: "Public Garden / Park",
//     address: "Saïda, Lebanon",
//     image: saoudiParkImg,
//     description: "A large, family‑friendly public park with green spaces, walking paths, fountains, and playgrounds."
//   },
//   {
//     id: 13,
//     name: "Sheikh Zayed Public Park",
//     category: "Parks",
//     subCategory: "Public Park",
//     address: "H968+VWP, Saïda, Lebanon",
//     image: sheikhZayedParkImg,
//     description: "A lush city park in Saida with walking paths, children's playground, and green areas. Established in cooperation with the UAE."
//   },

//   // Coffee Shops
//   {
//     id: 16,
//     name: "Starbucks",
//     category: "Coffee Shops",
//     subCategory: "International Café",
//     address: "The Spot Saida, Saïda, Lebanon",
//     image: starbucksImg,
//     description: "A well-known international coffee chain offering a variety of drinks and snacks."
//   },
//   {
//     id: 17,
//     name: "Drop",
//     category: "Coffee Shops",
//     subCategory: "Local Café",
//     address: "Ghassan Naffaa Street, Saïda, Lebanon",
//     image: dropCafeImg,
//     description: "A cozy coffee shop in Saida, perfect for hanging out, working, or chilling with friends."
//   },
//   {
//     id: 18,
//     name: "Blend",
//     category: "Coffee Shops",
//     subCategory: "Local Café",
//     address: "Haret Saida, Saïda, Lebanon",
//     image: blendImg,
//     description: "Modern coffee lounge known for its quality brews and relaxing ambiance."
//   },
//   {
//     id: 19,
//     name: "Stories",
//     category: "Coffee Shops",
//     subCategory: "Local Café",
//     address: "Main Street, Saïda, Lebanon",
//     image: storiesImg,
//     description: "A café in Saida where stories meet coffee — great for socializing, reading, or relaxing."
//   },
//   {
//     id: 20,
//     name: "Heya",
//     category: "Coffee Shops",
//     subCategory: "Women‑Only Café",
//     address: "Baasiri Street, Saïda, Lebanon",
//     image: heyaImg,
//     description: "A women‑only coffee shop, offering a safe and welcoming space exclusively for women."
//   },

//   // Shopping
//   {
//     id: 21,
//     name: "The Spot Saida",
//     category: "Shopping",
//     subCategory: "Mall",
//     address: "Nazih El Bizri Boulevard, Sidon, Lebanon",
//     image: theSpotImg,
//     description: "Modern shopping mall with a variety of stores, cafés, and entertainment options."
//   },
//   {
//     id: 22,
//     name: "Oscar Mall",
//     category: "Shopping",
//     subCategory: "Mall",
//     address: "Nazih El-Bizri Boulevard, Dakerman area, Saida, Lebanon",
//     image: oscarMallImg,
//     description: "Popular mall in Saida with retail stores, cafés, and entertainment options."
//   },
//   {
//     id: 23,
//     name: "Souk Saida",
//     category: "Shopping",
//     subCategory: "Traditional Market",
//     address: "Fakhreddine, Sidon, Lebanon",
//     image: soukSaidaImg,
//     description: "Traditional market offering local goods, spices, handicrafts, and souvenirs."
//   }
// ];

// export default placesData;
