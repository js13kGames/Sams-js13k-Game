
function playSnare(){
  playSound(preloadSound(
    40,
    new Envelope(0.03,0.01,0.3,0.11),
    1,noisey2
  ),20,'highpass',1200,4);
}

function playHats(){
  playSound(preloadSound(
    4000,
    new Envelope(0.01,0.01,0.1,0.3),
    60,noisey
  ),12,'highpass',1400,12);
}

function playWobbleBass(freq){
  playSound(preloadSound(
    freq,
    new Envelope(0.01,0.11,0.3,1.81),
    60,constSine2
  ),12,'highshelf',60,8);
}

function playNoiseySynth(freq){
  //console.log(freq)
  playSound(preloadSound(
    freq,
    new Envelope(0.01,0.11,0.3,1.45),
    50,constSine4
  ),6,'lowpass',1500,8);
  sine4counter++;
  if(sine4counter%12==0) sine4fact = 1 - sine4fact;
}

function playHardHat(){
  playSound(preloadSound(
    8,
    new Envelope(0.01,0.01,0.11,0.13),
    1,constSine3
  ),8,'lowshelf',1240,12);
}
function playKick(){
  playSound(preloadSound(
    160, // compact bassy hits <1500, trappy pitched long hits 6000-20000
    new Envelope(0.01,0.11,0.3,0.45),
    500,constSineB
  ),28,'lowpass',180,12);
}

// factor:
// compact bassy hits <1500, trappy pitched long hits 6000-20000
function playBlaster(factor,vol){
  playSound(preloadSound(
    factor,
    new Envelope(0.01,0.11,0.3,0.25),
    100,constSineB2
  ),vol,'highpass',1080,8);
}

function playDamageFX(){
  playSound(preloadSound(
    20,
    new Envelope(0.01,0.11,0.3,0.31),
    60+Math.floor(Math.random()*20),constSine3
  ),14,'highshelf',1500,2);
}