$(document).ready(function () {

    $("#hiddenLi").hide();

    $("#mens_cat").mouseenter(function () {
        $('#hiddenLi').css('display' , 'flex')
        $("#hiddenLi").show();
    })


    $(" #hiddenLi").mouseleave(function () {

        $("#hiddenLi").hide().fadeOut();

    });
    

    $('#openbtn').on('click', function () {
        document.getElementById("mySidebar1").style.width = "300px";
        document.getElementById("main").style.marginLeft = "250px";

    })

    $('#closenav').on('click', function () {
        document.getElementById("mySidebar1").style.width = "0";
        document.getElementById("main").style.marginLeft = "0";
    })



    $("#hiddenLi2").hide();

    $("#women_cat").mouseenter(function () {
        $('#hiddenLi2').css('display' , 'flex')
        $("#hiddenLi2").show();
    })


    $("#hiddenLi2").mouseleave(function () {

        $("#hiddenLi2").hide().fadeOut()

    });


});

//mens_cat


