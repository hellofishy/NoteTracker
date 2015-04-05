var getmode;

//function that does basically everything involving conversion
//there are some problems in this
var note = "c";
var finalnotesop = [];


function probab(){
	prob(nooctave);
	if (finalkeys.length>0)
	{
		note=finalkeys[0];
		mode=startNote(teoria.note(note),finalnotes,"major");
		getmode = mode;
		sharpflat();
		possibilities(note,mode);
	}
//defaults at major
}


//converts sharps to a scale of flats
function sharpflat(){

	for (var i = 0; i<finalnotes.length;i++){
		
		if (finalnotes[i].length>1 && finalnotes[i][1]=="#")
		{
			finalnotesop[i]=""+nextChar(finalnotes[i][0])+"b"
		}
		if(finalnotes.contains("f#"))
		{
			finalnotes[finalnotes.indexOf("f")]="e#"
		}
		if(finalnotes.contains("c#"))
		{
			finalnotes[finalnotes.indexOf("c")]="b#"
		}
		else
		{
			finalnotesop[i]=finalnotes[i]
		}
	}
}

//wrap around nextCharacter for notes
function nextChar(c) {
	if (c == 'G')
		{return 'A'}
	if (c == 'g')
		{return 'a'}
    return String.fromCharCode(c.charCodeAt(0) + 1);
}


//checks all possible 

function startNote(note, keys, scale){

//-----------------------major------
if (scale=="major"){
var mix = note.scale('major').simple();

var finalkey = "";

for (i=0;i<keys.length;i++)
{
	if (mix.indexOf(keys[i])!=-1){
		finalkey = "major";
	}
	else if(mix.indexOf(finalnotesop[i])!=-1)
		{finalkey="major"}
	else
	{
		//console.log("skip major");
		return startNote(note, keys, "minor")
	}
}
}
if (finalkey=="major")
{return "major"}


//-----------------------minor------
if (scale=="minor"){
var mix = note.scale('minor').simple();

var finalkey = "";

for (i=0;i<keys.length;i++)
{
	if (mix.indexOf(keys[i])!=-1){
		finalkey = "minor";
	}
	else if(mix.indexOf(finalnotesop[i])!=-1)
		{finalkey="minor"}
	else
	{
		//console.log("skip minor");
		return startNote(note, keys, "dorian")
	}
}
}
if (finalkey=="minor")
{return "minor"}

//-----------------------dorian------
if (scale=="dorian"){
var mix = note.scale('dorian').simple();

var finalkey = "";

for (i=0;i<keys.length;i++)
{
	if (mix.indexOf(keys[i])!=-1){
		finalkey = "dorian";
	}
	else if(mix.indexOf(finalnotesop[i])!=-1)
		{finalkey="dorian"}
	else
	{
		//console.log("skip dorian");
		return startNote(note, keys, "phrygian")
	}
}
}


if (finalkey=="dorian")
{return "dorian"}

//-----------------------phrygian------
if (scale=="phrygian"){
var mix = note.scale('phrygian').simple();

var finalkey = "";

for (i=0;i<keys.length;i++)
{
	if (mix.indexOf(keys[i])!=-1){
		finalkey = "phrygian";
	}
	else if(mix.indexOf(finalnotesop[i])!=-1)
		{finalkey="phrygian"}
	else
	{
		//console.log("skip phrygian");
		return startNote(note, keys, "lydian")
	}
}
}
if (finalkey=="phrygian")
{return "phrygian"}

//-----------------------mixolydian------
if (scale=="mixolydian"){
var mix = note.scale('mixolydian').simple();

var finalkey = "";

for (i=0;i<keys.length;i++)
{
	if (mix.indexOf(keys[i])!=-1){
		finalkey = "mixolydian";
	}
	else if(mix.indexOf(finalnotesop[i])!=-1)
		{finalkey="mixolydian"}
	else
	{
		//console.log("skip mixo");
		return startNote(note, keys, "lydian")
	}
}
}

if (finalkey=="mixoydian")
{return "mixolydian"}


//-----------------------lydian------
if (scale=="lydian"){
var mix = note.scale('lydian').simple();

var finalkey = "";

for (i=0;i<keys.length;i++)
{
	if (mix.indexOf(keys[i])!=-1){
		finalkey = "lydian";
	}
	else if(mix.indexOf(finalnotesop[i])!=-1)
		{finalkey="lydian"}
	else
	{
		//console.log("skip lydian");
		return startNote(note, keys, "locrian")
	}
}
}

if (finalkey=="lydian")
{return "lydian"}



//-----------------------locrian------
if (scale=="locrian"){
var mix = note.scale('locrian').simple();

var finalkey = "";

for (i=0;i<keys.length;i++)
{
	if (mix.indexOf(keys[i])!=-1){
		finalkey = "locrian";
	}
	else if(mix.indexOf(finalnotesop[i])!=-1)
		{finalkey="locrian"}
	else
	{	
		//console.log("skip locrian");
		return "major"
	}
}
}

if (finalkey=="locrian")
{return "locrian"}


}

var possibles = []


function possibilities(note,mode){
	
	possibles[0] = "" + note+ " " +mode
	// note = "C";
	// mode = "minor" 
	
	var modes = ["major", "dorian", "phrygian", "lydian", "mixolydian", "minor", "locrian"]

	var notestouse = teoria.note(note).scale(getmode).simple();
	var num = 0;
	if (note.length==1)
	{
		searchnote = notestouse;
		for (var s = 0; s<modes.length;s++)
		{
			if (modes[s]==mode){ num = s};
		}

		for (var i=1;i<7;i++)
		{
			var searchnote = notestouse;
			if((num+i)<7)
			{
			possibles[i]=searchnote + " " + modes[num+i]
			}	
	// else if((num+i)>=7 && (i-num)>=0)
	// {
	// 	//problem
	// 	possibles[i]=searchnote + " " + modes[i-num]
	// }
			else
			{
				possibles[i]=searchnote + " " + modes[(num-7)+i]

			}
		}
	}
	else
	{

		searchnote = note[0];
		for (var s = 0; s<modes.length;s++)
		{
			if (modes[s]==mode){ num = s};
		}

		for (var i=1;i<7;i++)
		{
			var searchnote = notestouse[i];
			if((num+i)<7)
			{
				possibles[i]=notestouse[i] +" " + modes[num+i]
			}
		// else if((num+i)>=7 && (i-num)>=0)
		// {
		// 	//problem
		// 	possibles[i]=searchnote + " " + modes[i-num]
		// }
			else
			{
				possibles[i]=notestouse[i]+" " + modes[(num-7)+i]

			}
		}
	}
}


