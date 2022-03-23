import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-dialogo',
  templateUrl: './dialogo.component.html',
  styleUrls: ['./dialogo.component.scss']
})
export class DialogoComponent implements OnInit {

  constructor(public dialog: MatDialogRef<DialogoComponent>,@Inject(MAT_DIALOG_DATA) public message: string) {

   }

  ngOnInit(): void {
  }
  onClickNo(){
    this.dialog.close();
  }
}
