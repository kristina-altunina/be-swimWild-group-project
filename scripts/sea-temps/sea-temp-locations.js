const locations = [
  {
    url: "/europe/united-kingdom/aberaeron.htm",
    name: "Aberaeron",
    coords: [52.2431766, -4.2600153],
  },
  {
    url: "/europe/united-kingdom/aberdeen.htm",
    name: "Aberdeen",
    coords: [57.1482429, -2.0928095],
  },
  {
    url: "/europe/united-kingdom/aberdour.htm",
    name: "Aberdour",
    coords: [56.0536974, -3.3019614],
  },
  {
    url: "/europe/united-kingdom/aberporth.htm",
    name: "Aberporth",
    coords: [52.1341692, -4.5462206],
  },
  {
    url: "/europe/united-kingdom/aberystwyth.htm",
    name: "Aberystwyth",
    coords: [52.4143113, -4.0816846],
  },
  {
    url: "/europe/united-kingdom/airth.htm",
    name: "Airth",
    coords: [56.0682549, -3.7699112],
  },
  {
    url: "/europe/united-kingdom/aldeburgh.htm",
    name: "Aldeburgh",
    coords: [52.1523814, 1.6015691],
  },
  {
    url: "/europe/united-kingdom/alderney.htm",
    name: "Alderney",
    coords: [51.489485, -0.143656],
  },
  {
    url: "/europe/united-kingdom/alnmouth.htm",
    name: "Alnmouth",
    coords: [55.3883231, -1.6126304],
  },
  {
    url: "/europe/united-kingdom/amble.htm",
    name: "Amble",
    coords: [55.3337748, -1.5839378],
  },
  {
    url: "/europe/united-kingdom/amlwch.htm",
    name: "Amlwch",
    coords: [53.4090317, -4.342649],
  },
  {
    url: "/europe/united-kingdom/annalong.htm",
    name: "Annalong",
    coords: [54.1075749, -5.8972213],
  },
  {
    url: "/europe/united-kingdom/anstruther.htm",
    name: "Anstruther",
    coords: [56.2227638, -2.7005643],
  },
  {
    url: "/europe/united-kingdom/appledore.htm",
    name: "Appledore",
    coords: [51.03644635, 0.7849114340136915],
  },
  {
    url: "/europe/united-kingdom/ardglass.htm",
    name: "Ardglass",
    coords: [54.2633035, -5.6098711],
  },
  {
    url: "/europe/united-kingdom/ardrishaig.htm",
    name: "Ardrishaig",
    coords: [56.0154597, -5.4480487],
  },
  {
    url: "/europe/united-kingdom/arnside.htm",
    name: "Arnside",
    coords: [54.2013106, -2.8342988],
  },
  {
    url: "/europe/united-kingdom/askam-in-furness.htm",
    name: "Askam in Furness",
    coords: [54.1887065, -3.2039446],
  },
  {
    url: "/europe/united-kingdom/ayr.htm",
    name: "Ayr",
    coords: [55.4628044, -4.6302502],
  },
  {
    url: "/europe/united-kingdom/balintore.htm",
    name: "Balintore",
    coords: [57.7553925, -3.9130427],
  },
  {
    url: "/europe/united-kingdom/ballycastle.htm",
    name: "Ballycastle",
    coords: [55.2006882, -6.250282],
  },
  {
    url: "/europe/united-kingdom/ballywalter.htm",
    name: "Ballywalter",
    coords: [54.5439048, -5.4867684],
  },
  {
    url: "/europe/united-kingdom/banff.htm",
    name: "Banff",
    coords: [57.6647037, -2.5232971],
  },
  {
    url: "/europe/united-kingdom/barmouth.htm",
    name: "Barmouth",
    coords: [52.7210389, -4.0535692],
  },
  {
    url: "/europe/united-kingdom/barnstaple.htm",
    name: "Barnstaple",
    coords: [51.0804057, -4.0600467],
  },
  {
    url: "/europe/united-kingdom/beadnell.htm",
    name: "Beadnell",
    coords: [55.5568858, -1.636858],
  },
  {
    url: "/europe/united-kingdom/beaumaris.htm",
    name: "Beaumaris",
    coords: [53.262963, -4.0920538],
  },
  {
    url: "/europe/united-kingdom/belfast.htm",
    name: "Belfast",
    coords: [54.603533, -5.928807],
  },
  {
    url: "/europe/united-kingdom/bembridge.htm",
    name: "Bembridge",
    coords: [50.6887044, -1.0849341],
  },
  {
    url: "/europe/united-kingdom/benllech.htm",
    name: "Benllech",
    coords: [53.321191, -4.2205614],
  },
  {
    url: "/europe/united-kingdom/berwick-upon-tweed.htm",
    name: "Berwick-Upon-Tweed",
    coords: [55.7692442, -2.0026472],
  },
  {
    url: "/europe/united-kingdom/bideford.htm",
    name: "Bideford",
    coords: [51.0181448, -4.2064223],
  },
  {
    url: "/europe/united-kingdom/birdham.htm",
    name: "Birdham",
    coords: [50.79401045, -0.8336022067471976],
  },
  {
    url: "/europe/united-kingdom/birkenhead.htm",
    name: "Birkenhead",
    coords: [53.3895177, -3.0248007],
  },
  {
    url: "/europe/united-kingdom/blackpool.htm",
    name: "Blackpool",
    coords: [53.8179442, -3.0509812],
  },
  {
    url: "/europe/united-kingdom/blyth.htm",
    name: "Blyth",
    coords: [55.1270903, -1.5099726],
  },
  {
    url: "/europe/united-kingdom/boddam.htm",
    name: "Boddam",
    coords: [57.4721372, -1.7805417],
  },
  {
    url: "/europe/united-kingdom/bosham.htm",
    name: "Bosham",
    coords: [50.826113899999996, -0.8390211276770202],
  },
  {
    url: "/europe/united-kingdom/bournemouth.htm",
    name: "Bournemouth",
    coords: [50.720097, -1.8799272],
  },
  {
    url: "/europe/united-kingdom/boness.htm",
    name: "Bo’ness",
    coords: [56.0176867, -3.6073601],
  },
  {
    url: "/europe/united-kingdom/brighton.htm",
    name: "Brighton",
    coords: [50.8214626, -0.1400561],
  },
  {
    url: "/europe/united-kingdom/brixham.htm",
    name: "Brixham",
    coords: [50.3952404, -3.514544],
  },
  {
    url: "/europe/united-kingdom/broadstairs.htm",
    name: "Broadstairs",
    coords: [51.3586758, 1.4407855],
  },
  {
    url: "/europe/united-kingdom/brora.htm",
    name: "Brora",
    coords: [58.0110396, -3.8551179],
  },
  {
    url: "/europe/united-kingdom/buckhaven.htm",
    name: "Buckhaven",
    coords: [56.1710696, -3.0333966],
  },
  {
    url: "/europe/united-kingdom/bude.htm",
    name: "Bude",
    coords: [50.8285252, -4.5469361],
  },
  {
    url: "/europe/united-kingdom/budleigh-salterton.htm",
    name: "Budleigh Salterton",
    coords: [50.6310504, -3.329984389371436],
  },
  {
    url: "/europe/united-kingdom/burghead.htm",
    name: "Burghead",
    coords: [57.7016831, -3.4901659],
  },
  {
    url: "/europe/united-kingdom/burnham-on-sea.htm",
    name: "Burnham-on-Sea",
    coords: [51.2377356, -2.998695],
  },
  {
    url: "/europe/united-kingdom/burntisland.htm",
    name: "Burntisland",
    coords: [56.0593631, -3.2330993],
  },
  {
    url: "/europe/united-kingdom/cairnryan.htm",
    name: "Cairnryan",
    coords: [54.9738045, -5.0250851],
  },
  {
    url: "/europe/united-kingdom/campbeltown.htm",
    name: "Campbeltown",
    coords: [55.4241858, -5.6051005],
  },
  {
    url: "/europe/united-kingdom/cardiff.htm",
    name: "Cardiff",
    coords: [51.4816546, -3.1791934],
  },
  {
    url: "/europe/united-kingdom/carnlough.htm",
    name: "Carnlough",
    coords: [54.9929248, -5.9899592],
  },
  {
    url: "/europe/united-kingdom/carnoustie.htm",
    name: "Carnoustie",
    coords: [56.5010506, -2.711403],
  },
  {
    url: "/europe/united-kingdom/carrickfergus.htm",
    name: "Carrickfergus",
    coords: [54.7136165, -5.8073112],
  },
  {
    url: "/europe/united-kingdom/chepstow.htm",
    name: "Chepstow",
    coords: [51.6409342, -2.6766946],
  },
  {
    url: "/europe/united-kingdom/christchurch.htm",
    name: "Christchurch",
    coords: [50.734902, -1.7778853],
  },
  {
    url: "/europe/united-kingdom/cleethorpes.htm",
    name: "Cleethorpes",
    coords: [53.5572068, -0.0289969],
  },
  {
    url: "/europe/united-kingdom/clevedon.htm",
    name: "Clevedon",
    coords: [51.4360625, -2.8526531],
  },
  {
    url: "/europe/united-kingdom/cockenzie.htm",
    name: "Cockenzie",
    coords: [55.9715981, -2.9527646],
  },
  {
    url: "/europe/united-kingdom/conon-bridge.htm",
    name: "Conon Bridge",
    coords: [57.5652452, -4.4347236],
  },
  {
    url: "/europe/united-kingdom/conwy.htm",
    name: "Conwy",
    coords: [53.2811822, -3.8287012],
  },
  {
    url: "/europe/united-kingdom/cowes.htm",
    name: "Cowes",
    coords: [50.7633176, -1.2985186],
  },
  {
    url: "/europe/united-kingdom/criccieth.htm",
    name: "Criccieth",
    coords: [52.9206106, -4.2332414],
  },
  {
    url: "/europe/united-kingdom/cromer.htm",
    name: "Cromer",
    coords: [52.9311367, 1.3012758],
  },
  {
    url: "/europe/united-kingdom/crosby.htm",
    name: "Crosby",
    coords: [53.4844386, -3.0291758],
  },
  {
    url: "/europe/united-kingdom/culmore.htm",
    name: "Culmore",
    coords: [55.0499273, -7.2667022],
  },
  {
    url: "/europe/united-kingdom/cushendall.htm",
    name: "Cushendall",
    coords: [55.080819, -6.0640644],
  },
  {
    url: "/europe/united-kingdom/dale.htm",
    name: "Dale",
    coords: [51.7075201, -5.1694437],
  },
  {
    url: "/europe/united-kingdom/dartmouth.htm",
    name: "Dartmouth",
    coords: [50.3514839, -3.583844],
  },
  {
    url: "/europe/united-kingdom/dawlish.htm",
    name: "Dawlish",
    coords: [50.5797391, -3.468931],
  },
  {
    url: "/europe/united-kingdom/deal.htm",
    name: "Deal",
    coords: [51.2239544, 1.4027344],
  },
  {
    url: "/europe/united-kingdom/derry.htm",
    name: "Derry",
    coords: [54.3923039, -5.998276881455698],
  },
  {
    url: "/europe/united-kingdom/donaghadee.htm",
    name: "Donaghadee",
    coords: [54.6411042, -5.5391029],
  },
  {
    url: "/europe/united-kingdom/dover.htm",
    name: "Dover",
    coords: [51.1251275, 1.3134228],
  },
  {
    url: "/europe/united-kingdom/dovercourt.htm",
    name: "Dovercourt",
    coords: [51.9339114, 1.2776636],
  },
  {
    url: "/europe/united-kingdom/dumbarton.htm",
    name: "Dumbarton",
    coords: [55.9432443, -4.5708479],
  },
  {
    url: "/europe/united-kingdom/dunbar.htm",
    name: "Dunbar",
    coords: [56.0021385, -2.5158237],
  },
  {
    url: "/europe/united-kingdom/dundee.htm",
    name: "Dundee",
    coords: [56.4605938, -2.97019],
  },
  {
    url: "/europe/united-kingdom/dundrum.htm",
    name: "Dundrum",
    coords: [54.2581955, -5.8426084],
  },
  {
    url: "/europe/united-kingdom/dunoon.htm",
    name: "Dunoon",
    coords: [55.9470831, -4.924916],
  },
  {
    url: "/europe/united-kingdom/dymchurch.htm",
    name: "Dymchurch",
    coords: [51.0263293, 0.9936502],
  },
  {
    url: "/europe/united-kingdom/easington.htm",
    name: "Easington",
    coords: [54.7850506, -1.3530807],
  },
  {
    url: "/europe/united-kingdom/east-cowes.htm",
    name: "East Cowes",
    coords: [50.7594841, -1.2852106],
  },
  {
    url: "/europe/united-kingdom/east-wemyss.htm",
    name: "East Wemyss",
    coords: [56.1616165, -3.0624745],
  },
  {
    url: "/europe/united-kingdom/eastbourne.htm",
    name: "Eastbourne",
    coords: [50.7664372, 0.2781546],
  },
  {
    url: "/europe/united-kingdom/edinburgh.htm",
    name: "Edinburgh",
    coords: [55.9533456, -3.1883749],
  },
  {
    url: "/europe/united-kingdom/emsworth.htm",
    name: "Emsworth",
    coords: [50.8473211, -0.9371343],
  },
  {
    url: "/europe/united-kingdom/errol.htm",
    name: "Errol",
    coords: [56.3913112, -3.2152506],
  },
  {
    url: "/europe/united-kingdom/erskine.htm",
    name: "Erskine",
    coords: [55.9042117, -4.4492326],
  },
  {
    url: "/europe/united-kingdom/exmouth.htm",
    name: "Exmouth",
    coords: [50.6190962, -3.4146801],
  },
  {
    url: "/europe/united-kingdom/fairlie.htm",
    name: "Fairlie",
    coords: [55.7536302, -4.8547073],
  },
  {
    url: "/europe/united-kingdom/falmouth.htm",
    name: "Falmouth",
    coords: [50.1552197, -5.0688262],
  },
  {
    url: "/europe/united-kingdom/fareham.htm",
    name: "Fareham",
    coords: [50.8526637, -1.1783134],
  },
  {
    url: "/europe/united-kingdom/felixstowe.htm",
    name: "Felixstowe",
    coords: [51.964295899999996, 1.328993782059784],
  },
  {
    url: "/europe/united-kingdom/filey.htm",
    name: "Filey",
    coords: [54.2096884, -0.2888382],
  },
  {
    url: "/europe/united-kingdom/fishguard.htm",
    name: "Fishguard",
    coords: [51.9938353, -4.97681],
  },
  {
    url: "/europe/united-kingdom/fleetwood.htm",
    name: "Fleetwood",
    coords: [53.9224847, -3.0329340355325565],
  },
  {
    url: "/europe/united-kingdom/flexbury.htm",
    name: "Flexbury",
    coords: [50.8371606, -4.5429964],
  },
  {
    url: "/europe/united-kingdom/flimby.htm",
    name: "Flimby",
    coords: [54.6874925, -3.5166175],
  },
  {
    url: "/europe/united-kingdom/folkestone.htm",
    name: "Folkestone",
    coords: [51.0791335, 1.1794073],
  },
  {
    url: "/europe/united-kingdom/fort-william.htm",
    name: "Fort William",
    coords: [56.8178285, -5.110974],
  },
  {
    url: "/europe/united-kingdom/fortrose.htm",
    name: "Fortrose",
    coords: [57.5817836, -4.1305039],
  },
  {
    url: "/europe/united-kingdom/fortuneswell.htm",
    name: "Fortuneswell",
    coords: [50.5603502, -2.4457182],
  },
  {
    url: "/europe/united-kingdom/fowey.htm",
    name: "Fowey",
    coords: [50.3357786, -4.6365952],
  },
  {
    url: "/europe/united-kingdom/freshwater.htm",
    name: "Freshwater",
    coords: [50.6814402, -1.5231372],
  },
  {
    url: "/europe/united-kingdom/garelochhead.htm",
    name: "Garelochhead",
    coords: [56.0808253, -4.8311747],
  },
  {
    url: "/europe/united-kingdom/gillingham.htm",
    name: "Gillingham",
    coords: [51.3871701, 0.5461611],
  },
  {
    url: "/europe/united-kingdom/girvan.htm",
    name: "Girvan",
    coords: [55.2413151, -4.8553579],
  },
  {
    url: "/europe/united-kingdom/goldcliff.htm",
    name: "Goldcliff",
    coords: [51.5433853, -2.9151268],
  },
  {
    url: "/europe/united-kingdom/golspie.htm",
    name: "Golspie",
    coords: [57.973318, -3.9758786],
  },
  {
    url: "/europe/united-kingdom/goodwick.htm",
    name: "Goodwick",
    coords: [52.004437, -4.9960186],
  },
  {
    url: "/europe/united-kingdom/gorleston-on-sea.htm",
    name: "Gorleston-on-Sea",
    coords: [52.5778559, 1.7273353],
  },
  {
    url: "/europe/united-kingdom/gosport.htm",
    name: "Gosport",
    coords: [50.7952074, -1.1210853],
  },
  {
    url: "/europe/united-kingdom/gourock.htm",
    name: "Gourock",
    coords: [55.9620009, -4.8178728],
  },
  {
    url: "/europe/united-kingdom/grange-over-sands.htm",
    name: "Grange-over-Sands",
    coords: [54.1930633, -2.9094791],
  },
  {
    url: "/europe/united-kingdom/grays.htm",
    name: "Grays",
    coords: [51.4780898, 0.3233131],
  },
  {
    url: "/europe/united-kingdom/greenhithe.htm",
    name: "Greenhithe",
    coords: [51.4507436, 0.2817634],
  },
  {
    url: "/europe/united-kingdom/greenock.htm",
    name: "Greenock",
    coords: [55.9473423, -4.7564721],
  },
  {
    url: "/europe/united-kingdom/gretna.htm",
    name: "Gretna",
    coords: [54.9953097, -3.0669404],
  },
  {
    url: "/europe/united-kingdom/greyabbey.htm",
    name: "Greyabbey",
    coords: [54.5362024, -5.5604594],
  },
  {
    url: "/europe/united-kingdom/grimsby.htm",
    name: "Grimsby",
    coords: [53.5671407, -0.0788045],
  },
  {
    url: "/europe/united-kingdom/gullane.htm",
    name: "Gullane",
    coords: [56.0350435, -2.8307089],
  },
  {
    url: "/europe/united-kingdom/hamble.htm",
    name: "Hamble",
    coords: [50.8591605, -1.3144661],
  },
  {
    url: "/europe/united-kingdom/harwich.htm",
    name: "Harwich",
    coords: [51.9445801, 1.2898522],
  },
  {
    url: "/europe/united-kingdom/hayle.htm",
    name: "Hayle",
    coords: [50.1871402, -5.4178169],
  },
  {
    url: "/europe/united-kingdom/hayling-island.htm",
    name: "Hayling Island",
    coords: [50.8056117, -0.9800526903461984],
  },
  {
    url: "/europe/united-kingdom/helensburgh.htm",
    name: "Helensburgh",
    coords: [56.0033464, -4.7342935],
  },
  {
    url: "/europe/united-kingdom/high-valleyfield.htm",
    name: "High Valleyfield",
    coords: [56.0626699, -3.6009917],
  },
  {
    url: "/europe/united-kingdom/highbridge.htm",
    name: "Highbridge",
    coords: [51.2200079, -2.9764141],
  },
  {
    url: "/europe/united-kingdom/holyhead.htm",
    name: "Holyhead",
    coords: [53.3106715, -4.6330966],
  },
  {
    url: "/europe/united-kingdom/hoo.htm",
    name: "Hoo",
    coords: [52.1822183, 1.3008445],
  },
  {
    url: "/europe/united-kingdom/hopeman.htm",
    name: "Hopeman",
    coords: [57.7073279, -3.4331357],
  },
  {
    url: "/europe/united-kingdom/hornsea.htm",
    name: "Hornsea",
    coords: [53.9134596, -0.1689412],
  },
  {
    url: "/europe/united-kingdom/hugh-town.htm",
    name: "Hugh Town",
    coords: [49.9145586, -6.3153609],
  },
  {
    url: "/europe/united-kingdom/hull.htm",
    name: "Hull",
    coords: [53.7435722, -0.3394758],
  },
  {
    url: "/europe/united-kingdom/hundleton.htm",
    name: "Hundleton",
    coords: [51.6684542, -4.9509313],
  },
  {
    url: "/europe/united-kingdom/hythe.htm",
    name: "Hythe",
    coords: [51.0691421, 1.0841634],
  },
  {
    url: "/europe/united-kingdom/ilfracombe.htm",
    name: "Ilfracombe",
    coords: [51.2076674, -4.1254662],
  },
  {
    url: "/europe/united-kingdom/inchinnan.htm",
    name: "Inchinnan",
    coords: [55.8914578, -4.4372189],
  },
  {
    url: "/europe/united-kingdom/inverbervie.htm",
    name: "Inverbervie",
    coords: [56.844524, -2.2806005],
  },
  {
    url: "/europe/united-kingdom/invergordon.htm",
    name: "Invergordon",
    coords: [57.6884029, -4.1692103],
  },
  {
    url: "/europe/united-kingdom/inverkeithing.htm",
    name: "Inverkeithing",
    coords: [56.0308767, -3.3977498],
  },
  {
    url: "/europe/united-kingdom/inverkip.htm",
    name: "Inverkip",
    coords: [55.9089906, -4.8651043],
  },
  {
    url: "/europe/united-kingdom/isle-of-bute.htm",
    name: "Isle of Bute",
    coords: [55.824188899999996, -5.08148580774648],
  },
  {
    url: "/europe/united-kingdom/isle-of-lewis.htm",
    name: "Isle of Lewis",
    coords: [58.212829150000005, -6.564223873439507],
  },
  {
    url: "/europe/united-kingdom/isles-of-scilly.htm",
    name: "Isles of Scilly",
    coords: [49.92034085, -6.292879121335639],
  },
  {
    url: "/europe/united-kingdom/kewstoke.htm",
    name: "Kewstoke",
    coords: [51.3653969, -2.9549713],
  },
  {
    url: "/europe/united-kingdom/kinghorn.htm",
    name: "Kinghorn",
    coords: [56.0707374, -3.1742285],
  },
  {
    url: "/europe/united-kingdom/kingsbridge.htm",
    name: "Kingsbridge",
    coords: [56.6908713, -2.9253132],
  },
  {
    url: "/europe/united-kingdom/kircubbin.htm",
    name: "Kircubbin",
    coords: [54.4870904, -5.53201],
  },
  {
    url: "/europe/united-kingdom/kirkcaldy.htm",
    name: "Kirkcaldy",
    coords: [56.1110218, -3.1582296],
  },
  {
    url: "/europe/united-kingdom/kirkcudbright.htm",
    name: "Kirkcudbright",
    coords: [54.8352482, -4.0543927],
  },
  {
    url: "/europe/united-kingdom/kirkwall.htm",
    name: "Kirkwall",
    coords: [58.9816049, -2.960369],
  },
  {
    url: "/europe/united-kingdom/lamlash.htm",
    name: "Lamlash",
    coords: [55.5333054, -5.1285149],
  },
  {
    url: "/europe/united-kingdom/landewednack.htm",
    name: "Landewednack",
    coords: [49.9693846, -5.194645],
  },
  {
    url: "/europe/united-kingdom/larne.htm",
    name: "Larne",
    coords: [54.8508458, -5.8183116],
  },
  {
    url: "/europe/united-kingdom/lee-on-the-solent.htm",
    name: "Lee-on-the-Solent",
    coords: [50.8028983, -1.2013355],
  },
  {
    url: "/europe/united-kingdom/leigh-on-sea.htm",
    name: "Leigh-on-Sea",
    coords: [51.5421185, 0.6474487],
  },
  {
    url: "/europe/united-kingdom/lerwick.htm",
    name: "Lerwick",
    coords: [60.1531357, -1.1427296],
  },
  {
    url: "/europe/united-kingdom/leven.htm",
    name: "Leven",
    coords: [56.1954351, -2.99692],
  },
  {
    url: "/europe/united-kingdom/leysdown-on-sea.htm",
    name: "Leysdown-on-Sea",
    coords: [51.397828, 0.922427],
  },
  {
    url: "/europe/united-kingdom/littlehampton.htm",
    name: "Littlehampton",
    coords: [50.8095801, -0.5424424],
  },
  {
    url: "/europe/united-kingdom/liverpool.htm",
    name: "Liverpool",
    coords: [53.4071991, -2.99168],
  },
  {
    url: "/europe/united-kingdom/llandudno.htm",
    name: "Llandudno",
    coords: [53.322475, -3.8243251],
  },
  {
    url: "/europe/united-kingdom/llanelli.htm",
    name: "Llanelli",
    coords: [51.6797331, -4.1620223],
  },
  {
    url: "/europe/united-kingdom/llanfair.htm",
    name: "Llanfair",
    coords: [52.8437787, -4.1141613],
  },
  {
    url: "/europe/united-kingdom/llanfairpwllgwyngyll.htm",
    name: "Llanfairpwllgwyngyll",
    coords: [53.2214531, -4.2098775],
  },
  {
    url: "/europe/united-kingdom/llansantffraid-glan-conwy.htm",
    name: "Llansantffraid Glan Conwy",
    coords: [53.271845, -3.794732],
  },
  {
    url: "/europe/united-kingdom/llansteffan.htm",
    name: "Llansteffan",
    coords: [51.7724601, -4.3927996],
  },
  {
    url: "/europe/united-kingdom/lochgilphead.htm",
    name: "Lochgilphead",
    coords: [56.0375069, -5.433147],
  },
  {
    url: "/europe/united-kingdom/looe.htm",
    name: "Looe",
    coords: [50.3511715, -4.4542496],
  },
  {
    url: "/europe/united-kingdom/lossiemouth.htm",
    name: "Lossiemouth",
    coords: [57.7220766, -3.2814625],
  },
  {
    url: "/europe/united-kingdom/lowestoft.htm",
    name: "Lowestoft",
    coords: [52.4766308, 1.7537638],
  },
  {
    url: "/europe/united-kingdom/lyme-regis.htm",
    name: "Lyme Regis",
    coords: [50.7252897, -2.934559],
  },
  {
    url: "/europe/united-kingdom/lytham-st-annes.htm",
    name: "Lytham St Annes",
    coords: [53.7485046, -2.9990745],
  },
  {
    url: "/europe/united-kingdom/macduff.htm",
    name: "Macduff",
    coords: [57.6702105, -2.4944375],
  },
  {
    url: "/europe/united-kingdom/manningtree.htm",
    name: "Manningtree",
    coords: [51.9450866, 1.0630218],
  },
  {
    url: "/europe/united-kingdom/manorbier.htm",
    name: "Manorbier",
    coords: [51.6466802, -4.7955331],
  },
  {
    url: "/europe/united-kingdom/mappleton.htm",
    name: "Mappleton",
    coords: [53.8766822, -0.1366654],
  },
  {
    url: "/europe/united-kingdom/marazion.htm",
    name: "Marazion",
    coords: [50.1239321, -5.4727698],
  },
  {
    url: "/europe/united-kingdom/margate.htm",
    name: "Margate",
    coords: [51.3878174, 1.3819699],
  },
  {
    url: "/europe/united-kingdom/marske-by-the-sea.htm",
    name: "Marske-by-the-Sea",
    coords: [54.5919266, -1.0196792],
  },
  {
    url: "/europe/united-kingdom/maryport.htm",
    name: "Maryport",
    coords: [54.7129699, -3.4998108],
  },
  {
    url: "/europe/united-kingdom/menai-bridge.htm",
    name: "Menai Bridge",
    coords: [53.2259347, -4.1631064],
  },
  {
    url: "/europe/united-kingdom/mevagissey.htm",
    name: "Mevagissey",
    coords: [50.2696687, -4.7872174],
  },
  {
    url: "/europe/united-kingdom/milford-haven.htm",
    name: "Milford Haven",
    coords: [51.7117492, -5.0293161],
  },
  {
    url: "/europe/united-kingdom/milford-on-sea.htm",
    name: "Milford on Sea",
    coords: [50.72505115, -1.5855744198861115],
  },
  {
    url: "/europe/united-kingdom/millbrook.htm",
    name: "Millbrook",
    coords: [52.0370204, -0.5254261],
  },
  {
    url: "/europe/united-kingdom/millisle.htm",
    name: "Millisle",
    coords: [54.60782, -5.5284632],
  },
  {
    url: "/europe/united-kingdom/millport.htm",
    name: "Millport",
    coords: [55.753958, -4.9239794],
  },
  {
    url: "/europe/united-kingdom/mistley.htm",
    name: "Mistley",
    coords: [51.940023, 1.0847028],
  },
  {
    url: "/europe/united-kingdom/moelfre.htm",
    name: "Moelfre",
    coords: [53.3537357, -4.2366244],
  },
  {
    url: "/europe/united-kingdom/montrose.htm",
    name: "Montrose",
    coords: [56.7114295, -2.4681544],
  },
  {
    url: "/europe/united-kingdom/mostyn.htm",
    name: "Mostyn",
    coords: [53.3146906, -3.2657174],
  },
  {
    url: "/europe/united-kingdom/musselburgh.htm",
    name: "Musselburgh",
    coords: [55.9421202, -3.0538516],
  },
  {
    url: "/europe/united-kingdom/new-ferry.htm",
    name: "New Ferry",
    coords: [53.3619442, -2.9943509],
  },
  {
    url: "/europe/united-kingdom/new-quay.htm",
    name: "New Quay",
    coords: [52.2140026, -4.3603208],
  },
  {
    url: "/europe/united-kingdom/newbiggin-by-the-sea.htm",
    name: "Newbiggin-by-the-Sea",
    coords: [55.1853665, -1.5109345],
  },
  {
    url: "/europe/united-kingdom/newburgh.htm",
    name: "Newburgh",
    coords: [57.3194088, -2.0036775],
  },
  {
    url: "/europe/united-kingdom/newport.htm",
    name: "Newport",
    coords: [51.5882332, -2.9974967],
  },
  {
    url: "/europe/united-kingdom/newport.htm",
    name: "Newport",
    coords: [51.5882332, -2.9974967],
  },
  {
    url: "/europe/united-kingdom/newport-on-tay.htm",
    name: "Newport-On-Tay",
    coords: [56.4397014, -2.9416726],
  },
  {
    url: "/europe/united-kingdom/newquay.htm",
    name: "Newquay",
    coords: [50.4134414, -5.0848836],
  },
  {
    url: "/europe/united-kingdom/newtonhill.htm",
    name: "Newtonhill",
    coords: [57.0321018, -2.1503377],
  },
  {
    url: "/europe/united-kingdom/newtownabbey.htm",
    name: "Newtownabbey",
    coords: [54.6778816, -5.9249199],
  },
  {
    url: "/europe/united-kingdom/neyland.htm",
    name: "Neyland",
    coords: [51.7099976, -4.9511343],
  },
  {
    url: "/europe/united-kingdom/north-berwick.htm",
    name: "North Berwick",
    coords: [56.0581178, -2.7209129],
  },
  {
    url: "/europe/united-kingdom/north-queensferry.htm",
    name: "North Queensferry",
    coords: [56.0098407, -3.3946262],
  },
  {
    url: "/europe/united-kingdom/north-sunderland.htm",
    name: "North Sunderland",
    coords: [55.5776186, -1.666311],
  },
  {
    url: "/europe/united-kingdom/oban.htm",
    name: "Oban",
    coords: [56.415695, -5.4734688],
  },
  {
    url: "/europe/united-kingdom/orkney.htm",
    name: "Orkney",
    coords: [58.94182309999999, -3.129694439563327],
  },
  {
    url: "/europe/united-kingdom/overcombe.htm",
    name: "Overcombe",
    coords: [50.6354106, -2.4310797],
  },
  {
    url: "/europe/united-kingdom/padstow.htm",
    name: "Padstow",
    coords: [50.5403819, -4.9369874],
  },
  {
    url: "/europe/united-kingdom/par.htm",
    name: "Par",
    coords: [50.3494152, -4.7050945],
  },
  {
    url: "/europe/united-kingdom/paull.htm",
    name: "Paull",
    coords: [53.7208505, -0.2335567],
  },
  {
    url: "/europe/united-kingdom/peacehaven.htm",
    name: "Peacehaven",
    coords: [50.7962181, -0.0027387],
  },
  {
    url: "/europe/united-kingdom/pembroke.htm",
    name: "Pembroke",
    coords: [51.6754422, -4.9144858],
  },
  {
    url: "/europe/united-kingdom/pembroke-dock.htm",
    name: "Pembroke Dock",
    coords: [51.693539, -4.9392016],
  },
  {
    url: "/europe/united-kingdom/penarth.htm",
    name: "Penarth",
    coords: [51.435968, -3.1733023],
  },
  {
    url: "/europe/united-kingdom/penryn.htm",
    name: "Penryn",
    coords: [50.1685457, -5.1034063],
  },
  {
    url: "/europe/united-kingdom/penzance.htm",
    name: "Penzance",
    coords: [50.1194794, -5.5352463],
  },
  {
    url: "/europe/united-kingdom/perranporth.htm",
    name: "Perranporth",
    coords: [50.3444208, -5.153844],
  },
  {
    url: "/europe/united-kingdom/peterhead.htm",
    name: "Peterhead",
    coords: [57.5052909, -1.7813194],
  },
  {
    url: "/europe/united-kingdom/plymouth.htm",
    name: "Plymouth",
    coords: [50.3712659, -4.1425658],
  },
  {
    url: "/europe/united-kingdom/polzeath.htm",
    name: "Polzeath",
    coords: [50.5728393, -4.9149007],
  },
  {
    url: "/europe/united-kingdom/poole.htm",
    name: "Poole",
    coords: [50.7179472, -1.981521],
  },
  {
    url: "/europe/united-kingdom/port-bannatyne.htm",
    name: "Port Bannatyne",
    coords: [55.8603022, -5.0825311],
  },
  {
    url: "/europe/united-kingdom/port-erroll.htm",
    name: "Port Erroll",
    coords: [57.4142846, -1.8460132],
  },
  {
    url: "/europe/united-kingdom/port-glasgow.htm",
    name: "Port Glasgow",
    coords: [55.9342865, -4.689854],
  },
  {
    url: "/europe/united-kingdom/port-talbot.htm",
    name: "Port Talbot",
    coords: [51.5952119, -3.782199],
  },
  {
    url: "/europe/united-kingdom/portavogie.htm",
    name: "Portavogie",
    coords: [54.4612678, -5.4433576],
  },
  {
    url: "/europe/united-kingdom/porthcawl.htm",
    name: "Porthcawl",
    coords: [51.4795563, -3.7040704],
  },
  {
    url: "/europe/united-kingdom/porthleven.htm",
    name: "Porthleven",
    coords: [50.0849174, -5.3166558],
  },
  {
    url: "/europe/united-kingdom/porthmadog.htm",
    name: "Porthmadog",
    coords: [52.9256029, -4.129694],
  },
  {
    url: "/europe/united-kingdom/portknockie.htm",
    name: "Portknockie",
    coords: [57.7034964, -2.8581483],
  },
  {
    url: "/europe/united-kingdom/portland.htm",
    name: "Portland",
    coords: [50.5672516, -2.4472529],
  },
  {
    url: "/europe/united-kingdom/portlethen.htm",
    name: "Portlethen",
    coords: [57.061466, -2.129707],
  },
  {
    url: "/europe/united-kingdom/portree.htm",
    name: "Portree",
    coords: [57.4130532, -6.194446],
  },
  {
    url: "/europe/united-kingdom/portrush.htm",
    name: "Portrush",
    coords: [55.2060325, -6.6540486],
  },
  {
    url: "/europe/united-kingdom/portscatho.htm",
    name: "Portscatho",
    coords: [50.1797427, -4.9756476],
  },
  {
    url: "/europe/united-kingdom/portsmouth.htm",
    name: "Portsmouth",
    coords: [50.800031, -1.0906023],
  },
  {
    url: "/europe/united-kingdom/portsoy.htm",
    name: "Portsoy",
    coords: [57.6815502, -2.6907423],
  },
  {
    url: "/europe/united-kingdom/portstewart.htm",
    name: "Portstewart",
    coords: [55.1829096, -6.7187008],
  },
  {
    url: "/europe/united-kingdom/pwllheli.htm",
    name: "Pwllheli",
    coords: [52.8879082, -4.4187565],
  },
  {
    url: "/europe/united-kingdom/queenborough.htm",
    name: "Queenborough",
    coords: [51.4124923, 0.7386390448755704],
  },
  {
    url: "/europe/united-kingdom/queensferry.htm",
    name: "Queensferry",
    coords: [53.2048844, -3.0208441],
  },
  {
    url: "/europe/united-kingdom/ramsgate.htm",
    name: "Ramsgate",
    coords: [51.3334726, 1.4196476],
  },
  {
    url: "/europe/united-kingdom/redcar.htm",
    name: "Redcar",
    coords: [54.6179021, -1.0687914],
  },
  {
    url: "/europe/united-kingdom/redwick.htm",
    name: "Redwick",
    coords: [51.5667426, -2.6493728],
  },
  {
    url: "/europe/united-kingdom/rhu.htm",
    name: "Rhu",
    coords: [56.0181861, -4.7794157],
  },
  {
    url: "/europe/united-kingdom/rhyl.htm",
    name: "Rhyl",
    coords: [53.3207425, -3.4907258],
  },
  {
    url: "/europe/united-kingdom/rosehearty.htm",
    name: "Rosehearty",
    coords: [57.6967703, -2.1143495],
  },
  {
    url: "/europe/united-kingdom/rostrevor.htm",
    name: "Rostrevor",
    coords: [54.100725, -6.2004264],
  },
  {
    url: "/europe/united-kingdom/rothesay.htm",
    name: "Rothesay",
    coords: [55.8373085, -5.0522439],
  },
  {
    url: "/europe/united-kingdom/runcorn.htm",
    name: "Runcorn",
    coords: [53.3421509, -2.7334941],
  },
  {
    url: "/europe/united-kingdom/ryde.htm",
    name: "Ryde",
    coords: [50.7299865, -1.1603699],
  },
  {
    url: "/europe/united-kingdom/saint-agnes.htm",
    name: "Saint Agnes",
    coords: [50.308104, -5.202596],
  },
  {
    url: "/europe/united-kingdom/saint-andrews.htm",
    name: "Saint Andrews",
    coords: [56.3403902, -2.7955844],
  },
  {
    url: "/europe/united-kingdom/saint-austell.htm",
    name: "Saint Austell",
    coords: [50.333995, -4.793341],
  },
  {
    url: "/europe/united-kingdom/saint-davids.htm",
    name: "Saint David’s",
    coords: [51.880221, -5.265329],
  },
  {
    url: "/europe/united-kingdom/saint-just.htm",
    name: "Saint Just",
    coords: [50.1531126, -5.6568703],
  },
  {
    url: "/europe/united-kingdom/saint-leonards-on-sea.htm",
    name: "Saint Leonards-on-Sea",
    coords: [50.85565, 0.5452],
  },
  {
    url: "/europe/united-kingdom/saint-marys.htm",
    name: "Saint Mary's",
    coords: [58.8960354, -2.9153669],
  },
  {
    url: "/europe/united-kingdom/salcombe.htm",
    name: "Salcombe",
    coords: [50.2388158, -3.7726121],
  },
  {
    url: "/europe/united-kingdom/saltcoats.htm",
    name: "Saltcoats",
    coords: [55.6332429, -4.7887547],
  },
  {
    url: "/europe/united-kingdom/sandown.htm",
    name: "Sandown",
    coords: [50.6530593, -1.1536287],
  },
  {
    url: "/europe/united-kingdom/sandwick.htm",
    name: "Sandwick",
    coords: [58.205513, -6.3533217],
  },
  {
    url: "/europe/united-kingdom/saundersfoot.htm",
    name: "Saundersfoot",
    coords: [51.7108868, -4.6997977],
  },
  {
    url: "/europe/united-kingdom/scarborough.htm",
    name: "Scarborough",
    coords: [54.2820009, -0.4011868],
  },
  {
    url: "/europe/united-kingdom/seaview.htm",
    name: "Seaview",
    coords: [50.7191353, -1.1155786],
  },
  {
    url: "/europe/united-kingdom/sennen.htm",
    name: "Sennen",
    coords: [50.0705894, -5.6950433],
  },
  {
    url: "/europe/united-kingdom/severn-beach.htm",
    name: "Severn Beach",
    coords: [51.5618116, -2.6619317],
  },
  {
    url: "/europe/united-kingdom/shalfleet.htm",
    name: "Shalfleet",
    coords: [50.702332, -1.4170737],
  },
  {
    url: "/europe/united-kingdom/shanklin.htm",
    name: "Shanklin",
    coords: [50.6288132, -1.1779031],
  },
  {
    url: "/europe/united-kingdom/sheerness.htm",
    name: "Sheerness",
    coords: [51.4398236, 0.7620398],
  },
  {
    url: "/europe/united-kingdom/shetland.htm",
    name: "Shetland",
    coords: [60.245930200000004, -1.612905074733099],
  },
  {
    url: "/europe/united-kingdom/shoreham-by-sea.htm",
    name: "Shoreham-by-Sea",
    coords: [50.8322307, -0.2746717],
  },
  {
    url: "/europe/united-kingdom/shotley-gate.htm",
    name: "Shotley Gate",
    coords: [51.9579124, 1.2686199],
  },
  {
    url: "/europe/united-kingdom/silloth.htm",
    name: "Silloth",
    coords: [54.8692401, -3.3869124],
  },
  {
    url: "/europe/united-kingdom/south-shields.htm",
    name: "South Shields",
    coords: [54.9987414, -1.4321848],
  },
  {
    url: "/europe/united-kingdom/southampton.htm",
    name: "Southampton",
    coords: [50.9025349, -1.404189],
  },
  {
    url: "/europe/united-kingdom/southend-on-sea.htm",
    name: "Southend-on-Sea",
    coords: [51.5388241, 0.7128137],
  },
  {
    url: "/europe/united-kingdom/southwold.htm",
    name: "Southwold",
    coords: [52.3266586, 1.6794539],
  },
  {
    url: "/europe/united-kingdom/st-ives.htm",
    name: "St Ives",
    coords: [50.8368702, -1.8237049],
  },
  {
    url: "/europe/united-kingdom/stoke.htm",
    name: "Stoke",
    coords: [53.0162014, -2.1812607],
  },
  {
    url: "/europe/united-kingdom/stone.htm",
    name: "Stone",
    coords: [52.9033037, -2.1477653],
  },
  {
    url: "/europe/united-kingdom/stonehaven.htm",
    name: "Stonehaven",
    coords: [56.9640234, -2.2087993],
  },
  {
    url: "/europe/united-kingdom/stornoway.htm",
    name: "Stornoway",
    coords: [58.2084053, -6.3881174],
  },
  {
    url: "/europe/united-kingdom/stranraer.htm",
    name: "Stranraer",
    coords: [54.9044332, -5.026204],
  },
  {
    url: "/europe/united-kingdom/stromness.htm",
    name: "Stromness",
    coords: [58.9614356, -3.2993767],
  },
  {
    url: "/europe/united-kingdom/sunderland.htm",
    name: "Sunderland",
    coords: [54.9058512, -1.3828727],
  },
  {
    url: "/europe/united-kingdom/swanage.htm",
    name: "Swanage",
    coords: [50.6086976, -1.9571971],
  },
  {
    url: "/europe/united-kingdom/swansea.htm",
    name: "Swansea",
    coords: [51.6195955, -3.9459248],
  },
  {
    url: "/europe/united-kingdom/tain.htm",
    name: "Tain",
    coords: [57.8119372, -4.0550663],
  },
  {
    url: "/europe/united-kingdom/tankerton.htm",
    name: "Tankerton",
    coords: [51.3641122, 1.0438624],
  },
  {
    url: "/europe/united-kingdom/tarbert.htm",
    name: "Tarbert",
    coords: [55.8635203, -5.4151084],
  },
  {
    url: "/europe/united-kingdom/tayport.htm",
    name: "Tayport",
    coords: [56.4490878, -2.8807193],
  },
  {
    url: "/europe/united-kingdom/teignmouth.htm",
    name: "Teignmouth",
    coords: [50.5463385, -3.4957798],
  },
  {
    url: "/europe/united-kingdom/tenby.htm",
    name: "Tenby",
    coords: [51.6726128, -4.7050443],
  },
  {
    url: "/europe/united-kingdom/thurso.htm",
    name: "Thurso",
    coords: [58.5947443, -3.520577],
  },
  {
    url: "/europe/united-kingdom/tintagel.htm",
    name: "Tintagel",
    coords: [50.6642063, -4.7526181],
  },
  {
    url: "/europe/united-kingdom/topsham.htm",
    name: "Topsham",
    coords: [50.6850732, -3.4658063],
  },
  {
    url: "/europe/united-kingdom/torpoint.htm",
    name: "Torpoint",
    coords: [50.3757288, -4.1991204],
  },
  {
    url: "/europe/united-kingdom/torquay.htm",
    name: "Torquay",
    coords: [50.4652392, -3.5211361],
  },
  {
    url: "/europe/united-kingdom/totnes.htm",
    name: "Totnes",
    coords: [50.4322816, -3.6871525],
  },
  {
    url: "/europe/united-kingdom/totton.htm",
    name: "Totton",
    coords: [50.9196406, -1.4894631],
  },
  {
    url: "/europe/united-kingdom/troon.htm",
    name: "Troon",
    coords: [55.5437893, -4.663906],
  },
  {
    url: "/europe/united-kingdom/tynemouth.htm",
    name: "Tynemouth",
    coords: [55.0177847, -1.4256042],
  },
  {
    url: "/europe/united-kingdom/ullapool.htm",
    name: "Ullapool",
    coords: [57.8978237, -5.1586647],
  },
  {
    url: "/europe/united-kingdom/wadebridge.htm",
    name: "Wadebridge",
    coords: [50.5171441, -4.8340186],
  },
  {
    url: "/europe/united-kingdom/walton-on-the-naze.htm",
    name: "Walton-on-the-Naze",
    coords: [51.848357, 1.2725902],
  },
  {
    url: "/europe/united-kingdom/warkworth.htm",
    name: "Warkworth",
    coords: [52.0576068, -1.2897327],
  },
  {
    url: "/europe/united-kingdom/warrenpoint.htm",
    name: "Warrenpoint",
    coords: [54.0999923, -6.2512827],
  },
  {
    url: "/europe/united-kingdom/watchet.htm",
    name: "Watchet",
    coords: [51.179924, -3.3306406],
  },
  {
    url: "/europe/united-kingdom/waterloo.htm",
    name: "Waterloo",
    coords: [51.5868946, -3.1625022],
  },
  {
    url: "/europe/united-kingdom/wemyss-bay.htm",
    name: "Wemyss Bay",
    coords: [55.8759876, -4.8886364],
  },
  {
    url: "/europe/united-kingdom/westgate-on-sea.htm",
    name: "Westgate on Sea",
    coords: [51.3815773, 1.3372108],
  },
  {
    url: "/europe/united-kingdom/weston-super-mare.htm",
    name: "Weston-super-Mare",
    coords: [51.3471927, -2.9778916],
  },
  {
    url: "/europe/united-kingdom/weymouth.htm",
    name: "Weymouth",
    coords: [50.6096257, -2.4543424],
  },
  {
    url: "/europe/united-kingdom/whitburn.htm",
    name: "Whitburn",
    coords: [55.8667819, -3.6849014],
  },
  {
    url: "/europe/united-kingdom/whitby.htm",
    name: "Whitby",
    coords: [54.4874141, -0.6155111],
  },
  {
    url: "/europe/united-kingdom/whitehead.htm",
    name: "Whitehead",
    coords: [54.7548363, -5.7155824],
  },
  {
    url: "/europe/united-kingdom/whitstable.htm",
    name: "Whitstable",
    coords: [51.3606286, 1.0240626],
  },
  {
    url: "/europe/united-kingdom/wick.htm",
    name: "Wick",
    coords: [58.4425516, -3.0915827],
  },
  {
    url: "/europe/united-kingdom/widnes.htm",
    name: "Widnes",
    coords: [53.3646888, -2.7283328],
  },
  {
    url: "/europe/united-kingdom/yarmouth.htm",
    name: "Yarmout",
    coords: [undefined, undefined],
  },
];

module.exports = { locations };
