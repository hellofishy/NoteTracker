
//access array for 7 most played notes
var finalkeys = [];

// access array for hashtable of notes and amount of times played
var keys = [];


var octaves = []

var data = []


var notes_key = []

//notes used for key displays
var a_note = 0
var asharp_note=0
var b_note=0 
var c_note=0
var csharp_note=0
var d_note=0
var dsharp_note=0
var e_note=0
var f_note=0
var fsharp_note=0
var g_note=0
var gsharp_note=0

//important function to collect note data and put into a hashtable
function prob(noterun){
	var a = 0
	var asharp=0
	var b=0 
	var c=0
	var csharp=0
	var d=0
	var dsharp=0
	var e=0
	var f=0
	var fsharp=0
	var g=0
	var gsharp=0
	for (i = 0; i < noterun.length; i++){
		switch (noterun[i]){
			case "A":
				a++;
				break;
			case "A#":
				asharp++;
				break;
			case "B":
				b++;
				break;
			case "C":
				c++;
				break;
			case "C#":
				csharp++;
				break;
			case "D":
				d++;
				break;
			case "D#":
				dsharp++;
				break;
			case "E":
				e++;
				break;
			case "F":
				f++;
				break;
			case "F#":
				fsharp++
				break;
			case "G":
				g++;
				break;
			case "G#":
				gsharp++;
				break;

		}

	}
	var keyvals = new Object();
	keyvals['a'] = a;
	keyvals['a#'] = asharp
	keyvals['b'] = b
	keyvals['c'] = c
	keyvals['c#'] = csharp
	keyvals['d'] = d
	keyvals['d#'] = dsharp
	keyvals['e'] = e
	keyvals['f'] = f
	keyvals['f#'] = fsharp
	keyvals['g'] = g
	keyvals['g#'] = gsharp

	var compareto = 0;
	var temp = []
	var w = 0;
	for (var value in keyvals){
 		temp[w] = keyvals[value];
 		w++
  	}  
  	keys = keyvals;

	// var notenames = ['a','a#','b','c','c#','d','d#','e','f','f#','g','g#']

	temp.sort(function(a, b){return a-b}).reverse();
	var keynotes = []
	for (k = 0; k< 7; k++){
		keynotes[k] = temp[k]
	}


	var counter = 0;
	var check = false;

	// this function sorts an array with the most used notes
	notes_key = keynotes;
	finalkeys=[]
		for(j=0;j<keynotes.length;j++){
			check = false;
	 		
	 			for (var value in keyvals){
	 			if (keynotes[j]==keyvals[value] && keyvals[value]!=0  && finalkeys.contains(value)==false){
	 				finalkeys[j]=(value);
	 				check = true;

 			// 	if(j==0){
 			// 		var use = keyvals[value];
 			// 	}
 			// 	if (keyvals[value]==use) {most_likely.push(value)}

 			// }


 		}
 			if (check==true){
 		counter++;
 		}
 	}
 		
  	}  

	finalnotes = finalkeys;

	//sharps or not? this function fails when sharp (need to fix)
	if(note.length>1 && note[1]=="#")
	{
		a_note = asharp
		b_note = c
		c_note = csharp
		d_note = dsharp
		e_note = f
		f_note = fsharp
		g_note = gsharp	
	}
	else
	{
		a_note = a;		
		b_note = b
		c_note = c		
		d_note = d		
		e_note = e
		f_note = f		
		g_note = g	
	}

	}

var finalnotes = [];
var currentkey = "blank";


//extend
Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
}