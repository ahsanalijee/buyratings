

<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
	<h1 align="center">Thank You For You Submition</h1>
	<h4 align="center">We Will Contact You Shortly</h4>
	<a  class="btn btn-default" style="margin: auto; display: block; width:300px"  href="<?php echo site_url()?>">Back To Home</a>
<p style="margin: auto; display: block; width:300px">You'll be automatically redirected in <span id="count">5</span> seconds...</p>
<?php
$url=site_url();
header('Refresh: 5; URL='.$url);
?> 


<script type="text/javascript">

window.onload = function(){

(function(){
  var counter = 5;

  setInterval(function() {
    counter--;
    if (counter >= 0) {
      span = document.getElementById("count");
      span.innerHTML = counter;
    }
    // Display 'counter' wherever you want to display it.
    if (counter === 0) {
    //    alert('this is where it happens');
        clearInterval(counter);
    }

  }, 1000);

})();

}

</script>