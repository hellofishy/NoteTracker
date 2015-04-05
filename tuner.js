/**
to open
in terminal open
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --allow-file-access-from-files --disable-web-security-work
*/


//MIT license


var octave = 1;
var c2 = document.getElementById("tuner");
var tuner = c2.getContext("2d");
var realoff = 0;
var highestVal = 0;
var isPlaying = false;
var sourceNode = null;
var analyser = null;
var theBuffer = null;
var detectorElem, 
    canvasContext,
    pitchElem,
    noteElem,
    detuneElem,
    detuneAmount;
var confidence = 0;
var currentPitch = 0;
var mySource;
var rafID = null;
var tracks = null;
var buflen = 2048;
var buf = new Uint8Array( buflen );

//beep = array to store the freq data
beep = [];

//initialize audio context
window.AudioContext = window.AudioContext || window.webkitAudioContext;
audioContext = new AudioContext();

//list of 12-tones
var notes = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"]

function centsOffFromPitch( frequency, note ) {
    return ( 1200 * Math.log( frequency / frequencyFromNoteNumber( note ))/Math.log(2) );
}

function noteFromPitch( frequency ) {
    var noteNum = 12 * (Math.log( frequency / 440 )/Math.log(2) );
    return Math.round( noteNum ) + 69;
}

function frequencyFromNoteNumber( note ) {
    return 440 * Math.pow(2,(note-69)/12);
}

function toNoteName(note){
    for(b=0;b<notes.length;b++){
        if ((note-b)%12==0)
        {
            console.log("he")
            octave = ((note-b)/12)-1;
            return notes[b];
            
        }
    }
}

function toMidiNumber(note){
    var value = 0;
    findvalue = note;

    if (note.length==2){
        findvalue = note[0]
        // alert("length 2")
    }
    else{
        findvalue = note[0]+note[1]
    }

    //the never ending cases 
    switch (findvalue){
        case "c" :
            value = 1;
            break;
        case "C" :
            value = 1;
            break;
        case "b#":
            value = 13;
            break;
         case "B#":
            value = 13;
            break;
        case "c#" :
            value = 2;
            break;
        case "C#" :
            value = 2;
            break;
        case "db":
            value = 2;
            break;
        case "Db":
            value = 2;
            break;
        case "d":
            value = 3;
            break;
        case "D":
            value = 3;
            break;
        case "d#":
            value = 4;
            break;
        case "D#":
            value = 4;
            break;
        case  "eb":
            value = 4;
            break;
        case  "Eb":
            value = 4;
            break;
        case "e":
            value = 5;
            break;
        case "E":
            value = 5;
            break;
        case  "fb":
            value = 5;
            break;
        case  "Fb":
            value = 5;
            break;
        case "e#":
            value = 6;
            break;
        case "E#":
            value = 6;
            break;
        case "f":
            value = 6;
            break;
        case "F":
            value = 6;
            break;
        case "f#":
            value = 7;
            break;
        case "F#":
            value = 7;
            break;
        case "gb":
            value = 7;
            break;
        case "Gb":
            value = 7;
            break;
        case "g":
            value = 8;
            break;
        case "G":
            value = 8;
            break;
        case "g#" :
            value = 9;
            break;
        case "G#":
            value = 8;
            break;
         case "ab":
            value = 9;
            break;    
         case "Ab":
            value = 9;
            break;    
        case "a" :
            value = 10;
            break;
        case "A":
            value = 10;
            break;
        case "a#":
            value = 11;
            break;
        case "A#":
            value = 11;
            break;
        case "bb":
            value = 11;
            break;
        case "Bb":
            value = 11;
            break;
        case "b" :
            value = 12;
            break;
        case "B":
            value = 11;
            break;
        case "cb":
            value = 12;
            break;
        case "Cb":
            value = 12;
            break;               
    }
   return 12*note[note.length-1]+11+value
}




function gotStream(stream) {
    // Create an AudioNode from the stream.
     mediaStreamSource = audioContext.createMediaStreamSource( stream );
    // Connect it to the destination to hear yourself (or any other node for processing!)
   // gainNode = audioContext.createGainNode();
  //  mediaStreamSource.connect( audioContext.destination );
	console.log(self.audioContext.sampleRate);
	setupAudioNodes();
    
    function drawTuner() {
        for ( var i = 0; i < (100); i++ ){
                var value = 40                //console.log(Math.max(array));
                tuner.fillRect(i*5,125-value,3,125);
            }
    };

    // when the javascript node is called
    // we use information from the analyzer node
    // to draw the volume

javascriptNode.onaudioprocess = function() {

    // get the average for the first channel
    var array =  new Uint8Array(analyser.frequencyBinCount);

    //where we set beep
    beep = array;

    //analyser
    analyser.getByteFrequencyData(array);

    //loads the analyser
    updatePitch();
    var higherValue = 0;  
    tune();

        function tune()
        {          
            getPitch(buf);
            showFillText(toNoteName(noteFromPitch(currentPitch)),currentPitch,noteFromPitch(currentPitch));
        }
 
    }





        function setupAudioNodes() {
 
        // setup a javascript node
        javascriptNode = audioContext.createScriptProcessor(8192, 1, 1);
        // connect to destination, else it isn't called
        javascriptNode.connect(audioContext.destination);
 
        // setup a analyzer
        analyser = audioContext.createAnalyser();
        analyser.smoothingTimeConstant = 0.3;
        analyser.fftSize = 2048;
 
        analyser2 = audioContext.createAnalyser();
        analyser2.smoothingTimeConstant = 0.0;
        analyser2.fftSize = 2048;
 
        // create a buffer source node
        sourceNode = audioContext.createBufferSource();
        splitter = audioContext.createChannelSplitter();
 
        // connect the source to the analyser and the splitter
        mediaStreamSource.connect(splitter);
 
        // connect one of the outputs from the splitter to
        // the analyser
        splitter.connect(analyser,0,0);
        splitter.connect(analyser2,1,0);
 
        // we use the javascript node to draw at a
        // specific interval.
        analyser.connect(javascriptNode);
 
        // and connect to destination
        //sourceNode.connect(audioContext.destination);

    }


//setInterval(function(){record(toNoteName(noteFromPitch(currentPitch)),octave)},250);




}

//initialize
init(44100,buf.length)

function updatePitch( time ) {
    var cycles = new Array;
    analyser.getByteTimeDomainData( buf );
}




navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
navigator.getUserMedia( {audio:true}, gotStream,   // errorCallback
      function(err) {
         console.log("The following error occured: " + err);
      } );

//simple function to find averages of an array
 function getAverageVolume(array) {
        var values = 0;
        var average;
        var length = array.length;

        // get all the frequency amplitudes
        for (var i = 0; i < length; i++) {
            values += array[i];
        }
        average = values / length;
        return average;
  }




  // when the javascript node is called
    // we use information from the analyzer node
    // to draw the volume

 


