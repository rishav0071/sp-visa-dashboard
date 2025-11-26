import { HttpClient } from '@angular/common/http';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { forkJoin, from, of, Subscription } from 'rxjs';
import { IsLoading, Loading$ } from '../../@subject/subjects';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderComponent implements OnInit, AfterViewInit{
  isLoading: boolean = false;
  constructor(private cdRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.loaderActive();
  }

  ngAfterViewInit(){
    // this.arr$.subscribe((values) => {console.log(`Emitted Values: `, values)});
  }
  loaderActive() {
    Loading$.subscribe((data: any) => {
      this.isLoading = data;
      this.cdRef.detectChanges();
    })
  }

  close() {
    IsLoading(false);
  }

}
