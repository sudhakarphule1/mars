import {Component, OnInit} from '@angular/core';
import {MyDatePicker} from './mydatepicker';
import {bootstrap} from '@angular/platform-browser-dynamic'

@Component({
    selector: 'sample-date-picker',
    template: `<my-date-picker [options]="myDatePickerOptions" (dateChanged)="onDateChanged($event)" [selDate]="selectedDate"></my-date-picker>`,
    directives: [MyDatePicker]
})

class SampleDatePicker implements OnInit {
    private myDatePickerOptions = {
        todayBtnTxt: 'Today',
        dateFormat: 'dd.mm.yyyy',
        firstDayOfWeek: 'mo',
        sunHighlight: true,
        height: '34px',
        width: '260px'
    };
    selectedDate: string = '20.12.2015';

    constructor() {}

    ngOnInit() {
        console.log('onInit(): SampleDatePicker')
    }

    onDateChanged(event) {
        console.log('onDateChanged(): ', event.date, ' - formatted: ', event.formatted, ' - epoc timestamp: ', event.epoc);
    }
}
bootstrap(SampleDatePicker);
