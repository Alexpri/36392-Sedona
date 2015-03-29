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

    })
  };

  for(var i = 0; i < minus.length; i++) {

    minus[i].addEventListener("click", function (event) {
      event.preventDefault();

      var count = this.parentNode.querySelector(".counter-input");
      var val = (parseInt(count.value) - 1);

      if (val < 0 ) val = 0;

      count.value =  val;

    })
  };


  for(var i = 0; i < plus.length; i++) {

    input[i].addEventListener("blur", function (event) {
      event.preventDefault();

      if (isNaN(this.value)) this.value = 0;

    })

  };


  //_____Send-form____



  /*xhr.open("get", "/send?" + qs);*/


  var elements = document.querySelectorAll(".response input[type=text]");
  var qs = "";

  for(var i = 0; i < elements.length; i++) {
    var element = elements[i];

    var name = element.name;
    var value = element.value;

    qs = qs + encodeURIComponent(name) + "=" + encodeURIComponent(value) + "&";


  }

  var xhr = new XMLHttpRequest();


  xhr.open("post", "/send");

  xhr.addEventListener("readystatechange", function() {
    if (xhr.readyState == 4) {
    console.log(xhr.responseText);
    }
  });

  xhr.send(qs);




})();



/*var xhr = new XMLHttpRequest();

  xhr.open("get", "hello.txt");

  xhr.addEventListener("readystatechange", function() {
    if (xhr.readyState == 4) {
    console.log(xhr.responseText);
    }
  });

  xhr.send();*/