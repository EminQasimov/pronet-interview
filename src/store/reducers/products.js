import { DELETE_PRODUCT, ADD_PRODUCT } from "../actions"
import produce from "immer"
const initialProducts = [
  {
    name: "Fujitsu A5R35-E",
    İstehsalçı: "Toshiab ",
    "Ölçü vahidi": "134 x 245 x 32 mm",
    CPU: "Core Duo 2.6 Ghrz",
    HDD: "1TR",
    RAM: "Mövcud deyil",
    "Satış qiyməti": "10 000 AZN",
    "Diler qiyməti": "20 000 AZN",
    Partner: "PRONET",
    Şəkil: "asusnotebook.jpg",
    Qeyd: "Mövcud deyil"
  },
  {
    name: "Fujitsu A5R35-D",
    İstehsalçı: "Dell Company",
    "Ölçü vahidi": "134 x 245 x 32 mm",
    CPU: "Core Duo 2.6 Ghrz",
    HDD: "Mövcud deyil",
    RAM: "8GB",
    "Satış qiyməti": "33 000 AZN",
    "Diler qiyməti": "20 000 AZN",
    Partner: "PRONET",
    Şəkil: "asusnotebook.jpg",
    Qeyd: "Eladir"
  },
  {
    name: "Fujitsu 36GD9-A",
    İstehsalçı: "Samsung",
    "Ölçü vahidi": "134 x 245 x 32 mm",
    CPU: "Core Duo 2.6 Ghrz",
    HDD: "512GB",
    RAM: "Mövcud deyil",
    "Satış qiyməti": "22 000 AZN",
    "Diler qiyməti": "20 000 AZN",
    Partner: "PRONET",
    Şəkil: "asusnotebook.jpg",
    Qeyd: "Mövcud deyil"
  },
  {
    name: "Fujitsu A536H-H",
    İstehsalçı: "Apple Inc",
    "Ölçü vahidi": "134 x 245 x 32 mm",
    CPU: "Core Duo 2.6 Ghrz",
    HDD: "Mövcud deyil",
    RAM: "128GB",
    "Satış qiyməti": "10 000 AZN",
    "Diler qiyməti": "20 000 AZN",
    Partner: "PRONET",
    Şəkil: "asusnotebook.jpg",
    Qeyd: "Mövcud deyil"
  },
  {
    name: "Fujitsu A5R35-D",
    İstehsalçı: "Google Company",
    "Ölçü vahidi": "134 x 245 x 32 mm",
    CPU: "Core Duo 2.6 Ghrz",
    HDD: "512GB",
    RAM: "Mövcud deyil",
    "Satış qiyməti": "10 000 AZN",
    "Diler qiyməti": "34 000 AZN",
    Partner: "PRONET",
    Şəkil: "acer.jpg",
    Qeyd: "Mövcud deyil"
  },
  {
    name: "Fujitsu A5R35-Q",
    İstehsalçı: "Microsoft ",
    "Ölçü vahidi": "134 x 245 x 32 mm",
    CPU: "Core Duo 2.6 Ghrz",
    HDD: "Mövcud deyil",
    RAM: "Mövcud deyil",
    "Satış qiyməti": "77 000 AZN",
    "Diler qiyməti": "88 000 AZN",
    Partner: "PRONET",
    Şəkil: "asusnotebook.jpg",
    Qeyd: "Mövcud deyil"
  },
  {
    name: "Fujitsu 36GD9-F",
    İstehsalçı: "DELL LLC",
    "Ölçü vahidi": "134 x 245 x 32 mm",
    CPU: "Core Duo 2.6 Ghrz",
    HDD: "1024GB",
    RAM: "Mövcud deyil",
    "Satış qiyməti": "55 000 AZN",
    "Diler qiyməti": "20 777 AZN",
    Partner: "PRONET",
    Şəkil: "macboook.jpg",
    Qeyd: "Mövcud deyil"
  },
  {
    name: "Fujitsu A536H-B",
    İstehsalçı: "HP LLD",
    "Ölçü vahidi": "134 x 245 x 32 mm",
    CPU: "Core Duo 2.6 Ghrz",
    HDD: "Mövcud deyil",
    RAM: "Mövcud deyil",
    "Satış qiyməti": "88 888 AZN",
    "Diler qiyməti": "20 999 AZN",
    Partner: "PRONET",
    Şəkil: "asusnotebook.jpg",
    Qeyd: "Mövcud deyil"
  },
  {
    name: "Fujitsu A5R35-N",
    İstehsalçı: "Fujitsi",
    "Ölçü vahidi": "134 x 245 x 32 mm",
    CPU: "Core Duo 2.6 Ghrz",
    HDD: "Mövcud deyil",
    RAM: "Mövcud deyil",
    "Satış qiyməti": "10 000 AZN",
    "Diler qiyməti": "20 000 AZN",
    Partner: "PRONET",
    Şəkil: "asusnotebook.jpg",
    Qeyd: "Mövcud deyil"
  },
  {
    name: "Fujitsu A536H-H",
    İstehsalçı: "Facebook A4673",
    "Ölçü vahidi": "134 x 245 x 32 mm",
    CPU: "Core Duo 2.6 Ghrz",
    HDD: "Mövcud deyil",
    RAM: "Mövcud deyil",
    "Satış qiyməti": "44 000 AZN",
    "Diler qiyməti": "12 000 AZN",
    Partner: "PRONET",
    Şəkil: "asusnotebook.jpg",
    Qeyd: "Mövcud deyil"
  },

  {
    name: "Protege",
    İstehsalçı: "Tonia",
    ölkə: "Pickburn",
    email: "tpickburn0@time.com",
    Partner: "Female",
    Qiyməti: "31.37.201.141",
    əlaqə: "(731) 5351600"
  },
  {
    name: "Crown Victoria",
    İstehsalçı: "Ario",
    ölkə: "Sabater",
    email: "asabater1@statcounter.com",
    Partner: "Male",
    Qiyməti: "23.177.148.49",
    əlaqə: "(274) 5660255"
  },
  {
    name: "Sigma",
    İstehsalçı: "Neysa",
    ölkə: "Fensome",
    email: "nfensome2@jimdo.com",
    Partner: "Female",
    Qiyməti: "177.28.178.63",
    əlaqə: "(258) 7688659"
  },
  {
    name: "Leganza",
    İstehsalçı: "Thia",
    ölkə: "Pietsma",
    email: "tpietsma3@bandcamp.com",
    Partner: "Female",
    Qiyməti: "167.28.109.126",
    əlaqə: "(154) 7890332"
  },
  {
    name: "Envoy",
    İstehsalçı: "Rodie",
    ölkə: "Boulden",
    email: "rboulden4@umn.edu",
    Partner: "Female",
    Qiyməti: "9.164.205.98",
    əlaqə: "(600) 6038237"
  },
  {
    name: "Cougar",
    İstehsalçı: "Lorianne",
    ölkə: "Bothen",
    email: "lbothen5@bigcartel.com",
    Partner: "Female",
    Qiyməti: "211.103.50.82",
    əlaqə: "(514) 4927365"
  },
  {
    name: "Acclaim",
    İstehsalçı: "Elie",
    ölkə: "Grellier",
    email: "egrellier6@cbsnews.com",
    Partner: "Female",
    Qiyməti: "205.202.162.107",
    əlaqə: "(878) 2567181"
  },
  {
    name: "Excel",
    İstehsalçı: "Teador",
    ölkə: "Vickar",
    email: "tvickar7@hostgator.com",
    Partner: "Male",
    Qiyməti: "199.0.66.154",
    əlaqə: "(416) 8321259"
  },
  {
    name: "Jetta",
    İstehsalçı: "Nike",
    ölkə: "Gilley",
    email: "ngilley8@bandcamp.com",
    Partner: "Female",
    Qiyməti: "207.180.248.97",
    əlaqə: "(720) 9632594"
  },
  {
    name: "Yaris",
    İstehsalçı: "Penny",
    ölkə: "Greenleaf",
    email: "pgreenleaf9@buzzfeed.com",
    Partner: "Female",
    Qiyməti: "2.148.218.38",
    əlaqə: "(672) 5876570"
  },

  {
    name: "ENAUT",
    qiymət: "$2,831.01",
    picture: "http://placehold.it/32x32",
    company: "MATRIXITY",
    email: "bertamassey@matrixity.com",
    telefon: "+1 (918) 470-2696",
    address: "Chase Court, Caspar",
    qeyd: "in duis ea sit aliquip"
  },
  {
    name: "ZUVY",
    qiymət: "$1,161.30",
    picture: "http://placehold.it/32x32",
    company: "GEEKFARM",
    email: "bertamassey@geekfarm.com",
    telefon: "+1 (912) 438-3761",
    address: "Oliver Street, Bluetown",
    qeyd: "et id excepteur sunt excepteur"
  },
  {
    name: "FITCORE",
    qiymət: "$1,371.06",
    picture: "http://placehold.it/32x32",
    company: "INSURON",
    email: "bertamassey@insuron.com",
    telefon: "+1 (944) 520-2484",
    address: "Albemarle Terrace, Oley",
    qeyd: "enim Lorem dolor nisi veniam"
  },
  {
    name: "GUSHKOOL",
    qiymət: "$1,749.74",
    picture: "http://placehold.it/32x32",
    company: "DOGNOST",
    email: "bertamassey@dognost.com",
    telefon: "+1 (918) 413-2276",
    address: "Bergen Street, Juarez",
    qeyd: "ut pariatur nostrud pariatur aute"
  },
  {
    name: "ISOLOGICA",
    qiymət: "$1,892.43",
    picture: "http://placehold.it/32x32",
    company: "QUILTIGEN",
    email: "bertamassey@quiltigen.com",
    telefon: "+1 (822) 508-2451",
    address: "Keap Street, Cawood",
    qeyd: "adipisicing eiusmod ad laboris aute"
  },
  {
    name: "PARCOE",
    qiymət: "$3,757.65",
    picture: "http://placehold.it/32x32",
    company: "METROZ",
    email: "bertamassey@metroz.com",
    telefon: "+1 (857) 582-2063",
    address: "Pierrepont Place, Yettem",
    qeyd: "nulla labore cupidatat eiusmod laboris"
  }
]

export default function(state = initialProducts, action) {
  switch (action.type) {
    case DELETE_PRODUCT:
      console.log("from product reducer-deleted", action.name)
      return [...state].filter(el => el.name !== action.name)

    case ADD_PRODUCT:
      console.log("from product reducer-deleted", action.name)
      return produce(state, draft => {
        draft.push({ name: action.name })
      })

    default:
      return state
  }
}
