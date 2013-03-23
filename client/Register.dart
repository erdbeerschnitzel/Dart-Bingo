/**
 * client side script for registration input elements
 **/

import 'dart:html';

main() => query('#register').onClick.listen(registerHandler);


void registerHandler(registerevent){

  query('#registerdiv').style.visibility = "visible";
  query('#login').style.visibility = "hidden";
}