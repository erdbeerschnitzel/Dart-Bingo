/**
 * client side script for registration input elements
 **/

import 'dart:html';

main() => query('#register').on.click.add(registerHandler);


void registerHandler(registerevent){

  query('#registerdiv').style.visibility = "visible";
  query('#login').style.visibility = "hidden";
}