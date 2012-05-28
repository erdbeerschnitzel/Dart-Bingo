#import('dart:html');

void main() {
  show('something');
}

void show(String message) {
  document.query('#status').innerHTML = message;
}
