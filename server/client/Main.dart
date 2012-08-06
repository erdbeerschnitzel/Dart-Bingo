/**
 * client side script for logout
 **/

#import('dart:html');

main() {
  
}


void logoutHandler(registerevent){
  
  query('#registerdiv').style.visibility = "visible";
  query('#login').style.visibility = "hidden";
}