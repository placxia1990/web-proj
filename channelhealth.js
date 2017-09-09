function getDataUrl(){
	var reqNor="";
	var reqErr="";
	var formatted="";
	var totalNoReq=0;
	var errChk="F";
	var downChkFlg="F";
	var xhttp = new XMLHttpRequest();
	  xhttp.onreadystatechange = function() {
	    if (xhttp.readyState == 4 && xhttp.status == 200) {
	    	var responseTxt = xhttp.responseText;
	    	
	    	var response = responseTxt.replace("[", "");
	    	response = responseTxt.replace("]", "");
	    	
	    	response=response.split("|");
	    	var dateTime=response[0].split("#");
	    	
	    	console.log("responseTxt ======== "+responseTxt);
	    	console.log("response length ==== "+response.length);
	    	console.log("response =========== "+responseTxt);
	    	console.log("=====================================================================");
	    	
        	if(response.length == 4){
        		reqNor=response[1].split(",");
        		reqErr=response[2].split(",");
        		//console.log(reqNor+"----"+reqErr);
        		for(var i = 0; i < reqNor.length; i++){
        			var paramData=reqNor[i].split("=");
        			var url="/channelhealth/fT/getChannelReqCount/"+paramData[0].trim();
        			errChk="F";
        			downChkFlg="F";
        			var statusID="status-up";
        			//=================================
        			if(response[3]!=""){
        				if(response[3].indexOf(paramData[0].trim()) != -1){
        					downChkFlg="T";
        					statusID="status-down";
        				}
        			}
        			        			        			
        			//===================================
        			for(var j = 0; j < reqErr.length; j++){
        				var paramDataErr=reqErr[j].split("=");
        				if(paramData[0].trim() == paramDataErr[0].trim()){
        					NorReq=parseInt(paramData[1].trim()) - parseInt(paramDataErr[1].trim());
        					var percentage=parseFloat((parseInt(paramDataErr[1].trim()) / parseInt(paramData[1].trim())) * 100).toFixed(2);
            				formatted=formatted+"<div class='Row'><div class='Cell'><p><a id="+paramData[0].trim()+" href='#' onclick=\"getChannelData('"+url+"','"+paramData[0].trim()+"')\">"+paramData[0]+"</a></p></div><div class='Cell'><p class='count'><abbr title='Total no of Request'>"+paramData[1].trim()+"</abbr> <abbr title='No of Success Request'>"+NorReq+"</abbr> <abbr title='No of Error Request'>"+paramDataErr[1].trim()+"</abbr> <abbr title='Error Request Percentage'>"+percentage+"% </abbr></p><abbr id='channel-status' title='Channel Status'><div class='status' id='"+statusID+"'></div></abbr></div></div>";
            				errChk="T";
        				}
        			}        			       			
        			if(errChk=="F"){
        				formatted=formatted+"<div class='Row'><div class='Cell'><p><a id="+paramData[0].trim()+" href='#' onclick=\"getChannelData('"+url+"','"+paramData[0].trim()+"')\">"+paramData[0]+"</a></p></div><div class='Cell'><p class='count'><abbr title='Total no of Request'>"+paramData[1].trim()+"</abbr> <abbr title='No of Success Request'>"+paramData[1].trim()+"</abbr> <abbr title='No of Error Request'>0</abbr> <abbr title='Error Request Percentage'>0%</abbr></p><abbr id='channel-status' title='Channel Status'><div class='status' id='"+statusID+"'></div></abbr></div></div>";
        			}
        			
        		}
        		document.getElementById("timedate").innerHTML=dateTime[0]+" To "+dateTime[1];
        		document.getElementById("ari-table-data").innerHTML=formatted;
        	}/*else{
        		//alert("inside length !=3");
        		reqNor=response[1].split(",");
        		reqErr=response[2].split(",");
        		for(var i = 0; i < reqNor.length; i++){
        			var paramData=reqNor[i].split("=");
        			totalNoReq=parseInt(paramData[1].trim());
        			formatted=formatted+"<div class='Row'><div class='Cell'><p id='"+paramData[0]+"-head'>"+paramData[0]+"</p></div><div class='Cell'><p class='count' id='"+paramData[0]+"-cnt'>"+totalNoReq+" "+paramData[1].trim()+" 0</p></div></div>";
        		}
        		document.getElementById("ari-table-data").innerHTML=formatted;
        	}*/
	    }
	  };
	  //showLoading();
	  xhttp.open("GET", "/channelhealth/fT/getARIChannelsReqCount", true);
	  xhttp.send();
}
function getChannelData(url,channelName){
	var trendMin=document.getElementById("trend-min").value;
	alert(trendMin);
    url=url+"/"+trendMin;
	alert("Url====="+url);

	var xhttp = new XMLHttpRequest();
	  xhttp.onreadystatechange = function() {
	    if (xhttp.readyState == 4 && xhttp.status == 200) {
	    	res = xhttp.responseText;
	    	//alert(res);
	    	
	    	colChartTrend(res,channelName);
	    	genAnimation("#"+channelName);
	    }
	  };
	  xhttp.open("GET", url, true);
	  xhttp.send();
}

function colChartTrend(data,channelName){
	data=data.replace("[","");
	data=data.replace("]","");
	//alert("colChartTrend -----"+data);
	var dataSet=data.split(",");
  	var mainArrResv = [['Date','Total Req','Err Req']];
  	var trendMin=document.getElementById("trend-min").value;
	for (var i = 0; i < dataSet.length; i++) {
		var param=dataSet[i].split("|");
		var childArr = new Array();
		childArr[0] = param[0].trim().split(" ")[1];
		childArr[1] = parseInt(param[1].trim());
		childArr[2] = parseInt(param[2].trim());	
		
		mainArrResv.push(childArr);
	}
	//alert(mainArrResv[0]);
	var data = google.visualization.arrayToDataTable(mainArrResv);
	var options = {
			title: 'Trend Analysis of '+channelName+' for last '+trendMin+" Minutes",
			hAxis : { 
		        textStyle : {
		            fontSize: 12 // or the number you want
		        },
		        slantedText:true,
		        slantedTextAngle:45
		    },
		    vAxis : { 
		        textStyle : {
		            fontSize: 12 // or the number you want
		        },
		        gridlines: { 
		        	count: 8,
		        }
		    }
    };
   
   document.getElementById("ari-channels").style.display="none";
   document.getElementById("ari-analytic").style.display="block";
   var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
   chart.draw(data, options);	   	
}


function getStatus(){
	var time="";
	var xhttp = new XMLHttpRequest();
	  xhttp.onreadystatechange = function() {
	    if (xhttp.readyState == 4 && xhttp.status == 200) {
	    	res = xhttp.responseText;
	    	//console.log("loadDataRes Hitting===========>>>>>"+res);
	    	res=res.replace("[\"","");
	      	res=res.replace("\"]","");
	      	//res=res.replace("\"","");
	      	console.log("loadDataRes Hitting===========>>>>>"+res);
		  	var dataSet = res.split(",");
		  	for (var i = 0; i < dataSet.length; i++) {
		  		var paramData=dataSet[i].split("|");
		  		time=paramData[0].trim();
		  		formatted=formatted+"<div class='Row' id='data-row'><div class='Cell'><p>"+paramData[1]+"</p></div><div class='Cell'><p class='count'>"+paramData[2]+"</p></div></div>";
		  	}		  	
		  	document.getElementById("timedate").innerHTML=time;
    		document.getElementById("ari-table-data").innerHTML=formatted;
	    }
	  };
	  //showLoading();
	  xhttp.open("GET", "/channelhealth/fT/getStatus", true);
	  xhttp.send();
}

function genAnimation(id){
	$( id ).click(function() {
		  $( "#ari-analytic" ).toggle( "slide" );
	});			 
}
function homeWindow(){
	document.getElementById("ari-channels").style.display="block";
	document.getElementById("ari-analytic").style.display="none";
}



