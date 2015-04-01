(function() {

  //_____Form-validation____



  //_____Validation-count____

  var plus = document.querySelectorAll(".plus");
  var minus = document.querySelectorAll(".minus");
  var input = document.querySelectorAll(".counter-input");

  for(var i = 0; i < plus.length; i++) {

    plus[i].addEventListener("click", function (event) {
      event.preventDefault();

      var count = this.parentNode.querySelector(".counter-input");

      var val =  (parseInt(count.value) + 1);

      count.value =  val;

    });
  };

  for(var i = 0; i < minus.length; i++) {

    minus[i].addEventListener("click", function (event) {
      event.preventDefault();

      var count = this.parentNode.querySelector(".counter-input");
      var val = (parseInt(count.value) - 1);

      if (val < 0 ) val = 0;

      count.value =  val;

    });
  };


  for(var i = 0; i < plus.length; i++) {

    input[i].addEventListener("blur", function (event) {
      event.preventDefault();

      if (isNaN(this.value)) this.value = 0;

    });

  };


  //_____Send-form____


 /* var elements = document.querySelectorAll(".response input[type=text]");
  var radio = document.querySelector(".response [name=feedback]:checked");
  var checkboxes = document.querySelectorAll(".response input[type=checkbox]:checked");



  var qs = "";

  //_______Text-input_______

  for(var i = 0; i < elements.length; i++) {
    var element = elements[i];

    var name = element.name;
    var value = element.value;

    qs = qs + encodeURIComponent(name) + "=" + encodeURIComponent(value) + "&";


  }



  //_______radio-input_______
  (function () {

    var name = radio.name;
    var value = radio.value;

    qs = qs + encodeURIComponent(name) + "=" + encodeURIComponent(value) + "&";

  })();


  //_______checkbox-input_______

  for(var i = 0; i < checkboxes.length; i++) {
    var checkbox = checkboxes[i];

    var name = checkbox.name;
    var value = checkbox.value;

    qs = qs + encodeURIComponent(name) + "=" + encodeURIComponent(value) + "&";

  }*/


  if(!("FormData" in window)) {
    return;
  }

  var form = document.querySelector(".response");


  form.addEventListener("submit", function(event) {
    event.preventDefault();
    var data = new FormData(form);

    request(data, function(response) {
      console.log(response);
    });
  });

  function request(data, fn) {

    var xhr = new XMLHttpRequest();

    xhr.open("post", "/send?" + (new Date()).getTime());
    xhr.addEventListener("readystatechange", function() {
      if (xhr.readyState == 4) {
        fn(xhr.responseText);
      }
  });

  xhr.send(data);

  }

})();