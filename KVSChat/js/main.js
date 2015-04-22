var bodyTemplateSrc = $('#body-template').html();
var bodyTemplate = Handlebars.compile(bodyTemplateSrc);

$(document).ready(function(){
	renderTemplate();
	setupMessageLoader();
});
var username = 'Guest';
var avatarUrl='http://cdn4.moviemagik.in/actors/292/Rajinikanth-Photos.jpg';
var root = new Firebase('https://bozzchat.firebaseio.com/');
var chatRoom = root.child('chat');

var messages = {};


function setupMessageLoader(){
	chatRoom.on('value',function(snapshot){
			var newMessages = snapshot.val();
			messages = newMessages;
			renderTemplate();
	});
}

function loginWithAuthData(authData){
	console.log(authData);
}

function renderTemplate(){
	var context = {
		username: username,
		messages: messages
	};

	var renderedTemplate = bodyTemplate(context);
	$('body-template-view').html(renderedTemplate);
	setupTemplateListeners();
}

function setupTemplateListeners(){
	$('#chat-box').keypress(function (e){
		console.log(e);
		if(e.which==13){
			var message = $("#chat-box").val();
			sendMessage(message);
			$('#chat-box').val('');
		}
	});
}

function sendMessage(msgText){
	chatRoom.push({
		avatarUrl:avatarUrl,
		username: username,
		msgText:msgText,
		timestamp: Firebase.ServerValue.TIMESTAMP
	});
}


Handlebars.registerHelper('getDateString',getDateString);
function getDateString(timestamp){
	return moment(new Data(timestamp)).fromNow();
}