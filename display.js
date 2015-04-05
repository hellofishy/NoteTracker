//canvas elements
var c2 = document.getElementById("tuner");
var tuner = c2.getContext("2d");
var c3 = document.getElementById("disp");
var displaycase = c3.getContext("2d");
var c4 = document.getElementById("notetrack");
var notetracker = c4.getContext("2d");
var click = document.getElementById("click");
var draw_click = click.getContext("2d");
var c5 = document.getElementById("toMidi");
var midi_button = c5.getContext("2d");
var c6 = document.getElementById("sixteen")
var sixteenthnote = c6.getContext("2d")
var c7 = document.getElementById("eighth")
var eighthnote = c7.getContext("2d")
var c8 = document.getElementById("quarter")
var quarternote = c8.getContext("2d")
var c9 = document.getElementById("play")
var play_button = c9.getContext("2d")

//how high up do the notes of the displaygrid the display grid start?
//startingpoint = the amount to subtract from to draw the notes
var startingpoint = 500;
var midilock = 0;

//record data button
init_rec_but();
function init_rec_but(){
  draw_click.fillStyle = "rgba(000,100,100,0.5)";
  draw_click.fillRect (0, 0, 100, 50);
  draw_click.fillStyle = "rgba(250, 250, 250, 0.5)";
  draw_click.fillRect (10, 10, 80, 30);
  draw_click.font = 'bold 20px sans-serif';
  draw_click.fillText("record", 15, 30);
 }

midibutton();
 function midibutton(){
  midi_button.fillStyle = "rgba(000,100,100,0.5)";
  midi_button.fillRect (0, 0, 100, 50);
  midi_button.fillStyle = "rgba(250, 250, 250, 0.5)";
  midi_button.fillRect (10, 10, 80, 30);
  midi_button.font = 'bold 20px sans-serif';
  midi_button.fillText("Save", 15, 30);
 }

 playbutton();
 function playbutton(){
  play_button.fillStyle = "rgba(100,100,100,0.5)";
  play_button.fillRect (0, 0, 100, 50);
  play_button.fillStyle = "rgba(250, 250, 250, 0.5)";
  play_button.fillRect (10, 10, 80, 30);
  play_button.font = 'bold 20px sans-serif';
  play_button.fillText("Play", 15, 30);
 }


drawgrid(quarternote);

var bpmdivision = 1;

function drawgrid(interval){

  quarternote.clearRect(0,0,20,20)
  eighthnote.clearRect(0,0,20,20)
  sixteenthnote.clearRect(0,0,20,20)
  quarternote.fillStyle="rgb(0,0,0)";
  eighthnote.fillStyle="rgb(0,0,0)";
  sixteenthnote.fillStyle="rgb(0,0,0)";
  quarternote.font = '10px sans-serif';
  quarternote.textBaseline = 'top';
  eighthnote.font = '10px sans-serif';
  eighthnote.textBaseline = 'top';
  sixteenthnote.font = '10px sans-serif';
  sixteenthnote.textBaseline = 'top';
  quarternote.fillText("1/4",0,0)
  eighthnote.fillText("1/8",0,0)
  sixteenthnote.fillText("1/16",0,0)
  interval.fillStyle = "rgba(000,100,100,0.5)";
  interval.fillRect (0, 0, 20, 20);

  if (interval==sixteenthnote){
    bpmdivision = 4
    noteResolution = 0

//DEFAULT_DURATION = 128/bpmdivision;

  }
  else if(interval==eighthnote){
    bpmdivision = 2
    noteResolution = 1
//DEFAULT_DURATION = 128/bpmdivision;
  }
  else
    {bpmdivision=1
      noteResolution=2
//DEFAULT_DURATION = 128/bpmdivision;
    }
}

//tuner display      
function showFillText(note, freq, notenum) 
  {
         
    tuner.clearRect(0, 0, 600, 325);
    tuner.fillStyle = "rgb(0,0,0)";
    tuner.font = 'bold 50px sans-serif';
    tuner.textBaseline = 'bottom';

      if (note!=undefined)
      {
        tuner.fillText(note, 235, 130);
      }
      else
      {
        tuner.fillText("Louder Please", 100, 130)}
        //cents off display
        oops(note, freq, notenum);
  }

//how far off note? display
function oops(note, freq, notenum) 
  {
    tuner.textBaseline = 'bottom';
    var off = centsOffFromPitch( freq, notenum );
    realoff = off;
    offround = Math.round(off);
    tuner.strokeStyle = "rgba("+ (Math.abs(offround*4)) +","+ 0+ ",0,0.8)";
    tuner.beginPath();
    tuner.moveTo(250, 140);
    tuner.lineWidth = 20;
    tuner.lineTo(250+offround*4, 140);
    tuner.stroke();


    tuner.lineWidth = 3;
    tuner.strokeStyle = "rgba(1,1,1,1)";
    tuner.beginPath();
    tuner.moveTo(50, 160);
    tuner.lineTo(450, 160);
    tuner.stroke();

    tuner.strokeStyle = "rgba(1,1,1,1)";
    tuner.beginPath();
    tuner.moveTo(250, 160);
    tuner.lineTo(250, 130);
    tuner.stroke();

    for(w=0;w<50;w++)
      {
        tuner.lineWidth = 1;
        tuner.strokeStyle = "rgba(1,1,1,1)";
        tuner.beginPath();
        tuner.moveTo(250+(w*4), 160);
        tuner.lineTo(250+(w*4), 150);
        tuner.stroke();
        tuner.beginPath();
        tuner.moveTo(250-(w*4), 160);
        tuner.lineTo(250-(w*4), 150);
        tuner.stroke();
      }

    for(w=0;w<6;w++)
      {
        tuner.lineWidth = 1;
        tuner.strokeStyle = "rgba(1,1,1,1)";
        tuner.beginPath();
        tuner.moveTo(250+(w*40), 162);
        tuner.lineTo(250+(w*40), 135);
        tuner.stroke();
        tuner.beginPath();
        tuner.moveTo(250-(w*40), 162);
        tuner.lineTo(250-(w*40), 135);
        tuner.stroke();
      }
  }


//function to draw the notes
function notetracking()
  {
    notetracker.clearRect(0, 0, 500, 500);
    range = highest-lowest;
    notetracker.lineWidth=1;
    notetracker.strokeStyle = "rgba(1,1,1,0.5)";
    notetracker.beginPath();
    for(var i = 0; i<range;i++)
    {
    notetracker.moveTo(0,500/range*i);
    notetracker.lineTo(500,500/range*i);
    }

    for(var i = 0; i<mididata.length;i++)
    {
      if (i%bpmdivision==0)
      {
        notetracker.moveTo(i*500/mididata.length,0);
        notetracker.lineTo(i*500/mididata.length,500);
      }
    }
    notetracker.stroke();
    notetracker.closePath();
    notetracker.fillStyle = "rgb(250,100,00)";

    for(var m=0;m<mididata.length;m++)
    {
    notetracker.fillRect ((m-1)*(500/mididata.length), startingpoint-((500/range)*mididata[m]), 500/mididata.length, 500/range)
    midilock = m;
    }

  }

// function currentDraw(){
//   notetracker.closePath();


//  t=0;
//     notetracker.lineWidth=1;
//   notetracker.strokeStyle = "rgba(1,1,1,0.5)";
//  notetracker.beginPath();

//  notetracker.moveTo((mididata.length-1)*(300/mididata.length),(700)-(300/range)*mididata[mididata.length-1])

// timer2 = setInterval(function(){
//   centsOff.push(noteFromPitch(currentPitch)+((0.01)*centsOffFromPitch(currentPitch,noteFromPitch(currentPitch))))
//   // for(var t=mididata.length;t<mididata.length+100;t++){
//   t++
//  // notetracker.lineTo((mididata.length-1)*(300/mididata.length)+((300/mididata.length)*t), (700)-(300/range)*mididata[mididata.length-1]+0.01*centsOff[(bpmseconds/30)*mididata.length-1+t]+((300/range)*0.5)) 
//    notetracker.lineTo((mididata.length-1)*(300/mididata.length)+(((300/mididata.length)/100)*t), centsOff[mididata.length*100+t]) 
//   // }

//   notetracker.stroke();


// },10);

// }



// function keydisplay(){
//   //semi unsed function this needs to be redone and accessed
//   //original was used to determine keys

//         note = probab()[0]
//         mode = probab()[1]
// }

//function to animate the likely keys (the most likely key grows in size)
//currents slightly messed up for sharps, only been tested with C major
function animatekey(){
  d = 0;
  setInterval(function(){
    document.getElementById("mostlikely").innerHTML = possibles[0];

    displaycase.clearRect(0, 0, 1000, 100);
    displaycase.textBaseline = 'bottom';
    d++;
    displaycase.font = 'bold ' + (15+c_note)+'px sans-serif';
    displaycase.fillStyle = "rgba(5,4,0,0.5)";
    displaycase.fillText(possibles[0], Math.random()+d+500, Math.sin(Math.random()-2)*3+(5*13)+15);
    displaycase.font = 'bold ' + (15+d_note)+'px sans-serif';
    displaycase.fillStyle = "rgba(255,6,60,0.5)";
    displaycase.fillText(possibles[1], Math.random()+Math.sin(d)+700, Math.sin(Math.random()-2)*3+(5*13));
    displaycase.font = 'bold ' + (15+e_note)+'px sans-serif';
    displaycase.fillStyle = "rgba(0,255,0,0.5)";
    displaycase.fillText(possibles[2], Math.sin(Math.random()-2)*3+(5*13)+170, Math.sin(Math.random()-2)*3+(5*13)-10);
    displaycase.font = 'bold ' + (15+f_note)+'px sans-serif';
    displaycase.fillStyle = "rgba(8,25,50,0.5)";
    displaycase.fillText(possibles[3], Math.random()+Math.sin(d-2)*10+30, 20+(3*13)+30);
    displaycase.font = 'bold ' + (15+g_note)+'px sans-serif';
    displaycase.fillStyle = "rgba(4,4,250,0.5)";
    displaycase.fillText(possibles[4], Math.random()+d+50, Math.sin(d-2)*10+(4*13)+13);
    displaycase.font = 'bold ' + (15+a_note)+'px sans-serif';
    displaycase.fillStyle = "rgba(25,6,0,0.5)";
    displaycase.fillText(possibles[5], Math.random()+d+370, Math.sin(Math.random()-2)*5+(5*13));
    displaycase.font = 'bold ' + (15+b_note)+'px sans-serif';
    displaycase.fillStyle = "rgba(255,3,99,0.5)";
    displaycase.fillText(possibles[6], Math.random()+d+300, Math.sin(Math.random()-2)*10+(6*13)+10);
      },300);
  if (d==300)
    {d=1}

}

function likely(){
var array = [c_note,d_note,e_note,f_note,g_note,a_note,b_note];
var comp = [possibles[0],possibles[1],possibles[2],possibles[3],possibles[4],possibles[5],possibles[6],possibles[7]]
var num = 0;
var index = 0;
for (var i=0;i<array.length;i++){
  if (array[i]>num){
    num = array[i]
    index = i
  }
}
  return comp[index];

}


function drawinput(){
  //centsOff.push(currentPitch,noteFromPitch(currentPitch))
   
 // notetracker.clearRect(0, 0, 500, 500);
 // var noter = (noteFromPitch(currentPitch))+centsOffFromPitch(currentPitch,noteFromPitch(currentPitch));
  
  range = highest-lowest;
  notetracker.lineWidth=1;
  notetracker.strokeStyle = "rgba(1,1,1,0.5)";
  notetracker.beginPath();
  notetracker.moveTo(0*(500/mididata.length),startingpoint-(500/range)*mididata[mididata.length-1]+0.5*(500/range))
    for(var m=0;m<centsOff.length;m++){
    
    //notetracker.lineTo(m*(500/centsOff.length)+500/centsOff.length, ) 
    var boundaries = (500/mididata.length)*(mididata.length-1);

     notetracker.lineTo(m*(boundaries/centsOff.length), startingpoint-(500/range)*centsOff[m]+0.5*(500/range)) 
  }
  notetracker.stroke();
  notetracker.closePath();
}





//draw over in the changed keys
function drawkeychange(){
notetracking();
  notetracker.fillStyle = "rgba(000,250,00,0.5)";
      for(var m=0;m<secondarynumbers.length;m++)
      {
      notetracker.fillRect ((m-1)*(500/secondarynumbers.length), startingpoint-(500/range)*secondarynumbers[m], 500/secondarynumbers.length-2, 500/range-2)
      }
}
