  var headsize = 140;
  var headheight = 300;
  var eyegap = 31;
  var eye = 40;
  var offsetx = 60;
  var offsety = -30;
  var pupilcolor;
  var headcolor;
  var pupilmin = 21;
  var pupilmax = 28;
  var opacity0 = 0;
  var opacity255 = 255;
  var count = 0;
  var texts;
  
  // yellow 230, 200, 100
  
  function setup() {
    createCanvas(1200,689);
    pupilscale = new SoftFloat(pupilmin, 0.4, 0.4);
    opacity = new SoftFloat(0, 0.3, 0.8); 
    opacitySlow = new SoftFloat(0, 0.1, 0.07);
    opacity.setTarget(opacity0);
    opacitySlow.setTarget(opacity0);
    c1 = color(202, 204, 225); 
    pupilcolor = color(202, 204, 225);
    pupilcenter = color(137, 143, 194);
    headcolor = color('#464959');
    texts = loadImage("img/harris.png");
  
  }
  
  function draw() {
    background('#21222E');
    rectMode(CENTER);
    
    // LIL BACKGORUND TEXTURE STROKES
    for (i=0; i < 160; i++){
      for (j=4; j < 67; j++){
      strokeWeight(1.5);
      stroke("#5E586E");
      line(i * 10 - 2, j * 10 + 8, i * 10 - 2, j * 10 + 13);
      }
    } 
    
    noStroke();
    head();
    face();
    rotator();
    
    if (mouseX < width/2 + offsetx + headsize/2 - eye - eyegap && 
        mouseX > width/2 - offsetx - headsize/2 + eye - eyegap &&
        mouseY < 430 &&
        mouseY > 270){
        headcolor = color(130, 170, 245, opacity.get());
        pupilscale.setTarget(pupilmin);
        opacity.setTarget(opacity255);
        opacitySlow.setTarget(opacity255);
        c1 = lerpColor(pupilcenter, pupilcolor, .5);
        tint(255, 255, 255, opacitySlow.get());
        image(texts, 0, 0, texts.width * .805, texts.height * .805);      
        // image(texts, 690, mouseY - 10, texts.width * .85, texts.height * .85);      
  
        } else {
        headcolor = color(130, 170, 245, opacity.get());
        pupilscale.setTarget(pupilmax);
        opacity.setTarget(opacity0);
        c1 = pupilcolor;
        }  
    }
  
  function face(){
    noStroke();
    fill("#fffffff");
    ellipse(mouseX + eyegap + offsetx, mouseY + offsety, eye, eye); //eyewhite
    ellipse(mouseX - eyegap + offsetx, mouseY + offsety, eye, eye); //eyewhite
    fill(c1);
    ellipse(mouseX + eyegap + offsetx, mouseY + offsety, pupilscale.get(), pupilscale.get()); //pupil
    ellipse(mouseX - eyegap + offsetx, mouseY + offsety, pupilscale.get(), pupilscale.get()); //pupil
    
    pupilscale.update();
    opacitySlow.update();
    opacity.update();
    
    fill("#515E96");
    triangle(mouseX + 20 + offsetx, mouseY + offsety + 59,
             mouseX + offsetx, mouseY - 60 + offsety + 59,
             mouseX - 20 + offsetx, mouseY + offsety + 59);
  }
  
  function head(){
    // fill(headcolor);
    // rect(width/2, height/2, headsize, headheight, 150);
    noFill();
    stroke(100,130,180, opacity.get());
    strokeWeight(2.5);
    arc(width/2, height/2, headsize * 0.8, headsize * 0.8, PI/8, PI-PI/8);  //smile
  }
  
  function rotator(){
    strokeWeight(2.5);
    noFill();
    // stroke(100,130,180, opacity.get());
    // arc(width/2, height/2, headsize * 2.1, headsize * 2.1, 
    // 0 + millis()/1000, 15 * PI/8 + millis()/1000);
    stroke(50, 60, 99, opacity.get());
    arc(width/2, height/2, headsize * 1.98, headsize * 1.98, 
    -PI/3 + millis()/1000, PI + millis()/1000);
  }
  
  function mousePressed(){
  
    if (mouseX < width/2 + offsetx + headsize/2 - eye - eyegap && 
        mouseX > width/2 - offsetx - headsize/2 + eye - eyegap &&
        mouseY < 600 &&
        mouseY > 100){
          pupilcolor = color('#A5D2F0');
        } else {  
          pupilcolor = color('#ACAEC2');
        }
      pupilscale.setTarget(45);
  }
  
  function mouseReleased(){
    pupilcolor = color('#ACAEC2');
  }