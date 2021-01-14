import { Component, OnInit } from '@angular/core';
import {faFacebook, faTwitter, faInstagram} from '@fortawesome/free-brands-svg-icons';
import {IconDefinition} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-socials',
  templateUrl: './socials.component.html',
  styleUrls: ['./socials.component.css']
})
export class SocialsComponent implements OnInit {
  faFacebook: IconDefinition = faFacebook;
  faTwitter: IconDefinition = faTwitter;
  faInstagram: IconDefinition = faInstagram;

  constructor() { }

  ngOnInit(): void {
  }

}
