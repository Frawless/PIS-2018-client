import {Component, Output, EventEmitter } from '@angular/core';

@Component( {
    selector: 'image-preview',
    styleUrls: [ './image-preview.css' ] ,
    templateUrl: './image-preview.html'
} )

export class MtImagePreviewComponent {
    // Emit an event when a file has been picked. Here we return the file itself
    @Output() onChange: EventEmitter<File> = new EventEmitter<File>();

    source = '';

    constructor() {}

    // If the input has changed(file picked) we project the file into the img previewer
    updateSource($event: Event) {
        // We access he file with $event.target['files'][0]
        this.projectImage($event.target['files'][0]) ;
    }
    // Uses FileReader to read the file from the input

    projectImage(file: File) {
        const reader = new FileReader;
        // TODO: Define type of 'e'
        reader.onload = (e: any) => {
        // Simply set e.target.result as our <img> src in the layout
            this.source = e.target.result;
            this.onChange.emit(file);
        } ;
        // This will process our file and get it's attributes/data
        reader.readAsDataURL(file) ;
    }
}
