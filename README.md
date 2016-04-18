zack
====
-- MidiTracker

To use:  
1. Make sure chrome allows local file access  
+  - in terminal 
+  $:/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --allow-file-access-from-files --disable-web-security-work
+ run index.html

Info for console and code:
+ after mididata is recorded 'midinotes' = the array of midinotes in letter form for each grid point
+ 'mididata' = the corresponding array of midinotes in number form
+ after a keychange has taken place secondarymidi and secondarynumbers correspond to these arrays

Keep in mind this is based on the awful javascript clock.  I plan on recreating this based on post analysis of audio buffers and accurate digital clocking
