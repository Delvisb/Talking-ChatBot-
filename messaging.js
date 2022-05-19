	var lastUserMessage;
	var botResponse;
	talking = true;

	//clears user placeholder when on focus
	function placeHolder(){
		document.getElementById("input").placeholder = " ";
	}

	// if enter is clicked 
	var input = document.getElementById("input");
  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {  
      validate(e);
    }
  });
		
  function validate(e) {
    var text = e.target.value;
    newEntry();
  }

	// pull in user message input
	function newEntry(){
		if (document.getElementById("input").value != "") {
			lastUserMessage = document.getElementById("input").value;
			document.getElementById("input").value = "";
			
			const messaging = document.getElementById("messaging");
			let userTag = document.createElement("p");
			userTag.innerHTML = `<p id = "userMessage">You: ${lastUserMessage}</p><br><br>`;
			messaging.appendChild(userTag);
		
			chatbotResponse();
		}
	}

	async function chatbotResponse() {
		/* Source: https://rapidapi.com/infradrive-infradrive-default/api/robomatic-ai/ */
		// fetch api with user's last string input
	const encodedParams = new URLSearchParams();
		encodedParams.append("in", lastUserMessage);
		encodedParams.append("op", "in");
		encodedParams.append("cbot", "1");
		encodedParams.append("SessionID", "RapidAPI1");
		encodedParams.append("ChatSource", "RapidAPI");
		encodedParams.append("cbid", "1");
		encodedParams.append("key", "RHMN5hnQ4wTYZBGCF3dfxzypt68rVP");
		
		const options = {
			method: 'POST',
			headers: {
				'content-type': 'application/x-www-form-urlencoded',
				'X-RapidAPI-Host': 'robomatic-ai.p.rapidapi.com',
				'X-RapidAPI-Key': '414ed3dd91mshcc92bca3c605999p125f24jsnf2650ad70ac3'
			},
			body: encodedParams
		};

	await fetch('https://robomatic-ai.p.rapidapi.com/api.php', options)
	.then(response => response.json())
	.then(response => botResponse = response.out)
	.then(response => console.log(response.out))
	.catch(err => console.error(err));
		
	const messaging1 = document.getElementById("messaging");
	let botTag = document.createElement("p");
	botTag.id = "user";
	botTag.innerHTML = `<p id="botMessage">ChatBot: ${botResponse}</p><br><br>`;
	messaging1.appendChild(botTag);

	Speech(botResponse);
	}


	/* Source: https://developers.google.com/web/updates/2014/01/Web-apps-that-talk-Introduction-to-the-Speech-Synthesis-API */
	function Speech(say){
		if ('speechSynthesis' in window && talking) {
			var utterance = new SpeechSynthesisUtterance(say);
			//msg.voice = voices[10]; 
			//msg.voiceURI = 'native';
			//utterance.volume = 1; // 0 to 1
			//utterance.rate = 0.1; // 0.1 to 10
			//utterance.pitch = 1; //0 to 2
			//utterance.text = 'Hello World';
			//utterance.lang = 'en-US';
			speechSynthesis.speak(utterance);
		}		
	}
