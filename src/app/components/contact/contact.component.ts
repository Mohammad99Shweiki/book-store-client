import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {ContactService} from '../../services/contact/contact.service';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  emailControl: FormControl = new FormControl('', [Validators.required, Validators.email]);
  messageControl: FormControl = new FormControl('', [Validators.required]);
  sendingError: boolean = false;
  requestInProgress: boolean = false;

  constructor(private contactService: ContactService, private title: Title) {
  }

  ngOnInit(): void {
    this.title.setTitle('Contact - BookStore');
  }

  sendContactData(): void {
    this.requestInProgress = true;
    this.sendingError = false;
    const data: { contactEmail: string, messageText: string } = {
      contactEmail: this.emailControl.value,
      messageText: this.messageControl.value
    };
    this.contactService.sendContactMessage(data).subscribe((result: boolean) => {
      this.requestInProgress = false;
      if (result) {
        this.emailControl.reset();
        this.messageControl.reset();
      } else {
        this.sendingError = true;
      }
    });
  }

}
