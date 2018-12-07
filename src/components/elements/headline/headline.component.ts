import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
declare var kendo: any;
@Component({
  selector: 'app-element-headline',
  templateUrl: './headline.component.html',
  styleUrls: ['./headline.component.scss']
})
export class HeadlineElementComponent implements OnInit {

  
  @ViewChild('editor') editorEl: ElementRef;
  constructor() { }

  ngOnInit() {
    kendo.jQuery(this.editorEl.nativeElement).kendoEditor({
     
      tools: [
        'bold',
        'italic',
        'underline',
        'strikethrough',
        'justifyLeft',
        'justifyCenter',
        'justifyRight',
        'justifyFull',
        'insertUnorderedList',
        'insertOrderedList',
        'indent',
        'outdent',
        'createLink',
        'unlink',
        'insertImage',
        'insertFile'
      ]

    });
  }


}
