/**
 * client-side of Online-Bingo
 * singleplayer main
 **/
library onlinebingosingleplayer;
import 'dart:html';
import 'dart:math';
part 'Gamecard.dart';
part 'RandomNumberGenerator.dart';

// globals
Gamecard _playercard;
Gamecard _computercard;
RandomNumberGenerator _RNG;
int _currentNumber = 42;

bool _active = false;
bool _first = true;

void main() {

 // init some Objects

 _computercard = new Gamecard();

 _playercard = new Gamecard();

 // attach handlers
 query('#getGamecard').on.click.add(GamecardHandler);

 query('#startGame').on.click.add(GameHandler);

 query('#Bingo').on.click.add(BingoHandler);

 show('Welcome to Bingo');
}

// **** HANDLERS ****
// ******************

// handles gamecard creating
void GamecardHandler(gamecardevent){

    _RNG = new RandomNumberGenerator();

    _computercard = new Gamecard();

    _playercard = new Gamecard();

    query('#playertable').innerHTML = _playercard.createCardHTML(false);

    addCellClickHandlers();

    query('#computertable').innerHTML = _computercard.createCardHTML(true);

    show("Gamecards created!");

    _first = false;
}

// handle next number and computer logic
void GameHandler(gameevent){

  if(!_first){

    _currentNumber = _RNG.getRandomNumber();
    show("The current number is $_currentNumber");

    for(int i = 0; i < 5; i++){

      for(int x = 0; x < 5; x++){

        if(_computercard.fields[i][x] == _currentNumber.toString()){

          query('#c$i$x').style.textDecoration = 'underline';
          query('#c$i$x').style.backgroundColor = 'red';
          _computercard.fields[i][x] = "0";

          if(_computercard.checkBingo()) endGame();
        }
      }
    }

    _active = true;
    query('#getGamecard').on.click.remove(GamecardHandler);
    //
    query('#startGame').value = "Next Number";

  }
  else { show("Get some Gamecards first!");
  }

}


// handle bingo button
void BingoHandler(bingoevent){

  if(!_active) { show("You need to start the Game!");

  } else {

    if(_playercard.checkBingo()){
      _active = false;
      show("You have a Bingo! Congratulations!");
    }
    else { show("You don't have a Bingo!");
    }

  }

}

// **** Methods ****
// *****************

void show(String message) {

  query('#status').innerHTML = message;

}

void debug(String message) {

  query('#debug').innerHTML = message;

}

// add CellClickHandlers to playercard
void addCellClickHandlers(){

  for(int i = 0; i < 5; i++){

    for(int x = 0; x < 5; x++){

      if(i == 2 && x == 2) {}
      else {

        TableCellElement el = document.query('#p$i$x');

        el.on.click.add((event2) {

          if(_currentNumber.toString() == el.innerHTML.toString()){

            el.style.textDecoration = 'underline';
            el.style.backgroundColor = 'red';
            _playercard.fields[i][x] = "0";
          }

        });
      }
    }
  }
}



void endGame(){

  show("The computer has won the round!");

  document.query('#startGame').on.click.remove(GameHandler);
}

