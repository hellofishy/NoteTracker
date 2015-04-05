function changeKey(tonic, scale)
{
	var tonic_note = teoria.note(tonic)
	var match = tonic_note.scale(scale).simple();
	var next = false;
	var correctnote = "";
	var array = []
		for(var i=0;i<midinotes.length;i++)
		{

			for (var j = 0; j < match.length; j++)
			{
				if(midinotes[i].length<3 && midinotes[i][0].toLowerCase()==match[j][0] &&match[j][1]!="x")
					{	
						correctnote=match[j]+midinotes[i][1];
					}
				else if(midinotes[i][0].toLowerCase()==match[j][0] && midinotes[i].length==3)
					{
						correctnote=match[j]+midinotes[i][2];
					}
				else if(midinotes[i].length>2 && midinotes[i][0].toLowerCase()==match[j][0]  && match[j][1]=="x")
					{
						correctnote=match[j][0]+midinotes[i][1]+midinotes[i][2];
					}
				else if(midinotes[i].length<=2 && midinotes[i][0].toLowerCase()==match[j][0]  && match[j][1]=="x")
					{
						correctnote=match[j][0]+midinotes[i][1];
					}
				else if(midinotes[i].length<3 && midinotes[i][0].toLowerCase()=="c"  && match[j]=="b#")
					{
						correctnote=match[j]+midinotes[i][1];
					}
				else if(midinotes[i].length<3 &&  midinotes[i][0].toLowerCase()=="f"  && match[j]=="e#")
					{
						correctnote=match[j]+midinotes[i][1];
					}
				else if(midinotes[i]=="NaN")
				{
					correctnote = "NaN"
				}
			}

			if (correctnote!="NaN")
			{
				//conversions sharp and flats
				if (correctnote[0]+correctnote[1]=="BB" || correctnote[0]+correctnote[1]=="bb"){
					correctnote = "A#"+correctnote[2];
				}
				if (correctnote[0]+correctnote[1]=="DB" || correctnote[0]+correctnote[1]=="db"){
					correctnote = "C#"+correctnote[2];
				}
				if (correctnote[0]+correctnote[1]=="EB" || correctnote[0]+correctnote[1]=="eb"){
					correctnote = "D#"+correctnote[2];
				}
				if (correctnote[0]+correctnote[1]=="GB" || correctnote[0]+correctnote[1]=="gb"){
					correctnote = "F#"+correctnote[2];
				}
				if (correctnote[0]+correctnote[1]=="AB" || correctnote[0]+correctnote[1]=="ab"){
					correctnote = "G#"+correctnote[2];
				}
				array.push(correctnote.toUpperCase());
			}
			else
			{
				array.push(correctnote)
			}
		}
	return array
}

