import { Component, OnInit ,Inject  } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-echo',
  templateUrl: './echo.component.html',
  styleUrls: ['./echo.component.scss']
})
export class EchoComponent implements OnInit {

  constructor(public dialog: MatDialogRef<EchoComponent>,@Inject(MAT_DIALOG_DATA) public message: string) { }

  ngOnInit(): void {
    setInterval(() => {
      this.dialog.close();
    }, 3000); 
  }

}
