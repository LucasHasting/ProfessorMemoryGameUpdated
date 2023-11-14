//global variables for proffesor names and image names
let professor_names;
let proffessor_images;

//function for all jquery functions
function jquery_functions() {
  //functionality for modal
  modal();

  //functionality for clicking on names and faces
  boxes("images");
  boxes("image-name");


  $(".images, .image-name").on("click", function () {
    //element array stores the box selected
    let element = [0, 0];

    //element index represents the index of each selected box
    let element_index = 0;

    //Loops for every image and name
    $(".images, .image-name").each(function () {
      //if something is selected
      if ($(this).css("border-color") === "rgb(0, 128, 0)") {
        //save the item selected and increase element index
        element[element_index] = this;
        element_index++;
      }
    });

    //If there are enough boxes selected
    if (element_index === 2) {
      //get the name selected and the professors face name selected
      if (element[0].nodeName === "IMG") {
        name1 = $(element[0]).attr("alt");
        name2 = $(element[1]).text();
        name2_text = $(element[1]).text();
      }
      else {
        name1 = $(element[1]).attr("alt");
        name2 = $(element[0]).text();
        name2_text = $(element[0]).text();
      }

      //make name2 comparable to name1
      name2 = name2.replaceAll(" ", "-");
      name2 = name2.replaceAll('"', '-');

      //if the names match
      if (name1 === name2) {
        //retrive array of names
        names = get_names();

        //set names by removing the items from the array
        set_names(remove_element(names[0], name1), remove_element(names[1], name2_text));
        
        //update names
        names = get_names();

        //remove html
        $(".images, .image-name, .row, .col-3").remove();

        //re-add html based on new names array
        add_info(names[0], names[1]);

        //reset jquery functionality
        jquery_functions();
      } else {
        //if the names do not match and the color of an item selected is not red
        if ($(this).css("border-color") != "rgb(255, 0, 0)")
          //make the item border red
          $(this).toggleClass('clicked_wrong');
      }

      //if all items have been removed
      if (get_names()[0].length === 0) {
        //display congrats message
        $("#win").append("<h2>Congratulations!</h2><h2>YOU WIN!</h2>");
      }
    }
  });
}

//funtion that removes an item from a list and returns that list
function remove_element(list, element) {
  const index = list.indexOf(element);
  list.splice(index, 1);
  return list;
}

//function to set jquery functionality to the name and face boxes
function boxes(class_name) {
  //if the class has been clicked
  $("." + class_name).on("click", function () {
    //flag is used to determin what can be clicked
    flag = true;

    //can't click on others
    $("." + class_name).each(function () {
      if (($(this).css("border-color") === "rgb(0, 128, 0)" || $(this).css("border-color") === "rgb(255, 0, 0)") && flag)
        flag = false;
    });

    //click on it
    if (flag) {
      //change border color to green
      $(this).toggleClass('clicked');
    }

    //click on it again - remove borders
    if ($(this).css("border-color") === "rgb(0, 128, 0)" && !flag) {
      $(this).toggleClass('clicked');
    } else if ($(this).css("border-color") === "rgb(255, 0, 0)" && !flag) {
      $(this).toggleClass('clicked_wrong');
      $(this).toggleClass('clicked');
    }
  });
}

//function for inserting bootstrap html col based on proffessor image
function col_image(name) {
  html = "";
  html += "<div class='col-3'>";
  html += "<img class = 'images' src = './images/" + name + ".png' alt = '" + name + "'>";
  html += "</div>";
  return html;
}

//function for inserting bootstrap html col based on proffessor name
function col_name(name) {
  html = "";
  html += "<div class='col-3'>";
  html += '<div class="card bg-light text-dark image-name justify-content-center align-items-center">';
  html += "<p>" + name + "</p>";
  html += "</div>";
  html += "</div>";
  return html;
}

//function for inserting empty bootstrap html col
function blank_col() {
  html = "";
  html += "<div class='col-3'>";
  html += "</div>";
  return html;
}

//function to create the image names based on proffessor names
function create_names(names) {
  image_names = []

  //copy array
  for (let i = 0; i < names.length; i++) {
    image_names.push(names[i]);
  }

  //prepare images names
  for (let i = 0; i < names.length; i++) {
    names[i] = names[i].replaceAll(" ", "-");
    names[i] = names[i].replaceAll('"', '-');
  }

  //shuffle everything
  names.sort(() => Math.random() - 0.5);
  image_names.sort(() => Math.random() - 0.5);

  //update names
  set_names(names, image_names);
}

//returns the names as a 2D array
function get_names() {
  return [professor_names, proffessor_images];
}

//updates the names 
function set_names(names, image_names) {
  professor_names = names;
  proffessor_images = image_names
}

//function used to append to html
function add_info(names, image_names) {
  //declare empty html string
  let html = "";

  //columns stores amount of columns allowed on screen
  columns = 4;

  //row stores the bootstrap row in html
  let row = '<div class="row mt-3 rows">';

  //add row
  html += row;

  //keep track of image index
  image_index = 0;

  //keep track of name index
  name_index = 0;

  //flag used to determine what is placed on screen
  flag = true;

  //loop for every item
  for (let i = 0; i < names.length * 2; i++) {
    //create every row
    if (i % columns == 0) {
      html += "</div>"
      html += row;
    }

    //names is allowed
    if (i % columns == 2) {
      flag = false;
    }

    //images is allowed
    else if (i % columns == 0) {
      flag = true;
    }

    if (flag) {
      //add images
      if (image_index < names.length) {
        html += col_image(names[image_index]);
        image_index++;
      }
      else if (name_index < names.length) {
        //if no more images, add blank col and go to next name
        html += blank_col();
        html += col_name(image_names[name_index]);
        name_index++;
      }
    }
    else {
      //add names
      html += col_name(image_names[name_index]);
      name_index++;
    }

  }
  //end html and append
  html += "</div>";
  $("#images").append(html);
}

//functionality for the modal
function modal() {
  // Get the modal
  var modal = document.getElementById("myModal");

  // Get the button that opens the modal
  var btn = document.getElementById("myBtn");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks on the button, open the modal
  btn.onclick = function () {
    modal.style.display = "block";
  }

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}