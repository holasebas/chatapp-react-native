var socket = io.connect('http://localhost:8080/', {'forceNew':true})


socket.on('users', function(data){

	console.log(data)

})




