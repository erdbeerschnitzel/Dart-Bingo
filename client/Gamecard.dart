part of onlinebingosingleplayer;
/**
 * represents a bingo gamecard
 * 5x5 fields
 * string values
 **/
class Gamecard {

  List<List<String>> fields;

  RandomNumberGenerator RNG;

  Gamecard(){

    fields = new List<List<String>>();
    initFields();
  }

  /**
   * named constructor to create a gamecard
   * from a websocket msg sent by the server
   **/
  Gamecard.fromServer(String msg){

    // create a random card locally
    fields = new List<List<String>>();

    initFields();

    msg = msg.replaceFirst("GAMECARD:", "");

    List<String> liste = msg.split(",");

    // if not something is wrong with the msg
    if(liste.length >= 24){

      int count = 0;

      for(int x = 0; x < 5; x++){

        for(int i = 0; i < 5; i++){

          if(x == 2 && i == 2) {}
          else {

            fields[x][i] = liste[count];
            count++;
          }
        }
      }
    }
    else { print("Something is wrong with the server msg $msg");
    }
  }

  /**
   *  init the fields of a gamecard
   *  with random values
   **/
  void initFields(){

    RNG = new RandomNumberGenerator();

    for(int i = 0; i < 5; i++){

      fields.add(new List<String>());

      for(int x = 0; x < 5; x++){

        //create field in list
        fields[i].add("0");

        // middle of gamecard
        if(x == 2 && i == 2) { fields[i][x] = "";

        } else {

          int temp = RNG.getRandomNumber();
          fields[i][x] = temp.toString();
        }
      }
    }

  }

/**
 * creates the HTML string for this gamecard
 * checks if gamecard is for computer enemy
 *
 * TODO: make it less static
 **/
String createCardHTML(bool forComputer){

  StringBuffer cardstring = new StringBuffer();

  int i = 0;
  int x = 0;


  for(List liste in fields){

    // open tr element
    cardstring.write('<tr>');

    for(var value in liste){

      // adds a td element with specific class and specific value
      if(forComputer){

        if(x < 5 && i < 5) cardstring.write('<td id="c$i$x"class=top>${fields[i][x]}</td>');
      }

      else if(x < 5 && i < 5)  cardstring.write('<td id="p$i$x"class=top>${fields[i][x]}</td>');

      // close the tr element
      if(x == 4){

        cardstring.write('</tr>');
        x = 0;

      } else { x++;
      }

    }

    if(i == 4) { i = 0;
    } else { i++;
    }

  }

  return cardstring.toString();
}

/**
 * check the gamecard for bingo
 **/
bool checkBingo(){

  bool result = true;

  for(int i = 0; i < 5; i++){

    result = true;

    // horizontal check
    for(int x = 0; x < 5; x++){

      if(i == 2 && x == 2){}
      else if(fields[i][x] != "0") result = false;
    }

    if(result) return result;

    result = true;
    // vertical check
    for(int x = 0; x < 5; x++){

      if(i == 2 && x == 2) {}
      else if(fields[x][i] != "0") result = false;

    }

    if(result) return result;
  }

  return result;
}



  /**
   * convert a gamecard object to String
   * to be sent via Websockets
   **/
  String toWSMessage(){

    StringBuffer sb = new StringBuffer();

    sb.write("GAMECARD:");

    for(int i = 0; i < 5; i++){

      for(int x = 0; x < 5; x++){

        if(i == 0 && x == 0) { sb.write("${fields[i][x]}");

        } else {

          if(i == 2 && x == 2) {}
          else { sb.write(",${fields[i][x]}");
          }

        }
      }
    }

    return sb.toString();
  }


  /**
   * update field in gamecard with specific number (taken as string)
   * sets field to value "0" which indicates a marked field
   **/
  void updateField(String a){

    for(int x = 0; x < 5; x++){

      for(int i = 0; i < 5; i++){

        if(x == 2 && i == 2) {}
        else if(fields[x][i] == a) fields[x][i] = "0";

      }
    }
  }

}
