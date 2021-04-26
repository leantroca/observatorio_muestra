Drupal.locale = { 'pluralFormula': function ($n) { return Number(($n!=1)); }, 'strings': {"":{"Edit":"Editar","Add":"Agregar","Not published":"No publicado","Search":"Buscar","An AJAX HTTP error occurred.":"Se produjo un error HTTP AJAX.","HTTP Result Code: !status":"C\u00f3digo de Resultado HTTP: !status","An AJAX HTTP request terminated abnormally.":"Una solicitud HTTP de AJAX termin\u00f3 de manera anormal.","Debugging information follows.":"A continuaci\u00f3n se detalla la informaci\u00f3n de depuraci\u00f3n.","Path: !uri":"Ruta: !uri","StatusText: !statusText":"StatusText: !statusText","ResponseText: !responseText":"ResponseText: !responseText","ReadyState: !readyState":"ReadyState: !readyState","Next":"Siguiente","Disabled":"Desactivado","Enabled":"Activado","none":"ninguno","Sunday":"Domingo","Monday":"Lunes","Tuesday":"Martes","Wednesday":"Mi\u00e9rcoles","Thursday":"Jueves","Friday":"Viernes","Saturday":"S\u00e1bado","Configure":"Configurar","All":"Todo(s)","Done":"Hecho","OK":"OK","This field is required.":"Este campo es obligatorio.","Prev":"Previo","Mon":"Lun","Tue":"Mar","Wed":"Mi\u00e9","Thu":"Jue","Fri":"Vie","Sat":"S\u00e1b","Sun":"Dom","January":"Enero","February":"Febrero","March":"Marzo","April":"Abril","May":"Mayo","June":"Junio","July":"Julio","August":"Agosto","September":"Septiembre","October":"Octubre","November":"Noviembre","December":"Diciembre","Show":"Mostrar","Allowed HTML tags":"Etiquetas HTML permitidas","Select all rows in this table":"Seleccionar todas las filas de esta tabla","Deselect all rows in this table":"Quitar la selecci\u00f3n a todas las filas de esta tabla","Today":"Hoy","Jan":"Ene","Feb":"Feb","Mar":"Mar","Apr":"Abr","Jun":"Jun","Jul":"Jul","Aug":"Ago","Sep":"Sep","Oct":"Oct","Nov":"Nov","Dec":"Dic","Su":"Do","Mo":"Lu","Tu":"Ma","We":"Mi","Th":"Ju","Fr":"Vi","Sa":"Sa","Please wait...":"Espere, por favor...","Hide":"Ocultar","mm\/dd\/yy":"mm\/dd\/yy","Not in book":"No est\u00e1 en un libro","New book":"Nuevo libro","By @name on @date":"Por @name en @date","By @name":"Por @name","Not in menu":"No est\u00e1 en un men\u00fa","Alias: @alias":"Alias: @alias","No alias":"Sin alias","New revision":"Nueva revisi\u00f3n","Drag to re-order":"Arrastre para reordenar","Changes made in this table will not be saved until the form is submitted.":"Los cambios realizados en esta tabla no se guardar\u00e1n hasta que se env\u00ede el formulario","The changes to these blocks will not be saved until the \u003Cem\u003ESave blocks\u003C\/em\u003E button is clicked.":"Los cambios sobre estos bloques no se guardar\u00e1n hasta que no pulse el bot\u00f3n \u003Cem\u003EGuardar bloques\u003C\/em\u003E.","Show shortcuts":"Mostrar atajos","This permission is inherited from the authenticated user role.":"Este permiso se hereda del rol de usuario registrado.","No revision":"Sin revisi\u00f3n","@number comments per page":"@number comentarios por p\u00e1gina","Requires a title":"Necesita un t\u00edtulo","Not restricted":"Sin restricci\u00f3n","(active tab)":"(solapa activa)","Not customizable":"No personalizable","Restricted to certain pages":"Restringido a algunas p\u00e1ginas","The block cannot be placed in this region.":"El bloque no se puede colocar en esta regi\u00f3n.","Customize dashboard":"Personalizar panel de control","Hide summary":"Ocultar resumen","Edit summary":"Editar resumen","Don\u0027t display post information":"No mostrar informaci\u00f3n del env\u00edo","The selected file %filename cannot be uploaded. Only files with the following extensions are allowed: %extensions.":"El archivo seleccionado %filename no puede ser subido. Solo se permiten archivos con las siguientes extensiones: %extensions.","Re-order rows by numerical weight instead of dragging.":"Reordenar las filas por peso num\u00e9rico en lugar de arrastrar.","Show row weights":"Mostrar pesos de la fila","Hide row weights":"Ocultar pesos de la fila","Autocomplete popup":"Ventana emergente con autocompletado","Searching for matches...":"Buscando coincidencias","Hide shortcuts":"Ocultar atajos","Select all":"Seleccionar todo","Not scheduled":"No programado"}} };;
jQuery(document).ready(function(){
	
	jQuery('a[href^="blank:#"]').each(function(){
	
		jQuery(this).attr({target:"_blank"});

		let href_old  = jQuery(this).attr('href');
		let href_new  = href_old.split(":#")[1];
		
		jQuery(this).attr({href:href_new});		
	});
});;
// A $( document ).ready() block.
jQuery(document).ready(function () {
    
    jQuery("button[class='webform-submit button-primary btn btn-default form-submit']").addClass('btn-primary');
    jQuery("button[class='webform-submit button-primary btn btn-default form-submit btn-primary']").removeClass('form-submit');
    jQuery("button[class='webform-submit button-primary btn btn-default btn-primary']").removeClass('btn-default');
    
});



;
//alert(window.orientation);
function bannerMin() {
    jQuery("#bannerCampaign").removeClass("banner01").addClass("banner01-min");
    jQuery("#downUpCampaign").find("i").removeClass("fa-chevron-down").addClass("fa-chevron-up");
    localStorage.banner_status = "min";

    jQuery("#bannerCampaign").show();
}

function bannerMax() {
    jQuery("#bannerCampaign").removeClass("banner01-min").addClass("banner01");
    jQuery("#downUpCampaign").find("i").removeClass("fa-chevron-up").addClass("fa-chevron-down");
    localStorage.banner_status = "max";

    jQuery("#bannerCampaign").show();

}

function bannerClose() {
    jQuery("#bannerCampaign").remove();
    localStorage.banner_status = "close"; 
}


jQuery(function(){
    if (Drupal.settings.argentinagobar_campana_gubernamental && Drupal.settings.argentinagobar_campana_gubernamental.id_campaign)  {
        if (!localStorage.id_campaign) {
           localStorage.campaign_date = new Date().getDate();
           localStorage.id_campaign = Drupal.settings.argentinagobar_campana_gubernamental.id_campaign;
        } else {
           if (localStorage.id_campaign != Drupal.settings.argentinagobar_campana_gubernamental.id_campaign || localStorage.campaign_date != new Date().getDate()) {
               localStorage.banner_status = "max";
               localStorage.id_campaign = Drupal.settings.argentinagobar_campana_gubernamental.id_campaign;
           }
        }

        if (localStorage.banner_status) {
             if(localStorage.banner_status == "min") {
                  bannerMin();
             } else if(localStorage.banner_status == "max") {
                  bannerMax();
             } else {
                 bannerClose();
             }
        } else {
            jQuery("#bannerCampaign").show();
        }


        jQuery("#closeCampaign").click(function(){

    	    gtag_data = {
                'event': 'ci_jgm_clic_cerrar',
                'ci_jgm_category': 'Comunicación interna -JGM',
                'ci_jgm_action': Drupal.settings.argentinagobar_campana_gubernamental.ci_jgm_action + 
    				'_' + Drupal.settings.argentinagobar_campana_gubernamental.ci_jgm_fecha_difusion +
                    '_' + Drupal.settings.argentinagobar_campana_gubernamental.ci_jgm_nodo,
                'ci_jgm_label': Drupal.settings.argentinagobar_campana_gubernamental.ci_jgm_label
            };

    	    dataLayer.push(gtag_data);
            localStorage.campaign_date = new Date().getDate();

    	    jQuery(".navbar-brand")[0].focus();
    	    bannerClose();
        })

        jQuery("#downUpCampaign").click(function(){

            if (jQuery("#bannerCampaign").hasClass("banner01")) {
                bannerMin();
            } else {
                bannerMax();
            }
        })

        jQuery("#js-titulo").click(function(){
    	    gtag_data = {
		        'event': 'ci_jgm_clic_link',
                'ci_jgm_category': 'Comunicación interna -JGM',
                'ci_jgm_action': Drupal.settings.argentinagobar_campana_gubernamental.ci_jgm_action + 
    				'_' + Drupal.settings.argentinagobar_campana_gubernamental.ci_jgm_fecha_difusion + 
                    '_' + Drupal.settings.argentinagobar_campana_gubernamental.ci_jgm_nodo,
                'ci_jgm_label': Drupal.settings.argentinagobar_campana_gubernamental.ci_jgm_label
    	    };

    	    dataLayer.push(gtag_data);
        });
    }
})
;
