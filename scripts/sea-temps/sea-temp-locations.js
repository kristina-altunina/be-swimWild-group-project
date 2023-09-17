const locations = [
  {
    url: "/europe/united-kingdom/aberaeron.htm",
    name: "Aberaeron",
    coords: [-4.2600153, 52.2431766],
  },
  {
    url: "/europe/united-kingdom/aberdeen.htm",
    name: "Aberdeen",
    coords: [-2.0928095, 57.1482429],
  },
  {
    url: "/europe/united-kingdom/aberdour.htm",
    name: "Aberdour",
    coords: [-3.3019614, 56.0536974],
  },
  {
    url: "/europe/united-kingdom/aberporth.htm",
    name: "Aberporth",
    coords: [-4.5462206, 52.1341692],
  },
  {
    url: "/europe/united-kingdom/aberystwyth.htm",
    name: "Aberystwyth",
    coords: [-4.0816846, 52.4143113],
  },
  {
    url: "/europe/united-kingdom/airth.htm",
    name: "Airth",
    coords: [-3.7699112, 56.0682549],
  },
  {
    url: "/europe/united-kingdom/aldeburgh.htm",
    name: "Aldeburgh",
    coords: [1.6015691, 52.1523814],
  },
  {
    url: "/europe/united-kingdom/alderney.htm",
    name: "Alderney",
    coords: [-0.143656, 51.489485],
  },
  {
    url: "/europe/united-kingdom/alnmouth.htm",
    name: "Alnmouth",
    coords: [-1.6126304, 55.3883231],
  },
  {
    url: "/europe/united-kingdom/amble.htm",
    name: "Amble",
    coords: [-1.5839378, 55.3337748],
  },
  {
    url: "/europe/united-kingdom/amlwch.htm",
    name: "Amlwch",
    coords: [-4.342649, 53.4090317],
  },
  {
    url: "/europe/united-kingdom/annalong.htm",
    name: "Annalong",
    coords: [-5.8972213, 54.1075749],
  },
  {
    url: "/europe/united-kingdom/anstruther.htm",
    name: "Anstruther",
    coords: [-2.7005643, 56.2227638],
  },
  {
    url: "/europe/united-kingdom/appledore.htm",
    name: "Appledore",
    coords: [0.7849114340136915, 51.03644635],
  },
  {
    url: "/europe/united-kingdom/ardglass.htm",
    name: "Ardglass",
    coords: [-5.6098711, 54.2633035],
  },
  {
    url: "/europe/united-kingdom/ardrishaig.htm",
    name: "Ardrishaig",
    coords: [-5.4480487, 56.0154597],
  },
  {
    url: "/europe/united-kingdom/arnside.htm",
    name: "Arnside",
    coords: [-2.8342988, 54.2013106],
  },
  {
    url: "/europe/united-kingdom/askam-in-furness.htm",
    name: "Askam in Furness",
    coords: [-3.2039446, 54.1887065],
  },
  {
    url: "/europe/united-kingdom/ayr.htm",
    name: "Ayr",
    coords: [-4.6302502, 55.4628044],
  },
  {
    url: "/europe/united-kingdom/balintore.htm",
    name: "Balintore",
    coords: [-3.9130427, 57.7553925],
  },
  {
    url: "/europe/united-kingdom/ballycastle.htm",
    name: "Ballycastle",
    coords: [-6.250282, 55.2006882],
  },
  {
    url: "/europe/united-kingdom/ballywalter.htm",
    name: "Ballywalter",
    coords: [-5.4867684, 54.5439048],
  },
  {
    url: "/europe/united-kingdom/banff.htm",
    name: "Banff",
    coords: [-2.5232971, 57.6647037],
  },
  {
    url: "/europe/united-kingdom/barmouth.htm",
    name: "Barmouth",
    coords: [-4.0535692, 52.7210389],
  },
  {
    url: "/europe/united-kingdom/barnstaple.htm",
    name: "Barnstaple",
    coords: [-4.0600467, 51.0804057],
  },
  {
    url: "/europe/united-kingdom/beadnell.htm",
    name: "Beadnell",
    coords: [-1.636858, 55.5568858],
  },
  {
    url: "/europe/united-kingdom/beaumaris.htm",
    name: "Beaumaris",
    coords: [-4.0920538, 53.262963],
  },
  {
    url: "/europe/united-kingdom/belfast.htm",
    name: "Belfast",
    coords: [-5.928807, 54.603533],
  },
  {
    url: "/europe/united-kingdom/bembridge.htm",
    name: "Bembridge",
    coords: [-1.0849341, 50.6887044],
  },
  {
    url: "/europe/united-kingdom/benllech.htm",
    name: "Benllech",
    coords: [-4.2205614, 53.321191],
  },
  {
    url: "/europe/united-kingdom/berwick-upon-tweed.htm",
    name: "Berwick-Upon-Tweed",
    coords: [-2.0026472, 55.7692442],
  },
  {
    url: "/europe/united-kingdom/bideford.htm",
    name: "Bideford",
    coords: [-4.2064223, 51.0181448],
  },
  {
    url: "/europe/united-kingdom/birdham.htm",
    name: "Birdham",
    coords: [-0.8336022067471976, 50.79401045],
  },
  {
    url: "/europe/united-kingdom/birkenhead.htm",
    name: "Birkenhead",
    coords: [-3.0248007, 53.3895177],
  },
  {
    url: "/europe/united-kingdom/blackpool.htm",
    name: "Blackpool",
    coords: [-3.0509812, 53.8179442],
  },
  {
    url: "/europe/united-kingdom/blyth.htm",
    name: "Blyth",
    coords: [-1.5099726, 55.1270903],
  },
  {
    url: "/europe/united-kingdom/boddam.htm",
    name: "Boddam",
    coords: [-1.7805417, 57.4721372],
  },
  {
    url: "/europe/united-kingdom/bosham.htm",
    name: "Bosham",
    coords: [-0.8390211276770202, 50.826113899999996],
  },
  {
    url: "/europe/united-kingdom/bournemouth.htm",
    name: "Bournemouth",
    coords: [-1.8799272, 50.720097],
  },
  {
    url: "/europe/united-kingdom/boness.htm",
    name: "Bo’ness",
    coords: [-3.6073601, 56.0176867],
  },
  {
    url: "/europe/united-kingdom/brighton.htm",
    name: "Brighton",
    coords: [-0.1400561, 50.8214626],
  },
  {
    url: "/europe/united-kingdom/brixham.htm",
    name: "Brixham",
    coords: [-3.514544, 50.3952404],
  },
  {
    url: "/europe/united-kingdom/broadstairs.htm",
    name: "Broadstairs",
    coords: [1.4407855, 51.3586758],
  },
  {
    url: "/europe/united-kingdom/brora.htm",
    name: "Brora",
    coords: [-3.8551179, 58.0110396],
  },
  {
    url: "/europe/united-kingdom/buckhaven.htm",
    name: "Buckhaven",
    coords: [-3.0333966, 56.1710696],
  },
  {
    url: "/europe/united-kingdom/bude.htm",
    name: "Bude",
    coords: [-4.5469361, 50.8285252],
  },
  {
    url: "/europe/united-kingdom/budleigh-salterton.htm",
    name: "Budleigh Salterton",
    coords: [-3.329984389371436, 50.6310504],
  },
  {
    url: "/europe/united-kingdom/burghead.htm",
    name: "Burghead",
    coords: [-3.4901659, 57.7016831],
  },
  {
    url: "/europe/united-kingdom/burnham-on-sea.htm",
    name: "Burnham-on-Sea",
    coords: [-2.998695, 51.2377356],
  },
  {
    url: "/europe/united-kingdom/burntisland.htm",
    name: "Burntisland",
    coords: [-3.2330993, 56.0593631],
  },
  {
    url: "/europe/united-kingdom/cairnryan.htm",
    name: "Cairnryan",
    coords: [-5.0250851, 54.9738045],
  },
  {
    url: "/europe/united-kingdom/campbeltown.htm",
    name: "Campbeltown",
    coords: [-5.6051005, 55.4241858],
  },
  {
    url: "/europe/united-kingdom/cardiff.htm",
    name: "Cardiff",
    coords: [-3.1791934, 51.4816546],
  },
  {
    url: "/europe/united-kingdom/carnlough.htm",
    name: "Carnlough",
    coords: [-5.9899592, 54.9929248],
  },
  {
    url: "/europe/united-kingdom/carnoustie.htm",
    name: "Carnoustie",
    coords: [-2.711403, 56.5010506],
  },
  {
    url: "/europe/united-kingdom/carrickfergus.htm",
    name: "Carrickfergus",
    coords: [-5.8073112, 54.7136165],
  },
  {
    url: "/europe/united-kingdom/chepstow.htm",
    name: "Chepstow",
    coords: [-2.6766946, 51.6409342],
  },
  {
    url: "/europe/united-kingdom/christchurch.htm",
    name: "Christchurch",
    coords: [-1.7778853, 50.734902],
  },
  {
    url: "/europe/united-kingdom/cleethorpes.htm",
    name: "Cleethorpes",
    coords: [-0.0289969, 53.5572068],
  },
  {
    url: "/europe/united-kingdom/clevedon.htm",
    name: "Clevedon",
    coords: [-2.8526531, 51.4360625],
  },
  {
    url: "/europe/united-kingdom/cockenzie.htm",
    name: "Cockenzie",
    coords: [-2.9527646, 55.9715981],
  },
  {
    url: "/europe/united-kingdom/conon-bridge.htm",
    name: "Conon Bridge",
    coords: [-4.4347236, 57.5652452],
  },
  {
    url: "/europe/united-kingdom/conwy.htm",
    name: "Conwy",
    coords: [-3.8287012, 53.2811822],
  },
  {
    url: "/europe/united-kingdom/cowes.htm",
    name: "Cowes",
    coords: [-1.2985186, 50.7633176],
  },
  {
    url: "/europe/united-kingdom/criccieth.htm",
    name: "Criccieth",
    coords: [-4.2332414, 52.9206106],
  },
  {
    url: "/europe/united-kingdom/cromer.htm",
    name: "Cromer",
    coords: [1.3012758, 52.9311367],
  },
  {
    url: "/europe/united-kingdom/crosby.htm",
    name: "Crosby",
    coords: [-3.0291758, 53.4844386],
  },
  {
    url: "/europe/united-kingdom/culmore.htm",
    name: "Culmore",
    coords: [-7.2667022, 55.0499273],
  },
  {
    url: "/europe/united-kingdom/cushendall.htm",
    name: "Cushendall",
    coords: [-6.0640644, 55.080819],
  },
  {
    url: "/europe/united-kingdom/dale.htm",
    name: "Dale",
    coords: [-5.1694437, 51.7075201],
  },
  {
    url: "/europe/united-kingdom/dartmouth.htm",
    name: "Dartmouth",
    coords: [-3.583844, 50.3514839],
  },
  {
    url: "/europe/united-kingdom/dawlish.htm",
    name: "Dawlish",
    coords: [-3.468931, 50.5797391],
  },
  {
    url: "/europe/united-kingdom/deal.htm",
    name: "Deal",
    coords: [1.4027344, 51.2239544],
  },
  {
    url: "/europe/united-kingdom/derry.htm",
    name: "Derry",
    coords: [-5.998276881455698, 54.3923039],
  },
  {
    url: "/europe/united-kingdom/donaghadee.htm",
    name: "Donaghadee",
    coords: [-5.5391029, 54.6411042],
  },
  {
    url: "/europe/united-kingdom/dover.htm",
    name: "Dover",
    coords: [1.3134228, 51.1251275],
  },
  {
    url: "/europe/united-kingdom/dovercourt.htm",
    name: "Dovercourt",
    coords: [1.2776636, 51.9339114],
  },
  {
    url: "/europe/united-kingdom/dumbarton.htm",
    name: "Dumbarton",
    coords: [-4.5708479, 55.9432443],
  },
  {
    url: "/europe/united-kingdom/dunbar.htm",
    name: "Dunbar",
    coords: [-2.5158237, 56.0021385],
  },
  {
    url: "/europe/united-kingdom/dundee.htm",
    name: "Dundee",
    coords: [-2.97019, 56.4605938],
  },
  {
    url: "/europe/united-kingdom/dundrum.htm",
    name: "Dundrum",
    coords: [-5.8426084, 54.2581955],
  },
  {
    url: "/europe/united-kingdom/dunoon.htm",
    name: "Dunoon",
    coords: [-4.924916, 55.9470831],
  },
  {
    url: "/europe/united-kingdom/dymchurch.htm",
    name: "Dymchurch",
    coords: [0.9936502, 51.0263293],
  },
  {
    url: "/europe/united-kingdom/easington.htm",
    name: "Easington",
    coords: [-1.3530807, 54.7850506],
  },
  {
    url: "/europe/united-kingdom/east-cowes.htm",
    name: "East Cowes",
    coords: [-1.2852106, 50.7594841],
  },
  {
    url: "/europe/united-kingdom/east-wemyss.htm",
    name: "East Wemyss",
    coords: [-3.0624745, 56.1616165],
  },
  {
    url: "/europe/united-kingdom/eastbourne.htm",
    name: "Eastbourne",
    coords: [0.2781546, 50.7664372],
  },
  {
    url: "/europe/united-kingdom/edinburgh.htm",
    name: "Edinburgh",
    coords: [-3.1883749, 55.9533456],
  },
  {
    url: "/europe/united-kingdom/emsworth.htm",
    name: "Emsworth",
    coords: [-0.9371343, 50.8473211],
  },
  {
    url: "/europe/united-kingdom/errol.htm",
    name: "Errol",
    coords: [-3.2152506, 56.3913112],
  },
  {
    url: "/europe/united-kingdom/erskine.htm",
    name: "Erskine",
    coords: [-4.4492326, 55.9042117],
  },
  {
    url: "/europe/united-kingdom/exmouth.htm",
    name: "Exmouth",
    coords: [-3.4146801, 50.6190962],
  },
  {
    url: "/europe/united-kingdom/fairlie.htm",
    name: "Fairlie",
    coords: [-4.8547073, 55.7536302],
  },
  {
    url: "/europe/united-kingdom/falmouth.htm",
    name: "Falmouth",
    coords: [-5.0688262, 50.1552197],
  },
  {
    url: "/europe/united-kingdom/fareham.htm",
    name: "Fareham",
    coords: [-1.1783134, 50.8526637],
  },
  {
    url: "/europe/united-kingdom/felixstowe.htm",
    name: "Felixstowe",
    coords: [1.328993782059784, 51.964295899999996],
  },
  {
    url: "/europe/united-kingdom/filey.htm",
    name: "Filey",
    coords: [-0.2888382, 54.2096884],
  },
  {
    url: "/europe/united-kingdom/fishguard.htm",
    name: "Fishguard",
    coords: [-4.97681, 51.9938353],
  },
  {
    url: "/europe/united-kingdom/fleetwood.htm",
    name: "Fleetwood",
    coords: [-3.0329340355325565, 53.9224847],
  },
  {
    url: "/europe/united-kingdom/flexbury.htm",
    name: "Flexbury",
    coords: [-4.5429964, 50.8371606],
  },
  {
    url: "/europe/united-kingdom/flimby.htm",
    name: "Flimby",
    coords: [-3.5166175, 54.6874925],
  },
  {
    url: "/europe/united-kingdom/folkestone.htm",
    name: "Folkestone",
    coords: [1.1794073, 51.0791335],
  },
  {
    url: "/europe/united-kingdom/fort-william.htm",
    name: "Fort William",
    coords: [-5.110974, 56.8178285],
  },
  {
    url: "/europe/united-kingdom/fortrose.htm",
    name: "Fortrose",
    coords: [-4.1305039, 57.5817836],
  },
  {
    url: "/europe/united-kingdom/fortuneswell.htm",
    name: "Fortuneswell",
    coords: [-2.4457182, 50.5603502],
  },
  {
    url: "/europe/united-kingdom/fowey.htm",
    name: "Fowey",
    coords: [-4.6365952, 50.3357786],
  },
  {
    url: "/europe/united-kingdom/freshwater.htm",
    name: "Freshwater",
    coords: [-1.5231372, 50.6814402],
  },
  {
    url: "/europe/united-kingdom/garelochhead.htm",
    name: "Garelochhead",
    coords: [-4.8311747, 56.0808253],
  },
  {
    url: "/europe/united-kingdom/gillingham.htm",
    name: "Gillingham",
    coords: [0.5461611, 51.3871701],
  },
  {
    url: "/europe/united-kingdom/girvan.htm",
    name: "Girvan",
    coords: [-4.8553579, 55.2413151],
  },
  {
    url: "/europe/united-kingdom/goldcliff.htm",
    name: "Goldcliff",
    coords: [-2.9151268, 51.5433853],
  },
  {
    url: "/europe/united-kingdom/golspie.htm",
    name: "Golspie",
    coords: [-3.9758786, 57.973318],
  },
  {
    url: "/europe/united-kingdom/goodwick.htm",
    name: "Goodwick",
    coords: [-4.9960186, 52.004437],
  },
  {
    url: "/europe/united-kingdom/gorleston-on-sea.htm",
    name: "Gorleston-on-Sea",
    coords: [1.7273353, 52.5778559],
  },
  {
    url: "/europe/united-kingdom/gosport.htm",
    name: "Gosport",
    coords: [-1.1210853, 50.7952074],
  },
  {
    url: "/europe/united-kingdom/gourock.htm",
    name: "Gourock",
    coords: [-4.8178728, 55.9620009],
  },
  {
    url: "/europe/united-kingdom/grange-over-sands.htm",
    name: "Grange-over-Sands",
    coords: [-2.9094791, 54.1930633],
  },
  {
    url: "/europe/united-kingdom/grays.htm",
    name: "Grays",
    coords: [0.3233131, 51.4780898],
  },
  {
    url: "/europe/united-kingdom/greenhithe.htm",
    name: "Greenhithe",
    coords: [0.2817634, 51.4507436],
  },
  {
    url: "/europe/united-kingdom/greenock.htm",
    name: "Greenock",
    coords: [-4.7564721, 55.9473423],
  },
  {
    url: "/europe/united-kingdom/gretna.htm",
    name: "Gretna",
    coords: [-3.0669404, 54.9953097],
  },
  {
    url: "/europe/united-kingdom/greyabbey.htm",
    name: "Greyabbey",
    coords: [-5.5604594, 54.5362024],
  },
  {
    url: "/europe/united-kingdom/grimsby.htm",
    name: "Grimsby",
    coords: [-0.0788045, 53.5671407],
  },
  {
    url: "/europe/united-kingdom/gullane.htm",
    name: "Gullane",
    coords: [-2.8307089, 56.0350435],
  },
  {
    url: "/europe/united-kingdom/hamble.htm",
    name: "Hamble",
    coords: [-1.3144661, 50.8591605],
  },
  {
    url: "/europe/united-kingdom/harwich.htm",
    name: "Harwich",
    coords: [1.2898522, 51.9445801],
  },
  {
    url: "/europe/united-kingdom/hayle.htm",
    name: "Hayle",
    coords: [-5.4178169, 50.1871402],
  },
  {
    url: "/europe/united-kingdom/hayling-island.htm",
    name: "Hayling Island",
    coords: [-0.9800526903461984, 50.8056117],
  },
  {
    url: "/europe/united-kingdom/helensburgh.htm",
    name: "Helensburgh",
    coords: [-4.7342935, 56.0033464],
  },
  {
    url: "/europe/united-kingdom/high-valleyfield.htm",
    name: "High Valleyfield",
    coords: [-3.6009917, 56.0626699],
  },
  {
    url: "/europe/united-kingdom/highbridge.htm",
    name: "Highbridge",
    coords: [-2.9764141, 51.2200079],
  },
  {
    url: "/europe/united-kingdom/holyhead.htm",
    name: "Holyhead",
    coords: [-4.6330966, 53.3106715],
  },
  {
    url: "/europe/united-kingdom/hoo.htm",
    name: "Hoo",
    coords: [1.3008445, 52.1822183],
  },
  {
    url: "/europe/united-kingdom/hopeman.htm",
    name: "Hopeman",
    coords: [-3.4331357, 57.7073279],
  },
  {
    url: "/europe/united-kingdom/hornsea.htm",
    name: "Hornsea",
    coords: [-0.1689412, 53.9134596],
  },
  {
    url: "/europe/united-kingdom/hugh-town.htm",
    name: "Hugh Town",
    coords: [-6.3153609, 49.9145586],
  },
  {
    url: "/europe/united-kingdom/hull.htm",
    name: "Hull",
    coords: [-0.3394758, 53.7435722],
  },
  {
    url: "/europe/united-kingdom/hundleton.htm",
    name: "Hundleton",
    coords: [-4.9509313, 51.6684542],
  },
  {
    url: "/europe/united-kingdom/hythe.htm",
    name: "Hythe",
    coords: [1.0841634, 51.0691421],
  },
  {
    url: "/europe/united-kingdom/ilfracombe.htm",
    name: "Ilfracombe",
    coords: [-4.1254662, 51.2076674],
  },
  {
    url: "/europe/united-kingdom/inchinnan.htm",
    name: "Inchinnan",
    coords: [-4.4372189, 55.8914578],
  },
  {
    url: "/europe/united-kingdom/inverbervie.htm",
    name: "Inverbervie",
    coords: [-2.2806005, 56.844524],
  },
  {
    url: "/europe/united-kingdom/invergordon.htm",
    name: "Invergordon",
    coords: [-4.1692103, 57.6884029],
  },
  {
    url: "/europe/united-kingdom/inverkeithing.htm",
    name: "Inverkeithing",
    coords: [-3.3977498, 56.0308767],
  },
  {
    url: "/europe/united-kingdom/inverkip.htm",
    name: "Inverkip",
    coords: [-4.8651043, 55.9089906],
  },
  {
    url: "/europe/united-kingdom/isle-of-bute.htm",
    name: "Isle of Bute",
    coords: [-5.08148580774648, 55.824188899999996],
  },
  {
    url: "/europe/united-kingdom/isle-of-lewis.htm",
    name: "Isle of Lewis",
    coords: [-6.564223873439507, 58.212829150000005],
  },
  {
    url: "/europe/united-kingdom/isles-of-scilly.htm",
    name: "Isles of Scilly",
    coords: [-6.292879121335639, 49.92034085],
  },
  {
    url: "/europe/united-kingdom/kewstoke.htm",
    name: "Kewstoke",
    coords: [-2.9549713, 51.3653969],
  },
  {
    url: "/europe/united-kingdom/kinghorn.htm",
    name: "Kinghorn",
    coords: [-3.1742285, 56.0707374],
  },
  {
    url: "/europe/united-kingdom/kingsbridge.htm",
    name: "Kingsbridge",
    coords: [-2.9253132, 56.6908713],
  },
  {
    url: "/europe/united-kingdom/kircubbin.htm",
    name: "Kircubbin",
    coords: [-5.53201, 54.4870904],
  },
  {
    url: "/europe/united-kingdom/kirkcaldy.htm",
    name: "Kirkcaldy",
    coords: [-3.1582296, 56.1110218],
  },
  {
    url: "/europe/united-kingdom/kirkcudbright.htm",
    name: "Kirkcudbright",
    coords: [-4.0543927, 54.8352482],
  },
  {
    url: "/europe/united-kingdom/kirkwall.htm",
    name: "Kirkwall",
    coords: [-2.960369, 58.9816049],
  },
  {
    url: "/europe/united-kingdom/lamlash.htm",
    name: "Lamlash",
    coords: [-5.1285149, 55.5333054],
  },
  {
    url: "/europe/united-kingdom/landewednack.htm",
    name: "Landewednack",
    coords: [-5.194645, 49.9693846],
  },
  {
    url: "/europe/united-kingdom/larne.htm",
    name: "Larne",
    coords: [-5.8183116, 54.8508458],
  },
  {
    url: "/europe/united-kingdom/lee-on-the-solent.htm",
    name: "Lee-on-the-Solent",
    coords: [-1.2013355, 50.8028983],
  },
  {
    url: "/europe/united-kingdom/leigh-on-sea.htm",
    name: "Leigh-on-Sea",
    coords: [0.6474487, 51.5421185],
  },
  {
    url: "/europe/united-kingdom/lerwick.htm",
    name: "Lerwick",
    coords: [-1.1427296, 60.1531357],
  },
  {
    url: "/europe/united-kingdom/leven.htm",
    name: "Leven",
    coords: [-2.99692, 56.1954351],
  },
  {
    url: "/europe/united-kingdom/leysdown-on-sea.htm",
    name: "Leysdown-on-Sea",
    coords: [0.922427, 51.397828],
  },
  {
    url: "/europe/united-kingdom/littlehampton.htm",
    name: "Littlehampton",
    coords: [-0.5424424, 50.8095801],
  },
  {
    url: "/europe/united-kingdom/liverpool.htm",
    name: "Liverpool",
    coords: [-2.99168, 53.4071991],
  },
  {
    url: "/europe/united-kingdom/llandudno.htm",
    name: "Llandudno",
    coords: [-3.8243251, 53.322475],
  },
  {
    url: "/europe/united-kingdom/llanelli.htm",
    name: "Llanelli",
    coords: [-4.1620223, 51.6797331],
  },
  {
    url: "/europe/united-kingdom/llanfair.htm",
    name: "Llanfair",
    coords: [-4.1141613, 52.8437787],
  },
  {
    url: "/europe/united-kingdom/llanfairpwllgwyngyll.htm",
    name: "Llanfairpwllgwyngyll",
    coords: [-4.2098775, 53.2214531],
  },
  {
    url: "/europe/united-kingdom/llansantffraid-glan-conwy.htm",
    name: "Llansantffraid Glan Conwy",
    coords: [-3.794732, 53.271845],
  },
  {
    url: "/europe/united-kingdom/llansteffan.htm",
    name: "Llansteffan",
    coords: [-4.3927996, 51.7724601],
  },
  {
    url: "/europe/united-kingdom/lochgilphead.htm",
    name: "Lochgilphead",
    coords: [-5.433147, 56.0375069],
  },
  {
    url: "/europe/united-kingdom/looe.htm",
    name: "Looe",
    coords: [-4.4542496, 50.3511715],
  },
  {
    url: "/europe/united-kingdom/lossiemouth.htm",
    name: "Lossiemouth",
    coords: [-3.2814625, 57.7220766],
  },
  {
    url: "/europe/united-kingdom/lowestoft.htm",
    name: "Lowestoft",
    coords: [1.7537638, 52.4766308],
  },
  {
    url: "/europe/united-kingdom/lyme-regis.htm",
    name: "Lyme Regis",
    coords: [-2.934559, 50.7252897],
  },
  {
    url: "/europe/united-kingdom/lytham-st-annes.htm",
    name: "Lytham St Annes",
    coords: [-2.9990745, 53.7485046],
  },
  {
    url: "/europe/united-kingdom/macduff.htm",
    name: "Macduff",
    coords: [-2.4944375, 57.6702105],
  },
  {
    url: "/europe/united-kingdom/manningtree.htm",
    name: "Manningtree",
    coords: [1.0630218, 51.9450866],
  },
  {
    url: "/europe/united-kingdom/manorbier.htm",
    name: "Manorbier",
    coords: [-4.7955331, 51.6466802],
  },
  {
    url: "/europe/united-kingdom/mappleton.htm",
    name: "Mappleton",
    coords: [-0.1366654, 53.8766822],
  },
  {
    url: "/europe/united-kingdom/marazion.htm",
    name: "Marazion",
    coords: [-5.4727698, 50.1239321],
  },
  {
    url: "/europe/united-kingdom/margate.htm",
    name: "Margate",
    coords: [1.3819699, 51.3878174],
  },
  {
    url: "/europe/united-kingdom/marske-by-the-sea.htm",
    name: "Marske-by-the-Sea",
    coords: [-1.0196792, 54.5919266],
  },
  {
    url: "/europe/united-kingdom/maryport.htm",
    name: "Maryport",
    coords: [-3.4998108, 54.7129699],
  },
  {
    url: "/europe/united-kingdom/menai-bridge.htm",
    name: "Menai Bridge",
    coords: [-4.1631064, 53.2259347],
  },
  {
    url: "/europe/united-kingdom/mevagissey.htm",
    name: "Mevagissey",
    coords: [-4.7872174, 50.2696687],
  },
  {
    url: "/europe/united-kingdom/milford-haven.htm",
    name: "Milford Haven",
    coords: [-5.0293161, 51.7117492],
  },
  {
    url: "/europe/united-kingdom/milford-on-sea.htm",
    name: "Milford on Sea",
    coords: [-1.5855744198861115, 50.72505115],
  },
  {
    url: "/europe/united-kingdom/millbrook.htm",
    name: "Millbrook",
    coords: [-0.5254261, 52.0370204],
  },
  {
    url: "/europe/united-kingdom/millisle.htm",
    name: "Millisle",
    coords: [-5.5284632, 54.60782],
  },
  {
    url: "/europe/united-kingdom/millport.htm",
    name: "Millport",
    coords: [-4.9239794, 55.753958],
  },
  {
    url: "/europe/united-kingdom/mistley.htm",
    name: "Mistley",
    coords: [1.0847028, 51.940023],
  },
  {
    url: "/europe/united-kingdom/moelfre.htm",
    name: "Moelfre",
    coords: [-4.2366244, 53.3537357],
  },
  {
    url: "/europe/united-kingdom/montrose.htm",
    name: "Montrose",
    coords: [-2.4681544, 56.7114295],
  },
  {
    url: "/europe/united-kingdom/mostyn.htm",
    name: "Mostyn",
    coords: [-3.2657174, 53.3146906],
  },
  {
    url: "/europe/united-kingdom/musselburgh.htm",
    name: "Musselburgh",
    coords: [-3.0538516, 55.9421202],
  },
  {
    url: "/europe/united-kingdom/new-ferry.htm",
    name: "New Ferry",
    coords: [-2.9943509, 53.3619442],
  },
  {
    url: "/europe/united-kingdom/new-quay.htm",
    name: "New Quay",
    coords: [-4.3603208, 52.2140026],
  },
  {
    url: "/europe/united-kingdom/newbiggin-by-the-sea.htm",
    name: "Newbiggin-by-the-Sea",
    coords: [-1.5109345, 55.1853665],
  },
  {
    url: "/europe/united-kingdom/newburgh.htm",
    name: "Newburgh",
    coords: [-2.0036775, 57.3194088],
  },
  {
    url: "/europe/united-kingdom/newport.htm",
    name: "Newport",
    coords: [-2.9974967, 51.5882332],
  },
  {
    url: "/europe/united-kingdom/newport.htm",
    name: "Newport",
    coords: [-2.9974967, 51.5882332],
  },
  {
    url: "/europe/united-kingdom/newport-on-tay.htm",
    name: "Newport-On-Tay",
    coords: [-2.9416726, 56.4397014],
  },
  {
    url: "/europe/united-kingdom/newquay.htm",
    name: "Newquay",
    coords: [-5.0848836, 50.4134414],
  },
  {
    url: "/europe/united-kingdom/newtonhill.htm",
    name: "Newtonhill",
    coords: [-2.1503377, 57.0321018],
  },
  {
    url: "/europe/united-kingdom/newtownabbey.htm",
    name: "Newtownabbey",
    coords: [-5.9249199, 54.6778816],
  },
  {
    url: "/europe/united-kingdom/neyland.htm",
    name: "Neyland",
    coords: [-4.9511343, 51.7099976],
  },
  {
    url: "/europe/united-kingdom/north-berwick.htm",
    name: "North Berwick",
    coords: [-2.7209129, 56.0581178],
  },
  {
    url: "/europe/united-kingdom/north-queensferry.htm",
    name: "North Queensferry",
    coords: [-3.3946262, 56.0098407],
  },
  {
    url: "/europe/united-kingdom/north-sunderland.htm",
    name: "North Sunderland",
    coords: [-1.666311, 55.5776186],
  },
  {
    url: "/europe/united-kingdom/oban.htm",
    name: "Oban",
    coords: [-5.4734688, 56.415695],
  },
  {
    url: "/europe/united-kingdom/orkney.htm",
    name: "Orkney",
    coords: [-3.129694439563327, 58.94182309999999],
  },
  {
    url: "/europe/united-kingdom/overcombe.htm",
    name: "Overcombe",
    coords: [-2.4310797, 50.6354106],
  },
  {
    url: "/europe/united-kingdom/padstow.htm",
    name: "Padstow",
    coords: [-4.9369874, 50.5403819],
  },
  {
    url: "/europe/united-kingdom/par.htm",
    name: "Par",
    coords: [-4.7050945, 50.3494152],
  },
  {
    url: "/europe/united-kingdom/paull.htm",
    name: "Paull",
    coords: [-0.2335567, 53.7208505],
  },
  {
    url: "/europe/united-kingdom/peacehaven.htm",
    name: "Peacehaven",
    coords: [-0.0027387, 50.7962181],
  },
  {
    url: "/europe/united-kingdom/pembroke.htm",
    name: "Pembroke",
    coords: [-4.9144858, 51.6754422],
  },
  {
    url: "/europe/united-kingdom/pembroke-dock.htm",
    name: "Pembroke Dock",
    coords: [-4.9392016, 51.693539],
  },
  {
    url: "/europe/united-kingdom/penarth.htm",
    name: "Penarth",
    coords: [-3.1733023, 51.435968],
  },
  {
    url: "/europe/united-kingdom/penryn.htm",
    name: "Penryn",
    coords: [-5.1034063, 50.1685457],
  },
  {
    url: "/europe/united-kingdom/penzance.htm",
    name: "Penzance",
    coords: [-5.5352463, 50.1194794],
  },
  {
    url: "/europe/united-kingdom/perranporth.htm",
    name: "Perranporth",
    coords: [-5.153844, 50.3444208],
  },
  {
    url: "/europe/united-kingdom/peterhead.htm",
    name: "Peterhead",
    coords: [-1.7813194, 57.5052909],
  },
  {
    url: "/europe/united-kingdom/plymouth.htm",
    name: "Plymouth",
    coords: [-4.1425658, 50.3712659],
  },
  {
    url: "/europe/united-kingdom/polzeath.htm",
    name: "Polzeath",
    coords: [-4.9149007, 50.5728393],
  },
  {
    url: "/europe/united-kingdom/poole.htm",
    name: "Poole",
    coords: [-1.981521, 50.7179472],
  },
  {
    url: "/europe/united-kingdom/port-bannatyne.htm",
    name: "Port Bannatyne",
    coords: [-5.0825311, 55.8603022],
  },
  {
    url: "/europe/united-kingdom/port-erroll.htm",
    name: "Port Erroll",
    coords: [-1.8460132, 57.4142846],
  },
  {
    url: "/europe/united-kingdom/port-glasgow.htm",
    name: "Port Glasgow",
    coords: [-4.689854, 55.9342865],
  },
  {
    url: "/europe/united-kingdom/port-talbot.htm",
    name: "Port Talbot",
    coords: [-3.782199, 51.5952119],
  },
  {
    url: "/europe/united-kingdom/portavogie.htm",
    name: "Portavogie",
    coords: [-5.4433576, 54.4612678],
  },
  {
    url: "/europe/united-kingdom/porthcawl.htm",
    name: "Porthcawl",
    coords: [-3.7040704, 51.4795563],
  },
  {
    url: "/europe/united-kingdom/porthleven.htm",
    name: "Porthleven",
    coords: [-5.3166558, 50.0849174],
  },
  {
    url: "/europe/united-kingdom/porthmadog.htm",
    name: "Porthmadog",
    coords: [-4.129694, 52.9256029],
  },
  {
    url: "/europe/united-kingdom/portknockie.htm",
    name: "Portknockie",
    coords: [-2.8581483, 57.7034964],
  },
  {
    url: "/europe/united-kingdom/portland.htm",
    name: "Portland",
    coords: [-2.4472529, 50.5672516],
  },
  {
    url: "/europe/united-kingdom/portlethen.htm",
    name: "Portlethen",
    coords: [-2.129707, 57.061466],
  },
  {
    url: "/europe/united-kingdom/portree.htm",
    name: "Portree",
    coords: [-6.194446, 57.4130532],
  },
  {
    url: "/europe/united-kingdom/portrush.htm",
    name: "Portrush",
    coords: [-6.6540486, 55.2060325],
  },
  {
    url: "/europe/united-kingdom/portscatho.htm",
    name: "Portscatho",
    coords: [-4.9756476, 50.1797427],
  },
  {
    url: "/europe/united-kingdom/portsmouth.htm",
    name: "Portsmouth",
    coords: [-1.0906023, 50.800031],
  },
  {
    url: "/europe/united-kingdom/portsoy.htm",
    name: "Portsoy",
    coords: [-2.6907423, 57.6815502],
  },
  {
    url: "/europe/united-kingdom/portstewart.htm",
    name: "Portstewart",
    coords: [-6.7187008, 55.1829096],
  },
  {
    url: "/europe/united-kingdom/pwllheli.htm",
    name: "Pwllheli",
    coords: [-4.4187565, 52.8879082],
  },
  {
    url: "/europe/united-kingdom/queenborough.htm",
    name: "Queenborough",
    coords: [0.7386390448755704, 51.4124923],
  },
  {
    url: "/europe/united-kingdom/queensferry.htm",
    name: "Queensferry",
    coords: [-3.0208441, 53.2048844],
  },
  {
    url: "/europe/united-kingdom/ramsgate.htm",
    name: "Ramsgate",
    coords: [1.4196476, 51.3334726],
  },
  {
    url: "/europe/united-kingdom/redcar.htm",
    name: "Redcar",
    coords: [-1.0687914, 54.6179021],
  },
  {
    url: "/europe/united-kingdom/redwick.htm",
    name: "Redwick",
    coords: [-2.6493728, 51.5667426],
  },
  {
    url: "/europe/united-kingdom/rhu.htm",
    name: "Rhu",
    coords: [-4.7794157, 56.0181861],
  },
  {
    url: "/europe/united-kingdom/rhyl.htm",
    name: "Rhyl",
    coords: [-3.4907258, 53.3207425],
  },
  {
    url: "/europe/united-kingdom/rosehearty.htm",
    name: "Rosehearty",
    coords: [-2.1143495, 57.6967703],
  },
  {
    url: "/europe/united-kingdom/rostrevor.htm",
    name: "Rostrevor",
    coords: [-6.2004264, 54.100725],
  },
  {
    url: "/europe/united-kingdom/rothesay.htm",
    name: "Rothesay",
    coords: [-5.0522439, 55.8373085],
  },
  {
    url: "/europe/united-kingdom/runcorn.htm",
    name: "Runcorn",
    coords: [-2.7334941, 53.3421509],
  },
  {
    url: "/europe/united-kingdom/ryde.htm",
    name: "Ryde",
    coords: [-1.1603699, 50.7299865],
  },
  {
    url: "/europe/united-kingdom/saint-agnes.htm",
    name: "Saint Agnes",
    coords: [-5.202596, 50.308104],
  },
  {
    url: "/europe/united-kingdom/saint-andrews.htm",
    name: "Saint Andrews",
    coords: [-2.7955844, 56.3403902],
  },
  {
    url: "/europe/united-kingdom/saint-austell.htm",
    name: "Saint Austell",
    coords: [-4.793341, 50.333995],
  },
  {
    url: "/europe/united-kingdom/saint-davids.htm",
    name: "Saint David’s",
    coords: [-5.265329, 51.880221],
  },
  {
    url: "/europe/united-kingdom/saint-just.htm",
    name: "Saint Just",
    coords: [-5.6568703, 50.1531126],
  },
  {
    url: "/europe/united-kingdom/saint-leonards-on-sea.htm",
    name: "Saint Leonards-on-Sea",
    coords: [0.5452, 50.85565],
  },
  {
    url: "/europe/united-kingdom/saint-marys.htm",
    name: "Saint Mary's",
    coords: [-2.9153669, 58.8960354],
  },
  {
    url: "/europe/united-kingdom/salcombe.htm",
    name: "Salcombe",
    coords: [-3.7726121, 50.2388158],
  },
  {
    url: "/europe/united-kingdom/saltcoats.htm",
    name: "Saltcoats",
    coords: [-4.7887547, 55.6332429],
  },
  {
    url: "/europe/united-kingdom/sandown.htm",
    name: "Sandown",
    coords: [-1.1536287, 50.6530593],
  },
  {
    url: "/europe/united-kingdom/sandwick.htm",
    name: "Sandwick",
    coords: [-6.3533217, 58.205513],
  },
  {
    url: "/europe/united-kingdom/saundersfoot.htm",
    name: "Saundersfoot",
    coords: [-4.6997977, 51.7108868],
  },
  {
    url: "/europe/united-kingdom/scarborough.htm",
    name: "Scarborough",
    coords: [-0.4011868, 54.2820009],
  },
  {
    url: "/europe/united-kingdom/seaview.htm",
    name: "Seaview",
    coords: [-1.1155786, 50.7191353],
  },
  {
    url: "/europe/united-kingdom/sennen.htm",
    name: "Sennen",
    coords: [-5.6950433, 50.0705894],
  },
  {
    url: "/europe/united-kingdom/severn-beach.htm",
    name: "Severn Beach",
    coords: [-2.6619317, 51.5618116],
  },
  {
    url: "/europe/united-kingdom/shalfleet.htm",
    name: "Shalfleet",
    coords: [-1.4170737, 50.702332],
  },
  {
    url: "/europe/united-kingdom/shanklin.htm",
    name: "Shanklin",
    coords: [-1.1779031, 50.6288132],
  },
  {
    url: "/europe/united-kingdom/sheerness.htm",
    name: "Sheerness",
    coords: [0.7620398, 51.4398236],
  },
  {
    url: "/europe/united-kingdom/shetland.htm",
    name: "Shetland",
    coords: [-1.612905074733099, 60.245930200000004],
  },
  {
    url: "/europe/united-kingdom/shoreham-by-sea.htm",
    name: "Shoreham-by-Sea",
    coords: [-0.2746717, 50.8322307],
  },
  {
    url: "/europe/united-kingdom/shotley-gate.htm",
    name: "Shotley Gate",
    coords: [1.2686199, 51.9579124],
  },
  {
    url: "/europe/united-kingdom/silloth.htm",
    name: "Silloth",
    coords: [-3.3869124, 54.8692401],
  },
  {
    url: "/europe/united-kingdom/south-shields.htm",
    name: "South Shields",
    coords: [-1.4321848, 54.9987414],
  },
  {
    url: "/europe/united-kingdom/southampton.htm",
    name: "Southampton",
    coords: [-1.404189, 50.9025349],
  },
  {
    url: "/europe/united-kingdom/southend-on-sea.htm",
    name: "Southend-on-Sea",
    coords: [0.7128137, 51.5388241],
  },
  {
    url: "/europe/united-kingdom/southwold.htm",
    name: "Southwold",
    coords: [1.6794539, 52.3266586],
  },
  {
    url: "/europe/united-kingdom/st-ives.htm",
    name: "St Ives",
    coords: [-1.8237049, 50.8368702],
  },
  {
    url: "/europe/united-kingdom/stoke.htm",
    name: "Stoke",
    coords: [-2.1812607, 53.0162014],
  },
  {
    url: "/europe/united-kingdom/stone.htm",
    name: "Stone",
    coords: [-2.1477653, 52.9033037],
  },
  {
    url: "/europe/united-kingdom/stonehaven.htm",
    name: "Stonehaven",
    coords: [-2.2087993, 56.9640234],
  },
  {
    url: "/europe/united-kingdom/stornoway.htm",
    name: "Stornoway",
    coords: [-6.3881174, 58.2084053],
  },
  {
    url: "/europe/united-kingdom/stranraer.htm",
    name: "Stranraer",
    coords: [-5.026204, 54.9044332],
  },
  {
    url: "/europe/united-kingdom/stromness.htm",
    name: "Stromness",
    coords: [-3.2993767, 58.9614356],
  },
  {
    url: "/europe/united-kingdom/sunderland.htm",
    name: "Sunderland",
    coords: [-1.3828727, 54.9058512],
  },
  {
    url: "/europe/united-kingdom/swanage.htm",
    name: "Swanage",
    coords: [-1.9571971, 50.6086976],
  },
  {
    url: "/europe/united-kingdom/swansea.htm",
    name: "Swansea",
    coords: [-3.9459248, 51.6195955],
  },
  {
    url: "/europe/united-kingdom/tain.htm",
    name: "Tain",
    coords: [-4.0550663, 57.8119372],
  },
  {
    url: "/europe/united-kingdom/tankerton.htm",
    name: "Tankerton",
    coords: [1.0438624, 51.3641122],
  },
  {
    url: "/europe/united-kingdom/tarbert.htm",
    name: "Tarbert",
    coords: [-5.4151084, 55.8635203],
  },
  {
    url: "/europe/united-kingdom/tayport.htm",
    name: "Tayport",
    coords: [-2.8807193, 56.4490878],
  },
  {
    url: "/europe/united-kingdom/teignmouth.htm",
    name: "Teignmouth",
    coords: [-3.4957798, 50.5463385],
  },
  {
    url: "/europe/united-kingdom/tenby.htm",
    name: "Tenby",
    coords: [-4.7050443, 51.6726128],
  },
  {
    url: "/europe/united-kingdom/thurso.htm",
    name: "Thurso",
    coords: [-3.520577, 58.5947443],
  },
  {
    url: "/europe/united-kingdom/tintagel.htm",
    name: "Tintagel",
    coords: [-4.7526181, 50.6642063],
  },
  {
    url: "/europe/united-kingdom/topsham.htm",
    name: "Topsham",
    coords: [-3.4658063, 50.6850732],
  },
  {
    url: "/europe/united-kingdom/torpoint.htm",
    name: "Torpoint",
    coords: [-4.1991204, 50.3757288],
  },
  {
    url: "/europe/united-kingdom/torquay.htm",
    name: "Torquay",
    coords: [-3.5211361, 50.4652392],
  },
  {
    url: "/europe/united-kingdom/totnes.htm",
    name: "Totnes",
    coords: [-3.6871525, 50.4322816],
  },
  {
    url: "/europe/united-kingdom/totton.htm",
    name: "Totton",
    coords: [-1.4894631, 50.9196406],
  },
  {
    url: "/europe/united-kingdom/troon.htm",
    name: "Troon",
    coords: [-4.663906, 55.5437893],
  },
  {
    url: "/europe/united-kingdom/tynemouth.htm",
    name: "Tynemouth",
    coords: [-1.4256042, 55.0177847],
  },
  {
    url: "/europe/united-kingdom/ullapool.htm",
    name: "Ullapool",
    coords: [-5.1586647, 57.8978237],
  },
  {
    url: "/europe/united-kingdom/wadebridge.htm",
    name: "Wadebridge",
    coords: [-4.8340186, 50.5171441],
  },
  {
    url: "/europe/united-kingdom/walton-on-the-naze.htm",
    name: "Walton-on-the-Naze",
    coords: [1.2725902, 51.848357],
  },
  {
    url: "/europe/united-kingdom/warkworth.htm",
    name: "Warkworth",
    coords: [-1.2897327, 52.0576068],
  },
  {
    url: "/europe/united-kingdom/warrenpoint.htm",
    name: "Warrenpoint",
    coords: [-6.2512827, 54.0999923],
  },
  {
    url: "/europe/united-kingdom/watchet.htm",
    name: "Watchet",
    coords: [-3.3306406, 51.179924],
  },
  {
    url: "/europe/united-kingdom/waterloo.htm",
    name: "Waterloo",
    coords: [-3.1625022, 51.5868946],
  },
  {
    url: "/europe/united-kingdom/wemyss-bay.htm",
    name: "Wemyss Bay",
    coords: [-4.8886364, 55.8759876],
  },
  {
    url: "/europe/united-kingdom/westgate-on-sea.htm",
    name: "Westgate on Sea",
    coords: [1.3372108, 51.3815773],
  },
  {
    url: "/europe/united-kingdom/weston-super-mare.htm",
    name: "Weston-super-Mare",
    coords: [-2.9778916, 51.3471927],
  },
  {
    url: "/europe/united-kingdom/weymouth.htm",
    name: "Weymouth",
    coords: [-2.4543424, 50.6096257],
  },
  {
    url: "/europe/united-kingdom/whitburn.htm",
    name: "Whitburn",
    coords: [-3.6849014, 55.8667819],
  },
  {
    url: "/europe/united-kingdom/whitby.htm",
    name: "Whitby",
    coords: [-0.6155111, 54.4874141],
  },
  {
    url: "/europe/united-kingdom/whitehead.htm",
    name: "Whitehead",
    coords: [-5.7155824, 54.7548363],
  },
  {
    url: "/europe/united-kingdom/whitstable.htm",
    name: "Whitstable",
    coords: [1.0240626, 51.3606286],
  },
  {
    url: "/europe/united-kingdom/wick.htm",
    name: "Wick",
    coords: [-3.0915827, 58.4425516],
  },
  {
    url: "/europe/united-kingdom/widnes.htm",
    name: "Widnes",
    coords: [-2.7283328, 53.3646888],
  },
  {
    url: "/europe/united-kingdom/yarmouth.htm",
    name: "Yarmout",
    coords: [undefined],
  },
];

module.exports = { locations };
