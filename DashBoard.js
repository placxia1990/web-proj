//Different Flags for the Reservation '|D' and '|X' 

function allowDrop(ev) {
	ev.preventDefault();
}

function drag(ev) {
	ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
	ev.preventDefault();
	var data = ev.dataTransfer.getData("text");
	ev.target.appendChild(document.getElementById(data));
	document.getElementById(data).style.height = "80%";
	document.getElementById(data).style.marginTop = "0%";
}

function startTime() {
	var today = new Date();
	var h = today.getHours();
	var m = today.getMinutes();
	var s = today.getSeconds();
	var mili = today.getMilliseconds();
	m = checkTime(m);
	s = checkTime(s);
	document.getElementById('clock').innerHTML = h + ":" + m + ":" + s;
	var t = setTimeout(startTime, 500);
}
function checkTime(i) {
	if (i < 10) {
		i = "0" + i
	}
	; // add zero in front of numbers < 10
	return i;
}

//==========================================================================================
var resValue1="";
var resValue2="";
var resValue3="";

var otherResvList=new Array();

function showResAlerts(message){
	var list = message.split(",");
	var currentId = document.getElementById("userDropDown").value; 
	var len = list.length;	
	var userId = list[len-1].split("]")[0];
	var header="";
	var formatted="";
	var url="";
	var channelName="";
	var count="";
	var flag="F";
	var nullUser="T";  	
	var otherCount=0;			

	var adminFlg="T";
	var mapCountFlag="0";
	

   	if(currentId == "admin" || currentId == "UdaiS"){        		
		document.getElementById("resvHeading").textContent="Channel";
		adminFlg="T";
		
	}
	else{        		
		document.getElementById("resvHeading").textContent="Property";			
		adminFlg="F";
	}
	resValue1=currentId.trim()+"|NA|0";
	resValue2=currentId.trim()+"|NA|0";
	resValue3=currentId.trim()+"|NA|0";
	
	if(adminFlg=="F" && len==2){
						
		document.getElementById("resvResponse1").style.display="none";
		document.getElementById("resvResponse1Count").style.display="none";
		document.getElementById("resvResponse2").style.display="none";
		document.getElementById("resvResponse2Count").style.display="none";
		document.getElementById("resvResponseOther").style.display="none";
		document.getElementById("resvResponseOtherCount").style.display="none";
		document.getElementById("resv_piechart").style.display="none";
		
		mapCountFlag="2";
	}	
	else if(adminFlg=="F" && len==3){
		document.getElementById("resv_piechart").style.display="block";	
	
		document.getElementById("resvResponse1").style.display="block";
		document.getElementById("resvResponse1Count").style.display="block";
									
		document.getElementById("resvResponse2").style.display="none";
		document.getElementById("resvResponse2Count").style.display="none";
		document.getElementById("resvResponseOther").style.display="none";
		document.getElementById("resvResponseOtherCount").style.display="none";
		
		mapCountFlag="3";

		try{		
			channelName=list[1].split("=")[0];       			
	        count=list[1].split("=")[1]; 
		}catch(err){
			
		}
		url="/alertgui/rest/reservationAlerts/"+channelName.trim()+"/"+currentId.trim();
	    var onclick="loadDataRes(\""+url+"\",\""+channelName+"|D\")";	

		if (document.getElementById('resvResponse1CountA')==null){
			
			var aTag = document.createElement('a');
            aTag.setAttribute('href', "javascript:void(0)");                    
            aTag.setAttribute('id',"resvResponse1CountA");
            aTag.setAttribute('style', "color: white;");
            aTag.setAttribute('onclick', onclick);                    
            document.getElementById('resvResponse1Count').appendChild(aTag);	                    
            if(userId.trim()===currentId.trim()){ 
				document.getElementById("resvResponse1").textContent=list[1].split("=")[0]; 
                document.getElementById("resvResponse1CountA").textContent=list[1].split("=")[1];
				resValue1=userId.trim()+"|"+list[1].split("=")[0]+"|"+list[1].split("=")[1];
            }
			
         }else{
        	 	            		            	 
         	document.getElementById('resvResponse1CountA').setAttribute('onclick', onclick);
         	if(userId.trim()===currentId.trim()){
				 document.getElementById("resvResponse1").textContent=list[1].split("=")[0];  
                 document.getElementById("resvResponse1CountA").textContent=list[1].split("=")[1];
				 resValue1=userId.trim()+"|"+list[1].split("=")[0]+"|"+list[1].split("=")[1];
             }
			
         }


	}
	else if((adminFlg=="F"||adminFlg=="T") && len==4){
		document.getElementById("resv_piechart").style.display="block";	
	
		document.getElementById("resvResponse1").style.display="block";
		document.getElementById("resvResponse1Count").style.display="block";
		
		document.getElementById("resvResponse2").style.display="block";
		document.getElementById("resvResponse2Count").style.display="block";
		
		document.getElementById("resvResponseOther").style.display="none";
		document.getElementById("resvResponseOtherCount").style.display="none";

		mapCountFlag="4";

		try{		
			channelName=list[1].split("=")[0];       			
	        count=list[1].split("=")[1]; 
		}catch(err){
			
		}
		url="/alertgui/rest/reservationAlerts/"+channelName.trim()+"/"+currentId.trim();
	    var onclick="loadDataRes(\""+url+"\",\""+channelName+"|D\")";	
		

		if (document.getElementById('resvResponse1CountA')==null){
			document.getElementById("resvResponse1").style.visibility="visible";
				document.getElementById("resvResponse1Count").style.visibility="visible"; 	
            

			var aTag = document.createElement('a');
            aTag.setAttribute('href', "javascript:void(0)");                    
            aTag.setAttribute('id',"resvResponse1CountA");
            aTag.setAttribute('style', "color: white;");
            aTag.setAttribute('onclick', onclick);                    
            document.getElementById('resvResponse1Count').appendChild(aTag);	                    
            if(userId.trim()===currentId.trim()){ 
				document.getElementById("resvResponse1").textContent=list[1].split("=")[0]; 
                document.getElementById("resvResponse1CountA").textContent=list[1].split("=")[1];
				resValue1=userId.trim()+"|"+list[1].split("=")[0]+"|"+list[1].split("=")[1];
            }
			
         }else{
        	 
        	document.getElementById("resvResponse1").style.visibility="visible";
				document.getElementById("resvResponse1Count").style.visibility="visible"; 
        	 
         	document.getElementById('resvResponse1CountA').setAttribute('onclick', onclick);
         	if(userId.trim()===currentId.trim()){
				 document.getElementById("resvResponse1").textContent=list[1].split("=")[0];  
                 document.getElementById("resvResponse1CountA").textContent=list[1].split("=")[1];
				 resValue1=userId.trim()+"|"+list[1].split("=")[0]+"|"+list[1].split("=")[1];
             }
			
         }


		try{
			channelName=list[2].split("=")[0];       			
	        count=list[2].split("=")[1]; 
		}catch(err){
		
		}
		url="/alertgui/rest/reservationAlerts/"+channelName.trim()+"/"+currentId.trim();
	    onclick="loadDataRes(\""+url+"\",\""+channelName+"|D\")";	
		if (document.getElementById('resvResponse2CountA')==null)
                {
                    var aTag = document.createElement('a');
                    aTag.setAttribute('href', "javascript:void(0)");                    
                    aTag.setAttribute('id',"resvResponse2CountA");
                    aTag.setAttribute('style', "color: white;");
                    aTag.setAttribute('onclick', onclick);                    
                    document.getElementById('resvResponse2Count').appendChild(aTag);	                    
                    if(userId.trim()===currentId.trim()){
						document.getElementById("resvResponse2").textContent=list[2].split("=")[0];  
                        document.getElementById("resvResponse2CountA").textContent=list[2].split("=")[1];
						resValue2=userId.trim()+"|"+list[2].split("=")[0]+"|"+list[2].split("=")[1];
                    }
					
         }else{
			document.getElementById("resvResponse1").style.visibility="visible";
				document.getElementById("resvResponse1Count").style.visibility="visible";                     	
        	document.getElementById("resvResponse2").style.visibility="visible";
 			document.getElementById("resvResponse2Count").style.visibility="visible"; 
 				
        	document.getElementById('resvResponse2CountA').setAttribute('onclick', onclick);
         	if(userId.trim()===currentId.trim()){ 
				document.getElementById("resvResponse2").textContent=list[2].split("=")[0];
                document.getElementById("resvResponse2CountA").textContent=list[2].split("=")[1];
				resValue2=userId.trim()+"|"+list[2].split("=")[0]+"|"+list[2].split("=")[1];
             }
			
         }		


	}
	else if(len>4){
		//alert("Length is > 4====="+len);
		mapCountFlag="5";
		
		document.getElementById("resv_piechart").style.display="block";	
	
		document.getElementById("resvResponse1").style.display="block";
		document.getElementById("resvResponse1Count").style.display="block";
		document.getElementById("resvResponse2").style.display="block";
		document.getElementById("resvResponse2Count").style.display="block";
		document.getElementById("resvResponseOther").style.display="block";
		document.getElementById("resvResponseOtherCount").style.display="block";

		try{		
			channelName=list[1].split("=")[0];       			
	        count=list[1].split("=")[1]; 
		}catch(err){
			
		}
		url="/alertgui/rest/reservationAlerts/"+channelName.trim()+"/"+currentId.trim();
	    var onclick="loadDataRes(\""+url+"\",\""+channelName+"|D\")";	
		

		if (document.getElementById('resvResponse1CountA')==null){
			
			var aTag = document.createElement('a');
            aTag.setAttribute('href', "javascript:void(0)");                    
            aTag.setAttribute('id',"resvResponse1CountA");
            aTag.setAttribute('style', "color: white;");
            aTag.setAttribute('onclick', onclick);                    
            document.getElementById('resvResponse1Count').appendChild(aTag);	                    
            if(userId.trim()===currentId.trim()){ 
				document.getElementById("resvResponse1").textContent=list[1].split("=")[0]; 
                document.getElementById("resvResponse1CountA").textContent=list[1].split("=")[1];
				resValue1=userId.trim()+"|"+list[1].split("=")[0]+"|"+list[1].split("=")[1];
            }
			
         }else{
        	        	
         	document.getElementById('resvResponse1CountA').setAttribute('onclick', onclick);
         	if(userId.trim()===currentId.trim()){
				 document.getElementById("resvResponse1").textContent=list[1].split("=")[0];  
                 document.getElementById("resvResponse1CountA").textContent=list[1].split("=")[1];
				 resValue1=userId.trim()+"|"+list[1].split("=")[0]+"|"+list[1].split("=")[1];
             }
			
         }


		try{
			channelName=list[2].split("=")[0];       			
	        count=list[2].split("=")[1]; 
		}catch(err){
		
		}
		url="/alertgui/rest/reservationAlerts/"+channelName.trim()+"/"+currentId.trim();
	    onclick="loadDataRes(\""+url+"\",\""+channelName+"|D\")";	
		if (document.getElementById('resvResponse2CountA')==null)
                {
                    var aTag = document.createElement('a');
                    aTag.setAttribute('href', "javascript:void(0)");                    
                    aTag.setAttribute('id',"resvResponse2CountA");
                    aTag.setAttribute('style', "color: white;");
                    aTag.setAttribute('onclick', onclick);                    
                    document.getElementById('resvResponse2Count').appendChild(aTag);	                    
                    if(userId.trim()===currentId.trim()){
						document.getElementById("resvResponse2").textContent=list[2].split("=")[0];  
                        document.getElementById("resvResponse2CountA").textContent=list[2].split("=")[1];
						resValue2=userId.trim()+"|"+list[2].split("=")[0]+"|"+list[2].split("=")[1];
                    }
					
         }else{
			
        	document.getElementById('resvResponse2CountA').setAttribute('onclick', onclick);
         	if(userId.trim()===currentId.trim()){ 
				 document.getElementById("resvResponse2").textContent=list[2].split("=")[0];
                 document.getElementById("resvResponse2CountA").textContent=list[2].split("=")[1];
				 resValue2=userId.trim()+"|"+list[2].split("=")[0]+"|"+list[2].split("=")[1];
             }
			
         }		
		
		url="/alertgui/rest/reservationAlerts/"+channelName.trim()+"/"+currentId.trim();
	    onclick="loadDataRes(\""+url+"\",\""+channelName+"\")";	
	
		
		for(var i=3; i<(len-1); i++){
			otherCount=otherCount+Number(list[i].split("=")[1]);
			otherResvList.push(list[i]);
		}
		
	
		channelName="Other"; 
	    onclick="loadDataRes(\""+otherResvList+"\",\""+channelName+"|D\")";	
		if (document.getElementById('resvResponseOtherCountA')==null)
           {
                var aTag = document.createElement('a');
                aTag.setAttribute('href', "javascript:void(0)");                    
                aTag.setAttribute('id',"resvResponseOtherCountA");
                aTag.setAttribute('style', "color: white;");
                aTag.setAttribute('onclick', onclick);                    
                document.getElementById('resvResponseOtherCount').appendChild(aTag);	                    
                if(userId.trim()===currentId.trim()){        
                    document.getElementById("resvResponseOtherCountA").textContent=otherCount;
					resValue3=userId.trim()+"|"+channelName+"|"+otherCount;
                }
				
         }else{                    	
         	
			document.getElementById('resvResponseOtherCountA').setAttribute('onclick', onclick);
         	if(userId.trim()===currentId.trim()){ 
                document.getElementById("resvResponseOtherCountA").textContent=otherCount;
				resValue3=userId.trim()+"|"+channelName+"|"+otherCount;
             }
			
         }
	}
	otherResvList=[];        	
}

function viewResChart(){
	   //console.log("Before split value1===================="+value1+"+++++++value2======="+value2+"========="+value3);
	   var value1=resValue1.split("|");   
	   var value2=resValue2.split("|");
	   var value3=resValue3.split("|");  
	   //console.log("After split value1===================="+value1[0]+"+++++++value2======="+value1[1]+"========="+value1[2]);
	      		   			   			
		
	   var currentId = document.getElementById("userDropDown").value;
	   //alert("=======currentId conds..."+currentId.trim());
	   if(currentId.trim() == value1[0].trim() && currentId.trim() == value2[0].trim() && currentId.trim() == value3[0].trim()){
		   	//alert("=======inside conds..."+currentId.trim());
			var data = google.visualization.arrayToDataTable([
    			      ['Param', 'Count'],
    			      [value1[1].trim(),	parseInt(value1[2].trim())],
    			      [value2[1].trim(),	parseInt(value2[2].trim())],
    			      [value3[1].trim(),	parseInt(value3[2].trim())],				                                    			      
    			    ]);
		                                    			
		    var options = {
		    		title: 'Statistics',
   			      	is3D: true,
   			      	sliceVisibilityThreshold:.0001,
		  			height: 230,
		  			backgroundColor:'#80ccff',
		  			titleTextStyle: { color: '#FFFFFF',fontSize: 12},
		  			pieSliceTextStyle:{color: '#FFFFFF',fontSize: 12},
		  			fontName:'Verdana',
		  			pieSliceBorderColor:'#ffffff',
		  			chartArea:{left:'20%',top:20,width:'100%',height:'90%'} 
		    };
		    var chart = new google.visualization.PieChart(document.getElementById('resv_piechart'));
		    chart.draw(data, options);
	   }		   	
}


//---------------------Live Stream Charts-------------------------------------
	
var head1="";
var head2="";
var head3="";
try{
	head1=document.getElementById("resvResponse1").textContent;
	head2=document.getElementById("resvResponse2").textContent;
	head3=document.getElementById("resvResponseOther").textContent;
}catch(err){
	head1="NA";
	head2="NA";
	head3="NA";
}


var mainArrResv = [["Time",head1,head2,head3]];
function createArrayResv(time) {
	try{
		console.log("Try exe======for Live Strream============@@@@@@@@@@@@@@@@@@@@");
		head1=document.getElementById("resvResponse1").textContent;
   		head2=document.getElementById("resvResponse2").textContent;
		head3=document.getElementById("resvResponseOther").textContent;
	}catch(err){
		console.log("Catch exe======for Live Strream============@@@@@@@@@@@@@@@@@@@@");
		head1="NA";
		head2="NA";
		head3="NA";
	}

	var currentId = document.getElementById("userDropDown").value;
	var childArr = new Array();
	
	var data1=resValue1.split("|");
	var data2=resValue2.split("|");
	var data3=resValue3.split("|");

	if(data1=="" && data2=="" && data3==""){
		console.log("data1 data2 data2======is NULL============@@@@@@@@@@@@@@@@@@@@");
		data1=[currentId.trim(),"NA","0"];
		data2=[currentId.trim(),"NA","0"];
		data3=[currentId.trim(),"NA","0"];
	}
				
	try{
		
		childArr[0] = time;
		childArr[1] = parseInt(data1[2].trim());
		childArr[2] = parseInt(data2[2].trim());
		childArr[3] = parseInt(data3[2].trim());
	}catch(err){
	
	}
	//console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@chi arr======="+childArr);		
	
	mainArrResv.push(childArr);
	//alert("Length======"+mainArrResv.length);
	if(mainArrResv.length>16){
		try{
			mainArrResv[1]=["Time",data1[1].trim(),data2[1].trim(),data3[1].trim()];
		}catch(err){
			mainArrResv[1]=["Time","NA","NA","NA"];
		}
		mainArrResv.shift();
		
	}else{
		mainArrResv[0]=["Time",head1,head2,head3];
	}
	
}

//google.charts.load('current', {	'packages' : [ 'corechart' ]});

function drawChartLiveResv() {
	var data = google.visualization.arrayToDataTable(mainArrResv);

	
	var options = {
		title : 'Reservation-PULL Failures Trend',
		curveType : 'none',
		legend : {
			position : 'right'
		},
		height: 370,
		backgroundColor:'',
		pointSize: 1,
		hAxis : { 
	        textStyle : {
	            fontSize: 10 // or the number you want
	        },
	        
	        slantedText:true,
	        slantedTextAngle:40
	    },
	    vAxis : { 
	        textStyle : {
	            fontSize: 10 // or the number you want
	        },
	        gridlines: { 
	        	count: 8,
	        }

	    }
		
	};

	var chart = new google.visualization.LineChart(document
			.getElementById('curve_chartResv'));

	chart.draw(data, options);
}

////-----------------------------------------------------------------
function showLoading(){
	document.getElementById("loading").style.display="block";	
	document.getElementById("loadingWindow").style.display="block";
}

function hideLoading(){
	document.getElementById("loading").style.display="none";
	document.getElementById("loadingWindow").style.display="none";
}

function genAnimation(id){
	
	if(id=="level1"){
		$("#level1").fadeTo( "slow" , 1.00);
		
	}
	if(id=="level2"){
		$("#level2").animate({
			left: '63%',
			
		});
		$("#level3").animate({
			left: '63%',
			
		});
		$("#level4").animate({
			left: '63%',
			
		});
	}
	if(id=="level3"){
		$("#level3").animate({
			top: '51.5%',
			left: '32%',
			
		});
		$("#level4").animate({
			top: '51.5%',
			left: '32%',
			
		});
		
	}
			 
}

var listSize="";
var otherFlag="F";
function loadDataRes(detailDataUrl,param){
	var formatted="";
	var header="";
	var url="";
	var currentId = document.getElementById("userDropDown").value;
	
	//alert("Param ==========="+param);
	if(param.trim().indexOf("Other") != -1){
		otherFlag="F";
		//alert("inside if ========>>> ");
	}else if(param.trim().indexOf("|D") != -1){
		otherFlag="F";
		//alert("inside else if ========>>> ");
	}else{
		//alert("inside else ========>>> ");
	}
	
	//alert("otherFlag =========="+otherFlag);
	
	if(param.search("|D")!= -1 && otherFlag=="T"){
		createLinks("loadDataRes('"+detailDataUrl+"','"+param+"')",param+"|X","2");
	}else{
		createLinks("loadDataRes('"+detailDataUrl+"','"+param+"')",param+"|X","1");
	}
		
	var xhttp = new XMLHttpRequest();
  	xhttp.onreadystatechange=function() {
	    if (xhttp.readyState == 4) {
	    	otherFlag=="F";
	    	res = xhttp.responseText;
	       	res=res.replace("[","");
	      	res=res.replace("]","");
	      	//alert("RES=="+res);
			//console.log("loadDataRes Hitting===========>>>>>"+res);
		  	var dataSet = res.split(",");
			//alert("DataSet=="+dataSet);
			for (var i = 0; i < dataSet.length; i++) {

				var paramData=dataSet[i].split("=");
				if(currentId == "admin" || currentId == "UdaiS"){
						header="User : "+currentId+" Type : Property";
						//url="/alertgui/rest/reservationAlerts/"+channelName.trim()+"/"+currentId.trim();
						url="/alertgui/rest/reservationAlertsDetail/"+paramData[0].trim()+"/"+param.trim()+"/"+currentId.trim();
						if(paramData[1].trim()=="0"){
							url="";
						}																																																																				                                                              
						formatted=formatted+"<div class='Row' id='"+paramData[0].trim()+"-row'><div class='Cell'><p id='"+paramData[0]+"-head'>"+paramData[0]+"</p></div><div class='Cell'><p class='count' id='"+paramData[0]+"-cnt'><a href='javascript:void(0)' onclick=\"loadDataChannelPropertyRes('"+url+"','"+param.trim()+"','"+paramData[0].trim()+"')\">"+paramData[1]+"</a></p></div></div>";
				}else{
					
						header="User : "+currentId+" Type : Channel";
						url="/alertgui/rest/reservationAlertsDetail/"+paramData[0].trim()+"/"+param.trim()+"/"+currentId.trim();
						if(paramData[1].trim()=="0"){
							url="";
						}
						
						formatted=formatted+"<div class='Row' id='"+paramData[0].trim()+"-row'><div class='Cell'><p id='"+paramData[0]+"-head'>"+paramData[0]+"</p></div><div class='Cell'><p class='count' id='"+paramData[0]+"-cnt'><a href='javascript:void(0)' onclick=\"loadDataChannelPropertyRes('"+url+"','"+param.trim()+"','"+paramData[0].trim()+"')\">"+paramData[1]+"</a></p></div></div>";
					
				}
				formatted=formatted+"<div onclick='hideSubRow(\"RowData\")' class='RowData' id='"+paramData[0].trim()+"-rowData'></div>";

			}
			var dynamicHTML="<div class='Table'><div class='Heading'><div class='Cell'><p>"+header+"</p></div><div class='Cell'><p>Counts</p></div></div>";
		  	
		  	dynamicHTML=dynamicHTML+formatted;
		  	dynamicHTML=dynamicHTML+"</div>";
			hideLoading();
		  	//document.getElementById("white").innerHTML=dynamicHTML;
		  	if(otherFlag=="T"){
		  		//otherFlag="F";
		  		document.getElementById("level2").innerHTML=dynamicHTML;
			  	document.getElementById("levelData").style.display="block";
			  	document.getElementById("level1").style.display="block";
			  	document.getElementById("level2").style.display="block";
			  	
			  	document.getElementById("level1").style.visibility="visible";
			  	document.getElementById("level2").style.visibility="visible";
			 			  	
			  	genAnimation("level2");
			  	document.getElementById("detailData").style.display="none";	
				document.getElementById("level3").style.display="none";
				document.getElementById("level4").style.display="none";
		  		
		  	}else{
		  		document.getElementById("level1").innerHTML=dynamicHTML;
			  	document.getElementById("levelData").style.display="block";
			  	document.getElementById("level1").style.display="block";
			  	
			  	document.getElementById("levelData").style.visibility="visible";
			  	document.getElementById("level1").style.visibility="visible";
				
			  	document.getElementById("animatedLineChartARI").style.display="none";
			  	document.getElementById("animatedLineChartResv").style.display="none";
			  		
				genAnimation("level1");

			  	document.getElementById("detailData").style.display="none";
			  	document.getElementById("level2").style.display="none";
				document.getElementById("level3").style.display="none";
				document.getElementById("level4").style.display="none";
		  	}
		  	
		  	
	    }
  	};
	
	//if(param.trim()=="Other"){
	if(param.search("Other")!= -1){
		//param.search("Other")!= -1
		//alert("loadDataRes====Other =======>>>>"+param.trim());
		otherFlag="T";
		//console.log("loadDataRes====Other =======>>>>"+detailDataUrl);
				
		detailDataUrl=detailDataUrl.replace("[","");
      	detailDataUrl=detailDataUrl.replace("]","");
      	var dataSet = detailDataUrl.split(",");

		for (var i = 0; i < dataSet.length; i++) {	
				var paramData=dataSet[i].split("=");
				if(currentId == "admin" || currentId == "UdaiS"){
						header="User : "+currentId+" Type : Property";
						
						url="/alertgui/rest/reservationAlerts/"+paramData[0].trim()+"/"+currentId.trim();
						//url="/alertgui/rest/reservationAlertsDetail/"+paramData[0].trim()+"/"+param.trim()+"/"+currentId.trim();
						if(paramData[1].trim()=="0"){
							url="";
						}																																																																				                                                              
						formatted=formatted+"<div class='Row' id='"+paramData[0].trim()+"-row'><div class='Cell'><p id='"+paramData[0]+"-head'>"+paramData[0]+"</p></div><div class='Cell'><p class='count' id='"+paramData[0]+"-cnt'><a href='javascript:void(0)' onclick=\"loadDataRes('"+url+"','"+paramData[0].trim()+"')\">"+paramData[1]+"</a></p></div></div>";
				}else{
					
						header="User : "+currentId+" Type : Channel";
						url="/alertgui/rest/reservationAlerts/"+paramData[0].trim()+"/"+currentId.trim();
						if(paramData[1].trim()=="0"){
							url="";
						}
						formatted=formatted+"<div class='Row' id='"+paramData[0].trim()+"-row'><div class='Cell'><p id='"+paramData[0]+"-head'>"+paramData[0]+"</p></div><div class='Cell'><p class='count' id='"+paramData[0]+"-cnt'><a href='javascript:void(0)' onclick=\"loadDataRes('"+url+"','"+paramData[0].trim()+"')\">"+paramData[1]+"</a></p></div></div>";
					
				}
				formatted=formatted+"<div onclick='hideSubRow(\"RowData\")' class='RowData' id='"+paramData[0].trim()+"-rowData'></div>";
			}
			var dynamicHTML="<div class='Table'><div class='Heading'><div class='Cell'><p>"+header+"</p></div><div class='Cell'><p>Counts</p></div></div>";
		  	
		  	dynamicHTML=dynamicHTML+formatted;
		  	dynamicHTML=dynamicHTML+"</div>";
			hideLoading();
		  	///document.getElementById("white").innerHTML=dynamicHTML;
			
			document.getElementById("level1").innerHTML=dynamicHTML;
		  	document.getElementById("levelData").style.display="block";
		  	document.getElementById("level1").style.display="block";
		  	
		  	document.getElementById("levelData").style.visibility="visible";
		  	document.getElementById("level1").style.visibility="visible";
			
		  	document.getElementById("animatedLineChartARI").style.display="none";
		  	document.getElementById("animatedLineChartResv").style.display="none";
		  	//document.getElementById("animatedLineChartARI").style.zIndex="-1";
		  	//document.getElementById("animatedLineChartResv").style.zIndex="-1";;
		  	
			genAnimation("level1");

		  	document.getElementById("detailData").style.display="none";
		  	document.getElementById("level2").style.display="none";
			document.getElementById("level3").style.display="none";
			document.getElementById("level4").style.display="none";
		
	}else{
		//alert("loadDataRes====Hitting called");
		otherFlag=="F";
		xhttp.open("GET", detailDataUrl, true);
		showLoading();
		xhttp.send();
	}
	   
}

function loadDataChannelPropertyRes(detailDataUrl,superParam,param){
	//alert("-=---detailDataUrl----"+detailDataUrl+"---superParam----"+superParam+"-----param-------"+param);
	createLinks("loadDataChannelPropertyRes('"+detailDataUrl+"','"+superParam+"','"+param+"')",param,"3");
	
	var currentId = document.getElementById("userDropDown").value;			
  	var formatted="";
	var xhttp = new XMLHttpRequest();
  	xhttp.onreadystatechange=function() {
	    if (xhttp.readyState == 4) {
	      	res = xhttp.responseText;
	       	res=res.replace("[","");
	      	res=res.replace("]","");

			var dataSet = res.split(",");
			//alert("DataSet===>>"+dataSet);
			
		  	for (var i = 0; i < dataSet.length; i++) {
				var paramData=dataSet[i].split("|");
				if(superParam.trim().indexOf("|D") > -1){
					superParam=superParam.trim().split("|")[0];
				}
				//<p><a class='detailRowLink' href='"+url+"' onclick=\"window.open('"+url+"','width=300','height=600','scrollbars=yes'); return false;\">"+paramData[5]+"</a></p>
				var url="/alertgui/rest/detailLogViewRes/"+param.trim()+"/"+superParam.trim()+"/"+paramData[0].trim()+"/"+currentId.trim();
				formatted=formatted+"<div id='detailRow' class='Row'><div class='Cell' style='width:25%;'><p><a class='detailRowLink' href='"+url+"' onclick=\"window.open('"+url+"','width=300','height=600','scrollbars=yes'); return false;\">"+paramData[0]+"</a></p></div><div class='Cell' style='width:75%;'><p>"+paramData[1]+"</p></div></div>";
			}
		  	var dataTable="<div class='DataTable'>"+formatted+"</div>";

		  	var headTable="<div class='TitleTable'><div class='Heading' id='detailData'>";
		  	headTable=headTable+"<div class='HCell' style='width:100%;left:10%;'><p id='breadcrumb'>"+param+" || "+superParam+"</p></div>";
		  	headTable=headTable+"</div></div>";
		  	
		  	headTable=headTable+"<div class='HeadTable'><div class='Heading' id='detailData'>";
		  	headTable=headTable+"<div class='HCell' style='width:300px'><p>Date</p></div><div class='HCell' style='width:75%;'><p>Error</p></div></div>";
		  	headTable=headTable+"</div></div>";
			
		  	var dynamicHTML=headTable+dataTable;
			hideLoading();
			document.getElementById("detailData").innerHTML=dynamicHTML;
			
			document.getElementById("levelData").style.visibility="hidden";
			document.getElementById("level1").style.visibility="hidden";
			document.getElementById("level2").style.visibility="hidden";
			document.getElementById("level3").style.visibility="hidden";
			document.getElementById("level4").style.visibility="hidden";
			
			document.getElementById("detailData").style.display="block";
		 }
	};
	xhttp.open("GET", detailDataUrl, true);
	xhttp.send();
}

var bCrumbArr1=[];
var bCrumbArr2=[];
var bCrumbArr3=[];
var cnt=0;
function createLinks(url,param,lvl){
	
	/*var bcrumbs="F";
	var elems = document.getElementsByClassName("bCrumb");
	for (var i=0;i<elems.length;i++){
		if(elems[i].id==param+"|"+lvl){
			bcrumbs="T";
		}
	}*/
		
	//alert("======="+url+"========="+param+"========"+lvl+"=======");
	console.log("======="+url+"========="+param+"========"+lvl+"========");
	var resvFLG="F"
	try{
		if(param.indexOf("|X")!=-1){
			resvFLG="T";
			param=param.split("|")[0];
		}else{
			resvFLG="F";
		}
	}catch(err){
		
	}
		
	if((lvl=="1") && (param=="StopSell" || param=="Rate" || param=="Other"||resvFLG=="T")){
		changeUser();
		//changeBCrumbs(lvl);
		cnt=cnt+1;
		bCrumbArr1=[];
		bCrumbArr2=[];
		bCrumbArr3=[]
		
		$('.bCrumb').remove();
		
		//bcrumbs="F";
		
		bCrumbArr1.push(param);
		var aTag = document.createElement('a');
		aTag.setAttribute('href', "javascript:void(0)");
		aTag.setAttribute('id', param+"|"+lvl);
		aTag.setAttribute('style', "color: white;");
		aTag.setAttribute('onclick',url);
		var aText = document.createTextNode(param);
		aTag.appendChild(aText);
		createBreadcrumbDivs(aTag,param,lvl);
		
	}
	else{
		//alert("hello");
		changeBCrumbs(param,lvl);				
		//if(bCrumbArr1.indexOf(param+"|"+lvl) == -1){
		//if(bcrumbs!="T"){
			bCrumbArr1.push(param+"|"+lvl);
			var aTag = document.createElement('a');
			aTag.setAttribute('href',"javascript:void(0)");
			aTag.setAttribute('id',param+"|"+lvl);
			aTag.setAttribute('style',"color: white;");
			aTag.setAttribute('onclick',url);
			var aText = document.createTextNode(param);
			aTag.appendChild(aText);
			createBreadcrumbDivs(aTag,param,lvl);
		//}
		
		
		//} 
	}
}







function createBreadcrumbDivs(aTag,param,lvl){
	//alert("createBreadcrumbDivs");
	var divTag = document.createElement('div');
	divTag.setAttribute('id', param+"|"+lvl);
	divTag.setAttribute('class', "bCrumb");
	divTag.setAttribute('style', "color: white;");
	divTag.setAttribute('onclick',"");
				
	if((param=="StopSell") || (param=="Rate") || (param=="Other") ||(param.indexOf("|X") > -1) || lvl=="1"){
		divTag.appendChild(aTag);
		var bcrumb = document.getElementById('breadcrumbMain');
		bcrumb.appendChild(divTag);
	}
	else{
		
		var aText = document.createTextNode(">>");
		//arrowDiv.appendChild(aText);
		divTag.appendChild(aText);
		divTag.appendChild(aTag);
		var bcrumb = document.getElementById('breadcrumbMain');
		bcrumb.appendChild(divTag);
	}
}



function changeUser(){
	var elems = document.getElementsByClassName("bCrumb");
	for (var i=0;i<elems.length;i+=1){
		elems[i].style.display = 'none';
	}
	document.getElementById("levelData").style.display = "none";
	document.getElementById("level1").style.display="none";
	document.getElementById("level2").style.display="none";
	document.getElementById("level3").style.display="none";
	document.getElementById("level4").style.display="none";
	document.getElementById("detailData").style.display = "none";	
}

//1 param and level both equal
//2 only level equal
//3 req param's level > display param
//4 req param's level < display param

function changeBCrumbs(param,lvl){
	//alert("Req param==="+param +"====lvl====="+lvl);
	var elems = document.getElementsByClassName("bCrumb");
	//alert("elems.length=="+elems.length);
	for (var i=0;i<elems.length;i++){
		//if(elems[i].id.indexOf(lvl) != -1){
			var tempParam=elems[i].id.split("|")[0];
			var val=elems[i].id.split("|")[1];
			//alert("val======>>>"+val+"========>>>"+lvl);
			//alert("Temp param==="+tempParam +"====lvl====="+val);
			
			if(param.trim() == tempParam.trim() && parseInt(val) == parseInt(lvl)){
				//alert("1st cond !!!");
				
				elems[i].style.display = 'none';
				var x = document.getElementById(elems[i].id);
			    x.remove(x.selectedIndex);
								  
				try {
					//alert(elems.length+"====i==="+i);
					elems[i].style.display = 'none';
					var x = document.getElementById(elems[i].id);
				    x.remove(x.selectedIndex);
				}
				catch(err){
					//alert(err);
					console.log(err);
				}
				
				try {
					//alert(elems.length+"====i==="+i);
					elems[i].style.display = 'none';
					var x = document.getElementById(elems[i].id);
				    x.remove(x.selectedIndex);
				}catch(err){
					//alert(err);
					console.log(err);
				}
				try {
					//alert(elems.length+"====i==="+i);
					elems[i].style.display = 'none';
					var x = document.getElementById(elems[i].id);
				    x.remove(x.selectedIndex);
				}catch(err){
					//alert(err);
					console.log(err);
				}
				try {
					//alert(elems.length+"====i==="+i);
					elems[i].style.display = 'none';
					var x = document.getElementById(elems[i].id);
				    x.remove(x.selectedIndex);
				}catch(err){
					//alert(err);
					console.log(err);
				}				
				//elems[i].value = tempParam;
			}
			
			else if(param.trim() != tempParam.trim() && parseInt(val) == parseInt(lvl)){
				//alert("2nd cond !!!");
				elems[i].style.display = 'none';
				var x = document.getElementById(elems[i].id);
			    x.remove(x.selectedIndex);
				//elems[i].value = tempParam;
			}
			
			if(parseInt(val) > parseInt(lvl)){
				//alert("3nd cond !!!");
				elems[i].style.display = 'none';
				var x = document.getElementById(elems[i].id);
			    x.remove(x.selectedIndex);
			}
			
		//} 
			
	}
			
}