import { Component, OnInit ,Inject  } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-cargar',
  templateUrl: './cargar.component.html',
  styleUrls: ['./cargar.component.scss']
})
export class CargarComponent implements OnInit {

  constructor(public dialog: MatDialogRef<CargarComponent>,@Inject(MAT_DIALOG_DATA) public message: string) { }

  ngOnInit(): void {
    setInterval(() => {
      this.dialog.close();
    }, 1000); 
    
  }

}
