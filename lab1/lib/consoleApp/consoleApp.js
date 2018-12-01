const config = require('./config/config');
const Menu = require('./menu/menu');
let menu = new Menu(config);


let app = async () => {
  while(true){
    menu.consoleClear();
    let number = menu.mainMenu();
    switch(number) {
      case 1:
        while(true) {
          menu.consoleClear();
          let number = menu.drivingSchoolMenu();
          await menu.printDrivingSchoolQuery(number);
          let q = menu.chooseNumber('Choose the number: ');
          if(q === 9) {
            break;
          }
        }
        break;
      case 2:
        while(true) {
          menu.consoleClear();
          let number = menu.instructorsMenu();
          await menu.instuctorsQueryMenu(number);
          let q = menu.chooseNumber('Choose the number: ');
          if(q === 9) {
            break;
          }
        }
        break;
      case 3: 
        while(true) {
          menu.consoleClear();
          let number = menu.groupsMenu();
          await menu.groupsQuery(number);
          let q = menu.chooseNumber('Choose the number: ');
          if(q === 9) {
            break;
          }
        }
        break;
      case 4:
        while(true) {
          menu.consoleClear();
          let number = menu.studentsMenu();
          await menu.studentsQueryMenu(number);
          let q = menu.chooseNumber('Choose the number: ');
          if(q === 9) {
            break;
          }
        }
        break;
      case 5: 
        menu.consoleClear();
        await menu.generateData();
        break;
      default: 
        break;
    }
  }
}

app()
  .then(() => {})
