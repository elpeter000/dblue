
window.onload=inicio;

var grafico1 = [];
var dataSource = [];

var f = ""
var val1 = 0
var val2 = 0
var dia =""
var mes =""
var anio =""


function inicio(){

			$.ajax({
     			  type: "GET",
				  url: "http://olcreativa.lanacion.com.ar/dev/get_url/?key=0AuNh4LTzbqXMdFJobGlLMWl2bzR3SHM3Nmc1dExLZmc",
				  dataType: "text",
				  success: function(data) {
				  
				  grafico1 = eval(data);
				  //console.log(data)
				 
				 	for (var i=1;i<grafico1.length;i++){
				 	
				 	 var fec = grafico1[i][0];
				 	 
				 	 if(f != grafico1[i][0]){
				 	 	f = grafico1[i][0];
				 	 	
				 	 	if(grafico1[i][1] == "Casas de cambio"){
				 	 		val1 = grafico1[i][2];
				 	 	}else if(grafico1[i][1] == "Informal"){
				 	 		val2 = grafico1[i][2];
				 	 	};
				 	 }else{
				 	 	if(grafico1[i][1] == "Casas de cambio"){
				 	 		val1 = grafico1[i][2];
				 	 	}else if(grafico1[i][1] == "Informal"){
				 	 		val2 = grafico1[i][2];
				 	 	};
				 	 	
				 	 	
				 	 	var fe = f.split("-");
				 	 	
				 	 	if(fe[1] == "ene."){
				 	 		mes = 1;
				 	 	}else if(fe[1] == "feb."){
				 	 		mes = 2;
				 	 	}else if(fe[1] == "mar."){
				 	 		mes = 3;
				 	 	}else if(fe[1] == "abr."){
				 	 		mes = 4;
				 	 	}else if(fe[1] == "may."){
				 	 		mes = 5;
				 	 	}else if(fe[1] == "jun."){
				 	 		mes = 6;
				 	 	}else if(fe[1] == "jul."){
				 	 		mes = 7;
				 	 	}else if(fe[1] == "ago."){
				 	 		mes = 8;
				 	 	}else if(fe[1] == "sept."){
				 	 		mes = 9;
				 	 	}else if(fe[1] == "oct."){
				 	 		mes = 10;
				 	 	}else if(fe[1] == "nov."){
				 	 		mes = 11;
				 	 	}else if(fe[1] == "dec."){
				 	 		mes = 12;
				 	 	};
				 	 	
				 	 	dia = +fe[0];
				 	 	anio = +fe[2];
				 	 	
				 	 	
				 	 	var fo = val1.split(",");
				 	 	var formal = +(fo[0]+"."+fo[1])
				 	 	
				 	 	var b = val2.split(",");
				 	 	var blue = +(b[0]+"."+b[1])
				 	 	
				 	 	
				 	 	console.log(mes, formal, blue)
				 	 	
				 	 	dataSource.push({
					  		date: new Date(anio,mes-1,dia),
					  		form: formal,
					  		blu: blue
					  	});
					  	
				 	 }
				 	 
					}; // termina el for
				 
				  	
				  	$(".load").fadeOut(100);
				  	$(".leyenda").fadeIn(100).css({"display":"inline-block"});
					$(".leyenda2").fadeIn(100).css({"display":"inline-block"});
				  	
				  	ultimo = dataSource.length - 1;
					ultimo2 = dataSource.length - 1;
					
					var fecha = dataSource[ultimo].date.getDate()+"/"+(dataSource[ultimo].date.getMonth()+1)+"/"+dataSource[ultimo].date.getFullYear()
					
					$("#ofic .fecha, #tarj .fecha, #blue .fecha").html(fecha);
					
					/*
					
					$("#ofic .cambio").html("1 US$ = $"+ (dataSource[ultimo].form).toFixed(2));
					$("#tarj .cambio").html("1 US$ = $"+ ((( (dataSource[ultimo].form )*35)/100) + dataSource[ultimo].form).toFixed(2));
					$("#blue .cambio").html("1 US$ = $"+ (dataSource[ultimo].blu).toFixed(2));
					
					*/
					
					$("#ofic .cambio").html("$"+ (dataSource[ultimo].form).toFixed(2));
					$("#tarj .cambio").html("$"+ ((( (dataSource[ultimo].form )*35)/100) + dataSource[ultimo].form).toFixed(2));
					$("#blue .cambio").html("$"+ (dataSource[ultimo].blu).toFixed(2));
					
					$("#circle .cambio").html("<span>$</span>"+(dataSource[ultimo].blu).toFixed(2));
					
					$(".leyenda2").html("Brecha: <b>"+ Math.round(((100 * dataSource[ultimo].blu) / dataSource[ultimo].form)-100)+"%</b> al "+ fecha);
					
					grafico();
				  	//brecha();
	
				}
});


function grafico() {

	$(function (){
		
	var series = [{
    		argumentField: 'date',
    		color: '#3f934f',
    		valueField: 'form'
			}, 
			{
   			argumentField: 'date',
   			color: '#3b5987',
   			valueField: 'blu'
		}];
	
	
	$("#chartContainer").dxChart({
	    dataSource: dataSource,
	    
	    commonSeriesSettings: {
	        type: "line",
	        argumentField: "date",
	        line: {
            	point: {   visible: false  	}
      		}
	        //argumentField: "year"
	    },
	    
	    valueAxis: {
            label: {
                format: 'fixedPoint',
                precision: 2,
                customizeText: function () {
                    return '$'+this.value ;
                }
            }
        },
	    adjustOnZoom: true,
	    argumentAxis: {
        	label: {
            	format: 'MM/yy'
        	},
            type: 'continuous',
            axisDivisionFactor: 30
        
    	},
    	            	    
	    commonAxisSettings: {
	        grid: {
	            visible: true,
	            color:'#cfcfcf'
	        }
	    },
	    
	    series: [
	    
	        { valueField: "form", color: '#3f934f', name: "DÃ³lar Oficial" },
	        { valueField: "blu", color: '#3b5987', name: "DÃ³lar Informal" },
	    ],
	    
	    tooltip:{
	        enabled: true,
	        font: {
	        	family: 'Arial',
	        	color:'#fff',
           		size: 13,
            	weight: 100
            },
            argumentFormat: 'd/MM/yy',
	        customizeText: function (valueIndicator) {
                return "$"+valueIndicator.valueText+" el "+ this.argumentText;
            }
	    },
	    
	    legend: {
	    	visible: false,
	        verticalAlignment: "top",
	        horizontalAlignment: "center"
	    },
	    
	    commonPaneSettings: {
	        border:{
	            visible: false,
	            bottom: false
	        }
	    }
	    
	    
	});
	
		
	$("#rangeSelectorContainer").dxRangeSelector({
	        size: {
	            height: 120
	        },
	        margin: {
	            left: 10
	        },
	        scale: {
	            minorTickInterval: 'mounth',
	        	majorTickInterval: 'year',
	        	valueType: 'datetime',
	        	placeholderHeight: 20
	        },
	        selectedRange: {
	            startValue: new Date((anio-1),mes-1,"30"), 
	            endValue: new Date(anio,mes-1,"30")
	        },
	        dataSource: dataSource,
	        chart: {
	            series: series
	        },
	        behavior: {
	            callSelectedRangeChanged: "onMoving"
	        },
	        selectedRangeChanged: function (e) {
	        	var zoomedChart = $("#chartContainer").dxChart('instance');
	        	zoomedChart.zoomArgument(e.startValue, e.endValue);
	   		 }
	    });

	    //console.log(mes)
	    var zoom = $("#chartContainer").dxChart('instance');
	    zoom.zoomArgument(new Date((anio-1),(mes-1),"30"), new Date(anio,(mes-2),"30"));

	
	});
		
	}; // termina grafico


}// TERMINA INICIO
			


	

