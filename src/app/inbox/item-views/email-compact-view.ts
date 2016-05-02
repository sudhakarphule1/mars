import {Component} from 'angular2/core';
import {MATERIAL_DIRECTIVES} from "ng2-material/all";
import {TimeAgoPipe} from "angular2-moment/TimeAgoPipe";
import {EmailService} from "./../../order/services/email.service"
/*import {EmailModel} from "./../../model/email"*/
/*import {LeftNavigation} from "./../../share/components/left.navigation.component";*/

@Component({
  selector: 'ib-email-compact-view',
  templateUrl: 'app/inbox/item-views/email-compact-view.html',
    styles: [ require('./list-view.scss') ],
  directives: [MATERIAL_DIRECTIVES],
  pipes: [TimeAgoPipe],
  inputs: ['email','isDisabled']
})
export class EmailCompactView {
  email;
  isPending = true;
  isInProgress = false;
  isComplete = false;
  showDetails = false;
  replyText: string = "";
  reply :Boolean = false;


  constructor(private emailService: EmailService){
  }

  sendReply(){
    console.log("email => "+this.email.from[0].address);
    console.log("reply text => "+this.replyText);
    var replyEmail ={from:this.email.to[0].address,
      "to": this.email.from[0].address,
      "subject": this.email.subject,
      "text": this.replyText,
      /*"html": "Hello world ",*/
      "replyTo": this.email.messageId,
      "inReplyTo" : this.email.messageId,
      "references": [this.email.messageId],
      "date": new Date(),
      "id":this.email.id
    }

    console.log("replay email body =>" +JSON.stringify(replyEmail));
    this.emailService.replyEmail(replyEmail).subscribe(
      () => console.log("Your mail sent successfully ."),
      err => console.log( "There is some problem with sending your mail.")
    );
  }

}
