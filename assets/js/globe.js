// Research journey globe (CesiumJS). Loads Cesium only when the section scrolls into view.
(function(){
const box=document.getElementById('journeyGlobe');if(!box)return;
const CESIUM='https://cdn.jsdelivr.net/npm/cesium@1.120.0/Build/Cesium/';
const places=[
{name:'University of Glasgow',kind:'work',when:'2024-present',note:'Research Associate',lon:-4.2886,lat:55.8721},
{name:'IISER Bhopal',kind:'study',when:'2018-2024',note:'PhD in Computer Science',lon:77.2759,lat:23.2858},
{name:'Indian Statistical Institute',kind:'work',when:'2017-2018',note:'Research experience',lon:88.3773,lat:22.6487},
{name:'Jadavpur University',kind:'study',when:'2012-2017',note:'BSc and MSc in Mathematics',lon:88.3714,lat:22.4989},
{name:'Stockholm, Sweden',kind:'talk',when:'2025',note:'Formal Analysis of Resilience in Transport Systems with Bigraphs',lon:18.0686,lat:59.3293},
{name:'Avila, Spain',kind:'talk',when:'2024',note:'A Formal Framework of Model and Logical Embeddings for Verification of Stochastic Systems',lon:-4.6812,lat:40.6566},
{name:'Lisbon, Portugal',kind:'talk',when:'2023',note:'On the Use of Model and Logical Embeddings for Model Checking of Probabilistic Systems',lon:-9.1393,lat:38.7223},
{name:'Oslo, Norway',kind:'talk',when:'2022',note:'Embeddings Between State and Action Based Probabilistic Logics',lon:10.7522,lat:59.9139}];
const colours={work:'#66e3ff',study:'#8dffbf',talk:'#ffd166'};
function load(){
window.CESIUM_BASE_URL=CESIUM;
const css=document.createElement('link');css.rel='stylesheet';css.href=CESIUM+'Widgets/widgets.css';document.head.appendChild(css);
const s=document.createElement('script');s.src=CESIUM+'Cesium.js';s.onload=init;s.onerror=()=>{box.textContent='The globe could not be loaded.'};document.head.appendChild(s);}
function init(){
const C=window.Cesium;
const base=new C.ImageryLayer(new C.OpenStreetMapImageryProvider({url:'https://tile.openstreetmap.org/',maximumLevel:18}),{brightness:.55,contrast:1.1,saturation:.35,gamma:.9});
const v=new C.Viewer(box,{baseLayer:base,baseLayerPicker:false,geocoder:false,homeButton:false,sceneModePicker:false,navigationHelpButton:false,animation:false,timeline:false,fullscreenButton:false,infoBox:true,selectionIndicator:false});
v.scene.globe.baseColor=C.Color.fromCssColorString('#07111f');
v.scene.backgroundColor=C.Color.fromCssColorString('#07111f');
v.scene.screenSpaceCameraController.enableZoom=true;
const glasgow=places[0];
places.forEach(p=>{
const col=C.Color.fromCssColorString(colours[p.kind]);
v.entities.add({name:p.name,position:C.Cartesian3.fromDegrees(p.lon,p.lat),
point:{pixelSize:p.kind==='talk'?9:12,color:col,outlineColor:C.Color.BLACK,outlineWidth:1},
label:{text:p.name,font:'12px Inter, sans-serif',fillColor:C.Color.WHITE,showBackground:true,backgroundColor:C.Color.fromCssColorString('#07111f').withAlpha(.75),pixelOffset:new C.Cartesian2(0,-18),distanceDisplayCondition:new C.DistanceDisplayCondition(0,9e6)},
description:`<p><strong>${p.when}</strong></p><p>${p.note}</p>`});
if(p.kind==='talk')v.entities.add({polyline:{positions:C.Cartesian3.fromDegreesArrayHeights([glasgow.lon,glasgow.lat,0,(glasgow.lon+p.lon)/2,(glasgow.lat+p.lat)/2,300000,p.lon,p.lat,0]),width:2,material:new C.PolylineGlowMaterialProperty({glowPower:.25,color:col.withAlpha(.8)})}});});
v.camera.setView({destination:C.Cartesian3.fromDegrees(25,42,1.4e7)});
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
let spin=!reduce;v.screenSpaceEventHandler.setInputAction(()=>{spin=false},C.ScreenSpaceEventType.LEFT_DOWN);
v.clock.onTick.addEventListener(()=>{if(spin)v.scene.camera.rotate(C.Cartesian3.UNIT_Z,-0.0006)});
document.querySelectorAll('[data-fly]').forEach(b=>b.addEventListener('click',()=>{spin=false;const [lon,lat,h]=b.dataset.fly.split(',').map(Number);v.camera.flyTo({destination:C.Cartesian3.fromDegrees(lon,lat,h),duration:reduce?0:2})}));}
const o=new IntersectionObserver(es=>{if(es.some(e=>e.isIntersecting)){o.disconnect();load()}},{rootMargin:'300px'});o.observe(box);
})();
