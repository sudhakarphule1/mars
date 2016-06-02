import {Component, Input} from 'angular2/core';
import {MATERIAL_DIRECTIVES} from "ng2-material/all";
import {TimeAgoPipe} from "angular2-moment/TimeAgoPipe";
import {EmailService} from "./../../order/services/email.service"
import {Email} from "../../model/email";

@Component({
  selector: 'ib-email-compact-view',
  templateUrl: 'app/inbox/item-views/email-compact-view.html',
  styles: [ require('./list-view.scss') ],
  directives: [MATERIAL_DIRECTIVES],
  pipes: [TimeAgoPipe],
  inputs: ['email','isDisabled']
})
export class EmailCompactView {
  @Input() email:Email;
  @Input() selected:string;

  showDetails = false;
  replyText: string = "";
  reply :Boolean = false;


  constructor(private emailService: EmailService){
  }

  sendReply(){
    this.reply = false;
    console.log(this.reply);
    console.log("email => "+this.email.from[0].address);
    console.log("reply text => "+this.replyText);
    var replyEmail ={from:this.email.to[0].address,
      "to": this.email.from[0].address,
      "subject": this.email.subject,
      "text": this.replyText,
      /*"html": "Hello world ",*/
      "replyTo": this.email.to[0].address,
      "inReplyTo" : this.email.messageId,
      "references": [this.email.messageId],
      "date": new Date(),
      "id":this.email._id
    }

    console.log("replay email body =>" +JSON.stringify(replyEmail));
    this.emailService.replyEmail(replyEmail).subscribe(
      function(){
        alert("mail sent.");
      }
      /*() => console.log("Your mail sent successfully ."),
      err => console.log( "There is some problem with sending your mail.")*/
    );
  }

}
