import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-textarea-ins',
  templateUrl: './textarea-ins.component.html',
  styleUrls: ['./textarea-ins.component.scss']
})
export class TextareaInsComponent implements OnInit,OnChanges {
@Input() instruction!:string[];
@Output() sendinstriction:EventEmitter<any>= new EventEmitter();
instructionvalue:string;
listingtoggle:boolean = false;
@Input() type:{lable:string,placeholder:string,view:boolean,toltip:string};
  constructor() { }
  ngOnInit(): void {
     this.instructionset()
  }
  instructionset(){
    if(this.instruction.length){
      this.instructionvalue = this.instruction.join('#');
    }
  }
ngOnChanges(changes: SimpleChanges): void {
  //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
  //Add '${implements OnChanges}' to the class.
  if(this.instruction.length){
    this.instructionvalue = this.instruction.join('#');
  }
}

  changged(value:string){
    let ins:string[] = value.split('#');
    for(let i =0; i < ins.length; i++){
      if(ins[i].length){
        ins[i] = ins[i][0].toUpperCase() + ins[i].slice(1);
        ins[i] = ins[i].trim();
      }
    }
    this.instruction = ins;
    this.sendinstriction.emit(this.instruction)
  }
}
