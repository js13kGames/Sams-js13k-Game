let firstEnemyKilled = false;
let enemyUpdateCounter=0;
let maxEnemies =3;
let textSpawnerGuy;
let enemyShooterDamage = 10;

let updateEnemies=()=>{

  // if this is a level with enemies
  if(currentLevel!='home'&&currentLevel!='start'){
    // UPDATE ENEMIES:

    for(let i=enemies.length-1; i>=0; i--){
      // move and display enemy
      enemies[i].update();
      enemies[i].limitX();

      // if enemy killed:
      if(enemies[i].hitPoints<=0){

        // if this is a regular level
        if(directorylevels.includes(currentLevel)){
          if(enemies.length==1){

            // if level isn't cleared yet, add a new section
            if(levelData.sections<levelData.difficulty){
              levelData.sections++;
              continueLevel(true);
            }

            else if(!level1.cleared){
              // if level is "cleared"
              levelData.cleared=true;
              level1.clearLevel();
              // add the text spawner thingy
              level1.addSpawner2();
              updateFavorites();
            }

          }
          // if enemy is killed while spawner2 is out and active
          else if(level1.cleared&&!level1.cleared2)
            generateLoot(enemies[i]);
        }
        // if this is a boss level
        else{
          level1.clearLevel();
          levelData.cleared=true;
          saveData.bossProgress++;
          updateFavorites();
        }

        poof(enemies[i].x,enemies[i].y,[enemies[i].model.colors[0]]);
        enemies.splice(i,1);
      }
    }
  }
}


let poof=(x,y,colors)=>
  generateLoot({x:x,y:y},true, colors);



class Enemy extends MovingObject {

  constructor(x,y,p,sIndex,type){
    let mratio = 1.4;
    let size = 60;
    if(type=="boss"){
      mratio = 3;
      size = 100;
    }
    super(x,y,size,"#cc30");
    this.type=type;
    this.lrMaxSpeed=3;

    this.roamCount=0;
    this.dashing=false;

    this.currentPlatform=p;
    this.attackCounter=0;
    this.nextAttack=0;

    // shooting interval
    this.attackInterval=25;
    if(type=='boss') this.attackInterval=12;

    this.facing;
    this.attackPower = 20;

    this.facing='left';
    this.attackAnimOverTimeout;
    this.doneSpawning=false;

    if(type=='spawner2')  pickNextLinkAward();

    if(type=='spawner'||type=='spawner2'){
      this.model = new CoolPath(0,0, s1data, 2);
      //this.model.fullRig.selectAnimation(0);
    }
    else if(type=='minispawner') this.model = new CoolPath(0,0, s1data, 1.3);
    else   this.model = new CoolPath(0,0, edata, mratio);

      if(type=='shooter') this.model.colors[0] = "#8a8f";
      if(type=='fighter') this.model.colors[0] = "#88af";

    // spawner variables

    this.sIndex=sIndex;
    this.spawnInterval=200;
    this.spawnCounter=0;
    this.enemyCount=0;

    this.nextSpawn=0;

    this.unlockdist=0;
    this.unlocked=false;
    this.spawner2interval=150;
    this.spawner2text="";
  }

  updateSpawner(){
  let p=  this.display();
  let d = distance(player.x,player.y,this.x,this.y);
  if(p!=false){
    this.model.x=this.screenPos.x+20;
    this.model.y=this.screenPos.y+20;
    this.model.update(ctx,false);
  }
   this.spawnCounter++;
   if(this.type=='minispawner'&&d.d<20){
     this.popspawner();
   }
  }

  popspawner(){
    this.spawnOne();
    this.hitPoints=0;
  }

  updateSpawner2(){
  let p=  this.display();
  let t,c;
  if(p!=false){

    if(this.unlocked&&this.unlockdist<20) this.unlockdist+=2;
    ctx.save();
    ctx.strokeStyle='black'
    ctx.lineWidth='10'

    ctx.translate(p.x,p.y);


    ctx.beginPath();
    ctx.fillRect(0,0,10,-this.unlockdist)
    ctx.arc(30, 0-this.unlockdist, 25, Math.PI,0);
    ctx.stroke();


    cRect(0,0,60,40,'blue');
    cRect(3,12,54,20,'white');

    for(let i=0; i<revealedLink.length; i++){
      t=revealedLink[i];
      c='black';
      if(t=="_"){
        t = String.fromCharCode( 48+ randInt( 74 ) );
        c='grey'
      }

    //  cRect(p.x + i*10,p.y,40,'blue');
      cText( t,i*6+4,25,c,12);
    }

    for(let i=0; i<dataCost; i++){
      if(i<datastrip%dataCost) cFill("white");
      else cFill('grey');
      cRect(i*5,35,4,4);
    }
    ctx.restore();
  }
   this.spawnAtInterval();
  }



  spawnAtInterval(){
    this.spawnCounter++;
    if(!this.doneSpawning
      &&this.spawnCounter%this.spawner2interval==0) this.spawnOne();
  }

  spawnMore(){
    this.hitPoints =0;

    for(let i=0; i<levelData.sections+1; i++)
      this.spawnOne();
  }

  spawnOne(){
    let choice='fighter'
    if(levelData.difficulty>2){
      if(levelData.difficulty>3&&Math.random()>0.3) choice='shooter';
      else if(Math.random()>0.6) choice='shooter';
    }

    enemies.push(new Enemy(
      this.x - 100 + randInt(200),
      this.y-80,this.currentPlatform,
      this.sIndex,
      choice
    ));
  }



  update(){

    if(this.type=='spawner'||this.type=='minispawner'){
      this.updateSpawner();
      return
    }
    else if(this.type=='spawner2'){
      console.log('eyy')
      this.updateSpawner2();
      return
    }

    this.display();


    if(this.screenPos!=false){


      // count frames
      this.attackCounter++;
      // get distance to player
      let d = distance(player.x,player.y,this.x,this.y);
      this.roam(d);

      if(this.type=='fighter'){
        // trigger attack when player is at a certain distance
        this.fight(d);
        // move randomly on a platform or up/down towards player
        //this.roam(d);
      }

      else if(this.type=='shooter'){
        this.enemyShooter(d);

      }
      else if(this.type=='boss'){
        this.fight(d);
        this.enemyShooter(d);
      }


      // regen health
      if(this.hitPoints<100) this.hitPoints+= 0.2;

      //display model
      this.model.x=this.screenPos.x+20;
      this.model.y=this.screenPos.y+20;
      this.model.update(ctx,(this.facing=='left'));

    }
  }



  enemyShooter(d){

    if(this.nextAttack<this.attackCounter){
      // if player is in range
      if(d.d<200&&player.y>this.y-100&&player.y<this.y+100){

        playBlaster(800,1);
        this.shoot(player.screenPos.x,player.screenPos.y,10,true);
        // start attack animation
        this.animate(1);
        // set cooldown
        this.nextAttack = this.attackCounter+this.attackInterval;
        // reset enemy animation
        this.resetEnemyAnim();
      }
    }

  }

  resetEnemyAnim(){
    this.attackAnimOverTimeout=setTimeout(function(enemy){enemy.animate(0);},400,this);
  }

  fight(d){
    // ATTACK
    // when attack cooldown is over
    if(this.nextAttack<this.attackCounter){
      // if player is in range
      if(d.d<30&&player.y>this.y-50&&player.y<this.y+50){
        // damage player
        damagePlayer(this.attackPower);
        // start attack animation
        this.animate(1);
        // set cooldown
        this.nextAttack = this.attackCounter+this.attackInterval;
        // reset enemy animation
        this.resetEnemyAnim();
      }
    }
  }

  dash(){

    this.dashing=true;
    this.lrMaxSpeed=6;
    setTimeout(function(tar){ tar.lrMaxSpeed=3; }, 2000, this );
    setTimeout(function(tar){ tar.dashing=false; }, 4000, this );
  }

  roam(d){

    if(this.roamCount%50==0){
      if(player.x<this.x) this.goLeft();
      else this.goRight();
  //    console.log(d)
      if(player.y<this.y)
        if(d.d<150) this.jump();
      else if(!this.dashing&&d.d<200) this.dash();
    }
    this.roamCount++;
  }

  animate(index){
    clearTimeout(this.attackAnimOverTimeout);
    this.model.selectAnimation(index);
  }



}
