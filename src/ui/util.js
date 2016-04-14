  function randomNumber(min, max, format)
  {
	var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
	return Math.floor((Math.random() * max) + min) * plusOrMinus / (1/format); 
  }