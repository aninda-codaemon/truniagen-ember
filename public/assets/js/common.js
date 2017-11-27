$ (document).ready(function(){
    
    
/*ajax  for country change event starts*/
$("#country").change(function(){
    var country_id = $("#country option:selected").attr("data-val");
    $.ajax({
        url: baseurl+"recurring/ajax_request_states",
        method:"POST",
        data:{countryid:country_id,addresstype:1},
        success:function(response){
        console.log(response);
        $("#content").html(response);

        },
        error:function(error){
         alert("An error occured"); 
        }
    });
});

/*ajax  for country change event ends*/
/*ajax  for billing country change event starts*/
$("#billing_country").change(function(){
    var country_id = $("#billing_country option:selected").attr("data-val");
    $.ajax({
        url: baseurl+"recurring/ajax_request_states",
        method:"POST",
        data:{countryid:country_id,addresstype:2},
        success:function(response){
        console.log(response);
        $("#content").html(response);

        },
        error:function(error){
         alert("An error occured"); 
        }
    });
});     
});

