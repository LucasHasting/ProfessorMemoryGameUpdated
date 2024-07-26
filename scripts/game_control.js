//data
let image_names = ["Morgan L. Etheredge",
  "J. Matt Colburn",
  "John D. Crabtree",
  "Barry A. Cumbie",
  "Sherri L. Hester",
  "Janet T. Jenkins",
  "Andrew N. Potter",
  "Daniel A. Ray",
  "Jill M. Simpson",
  "Mark G. Terwilliger",
  "Ning Wang",
  "Jason S. Watson",
  "Xihui \"Paul\" Zhang",
  "M. Shane Banks",
  "Kelly R. Irwin",
  "James A. Jerkins];

//driver function
function start() {
  //when the document is ready
  $(document).ready(function () {
    //create the image names
    create_names(image_names);

    //update image names variable
    image_names = get_names();

    //append html
    add_info(image_names[0], image_names[1]);

    //call jquery functionality
    jquery_functions();
  });
}

//call driver
start();
