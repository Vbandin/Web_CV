$(document).ready(function() {
	var API_URL = 'http://localhost:8000/api/';
	var topics = [];
	var newTopicInput = $('#newTopicName');
	var topicsContainer = $('#topicsContainer');
	var loader = $('.loader');

	var drawTopics = function () {
		topicsContainer.empty();

		if (topics.length == 0) {
			topicsContainer.append('<li class="topic-item">No hay ningún tema propuesto</li>');
		} else {
			var contentToAdd = '';

			for (var i = 0; i < topics.length; i++) {
				contentToAdd += '<li class="topic-item"><input type="text" class="update-topic-input" value="' + topics[i].name + '" required><button class="deleteTopic" data-topic-id="' + topics[i].id + '">Eliminar</button></li>';
			}

			topicsContainer.append(contentToAdd);
		}
	};

	var createTopic = function (name) {
		var success = function(data) {
			newTopicInput.val('');
			topics.push(data);
			drawTopics();
		};

		var data = {
			'name': name
		};

		$.ajax({
			type: "POST",
			url: API_URL + "topics",
			data: data,
			success: success
		})
		.fail(function (error) {
			console.error("Error creando nuevo tema.", error);
		});
	}

	var getTopics = function () {
		var success = function(data) {
			topics = data;
			drawTopics();
		}

		var error = function(error) {
			console.error("Error cargando temas.", error);
		} 

		var complete = function(object, textStatus) {
			loader.fadeOut();
			if (textStatus == 'error') {
				console.log("Ha habido un error, revisalo.");
			} else {
				console.log("Todo ha ido de forma correcta.")
			}
		}

		var beforeSend = function() {
			console.log("Before send");
			loader.show();
		}

		$.ajax({
			type: "GET",
			url: API_URL + "topics",
			success: success,
			error: error,
			complete: complete,
			beforeSend: beforeSend
		});
	}

	var deleteTopic = function(id) {
		$.ajax({
			type: "DELETE",
			url: API_URL + "topics/" + id
		})
		.done(function(data){
			topics = $.grep(topics, function(item){
				return item.id != id;
			});

			drawTopics();
		})
		.fail(function(error) {
			console.error("Error eliminando tema", error);
		})
		.always(function(object, status, error){
			console.log(object, status, error);
		});
	}

	var updateTopic = function(id, name) {
		var data = {
			'name': name
		}

		$.ajax({
			type: "PUT",
			url: API_URL + "topics/" + id,
			data: data
		})
		.done(function(data){
			for (var i = 0; i < topics.length; i++){
				if(topics[i].id == id) {
					topics[i].name = name;
				}
			}

			drawTopics();
		})
		.fail(function(error) {
			console.error("Error actualizando tema", error);
		}) 
	}


	$('#sendNewTopic').on("click", function(event){
		if (newTopicInput.val() != '') {
			event.preventDefault();
			createTopic(newTopicInput.val());
		}
	});

	$(document).on("click", ".deleteTopic", function(event){
		var id = $(this).data('topicId');
		deleteTopic(id);
	});

	$(document).on("blur", ".update-topic-input", function(event){
		var newName = $(this).val();
		var id = $(this).siblings('.deleteTopic').data("topicId");
		updateTopic(id, newName);
	});

	$(document).dblclick(function(event){
		console.log("Has puslado la tecla " + event.which);
	})

	setTimeout(function() {
		getTopics();
	}, 1);
});