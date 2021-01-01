import { BackendErrorsInterface } from './../../../types/backendErrors.interface';
import { Component, Input, OnInit } from "@angular/core";

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'mc-backend-error-messages',
  templateUrl: './backendErrorMessages.component.html',
  styleUrls: ['./backendErrorMessages.component.scss'],
})
export class BackendErrorMessagesComponent implements OnInit {
  // tslint:disable-next-line: no-input-rename
  @Input('backendErrors') backendErrorsProps: BackendErrorsInterface = {};

  errorMessages: string[] = [];

  ngOnInit(): void {
    this.errorMessages = Object
      .keys(this.backendErrorsProps)
      .map((name: string) => {
        const messages = this.backendErrorsProps[name].join(', ');
        return `${name} ${messages}`;
      })
  }
}