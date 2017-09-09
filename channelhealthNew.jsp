<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/resources/css/channelhealth.css">
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Channel Health</title>
<script type = "text/javascript" 
         src = "http://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
<script type = "text/javascript" 
         src = "<%=request.getContextPath()%>/resources/js/channelhealth.js"></script>

<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
<script type="text/javascript">
google.charts.load('current', {'packages':['corechart']});
setInterval("getStatus()", 190000);
</script>         
</head>
<body onload="getStatus()">
	<div class="header">
		<div class="logo"></div>
		<div class="Title">Channels' Health</div>
	</div>
	<div class="body">
		<div class="parts" id="ari-channels">
			<div class="head">
				<div class="cap">
				</div>
				<div class="cap" id="timedate"></div>
			</div>
			<div class="data-body">
				<div class="Table" id="table-title">
				    <div class="Heading">
				        <div class="Cell">
				            <p>Channel Name</p>
				        </div>
				        <div class="Cell">
				            <p>Status</p>
				        </div>
				    </div>
				</div>
				<div class="Table" id="ari-table-data">
				</div>
			</div>
		</div>
	</div>
</body>
</html>