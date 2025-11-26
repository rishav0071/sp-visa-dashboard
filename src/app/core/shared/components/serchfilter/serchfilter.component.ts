import { ChangeDetectionStrategy } from '@angular/compiler';
import { Component, OnInit,Input,Output,EventEmitter,ViewChild,ElementRef, AfterViewInit} from '@angular/core';
import { debounceTime, distinctUntilChanged, fromEvent, map } from 'rxjs';
import { searchFilter } from '../../typings/app.typings';

@Component({
  selector: 'searchFilter',
  templateUrl: './searchfilter.component.html',
  styles: [''],
})

export class SerchfilterComponent implements OnInit, AfterViewInit {
  @Input() action?:searchFilter;
  @Input() placeholder:string;
  @Output() sendSearchData:EventEmitter<string> = new EventEmitter();
  @ViewChild('searching', { static: true }) search: ElementRef;
  @Input() newAddOnClass:string = '';
  debounceTime = 500;
  filterdata:string;
  constructor() { }
  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const searchTerm = fromEvent<any>(this.search.nativeElement, 'keyup').pipe(
      map(event => event.target.value),
      debounceTime(this.debounceTime),
      distinctUntilChanged()
    )

    searchTerm.subscribe((res:string) =>{
      if(res.trim() !=''){
        if(this.action?.keyup){
          this.sendSearchData.emit(this.filterdata);
        }
      }else{
        this.sendSearchData.emit('');
      }
    })
    
  }

  filter(){
    this.sendSearchData.emit(this.filterdata);
  }

}
