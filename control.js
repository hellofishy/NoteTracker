//default clickval
var clickval=false;

//name of timer
var timer;

//division of bpm
var bpmseconds

//specifies which midi data is selected to download
var whichmidi = "";

secondarymidi = []
var secondarynumbers = []

//default range of midi window
 var lowest = 30
 var highest = 50;

//array to store averagedvolume per grid
var averagedvolume = []

//initialize the data for each grid
averagedmidi = []
averagednotes = []
firstvols = []
lastvols = []



//functions for buttons
document.getElementById("click").onclick = function(){onclick();}
document.getElementById("toMidi").onclick = function(){midiDownload()}
document.getElementById("quarter").onclick = function(){drawgrid(quarternote)}
document.getElementById("eighth").onclick = function(){drawgrid(eighthnote)}
document.getElementById("sixteen").onclick = function(){drawgrid(sixteenthnote)}
document.getElementById("note").onclick = function(){createsecondarykey(document.getElementById("note").value, document.getElementById("mode").value)}
document.getElementById("which").onmouseout = function(){whichmidi = document.getElementById("which").value}
document.getElementById("which").onclick = function(){midiselect()};
document.getElementById("which").onmouseup = function(){midiselect()};
document.getElementById("which").onmouseout = function(){midiselect()};
document.getElementById("note").onmouseout = function(){createsecondarykey(document.getElementById("note").value, document.getElementById("mode").value)}
document.getElementById("mode").onmouseout = function(){createsecondarykey(document.getElementById("note").value, document.getElementById("mode").value)}
document.getElementById("mode").onclick= function(){createsecondarykey(document.getElementById("note").value, document.getElementById("mode").value)}
document.getElementById("note").onmouseup = function(){createsecondarykey(document.getElementById("note").value, document.getElementById("mode").value)}
document.getElementById("mode").onmouseup= function(){createsecondarykey(document.getElementById("note").value, document.getElementById("mode").value)}
document.getElementById("click_volume").onmouseup= function(){volume = document.getElementById("click_volume").value*0.1}
document.getElementById("play").onclick=function(){playback()}
bpm = document.getElementById("tempo").value;

BPM(bpm);

function midiselect(){
    whichmidi = document.getElementById("which").value
  songs = []
  toMidi(midinotes);
  toMidi(secondarymidi);
}


function BPM(number){
	bpmseconds = (60/number)*1000


}


function createsecondarykey(note, scale){
	secondarymidi = changeKey(note,scale);
	for (var i = 0; i<secondarymidi.length;i++){
		secondarynumbers[i] = toMidiNumber(secondarymidi[i])
	}
	//alert("woo")
	drawkeychange();
}

function playback()
{
  sequences = [];
  sequences[0]= 'data:audio/midi;base64,'+ songs[0].b64;
  if (songs.length>1)
  {
     sequences[0]= 'data:audio/midi;base64,'+ songs[1].b64;
  }
  initSequences();

}


function clicker(){

playSound(clickBuffer);

}
loadSound('click.mp3');


var clickBuffer = null;
// Fix up prefixing
// window.AudioContext = window.AudioContext || window.webkitAudioContext;
// var context = new AudioContext();

function loadSound(url) {
  var request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.responseType = 'arraybuffer';

  // Decode asynchronously
  request.onload = function() {
    audioContext.decodeAudioData(request.response, function(buffer) {
      clickBuffer = buffer;
    });
  }
  request.send();
}


// window.AudioaudioContext = window.AudioaudioContext || window.webkitAudioaudioContext;
// var audioContext = new AudioaudioContext();
var volume = 1;

function playSound(buffer) {
  var source = audioContext.createBufferSource(); // creates a sound source
  source.buffer = buffer;
  var gainNode = audioContext.createGain();  
  gainNode.gain.value = volume;
  source.connect(gainNode);
                    // tell the source which sound to play
  gainNode.connect(audioContext.destination);       // connect the source to the audioContext's destination (the speakers)
  source.start(0);                           // play the source now
                                             // note: on older systems, may have to use deprecated noteOn(time);
}


function onclick()
{
	
    	console.log("clicked");

      //setting the click status
    	if (clickval==false){
    		clickval=true;
    	   }
    	else
    		{
          clickval=false
        }

      //if clicked do this
    	if (clickval==true)
      {
        //reset everything at the begining
    			mididata = []
    		  midinotes = []
          firstvols = []
          lastvols = []
          bpm = document.getElementById("tempo").value;
    	    BPM(bpm);
          centsOff = []
          range = 30;

          //timer2 for getting the data for each grid
             timer2 = setInterval(function()
             {
                 centsOff.push(noteFromPitch(currentPitch)+((0.01)*centsOffFromPitch(currentPitch,noteFromPitch(currentPitch))))
                 t++         
                   notetracker.lineTo((mididata.length-1)*(500/mididata.length)+(((500/mididata.length)/50)*(t)), (startingpoint-(500/range)*centsOff[centsOff.length-1])+0.5*(500/range)) 
                     if (getAverageVolume(beep)>5){        
                      averagedmidi.push(noteFromPitch(currentPitch))
                      averagedvolume.push(getAverageVolume(beep));
                      averagednotes.push(toNoteName(noteFromPitch(currentPitch)))
                  }
                 notetracker.stroke();
            },1);



        //reset timer variables
        t=0;

        //metronome control
        play()

        //change display
        document.getElementById("mostlikely").ineerHTML = likely();
      	animatekey();
    		draw_click.clearRect(0,0,100,50);
    		draw_click.fillStyle = "rgba(100,100,100,0.5)";
    	 	draw_click.fillRect (0, 0, 100, 50);
    		draw_click.fillStyle = "rgba(250, 250, 250, 0.5)";
    		draw_click.fillRect (10, 10, 80, 30);
    		draw_click.font = 'bold 20px sans-serif';
    		draw_click.fillText("STOP", 15, 30);
    	}


  	else{
      //if unclicked

  		play();
      songs = []
      toMidi(midinotes);
      handleMidi();
      //clearTimer
  		clearInterval(timer2);
  	
  		 notetracker.closePath();
       //animation
  //		keydisplay();
  		draw_click.clearRect(0,0,100,50);
  		draw_click.fillStyle = "rgba(000,100,100,0.5)";
  	 	draw_click.fillRect (0, 0, 100, 50);
  		draw_click.fillStyle = "rgba(250, 250, 250, 0.5)";
  		draw_click.fillRect (10, 10, 80, 30);
  		draw_click.font = 'bold 20px sans-serif';
  		draw_click.fillText("record", 15, 30);

  	}
}


//record to the arrays
function record(pitch,octave,numbers)
  {

    if(pitch!=undefined)
    {
    blank = ""+pitch+octave+"";
    midinotes.push(blank);
    nooctave.push(pitch)
    }

    else
    {
    blank = "NaN";
    midinotes.push(blank);
    nooctave.push(blank)
    }

    //push actual midi numbers
    mididata.push(numbers);

  }


//main function on each grid hit
function mainrec(){


    //close path from previous note tracking
    notetracker.closePath();

    if (averagedmidi.length>1)
    {   

      //initialize temp arrays for processing    
     		var firsthalf = []
     		var secondhalf = []
        var firsthalfvol = []
        var secondhalfvol = []
        var reversed = averagedvolume.reverse()
        var use = (averagedvolume.length)   

        //begining note volume/end note volumes for each grid point
            for (var b=0;b<averagedmidi.length/4;b++){
            	firsthalf[b] = averagedmidi[b];
              firsthalfvol[b] = averagedvolume[b];
            }
            for (var b=averagedmidi.length/3;b<averagedmidi.length;b++){
            	secondhalf[b] = averagedmidi[b];
            }         
            for (var b=0;b<averagedvolume.length/2;b++){
              secondhalfvol[b] = reversed[b];          
            }

          //what to record into the data arrays
           if ((moster(secondhalf))==NaN && moster(firsthalf)==NaN)
           {
          	 record(toNoteName(NaN),octave, "NaN");    
             firstvols.push(getAverageVolume(firsthalfvol))
             lastvols.push(getAverageVolume(secondhalfvol))
          	}

          else 
          {
          	record(toNoteName(moster(firsthalf)),octave, moster(firsthalf));    
            firstvols.push(getAverageVolume(firsthalfvol))
            lastvols.push(getAverageVolume(secondhalfvol))
          }

    }

    else 
    {
      midinotes.push("NaN"); 
      mididata.push("NaN") 
      firstvols.push("NaN")
      lastvols.push("NaN")           
    }

    //set the range values for the display
    if(noteFromPitch(currentPitch)>highest){
        highest = noteFromPitch(currentPitch)
    }
    else if(noteFromPitch(currentPitch)<lowest){
        lowest=noteFromPitch(currentPitch);
    }
			
  //reset averaged midi array
  averagedmidi=[];
  averagedvolume = []
                          
  //  animate
  notetracking();
  range = highest-lowest;
  probab();
  startingpoint = (lowest*500/range)+((500/range)*range);
  drawinput();
  t=0;
  notetracker.lineWidth=1;
  notetracker.strokeStyle = "rgba(1,1,1,0.5)";
  notetracker.beginPath();
  notetracker.moveTo((mididata.length-1)*(500/mididata.length),startingpoint-(500/range)*mididata[mididata.length-1]+0.5*(500/range))


}





//find the most repeated value in an array
function moster(array)
{
    if(array.length == 0)
    	return null;
    var modeMap = {};
    var maxEl = array[0], maxCount = 1;
    for(var i = 0; i < array.length; i++)
    {
    	var el = array[i];
    	if(modeMap[el] == null)
    		modeMap[el] = 1;
    	else
    		modeMap[el]++;	
    	if(modeMap[el] > maxCount)
    	{
    		maxEl = el;
    		maxCount = modeMap[el];
    	}
    }
    return maxEl;
}

//are these numbers closer than 40 apart?
function inRange(num1,num2){
  if (num1-num2<40 || num2-num1<40){
    return true
  }
  else{return false;}
}










