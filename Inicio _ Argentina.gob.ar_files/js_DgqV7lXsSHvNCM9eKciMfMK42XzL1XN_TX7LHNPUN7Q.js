(function($){

	var loadCalendar = function(){

		$('.fc-event-container a').each(function(i, item){
			$(item).attr('data-nid', $(item).attr('href').replace('/node/', ''));
		});
 
		$('.fc-event-container a').click(function(event){

			$('.loader').fadeIn(200);
			var nid = $(event.currentTarget).data('nid') 
			$('#modal-calendar').removeClass('active');

			$.get('/event/' + nid, function(data){ 

				let tipo 		= data.type;
				let titulo 		= data.title;
				let date 		= data.field_fecha.und[0].value.slice(0, 10);
				let dateFin 		= data.field_fecha.und[0].value2.slice(0, 10);
				let hora 		= data.field_fecha.und[0].value.slice(11, 16);
				let horaFin 		= data.field_fecha.und[0].value2.slice(11, 16);
				let ubicacion 	= data.field_provincia.und[0].value;
				let url 		= (data.field_link.length == 0) ? '' : data.field_link.und[0].url; 
  				let descripcion = (data.body.length == 0) ? '' : data.body.und[0].value;
				
				let time = new Date(date.replace(/-/g, '\/'));
				let dia = ('0' + time.getDate()).slice(-2);
				let mes = ('0' + (time.getMonth() + 1)).slice(-2);
				let year = time.getFullYear();
				let fecha = dia + "/" + mes + "/" + year;
				let horaCompleta = hora + " - " + horaFin;
				let fechaCompleta = "";
				
				if (date != dateFin){
					let timeFin = new Date(dateFin.replace(/-/g, '\/')); // linea que soluciona error para los dias
					let diaFin = ('0' + timeFin.getDate()).slice(-2); 
					let mesFin = ('0' + (timeFin.getMonth() + 1)).slice(-2);
					let yearFin = timeFin.getFullYear();
					let fechaFin = diaFin + "/" + mesFin + "/" + yearFin;
					fechaCompleta = fecha + " - " + fechaFin;
				} else {
					fechaCompleta = fecha;
				}

				$('#header-title').html(tipo);
				$('#header-description').html(titulo);
				$('#modal-calendar_hora').html(horaCompleta);
				$('#modal-calendar_fecha').html(fechaCompleta);
				$('#modal-calendar_ubicacion').html(ubicacion);
				$('#modal-calendar_descripcion').html(descripcion);

				if (url == '') $('#modal-calendar_link').attr('href', '').hide();
				else $('#modal-calendar_link').attr('href', url).show();

				if (tipo == 'evento') $('.modal-calendar_header').css({'background-color': '#DD1763'});
				else $('.modal-calendar_header').css({'background-color': '#00B65A'});

			}).done(function(){
				
				$('.loader').fadeOut(100);
				$('#modal-calendar').addClass('active');
				$('#cerrar').bind('click', function(){ $('#modal-calendar').removeClass('active') }); 
		  	});
		});
	
	    return false; 
	} 

	var showModal = function() {

        let modal = '<div id="modal-calendar" class="modal-calendar"><div class="row"><div class="col-12 modal-calendar_header"><div id="cerrar" class="x"></div><p id="header-title" class="text-u"></p><p id="header-description"></p></div><div class="col-12 modal-calendar_body"><p id="modal-calendar_hora" class="modal-calendar_hora"></p><p id="modal-calendar_fecha" class="modal-calendar_fecha"></p><p id="modal-calendar_ubicacion" class="modal-calendar_ubicacion"></p><p id="modal-calendar_descripcion" class="modal-calendar_descripcion"></p><a id="modal-calendar_link" class="btn btn-primary btn-sm my-2" target="_blank" href="">Más detalles</a></div></div></div>';

        $('.view-calendario').parents('main').append(modal);

		if( $('.view-calendario-bloque .view-content .views-row').length ){

			$('.view-calendario-bloque .view-content .views-row').once().click(function(e){

				if (!$(e.target).parents('#modal-calendario').length){ e.stopPropagation() }

				$('.view-calendario-bloque .views-field-nothing').hide();
				$(this).find('.views-field-nothing').show();

				$(".modal-content-calendario .x").once().bind('click', function(e){
					e.stopPropagation();
					$('.view-calendario-bloque .views-field-nothing').hide();
				});

			});
        }

        $("body").once().click( function(e){

        	if($('.view-calendario-bloque').length > 0){

	        	var filtro = $("#views-exposed-form-calendario-bloque-block");

				if (!filtro.is(e.target) && $(e.target).parents('#views-exposed-form-calendario-bloque-block').length == 0){

	        		$('#views-exposed-form-calendario-bloque-block').removeClass('active');
					$('#edit-field-provincia-value-wrapper').removeClass('active');
					$('#edit-submit-calendario-bloque').removeClass('active');
					$('#edit-type-1-wrapper').removeClass('active');
	        	}
	        	
	        	$('.view-calendario-bloque .views-field-nothing').hide();
        	}
        });
    }

	Drupal.behaviors.bindCalendar = {
		attach: function() {
			loadCalendar();
			showModal();
		}
	}

	Drupal.behaviors.toggleFilter = {

  		attach: function(context, settings) {
			
			if ( $('.filter-calendario').length ) {
				
				$('.filter-calendario', context).once('toggleFilter', function() {

					$(this).click(function(e) { 
						e.stopPropagation();
						$('#views-exposed-form-calendario-bloque-block').toggleClass('active');
						$('#edit-field-provincia-value-wrapper').toggleClass('active');
						$('#edit-submit-calendario-bloque').toggleClass('active');
						$('#edit-type-1-wrapper').toggleClass('active');
					});

    			});
    		}
  		}
	}

	$(document).ready(function(){

		$('body').click(function(e){
		    if (!$(".modal-calendar.active").is(e.target) && ($(e.target).parents('.modal-calendar.active').length == 0) && !$('.loader').is(e.target) && !$('.circular').is(e.target) ){
		    	$('#modal-calendar').removeClass('active');
	    	}
		});

		let loader = '<div class="loader"><svg class="circular" viewBox="25 25 50 50"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg></div>';
		$('.view-calendario').parents('main').append(loader);

		$('#edit-field-provincia-value-wrapper').find('label').text('Lugar');
		$('#edit-field-provincia-value option[value="All"]').text('Todos');

		$('.loader').hide();
		loadCalendar();
		showModal();

		if ( $('.fc-header-right, .fc-header-left').children().length ){
			$('.fc-header-right, .fc-header-left').children().on('click', function(){
				loadCalendar();
				showModal();
				$('#modal-calendar').removeClass('active');
			});
		}

	});

})(jQuery);
;
