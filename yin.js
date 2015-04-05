
function init(yinSampleRate, yinBufferSize){
	bufferSize = yinBufferSize;
	sampleRate = yinSampleRate;
	halfBufferSize = bufferSize / 2;
	threshold = 0.10;
	probability = 10.0;
	//initialize array and set it to zero
	yinBuffer = [halfBufferSize];
	for(i = 0; i < halfBufferSize; i++){
		yinBuffer[i] = 0;
	}
}

function Yin(){}

function Yin(yinSampleRate,yinBufferSize){
	intialize(yinSampleRate,yinBufferSize)
}

function getProbability(){
	return probability
}

function getPitch(buffer){
	tauEstimate = -1;
	pitchInHertz = -1;

	//Step 2
	difference(buffer)
	//step3
	cumulativeMeanNormalizedDifference();

	tauEstimate = absoluteThreshold();

	if(tauEstimate != -1){
		pitchInHertz = sampleRate / parabolicInterpolation(tauEstimate);
	}

	currentPitch = pitchInHertz
}


function parabolicInterpolation(tauEstimate) {

	if (tauEstimate < 1) {
		x0 = tauEstimate;
	} 
	else {
		x0 = tauEstimate - 1;
	}
	if (tauEstimate + 1 < halfBufferSize) {
		x2 = tauEstimate + 1;
	} 
	else {
		x2 = tauEstimate;
	}
	if (x0 == tauEstimate) {
		if (yinBuffer[tauEstimate] <= yinBuffer[x2]) {
			betterTau = tauEstimate;
		} 
		else {
			betterTau = x2;
		}
	} 
	else if (x2 == tauEstimate) {
		if (yinBuffer[tauEstimate] <= yinBuffer[x0]) {
			betterTau = tauEstimate;
		} 
		else {
			betterTau = x0;
		}
	} 
	else {
		
		s0 = yinBuffer[x0];
		s1 = yinBuffer[tauEstimate];
		s2 = yinBuffer[x2];
		// fixed AUBIO implementation, thanks to Karl Helgason:
		// (2.0f * s1 - s2 - s0) was incorrectly multiplied with -1
		betterTau = tauEstimate + (s2 - s0) / (2 * (2 * s1 - s2 - s0));
	}
	return betterTau;
}


function cumulativeMeanNormalizedDifference(){
	tau;
	yinBuffer[0] = 1;
	runningSum = 0;
	for (tau = 1; tau < halfBufferSize; tau++) {
		runningSum += yinBuffer[tau];
		yinBuffer[tau] *= tau / runningSum;
	}
}

function difference(buffer){
	
	
	for(tau = 0 ; tau < halfBufferSize; tau++){
		for(index = 0; index < halfBufferSize; index++){
			delta= buffer[index] - buffer[index + tau];
			yinBuffer[tau] += delta * delta;
		}
	}
}

function absoluteThreshold(){
	
	// first two positions in yinBuffer are always 1
	// So start at the third (index 2)
	for (tau = 2; tau < halfBufferSize ; tau++) {
		if (yinBuffer[tau] < threshold) {
			while (tau + 1 < halfBufferSize && yinBuffer[tau + 1] < yinBuffer[tau]) {
				tau++;
			}
			// found tau, exit loop and return
			// store the probability
			// From the YIN paper: The threshold determines the list of
			// candidates admitted to the set, and can be interpreted as the
			// proportion of aperiodic power tolerated
			// within a ëëperiodicíí signal.
			//
			// Since we want the periodicity and and not aperiodicity:
			// periodicity = 1 - aperiodicity
			probability = 1 - yinBuffer[tau];
			break;
		}
	}
	// if no pitch found, tau => -1
	if (tau == halfBufferSize || yinBuffer[tau] >= threshold) {
		tau = -1;
		probability = 0;
	}
	return tau;
}