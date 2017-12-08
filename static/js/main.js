window.onload = function() { 
	 var host = window.document.location.host.replace(/:.*/, '');

	 //todo cloud9に上げるとwssにする必要があります
     var ws = new WebSocket('ws://' + host + ':8080');

	var inputForm = new Vue({
		el: "#input_form",
		data: {
			message: ''
		},
		methods:{
			sendMessage: function(event){

				ws.send(this.message);

			}
		}
	})

	var contents = new Vue({
		el: '#chat_text',
		data: {
			chatLog:[]
		},
		methods: {
			pushMessage: function(text){

				this.chatLog.push({ text: text})

			}
		}
	})

	ws.onmessage = function (event) {
		console.log(event)
		contents.pushMessage(event.data)
	};
	
	ws.onopen = function(event) {
		console.log(event)
		console.log(ws)
	}
}


