import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
export class error{
  type : string 
  message : string

  constructor(){
    this.type = ''
    this.message = ''
  }
}
export interface formField{
  name : string
  label : string
  placeholder? : string
  type : string
  validator : Validators[]
  options? : any[]
  object? : string
  fieldName?: string[]
  errors? : error[]
}

@Component({
  selector: 'app-shared-form',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './shared-form.component.html',
  styleUrl: './shared-form.component.css'
})
export class SharedFormComponent implements OnInit{



  ngOnInit(): void {
    this.initializeForm()
  }
  @Input() fields : formField[] = []
  @Input() data :any = {}
  @Output() formSubmit = new EventEmitter<any>();
  @Output() formReset = new EventEmitter<void>();
  private fb = inject(FormBuilder);
  form!: FormGroup;
  initializeForm() {
    const controls: any = {};
    this.fields.forEach((field) => {
      controls[field.name] = [
        this.data[field.name] || '',
        field.validator || [],
      ];
    });
    this.form = this.fb.group(controls);
  }
  onSubmit() {
    if (this.form.valid) {
      this.formSubmit.emit(this.form.value);
    } else {
      console.error('Form không hợp lệ!');
    }
  }

  onReset() {
    this.form.reset(this.data);
    this.formReset.emit();
  }
  onOptionSelect(option: any, idField: string,nameField :string,fieldName : string): void {
    // Gán giá trị id vào form control
    this.form.get(fieldName)?.setValue(option[idField]);
  }
}
