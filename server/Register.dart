#import('dart:html');

main(){
  
  document.query('#register').on.click.add(registerHandler);
}

void registerHandler(registerevent){
  
  document.query('#registerdiv').style.visibility = "visible";
  document.query('#login').style.visibility = "hidden";
}