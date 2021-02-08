class Game{
  constructor(){

  }
  getState() {
      var gameStateRef = database.ref('gameState');
      gameStateRef.on("value", function (data) {
          gameState = data.val();
      })

  }

  update(state) {
      database.ref('/').update({
          gameState: state
      });
  }
  async start() {
          if (gameState === 0) {
              player = new Player();
              var playerCountRef = await database.ref('playerCount').once("value");
              if (playerCountRef.exists()) {
                  playerCount = playerCountRef.val();
                  player.getCount();
              }
              form = new Form()
              form.display();
          }
  player1 = createSprite(200,500);
  player1.addImage("player1",player_img);
  
  
  players=[player1];

      }
  
  play(){
              
              form.hide();

              Player.getPlayerInfo();
              background(rgb(198,135,103));
              image(back_img, 0,-displayHeight*4,displayWidth-65, displayHeight*5+20);
              var x =100;
               var y=200;
               var index =0;
               drawSprites();
               for(var plr in allPlayers){
                  
                  
                   index = index+1;
                   x = 500-allPlayers[plr].distance;
                   y = 500-allPlayers[plr].distance;
                   
                   //players[index -1].x = x;
                   //players[index - 1].y = y;
                     
                   if(index === player.index){
                       
                       fill("black");
                       textSize(25);
                       text(allPlayers[plr].name ,x-25,y+25);

                       players[index-1].shapeColor="red";
                       camera.position.x=displayWidth/2;
                       camera.position.y=players[index-1].y;

                       
                   }
                  
                  
                   textSize(25);
fill("red");
stroke("green");
text("Your score :" + allPlayers.player1.score, player.x-100, player.y-100);
               
if(players[index - 1].y < -2500){
    players[index-1].y=300;
    players[index-1].x=player.x;
}
               }
              
              
              
              
              if (keyIsDown(RIGHT_ARROW) && player.index !== null) {
                 // player.distance -= 10
                  player1.x=player1.x+10;
                  player.x=player1.x; 
              player.y=player1.y; 
                  player.update();
              }
              if (keyIsDown(LEFT_ARROW) && player.index !== null) {
                  //player.distance += 10
                  player1.x=player1.x-10;
                  player.x=player1.x; 
              player.y=player1.y; 
                  player.update();
              }
          
              if(keyIsDown(UP_ARROW) && player.index !== null){
                //player.distance +=10
                player1.y=player1.y-10;
                player.x=player1.x; 
                text.y=text-10;
              player.y=player1.y; 
              player.distance+=10;
                player.update();
              }

              if(keyIsDown(DOWN_ARROW) && player.index !== null){
                //player.distance +=10
                player1.y=player1.y+10;
                player.x=player1.x;
                text.y=text-10;
              player.y=player1.y; 
                player.update();
                fill("red");
                stroke("green");
                textSize(25);
                text("Wrong Way",player.x+50,player.y-50)
              }

               if (frameCount % 50 === 0) {
                   fruits = createSprite(random(100, 1000),random(-100, 100), 50, 50);
                   fruits.velocityY = -7;
                   var rand = Math.round(random(1,5));
                   switch(rand){
                       case 1: fruits.addImage("fruit1",fruit1_img);
                       break;
                       case 2: fruits.addImage("fruit2", fruit2_img);
                       break;
                       case 3: fruits.addImage("fruit3", fruit3_img);
                       break;
                   }
                   fruitGroup.add(fruits);
                   //fruits.lifetime=10000000000000000000n;
                   
               }

               if (frameCount % 50 === 0) {
                coin = createSprite(random(100, 1000), random(100, 1000), 50, 50);
                coin.addImage(coinImage);
                coin.scale=0.09;
                coin.velocityY = -7;
                
                coinGroup.add(coin);

                //coin.lifetime=10000000000000000000n;

            }

                
            
               
                if (player.index !== null) {
                  for (var i = 0; i < coinGroup.length; i++) {
                      if (coinGroup.get(i).isTouching(players)) {
                        coinGroup.get(i).destroy();
                        player.score = player.score + 2;
                        player.update();
                      }
                      }

                      if (fruitGroup.isTouching(players)) {
                        fruitGroup.velocityY=0;
                        fruitGroup.destroyEach();
                        fruitGroup.visible=false;
                        coinGroup.destroyEach();
                        coinGroup.visible=false;
                        player1.destroy();
                        player1.visible=false;
                        
                      
                    }
                   
                    /*fruitGroup.destroyEach();
                    //player.hide();
                    player1.destroy();*/
                }
      
       
  }

  end(){
     console.log("Game Ended");
  }
}