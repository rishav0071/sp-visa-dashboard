import { Component, Output, EventEmitter } from "@angular/core";

@Component({
selector: 'app-model-layout-header',
template:`
<div class="modal-layout-header">
    <span (click)="closemodel()"><i type="button" class="fas fa-times"></i></span>
</div>
`
})

export class ModelLayoutHeaderComponent {
    @Output() closemodellayout: EventEmitter<boolean> = new EventEmitter();

    closemodel(){
        this.closemodellayout.emit(true);
    }
}