// export const menuItems = {
//     Italok: [
//         { id: 8472, name: 'Cappuccino', price:4000, image: '/images/kv.jpg', description: 'Olasz étel paradicsom szósszal és sajttal', ingredients: ['Espresso kávé', 'Tejhab', 'Tej'] },
//         { id: 9371, name: 'Espresso',price:4000, image: '/images/kv.jpg', description: 'Olasz étel paradicsom szósszal és sajttal', ingredients: ['Őrölt kávé', 'Víz'] },
//     ],
//     Reggelik: [
//         { id: 2945, name: 'Egg & Cheese Sandwich',price:4000, image: '/images/kv.jpg', description: 'Olasz étel paradicsom szósszal és sajttal', ingredients: ['Tojás', 'Sajt', 'Pirított kenyér', 'Vaj'] },
//         { id: 1836, name: 'Yogurt Parfait',price:4000, image: '/images/kv.jpg', description: 'Olasz étel paradicsom szósszal és sajttal', ingredients: ['Joghurt', 'Müzli', 'Erdei gyümölcsök', 'Méz'] },
//     ],
//     Tészták: [
//         { id: 4567, name: 'Carbonara',price:4000, image: '/images/kv.jpg', description: 'Klasszikus olasz tészta szalonnás-tojásos szósszal', 
//           ingredients: ['Spagetti', 'Pancetta', 'Tojás', 'Pecorino sajt', 'Fekete bors'] },
//         { id: 4568, name: 'Bolognai spagetti', price:4000,image: '/images/kv.jpg', description: 'Paradicsomos húsos ragu spagettivel', 
//           ingredients: ['Spagetti', 'Darált hús', 'Paradicsom', 'Hagyma', 'Fokhagyma', 'Oregánó'] },
//         { id: 4569, name: 'Négy sajtos penne', price:4000,image: '/images/kv.jpg', description: 'Krémes sajtos tészta négyféle sajttal', 
//           ingredients: ['Penne', 'Gorgonzola', 'Parmezán', 'Mozzarella', 'Cheddar', 'Tejszín'] }
//     ],
//     Saláták: [
//         { id: 5671, name: 'Cézár saláta', price:4000,image: '/images/kv.jpg', description: 'Klasszikus cézár saláta grillezett csirkemellel', 
//           ingredients: ['Római saláta', 'Grillezett csirkemell', 'Kruton', 'Parmezán', 'Cézár öntet'] },
//         { id: 5672, name: 'Görög saláta', price:4000,image: '/images/kv.jpg', description: 'Friss zöldségek fetával', 
//           ingredients: ['Paradicsom', 'Uborka', 'Lilahagyma', 'Feta sajt', 'Olívabogyó', 'Oregánó'] },
//         { id: 5673, name: 'Tonhalsaláta',price:4000, image: '/images/kv.jpg', description: 'Tonhalas saláta főtt tojással', 
//           ingredients: ['Vegyes saláta', 'Tonhal', 'Főtt tojás', 'Olívabogyó', 'Kapribogyó', 'Lilahagyma'] },
//           { id: 5674, name: 'Tonhalsaláta',price:4000, image: '/images/kv.jpg', description: 'Tonhalas saláta főtt tojással', 
//             ingredients: ['Vegyes saláta', 'Tonhal', 'Főtt tojás', 'Olívabogyó', 'Kapribogyó', 'Lilahagyma'] },
//           { id: 5675, name: 'Tonhalsaláta',price:4000, image: '/images/kv.jpg', description: 'Tonhalas saláta főtt tojással', 
//               ingredients: ['Vegyes saláta', 'Tonhal', 'Főtt tojás', 'Olívabogyó', 'Kapribogyó', 'Lilahagyma'] },
//           { id: 5676, name: 'Tonhalsaláta', price:4000,image: '/images/kv.jpg', description: 'Tonhalas saláta főtt tojással', 
//                 ingredients: ['Vegyes saláta', 'Tonhal', 'Főtt tojás', 'Olívabogyó', 'Kapribogyó', 'Lilahagyma'] },
//         ],
//     Pizzák: [
//         { id: 6781, name: 'Margherita',price:4000, image: '/images/kv.jpg', description: 'Klasszikus olasz pizza paradicsommal és mozzarellával', 
//           ingredients: ['Paradicsomszósz', 'Mozzarella', 'Bazsalikom', 'Olívaolaj'] },
//         { id: 6782, name: 'Quattro Formaggi',price:4000, image: '/images/kv.jpg', description: 'Négysajtos pizza', 
//           ingredients: ['Mozzarella', 'Gorgonzola', 'Parmezán', 'Fontina sajt'] },
//         { id: 6783, name: 'Prosciutto e Funghi',price:4000, image: '/images/kv.jpg', description: 'Sonkás-gombás pizza', 
//           ingredients: ['Paradicsomszósz', 'Mozzarella', 'Sonka', 'Gomba'] }
//     ],
//     Levesek: [
//         { id: 7891, name: 'Húsleves',price:4000, image: '/images/kv.jpg', description: 'Klasszikus tyúkhúsleves zöldségekkel', 
//           ingredients: ['Tyúkhús', 'Sárgarépa', 'Fehérrépa', 'Zeller', 'Cérnametélt'] },
//         { id: 7892, name: 'Gulyásleves',price:4000, image: '/images/kv.jpg', description: 'Magyaros gulyásleves marhahússal', 
//           ingredients: ['Marhahús', 'Burgonya', 'Sárgarépa', 'Vöröshagyma', 'Pirospaprika'] },
//         { id: 7893, name: 'Francia hagymaleves',price:4000, image: '/images/kv.jpg', description: 'Klasszikus francia hagymaleves sajtos pirítóssal', 
//           ingredients: ['Vöröshagyma', 'Marhahúsleves', 'Fehérbor', 'Gruyere sajt', 'Bagett'] }
//     ],
//     'Frissen Sültek': [
//         { id: 9012, name: 'Bécsi szelet',price:4000, image: '/images/kv.jpg', description: 'Ropogós borjú bécsi szelet petrezselymes burgonyával', 
//           ingredients: ['Borjúhús', 'Zsemlemorzsa', 'Tojás', 'Burgonya', 'Petrezselyem'] },
//         { id: 9013, name: 'Grillezett lazac',price:4000, image: '/images/kv.jpg', description: 'Grillezett norvég lazac citrusos-kapros mártással', 
//           ingredients: ['Lazacfilé', 'Citrom', 'Kapor', 'Fokhagyma', 'Olívaolaj'] },
//         { id: 9014, name: 'BBQ oldalas',price:4000, image: '/images/kv.jpg', description: 'Füstös-édes BBQ szósszal glazírozott sertésoldalas', 
//           ingredients: ['Sertésoldalas', 'BBQ szósz', 'Fűszerkeverék', 'Méz', 'Fokhagyma'] }
//     ],
//     Desszertek: [
//         { id: 8901, name: 'Tiramisu',price:4000, image: '/images/kv.jpg', description: 'Klasszikus olasz kávés desszert', 
//           ingredients: ['Babapiskóta', 'Mascarpone', 'Espresso kávé', 'Kakaópor', 'Tojás'] },
//         { id: 8902, name: 'Somlói galuska',price:4000, image: '/images/kv.jpg', description: 'Magyar klasszikus desszert', 
//           ingredients: ['Piskóta', 'Dió', 'Mazsola', 'Csokoládéöntet', 'Tejszínhab'] },
//         { id: 8903, name: 'Crème brûlée',price:4000, image: '/images/kv.jpg', description: 'Francia vaníliás krém karamellizált cukorral', 
//           ingredients: ['Tejszín', 'Vanília', 'Tojássárgája', 'Cukor'] }
//     ],

// }



export const categories = ['Italok', 'Reggelik', 'Tészták', 'Saláták', 'Pizzák', 'Levesek', 'Desszertek', 'Frissen Sültek'];
export const days = ['Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek'];

export const weeklyItems = {
    Hétfő: {
        leves: [
            { id: 5291,price:1000, name: 'Újházi tyúkhúsleves', image: '/images/kv.jpg', description: 'Gazdag húsleves zöldségekkel, cérnametélttel és tyúkhússal' },
        ],
        menua: [
            { id: 7463, price:4000, name: 'Sztrapacska', image: '/images/kv.jpg', description: 'Juhtúrós-szalonnás burgonyás galuska' },
        ],
        menub: [
            { id: 3918, price:4000, name: 'Rántott csirkemell', image: '/images/kv.jpg', description: 'Ropogós rántott csirkemell petrezselymes burgonyával, savanyúsággal' },
        ],
    },
    Kedd: {
        leves: [
            { id: 6254, price:4000, name: 'Jókai bableves', image: '/images/kv.jpg', description: 'Füstölt csülökkel, kolbásszal és zöldségekkel gazdagított bableves' },
        ],
        menua: [
            { id: 4127, price:4000, name: 'Székelykáposzta', image: '/images/kv.jpg', description: 'Sertéshúsos, tejfölös savanyú káposzta főzelék' },
        ],
        menub: [
            { id: 9582, price:4000, name: 'Csirkepaprikás', image: '/images/kv.jpg', description: 'Tejfölös-paprikás csirkepörkölt galuskával' },
        ],
    },
    Szerda: {
        leves: [
            { id: 1473, price:4000, name: 'Gyümölcsleves', image: '/images/kv.jpg', description: 'Hideg tejszínes gyümölcsleves erdei gyümölcsökkel' },
        ],
        menua: [
            { id: 8629, price:4000, name: 'Rakott krumpli', image: '/images/kv.jpg', description: 'Tejfölös-tojásos rakott burgonya kolbásszal' },
        ],
        menub: [
            { id: 3745, price:4000, name: 'Töltött káposzta', image: '/images/kv.jpg', description: 'Hagyományos töltött káposzta tejföllel és friss kenyérrel' },
        ],
    },
    Csütörtök: {
        leves: [
            { id: 5836, price:4000, name: 'Halászlé', image: '/images/kv.jpg', description: 'Bajai halászlé ponttyal és harcsával, belsőséggel' },
        ],
        menua: [
            { id: 2914, price:4000, name: 'Hortobágyi húsos palacsinta', image: '/images/kv.jpg', description: 'Borjúpörkölttel töltött palacsinta, tejfölös mártással' },
        ],
        menub: [
            { id: 7192, price:4000, name: 'Pacalpörkölt', image: '/images/kv.jpg', description: 'Csípős pacalpörkölt főtt burgonyával és kovászos uborkával' },
        ],
    },
    Péntek: {
        leves: [
            { id: 4563, price:4000, name: 'Tárkonyos raguleves', image: '/images/kv.jpg', description: 'Tejszínes-tárkonyos csirkeraguleves' },
        ],
        menua: [
            { id: 9147, price:4000, name: 'Túrós csusza', image: '/images/kv.jpg', description: 'Tepsis túrós csusza pörccel és tejföllel' },
        ],
        menub: [
            { id: 6381, price:4000, name: 'Vadas marha', image: '/images/kv.jpg', description: 'Szarvas gomba mártással és zsemlegombóccal' },
        ],
    },
}