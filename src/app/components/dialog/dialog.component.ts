import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  
  @Input() titulo: string = '';
  @Output() fechar = new EventEmitter<void>();
  
  constructor() { }

  ngOnInit(): void {
  }

  fecharDialog(){
    this.fechar.emit();
  }

}
