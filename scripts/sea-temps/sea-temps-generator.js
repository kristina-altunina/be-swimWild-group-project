const axios = require("axios");
const fs = require("fs/promises");

const api = axios.create({
  baseURL: "https://api.geoapify.com/v1/geocode",
});

const locations = [
  { url: "/europe/united-kingdom/aberaeron.htm", name: "Aberaeron" },
  { url: "/europe/united-kingdom/aberdeen.htm", name: "Aberdeen" },
  { url: "/europe/united-kingdom/aberdour.htm", name: "Aberdour" },
  { url: "/europe/united-kingdom/aberporth.htm", name: "Aberporth" },
  { url: "/europe/united-kingdom/aberystwyth.htm", name: "Aberystwyth" },
  { url: "/europe/united-kingdom/airth.htm", name: "Airth" },
  { url: "/europe/united-kingdom/aldeburgh.htm", name: "Aldeburgh" },
  { url: "/europe/united-kingdom/alderney.htm", name: "Alderney" },
  { url: "/europe/united-kingdom/alnmouth.htm", name: "Alnmouth" },
  { url: "/europe/united-kingdom/amble.htm", name: "Amble" },
  { url: "/europe/united-kingdom/amlwch.htm", name: "Amlwch" },
  { url: "/europe/united-kingdom/annalong.htm", name: "Annalong" },
  { url: "/europe/united-kingdom/anstruther.htm", name: "Anstruther" },
  { url: "/europe/united-kingdom/appledore.htm", name: "Appledore" },
  { url: "/europe/united-kingdom/ardglass.htm", name: "Ardglass" },
  { url: "/europe/united-kingdom/ardrishaig.htm", name: "Ardrishaig" },
  { url: "/europe/united-kingdom/arnside.htm", name: "Arnside" },
  {
    url: "/europe/united-kingdom/askam-in-furness.htm",
    name: "Askam in Furness",
  },
  { url: "/europe/united-kingdom/ayr.htm", name: "Ayr" },
  { url: "/europe/united-kingdom/balintore.htm", name: "Balintore" },
  { url: "/europe/united-kingdom/ballycastle.htm", name: "Ballycastle" },
  { url: "/europe/united-kingdom/ballywalter.htm", name: "Ballywalter" },
  { url: "/europe/united-kingdom/banff.htm", name: "Banff" },
  { url: "/europe/united-kingdom/barmouth.htm", name: "Barmouth" },
  { url: "/europe/united-kingdom/barnstaple.htm", name: "Barnstaple" },
  { url: "/europe/united-kingdom/beadnell.htm", name: "Beadnell" },
  { url: "/europe/united-kingdom/beaumaris.htm", name: "Beaumaris" },
  { url: "/europe/united-kingdom/belfast.htm", name: "Belfast" },
  { url: "/europe/united-kingdom/bembridge.htm", name: "Bembridge" },
  { url: "/europe/united-kingdom/benllech.htm", name: "Benllech" },
  {
    url: "/europe/united-kingdom/berwick-upon-tweed.htm",
    name: "Berwick-Upon-Tweed",
  },
  { url: "/europe/united-kingdom/bideford.htm", name: "Bideford" },
  { url: "/europe/united-kingdom/birdham.htm", name: "Birdham" },
  { url: "/europe/united-kingdom/birkenhead.htm", name: "Birkenhead" },
  { url: "/europe/united-kingdom/blackpool.htm", name: "Blackpool" },
  { url: "/europe/united-kingdom/blyth.htm", name: "Blyth" },
  { url: "/europe/united-kingdom/boddam.htm", name: "Boddam" },
  { url: "/europe/united-kingdom/bosham.htm", name: "Bosham" },
  { url: "/europe/united-kingdom/bournemouth.htm", name: "Bournemouth" },
  { url: "/europe/united-kingdom/boness.htm", name: "Bo’ness" },
  { url: "/europe/united-kingdom/brighton.htm", name: "Brighton" },
  { url: "/europe/united-kingdom/brixham.htm", name: "Brixham" },
  { url: "/europe/united-kingdom/broadstairs.htm", name: "Broadstairs" },
  { url: "/europe/united-kingdom/brora.htm", name: "Brora" },
  { url: "/europe/united-kingdom/buckhaven.htm", name: "Buckhaven" },
  { url: "/europe/united-kingdom/bude.htm", name: "Bude" },
  {
    url: "/europe/united-kingdom/budleigh-salterton.htm",
    name: "Budleigh Salterton",
  },
  { url: "/europe/united-kingdom/burghead.htm", name: "Burghead" },
  { url: "/europe/united-kingdom/burnham-on-sea.htm", name: "Burnham-on-Sea" },
  { url: "/europe/united-kingdom/burntisland.htm", name: "Burntisland" },
  { url: "/europe/united-kingdom/cairnryan.htm", name: "Cairnryan" },
  { url: "/europe/united-kingdom/campbeltown.htm", name: "Campbeltown" },
  { url: "/europe/united-kingdom/cardiff.htm", name: "Cardiff" },
  { url: "/europe/united-kingdom/carnlough.htm", name: "Carnlough" },
  { url: "/europe/united-kingdom/carnoustie.htm", name: "Carnoustie" },
  { url: "/europe/united-kingdom/carrickfergus.htm", name: "Carrickfergus" },
  { url: "/europe/united-kingdom/chepstow.htm", name: "Chepstow" },
  { url: "/europe/united-kingdom/christchurch.htm", name: "Christchurch" },
  { url: "/europe/united-kingdom/cleethorpes.htm", name: "Cleethorpes" },
  { url: "/europe/united-kingdom/clevedon.htm", name: "Clevedon" },
  { url: "/europe/united-kingdom/cockenzie.htm", name: "Cockenzie" },
  { url: "/europe/united-kingdom/conon-bridge.htm", name: "Conon Bridge" },
  { url: "/europe/united-kingdom/conwy.htm", name: "Conwy" },
  { url: "/europe/united-kingdom/cowes.htm", name: "Cowes" },
  { url: "/europe/united-kingdom/criccieth.htm", name: "Criccieth" },
  { url: "/europe/united-kingdom/cromer.htm", name: "Cromer" },
  { url: "/europe/united-kingdom/crosby.htm", name: "Crosby" },
  { url: "/europe/united-kingdom/culmore.htm", name: "Culmore" },
  { url: "/europe/united-kingdom/cushendall.htm", name: "Cushendall" },
  { url: "/europe/united-kingdom/dale.htm", name: "Dale" },
  { url: "/europe/united-kingdom/dartmouth.htm", name: "Dartmouth" },
  { url: "/europe/united-kingdom/dawlish.htm", name: "Dawlish" },
  { url: "/europe/united-kingdom/deal.htm", name: "Deal" },
  { url: "/europe/united-kingdom/derry.htm", name: "Derry" },
  { url: "/europe/united-kingdom/donaghadee.htm", name: "Donaghadee" },
  { url: "/europe/united-kingdom/dover.htm", name: "Dover" },
  { url: "/europe/united-kingdom/dovercourt.htm", name: "Dovercourt" },
  { url: "/europe/united-kingdom/dumbarton.htm", name: "Dumbarton" },
  { url: "/europe/united-kingdom/dunbar.htm", name: "Dunbar" },
  { url: "/europe/united-kingdom/dundee.htm", name: "Dundee" },
  { url: "/europe/united-kingdom/dundrum.htm", name: "Dundrum" },
  { url: "/europe/united-kingdom/dunoon.htm", name: "Dunoon" },
  { url: "/europe/united-kingdom/dymchurch.htm", name: "Dymchurch" },
  { url: "/europe/united-kingdom/easington.htm", name: "Easington" },
  { url: "/europe/united-kingdom/east-cowes.htm", name: "East Cowes" },
  { url: "/europe/united-kingdom/east-wemyss.htm", name: "East Wemyss" },
  { url: "/europe/united-kingdom/eastbourne.htm", name: "Eastbourne" },
  { url: "/europe/united-kingdom/edinburgh.htm", name: "Edinburgh" },
  { url: "/europe/united-kingdom/emsworth.htm", name: "Emsworth" },
  { url: "/europe/united-kingdom/errol.htm", name: "Errol" },
  { url: "/europe/united-kingdom/erskine.htm", name: "Erskine" },
  { url: "/europe/united-kingdom/exmouth.htm", name: "Exmouth" },
  { url: "/europe/united-kingdom/fairlie.htm", name: "Fairlie" },
  { url: "/europe/united-kingdom/falmouth.htm", name: "Falmouth" },
  { url: "/europe/united-kingdom/fareham.htm", name: "Fareham" },
  { url: "/europe/united-kingdom/felixstowe.htm", name: "Felixstowe" },
  { url: "/europe/united-kingdom/filey.htm", name: "Filey" },
  { url: "/europe/united-kingdom/fishguard.htm", name: "Fishguard" },
  { url: "/europe/united-kingdom/fleetwood.htm", name: "Fleetwood" },
  { url: "/europe/united-kingdom/flexbury.htm", name: "Flexbury" },
  { url: "/europe/united-kingdom/flimby.htm", name: "Flimby" },
  { url: "/europe/united-kingdom/folkestone.htm", name: "Folkestone" },
  { url: "/europe/united-kingdom/fort-william.htm", name: "Fort William" },
  { url: "/europe/united-kingdom/fortrose.htm", name: "Fortrose" },
  { url: "/europe/united-kingdom/fortuneswell.htm", name: "Fortuneswell" },
  { url: "/europe/united-kingdom/fowey.htm", name: "Fowey" },
  { url: "/europe/united-kingdom/freshwater.htm", name: "Freshwater" },
  { url: "/europe/united-kingdom/garelochhead.htm", name: "Garelochhead" },
  { url: "/europe/united-kingdom/gillingham.htm", name: "Gillingham" },
  { url: "/europe/united-kingdom/girvan.htm", name: "Girvan" },
  { url: "/europe/united-kingdom/goldcliff.htm", name: "Goldcliff" },
  { url: "/europe/united-kingdom/golspie.htm", name: "Golspie" },
  { url: "/europe/united-kingdom/goodwick.htm", name: "Goodwick" },
  {
    url: "/europe/united-kingdom/gorleston-on-sea.htm",
    name: "Gorleston-on-Sea",
  },
  { url: "/europe/united-kingdom/gosport.htm", name: "Gosport" },
  { url: "/europe/united-kingdom/gourock.htm", name: "Gourock" },
  {
    url: "/europe/united-kingdom/grange-over-sands.htm",
    name: "Grange-over-Sands",
  },
  { url: "/europe/united-kingdom/grays.htm", name: "Grays" },
  { url: "/europe/united-kingdom/greenhithe.htm", name: "Greenhithe" },
  { url: "/europe/united-kingdom/greenock.htm", name: "Greenock" },
  { url: "/europe/united-kingdom/gretna.htm", name: "Gretna" },
  { url: "/europe/united-kingdom/greyabbey.htm", name: "Greyabbey" },
  { url: "/europe/united-kingdom/grimsby.htm", name: "Grimsby" },
  { url: "/europe/united-kingdom/gullane.htm", name: "Gullane" },
  { url: "/europe/united-kingdom/hamble.htm", name: "Hamble" },
  { url: "/europe/united-kingdom/harwich.htm", name: "Harwich" },
  { url: "/europe/united-kingdom/hayle.htm", name: "Hayle" },
  { url: "/europe/united-kingdom/hayling-island.htm", name: "Hayling Island" },
  { url: "/europe/united-kingdom/helensburgh.htm", name: "Helensburgh" },
  {
    url: "/europe/united-kingdom/high-valleyfield.htm",
    name: "High Valleyfield",
  },
  { url: "/europe/united-kingdom/highbridge.htm", name: "Highbridge" },
  { url: "/europe/united-kingdom/holyhead.htm", name: "Holyhead" },
  { url: "/europe/united-kingdom/hoo.htm", name: "Hoo" },
  { url: "/europe/united-kingdom/hopeman.htm", name: "Hopeman" },
  { url: "/europe/united-kingdom/hornsea.htm", name: "Hornsea" },
  { url: "/europe/united-kingdom/hugh-town.htm", name: "Hugh Town" },
  { url: "/europe/united-kingdom/hull.htm", name: "Hull" },
  { url: "/europe/united-kingdom/hundleton.htm", name: "Hundleton" },
  { url: "/europe/united-kingdom/hythe.htm", name: "Hythe" },
  { url: "/europe/united-kingdom/ilfracombe.htm", name: "Ilfracombe" },
  { url: "/europe/united-kingdom/inchinnan.htm", name: "Inchinnan" },
  { url: "/europe/united-kingdom/inverbervie.htm", name: "Inverbervie" },
  { url: "/europe/united-kingdom/invergordon.htm", name: "Invergordon" },
  { url: "/europe/united-kingdom/inverkeithing.htm", name: "Inverkeithing" },
  { url: "/europe/united-kingdom/inverkip.htm", name: "Inverkip" },
  { url: "/europe/united-kingdom/isle-of-bute.htm", name: "Isle of Bute" },
  { url: "/europe/united-kingdom/isle-of-lewis.htm", name: "Isle of Lewis" },
  {
    url: "/europe/united-kingdom/isles-of-scilly.htm",
    name: "Isles of Scilly",
  },
  { url: "/europe/united-kingdom/kewstoke.htm", name: "Kewstoke" },
  { url: "/europe/united-kingdom/kinghorn.htm", name: "Kinghorn" },
  { url: "/europe/united-kingdom/kingsbridge.htm", name: "Kingsbridge" },
  { url: "/europe/united-kingdom/kircubbin.htm", name: "Kircubbin" },
  { url: "/europe/united-kingdom/kirkcaldy.htm", name: "Kirkcaldy" },
  { url: "/europe/united-kingdom/kirkcudbright.htm", name: "Kirkcudbright" },
  { url: "/europe/united-kingdom/kirkwall.htm", name: "Kirkwall" },
  { url: "/europe/united-kingdom/lamlash.htm", name: "Lamlash" },
  { url: "/europe/united-kingdom/landewednack.htm", name: "Landewednack" },
  { url: "/europe/united-kingdom/larne.htm", name: "Larne" },
  {
    url: "/europe/united-kingdom/lee-on-the-solent.htm",
    name: "Lee-on-the-Solent",
  },
  { url: "/europe/united-kingdom/leigh-on-sea.htm", name: "Leigh-on-Sea" },
  { url: "/europe/united-kingdom/lerwick.htm", name: "Lerwick" },
  { url: "/europe/united-kingdom/leven.htm", name: "Leven" },
  {
    url: "/europe/united-kingdom/leysdown-on-sea.htm",
    name: "Leysdown-on-Sea",
  },
  { url: "/europe/united-kingdom/littlehampton.htm", name: "Littlehampton" },
  { url: "/europe/united-kingdom/liverpool.htm", name: "Liverpool" },
  { url: "/europe/united-kingdom/llandudno.htm", name: "Llandudno" },
  { url: "/europe/united-kingdom/llanelli.htm", name: "Llanelli" },
  { url: "/europe/united-kingdom/llanfair.htm", name: "Llanfair" },
  {
    url: "/europe/united-kingdom/llanfairpwllgwyngyll.htm",
    name: "Llanfairpwllgwyngyll",
  },
  {
    url: "/europe/united-kingdom/llansantffraid-glan-conwy.htm",
    name: "Llansantffraid Glan Conwy",
  },
  { url: "/europe/united-kingdom/llansteffan.htm", name: "Llansteffan" },
  { url: "/europe/united-kingdom/lochgilphead.htm", name: "Lochgilphead" },
  { url: "/europe/united-kingdom/looe.htm", name: "Looe" },
  { url: "/europe/united-kingdom/lossiemouth.htm", name: "Lossiemouth" },
  { url: "/europe/united-kingdom/lowestoft.htm", name: "Lowestoft" },
  { url: "/europe/united-kingdom/lyme-regis.htm", name: "Lyme Regis" },
  {
    url: "/europe/united-kingdom/lytham-st-annes.htm",
    name: "Lytham St Annes",
  },
  { url: "/europe/united-kingdom/macduff.htm", name: "Macduff" },
  { url: "/europe/united-kingdom/manningtree.htm", name: "Manningtree" },
  { url: "/europe/united-kingdom/manorbier.htm", name: "Manorbier" },
  { url: "/europe/united-kingdom/mappleton.htm", name: "Mappleton" },
  { url: "/europe/united-kingdom/marazion.htm", name: "Marazion" },
  { url: "/europe/united-kingdom/margate.htm", name: "Margate" },
  {
    url: "/europe/united-kingdom/marske-by-the-sea.htm",
    name: "Marske-by-the-Sea",
  },
  { url: "/europe/united-kingdom/maryport.htm", name: "Maryport" },
  { url: "/europe/united-kingdom/menai-bridge.htm", name: "Menai Bridge" },
  { url: "/europe/united-kingdom/mevagissey.htm", name: "Mevagissey" },
  { url: "/europe/united-kingdom/milford-haven.htm", name: "Milford Haven" },
  { url: "/europe/united-kingdom/milford-on-sea.htm", name: "Milford on Sea" },
  { url: "/europe/united-kingdom/millbrook.htm", name: "Millbrook" },
  { url: "/europe/united-kingdom/millisle.htm", name: "Millisle" },
  { url: "/europe/united-kingdom/millport.htm", name: "Millport" },
  { url: "/europe/united-kingdom/mistley.htm", name: "Mistley" },
  { url: "/europe/united-kingdom/moelfre.htm", name: "Moelfre" },
  { url: "/europe/united-kingdom/montrose.htm", name: "Montrose" },
  { url: "/europe/united-kingdom/mostyn.htm", name: "Mostyn" },
  { url: "/europe/united-kingdom/musselburgh.htm", name: "Musselburgh" },
  { url: "/europe/united-kingdom/new-ferry.htm", name: "New Ferry" },
  { url: "/europe/united-kingdom/new-quay.htm", name: "New Quay" },
  {
    url: "/europe/united-kingdom/newbiggin-by-the-sea.htm",
    name: "Newbiggin-by-the-Sea",
  },
  { url: "/europe/united-kingdom/newburgh.htm", name: "Newburgh" },
  { url: "/europe/united-kingdom/newport.htm", name: "Newport" },
  { url: "/europe/united-kingdom/newport.htm", name: "Newport" },
  { url: "/europe/united-kingdom/newport-on-tay.htm", name: "Newport-On-Tay" },
  { url: "/europe/united-kingdom/newquay.htm", name: "Newquay" },
  { url: "/europe/united-kingdom/newtonhill.htm", name: "Newtonhill" },
  { url: "/europe/united-kingdom/newtownabbey.htm", name: "Newtownabbey" },
  { url: "/europe/united-kingdom/neyland.htm", name: "Neyland" },
  { url: "/europe/united-kingdom/north-berwick.htm", name: "North Berwick" },
  {
    url: "/europe/united-kingdom/north-queensferry.htm",
    name: "North Queensferry",
  },
  {
    url: "/europe/united-kingdom/north-sunderland.htm",
    name: "North Sunderland",
  },
  { url: "/europe/united-kingdom/oban.htm", name: "Oban" },
  { url: "/europe/united-kingdom/orkney.htm", name: "Orkney" },
  { url: "/europe/united-kingdom/overcombe.htm", name: "Overcombe" },
  { url: "/europe/united-kingdom/padstow.htm", name: "Padstow" },
  { url: "/europe/united-kingdom/par.htm", name: "Par" },
  { url: "/europe/united-kingdom/paull.htm", name: "Paull" },
  { url: "/europe/united-kingdom/peacehaven.htm", name: "Peacehaven" },
  { url: "/europe/united-kingdom/pembroke.htm", name: "Pembroke" },
  { url: "/europe/united-kingdom/pembroke-dock.htm", name: "Pembroke Dock" },
  { url: "/europe/united-kingdom/penarth.htm", name: "Penarth" },
  { url: "/europe/united-kingdom/penryn.htm", name: "Penryn" },
  { url: "/europe/united-kingdom/penzance.htm", name: "Penzance" },
  { url: "/europe/united-kingdom/perranporth.htm", name: "Perranporth" },
  { url: "/europe/united-kingdom/peterhead.htm", name: "Peterhead" },
  { url: "/europe/united-kingdom/plymouth.htm", name: "Plymouth" },
  { url: "/europe/united-kingdom/polzeath.htm", name: "Polzeath" },
  { url: "/europe/united-kingdom/poole.htm", name: "Poole" },
  { url: "/europe/united-kingdom/port-bannatyne.htm", name: "Port Bannatyne" },
  { url: "/europe/united-kingdom/port-erroll.htm", name: "Port Erroll" },
  { url: "/europe/united-kingdom/port-glasgow.htm", name: "Port Glasgow" },
  { url: "/europe/united-kingdom/port-talbot.htm", name: "Port Talbot" },
  { url: "/europe/united-kingdom/portavogie.htm", name: "Portavogie" },
  { url: "/europe/united-kingdom/porthcawl.htm", name: "Porthcawl" },
  { url: "/europe/united-kingdom/porthleven.htm", name: "Porthleven" },
  { url: "/europe/united-kingdom/porthmadog.htm", name: "Porthmadog" },
  { url: "/europe/united-kingdom/portknockie.htm", name: "Portknockie" },
  { url: "/europe/united-kingdom/portland.htm", name: "Portland" },
  { url: "/europe/united-kingdom/portlethen.htm", name: "Portlethen" },
  { url: "/europe/united-kingdom/portree.htm", name: "Portree" },
  { url: "/europe/united-kingdom/portrush.htm", name: "Portrush" },
  { url: "/europe/united-kingdom/portscatho.htm", name: "Portscatho" },
  { url: "/europe/united-kingdom/portsmouth.htm", name: "Portsmouth" },
  { url: "/europe/united-kingdom/portsoy.htm", name: "Portsoy" },
  { url: "/europe/united-kingdom/portstewart.htm", name: "Portstewart" },
  { url: "/europe/united-kingdom/pwllheli.htm", name: "Pwllheli" },
  { url: "/europe/united-kingdom/queenborough.htm", name: "Queenborough" },
  { url: "/europe/united-kingdom/queensferry.htm", name: "Queensferry" },
  { url: "/europe/united-kingdom/ramsgate.htm", name: "Ramsgate" },
  { url: "/europe/united-kingdom/redcar.htm", name: "Redcar" },
  { url: "/europe/united-kingdom/redwick.htm", name: "Redwick" },
  { url: "/europe/united-kingdom/rhu.htm", name: "Rhu" },
  { url: "/europe/united-kingdom/rhyl.htm", name: "Rhyl" },
  { url: "/europe/united-kingdom/rosehearty.htm", name: "Rosehearty" },
  { url: "/europe/united-kingdom/rostrevor.htm", name: "Rostrevor" },
  { url: "/europe/united-kingdom/rothesay.htm", name: "Rothesay" },
  { url: "/europe/united-kingdom/runcorn.htm", name: "Runcorn" },
  { url: "/europe/united-kingdom/ryde.htm", name: "Ryde" },
  { url: "/europe/united-kingdom/saint-agnes.htm", name: "Saint Agnes" },
  { url: "/europe/united-kingdom/saint-andrews.htm", name: "Saint Andrews" },
  { url: "/europe/united-kingdom/saint-austell.htm", name: "Saint Austell" },
  { url: "/europe/united-kingdom/saint-davids.htm", name: "Saint David’s" },
  { url: "/europe/united-kingdom/saint-just.htm", name: "Saint Just" },
  {
    url: "/europe/united-kingdom/saint-leonards-on-sea.htm",
    name: "Saint Leonards-on-Sea",
  },
  { url: "/europe/united-kingdom/saint-marys.htm", name: "Saint Mary's" },
  { url: "/europe/united-kingdom/salcombe.htm", name: "Salcombe" },
  { url: "/europe/united-kingdom/saltcoats.htm", name: "Saltcoats" },
  { url: "/europe/united-kingdom/sandown.htm", name: "Sandown" },
  { url: "/europe/united-kingdom/sandwick.htm", name: "Sandwick" },
  { url: "/europe/united-kingdom/saundersfoot.htm", name: "Saundersfoot" },
  { url: "/europe/united-kingdom/scarborough.htm", name: "Scarborough" },
  { url: "/europe/united-kingdom/seaview.htm", name: "Seaview" },
  { url: "/europe/united-kingdom/sennen.htm", name: "Sennen" },
  { url: "/europe/united-kingdom/severn-beach.htm", name: "Severn Beach" },
  { url: "/europe/united-kingdom/shalfleet.htm", name: "Shalfleet" },
  { url: "/europe/united-kingdom/shanklin.htm", name: "Shanklin" },
  { url: "/europe/united-kingdom/sheerness.htm", name: "Sheerness" },
  { url: "/europe/united-kingdom/shetland.htm", name: "Shetland" },
  {
    url: "/europe/united-kingdom/shoreham-by-sea.htm",
    name: "Shoreham-by-Sea",
  },
  { url: "/europe/united-kingdom/shotley-gate.htm", name: "Shotley Gate" },
  { url: "/europe/united-kingdom/silloth.htm", name: "Silloth" },
  { url: "/europe/united-kingdom/south-shields.htm", name: "South Shields" },
  { url: "/europe/united-kingdom/southampton.htm", name: "Southampton" },
  {
    url: "/europe/united-kingdom/southend-on-sea.htm",
    name: "Southend-on-Sea",
  },
  { url: "/europe/united-kingdom/southwold.htm", name: "Southwold" },
  { url: "/europe/united-kingdom/st-ives.htm", name: "St Ives" },
  { url: "/europe/united-kingdom/stoke.htm", name: "Stoke" },
  { url: "/europe/united-kingdom/stone.htm", name: "Stone" },
  { url: "/europe/united-kingdom/stonehaven.htm", name: "Stonehaven" },
  { url: "/europe/united-kingdom/stornoway.htm", name: "Stornoway" },
  { url: "/europe/united-kingdom/stranraer.htm", name: "Stranraer" },
  { url: "/europe/united-kingdom/stromness.htm", name: "Stromness" },
  { url: "/europe/united-kingdom/sunderland.htm", name: "Sunderland" },
  { url: "/europe/united-kingdom/swanage.htm", name: "Swanage" },
  { url: "/europe/united-kingdom/swansea.htm", name: "Swansea" },
  { url: "/europe/united-kingdom/tain.htm", name: "Tain" },
  { url: "/europe/united-kingdom/tankerton.htm", name: "Tankerton" },
  { url: "/europe/united-kingdom/tarbert.htm", name: "Tarbert" },
  { url: "/europe/united-kingdom/tayport.htm", name: "Tayport" },
  { url: "/europe/united-kingdom/teignmouth.htm", name: "Teignmouth" },
  { url: "/europe/united-kingdom/tenby.htm", name: "Tenby" },
  { url: "/europe/united-kingdom/thurso.htm", name: "Thurso" },
  { url: "/europe/united-kingdom/tintagel.htm", name: "Tintagel" },
  { url: "/europe/united-kingdom/topsham.htm", name: "Topsham" },
  { url: "/europe/united-kingdom/torpoint.htm", name: "Torpoint" },
  { url: "/europe/united-kingdom/torquay.htm", name: "Torquay" },
  { url: "/europe/united-kingdom/totnes.htm", name: "Totnes" },
  { url: "/europe/united-kingdom/totton.htm", name: "Totton" },
  { url: "/europe/united-kingdom/troon.htm", name: "Troon" },
  { url: "/europe/united-kingdom/tynemouth.htm", name: "Tynemouth" },
  { url: "/europe/united-kingdom/ullapool.htm", name: "Ullapool" },
  { url: "/europe/united-kingdom/wadebridge.htm", name: "Wadebridge" },
  {
    url: "/europe/united-kingdom/walton-on-the-naze.htm",
    name: "Walton-on-the-Naze",
  },
  { url: "/europe/united-kingdom/warkworth.htm", name: "Warkworth" },
  { url: "/europe/united-kingdom/warrenpoint.htm", name: "Warrenpoint" },
  { url: "/europe/united-kingdom/watchet.htm", name: "Watchet" },
  { url: "/europe/united-kingdom/waterloo.htm", name: "Waterloo" },
  { url: "/europe/united-kingdom/wemyss-bay.htm", name: "Wemyss Bay" },
  {
    url: "/europe/united-kingdom/westgate-on-sea.htm",
    name: "Westgate on Sea",
  },
  {
    url: "/europe/united-kingdom/weston-super-mare.htm",
    name: "Weston-super-Mare",
  },
  { url: "/europe/united-kingdom/weymouth.htm", name: "Weymouth" },
  { url: "/europe/united-kingdom/whitburn.htm", name: "Whitburn" },
  { url: "/europe/united-kingdom/whitby.htm", name: "Whitby" },
  { url: "/europe/united-kingdom/whitehead.htm", name: "Whitehead" },
  { url: "/europe/united-kingdom/whitstable.htm", name: "Whitstable" },
  { url: "/europe/united-kingdom/wick.htm", name: "Wick" },
  { url: "/europe/united-kingdom/widnes.htm", name: "Widnes" },
  { url: "/europe/united-kingdom/yarmouth.htm", name: "Yarmout" },
];

const promises = [];
for (let i = 0; i < locations.length; i++) {
  setTimeout(() => {
    console.log("fetching ", i, "...");
    const location = locations[i];
    promises.push(
      api.get(
        `/search?text=${location.name} United Kingdom &apiKey=7b677f20b07e4cf4af71c6a065804472`
      )
    );
  }, i * 300);
}

setTimeout(() => {
  Promise.all(promises).then((data) => {
    let fileString = "const locations = [";
    for (let response of data) {
      console.log("writing ", response.data?.query?.text);
      const name = response.data?.query?.text.split(" United")[0];
      const url = locations.find((location) => {
        return location.name === name;
      }).url;
      fileString += ` { url: "${url}", name: "${name}", coords: [${response.data?.features[0]?.geometry?.coordinates[1]}, ${response.data?.features[0]?.geometry?.coordinates[0]} ]},`;
    }
    fileString += `];`;
    fs.writeFile("coords.js", fileString);
  });
}, 330 * 300);
