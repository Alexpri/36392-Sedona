(function() {
  //_____Validation-count____

  var func = {

   /* init: function(){
          func.validation();
          func.pic();
      }(),*/

    validation: function() {

      var plus = document.querySelectorAll(".plus"),
          minus = document.querySelectorAll(".minus"),
          input = document.querySelectorAll(".counter-input"),
          travelers = document.querySelector(".travelers"),
          templateAdult = document.querySelector("#adult-template").innerHTML,
          templatechild = document.querySelector("#child-template").innerHTML;

      var tempAdd = function(count) {
            var div = document.createElement("div");

            div.classList.add("row", "temp");

            if (count.classList.contains("people-count")) {
              div.classList.add("adult");
              div.innerHTML = templateAdult;
            } else if (count.classList.contains("children-count")) {
              div.classList.add("child");
              div.innerHTML = templatechild;
            }

            travelers.appendChild(div);
          };

      var tempDel = {
            itemOne: function(count) {
              var tempAdult = document.querySelector(".travelers .adult:last-of-type"),
                  tempChild = document.querySelector(".travelers .child:last-of-type");

                if (count.classList.contains("people-count")) {
                  if (tempAdult) tempAdult.parentNode.removeChild(tempAdult);
                } else if (count.classList.contains("children-count")) {
                  if (tempChild) tempChild.parentNode.removeChild(tempChild);
                }
              },
            items: function(count) {
              var tempAdult = document.querySelector(".travelers .adult:last-of-type"),
                  tempChild = document.querySelector(".travelers .child:last-of-type");

                if (count.classList.contains("people-count")) {
                  while (tempAdult) {
                    tempAdult.parentNode.removeChild(tempAdult);
                    tempAdult = document.querySelector(".travelers .adult:last-of-type");
                  }
                } else if (count.classList.contains("children-count")) {
                  while (tempChild) {
                    tempChild.parentNode.removeChild(tempChild);
                    tempChild = document.querySelector(".travelers .child:last-of-type");
                  }
                }
              }
          };

      var tempInput = function(count, val) {
            tempDel.items(count);

            for (var i = 0; i < val; i++) {
              tempAdd(count);
            };
          };

      for(var i = 0; i < plus.length; i++) {

        plus[i].addEventListener("click", function (event) {
          event.preventDefault();

          var count = this.parentNode.querySelector(".counter-input"),
              val =  (parseInt(count.value) + 1);

          if (val > 10 ) val = 10;
          count.value =  val;

          tempAdd(count);
        });
      };

      for(var i = 0; i < minus.length; i++) {

        minus[i].addEventListener("click", function (event) {
          event.preventDefault();

          var count = this.parentNode.querySelector(".counter-input"),
              val = (parseInt(count.value) - 1);

          if (val < 0 ) val = 0;
          count.value =  val;

          tempDel.itemOne(count);
        });
      };

      for(var i = 0; i < input.length; i++) {

        input[i].addEventListener("input", function (event) {
          event.preventDefault();

          var count = this.parentNode.querySelector(".counter-input"),
              val = parseInt(this.value);

              console.log(val);

          if (isNaN(val)) {
            this.value = 0;
          } else if (val > 10) {
            this.value = 10;
          } else if (val < 0) {
            this.value = 0;
          }

          val = this.value;

          tempInput(count, val);
        });
      };
    }()
  };



  /*New*/
  var pict = {

    pictureUpload: function() {

      if(!("FormData" in window)|| !("FileReader" in window)) {
        return;
      }

      /*AJAX*/

      var form = document.querySelector(".response"),
          area = document.querySelector('.photo-area'),
          template = document.querySelector("#image-template").innerHTML,
          queue = [];

      form.addEventListener("submit", function(event) {
        event.preventDefault();

        var data = new FormData(form);

        request(data, function(response) {
          console.log(response);
        });
      });

      function request(data, func) {
        var xhr = new XMLHttpRequest();

        xhr.open("post", "/send?" + (new Date()).getTime());

        xhr.addEventListener("readystatechange", function() {
          if (xhr.readyState == 4) {
            func(xhr.responseText);
          }
        });

        xhr.send(data);
      }


      form.querySelector(".pictures").addEventListener("change", function() {
        var files = this.files;

        for (var i = 0; i < files.length; i++) {
          preview(files[i]);
        };

        this.value = "";
      });

      function preview(file) {
        if (file.type.match(/image.*/)) {
          var reader = new FileReader();

          reader.addEventListener("load", function(event) {
            var html = Mustache.render(template, {
              "image": event.target.result,
              "name": file.name
            });

            var div = document.createElement("div");
            div.classList.add("photo");
            div.innerHTML = html;

            area.appendChild(div);

            div.querySelector(".delete-photo").addEventListener("click", function(event) {
              event.preventDefault();

              removePreview(div);
            })

            queue.push({
              "file": file,
              "div": div
            });

          });

          reader.readAsDataURL(file);
        }
      }

      function removePreview(div) {
        queue = queue.filter(function(element) {
          return element.div != div;
        })

        div.parentNode.removeChild(div);
      }
    }(),
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

})();