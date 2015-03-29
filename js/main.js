(function() {

  //_____Navigation______


  var open = document.querySelector(".btn--open");
  var close = document.querySelector(".btn--cancel");
  var nav = document.querySelector(".nav");

  open.addEventListener("click", function (event) {
    event.preventDefault();

   nav.classList.add("active-nav");
  });

  close.addEventListener("click", function (event) {
    event.preventDefault();

   nav.classList.remove("active-nav");

  });


  //____Form-validation____

  var plus = document.querySelectorAll(".hotel-form__icon--plus");
  var minus = document.querySelectorAll(".hotel-form__icon--minus");
  var input = document.querySelectorAll(".hotel-form__input--sum");

  for(var i = 0; i < plus.length; i++) {

    plus[i].addEventListener("click", function (event) {
      event.preventDefault();

      var count = this.parentNode.querySelector(".hotel-form__input--sum");

      var val =  (parseInt(count.value) + 1);

      if (isNaN(val)) val = 0;

      count.value =  val;

    })
  };

  for(var i = 0; i < minus.length; i++) {

    minus[i].addEventListener("click", function (event) {
      event.preventDefault();

      var count = this.parentNode.querySelector(".hotel-form__input--sum");
      var val = (parseInt(count.value) - 1);

      if (val < 0 || isNaN(val)) val = 0;

      count.value =  val;

    })
  };

  for(var i = 0; i < plus.length; i++) {

    input[i].addEventListener("blur", function (event) {
      event.preventDefault();

      if (isNaN(this.value)) this.value = 0;

    })

  };



})();