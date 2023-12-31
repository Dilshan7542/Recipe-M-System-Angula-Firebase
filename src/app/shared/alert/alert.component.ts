import {Component, EventEmitter, Input, Output} from "@angular/core";

@Component({
  selector:"alert-component",
  templateUrl:"alert.component.html",
  styles:[`
    .backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: rgba(0, 0, 0, 0.75);
      z-index: 50;
    }

    .alert-box {
      position: fixed;
      top: 30vh;
      left: 30vw;
      width: 40vw;
      background-color: white;
      z-index: 100;
      padding: 16px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    }

    .alert-box-action {
      text-align: right;
    }
  `]
})
export class AlertComponent{
 @Input() message:string;
  @Output() onClose=new EventEmitter<void>();
  closeBtn() {
    this.onClose.emit();
  }
}
