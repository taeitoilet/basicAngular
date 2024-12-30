import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { user, userCreateRequest, userUpdateRequest } from '../model/class/user';
import { UserService } from '../services/user.service';
import { APIResponse } from '../model/interface/apiResponse';
import { role } from '../model/class/role';
import { RoleService } from '../services/role.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
declare var bootstrap: any; 
@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
  currentPage: number = 0;
  totalPages: number = 0;
  pageSize: number = 10;
  username : string = ''
  userService = inject(UserService);
  roleService = inject(RoleService)
  userList : user[] = []
  userObj : user = new user
  roleObj : role = new role
  roleList : role[] = []
  userResponse : user = new user()
  userCreateRequest : userCreateRequest = new userCreateRequest()
  userUpdateRequset : userUpdateRequest = new userUpdateRequest()
  private fb = inject(FormBuilder);
  userCreateForm = this.fb.group({
    role_name : [''],
    role_id: [0, Validators.required],
    user_name: ['', [Validators.required, Validators.minLength(3)]],
    user_password: ['', [Validators.required, Validators.minLength(6)]],
    user_fullname: ['', [Validators.required]],
    user_email: ['', [Validators.required, Validators.email]],
    user_phone: ['', [Validators.required, Validators.pattern(/^(03|07|08|09|01[2|6|8|9])([0-9]{8})$/)]],
    user_citizen_identification: ['', [Validators.required, Validators.pattern(/([0-9]{12})$/)]],
    user_address: ['', Validators.required],
    user_dob: ['', Validators.required]
  })
  userUpdateForm = this.fb.group({
    role_name : [''],
    role_id: [0, Validators.required],
    user_password: ['', [Validators.required, Validators.minLength(6)]],
    user_fullname: ['', [Validators.required]],
    user_email: ['', [Validators.required, Validators.email]],
    user_phone: ['', [Validators.required, Validators.pattern(/^(03|07|08|09|01[2|6|8|9])([0-9]{8})$/)]],
    user_citizen_identification: ['', [Validators.required, Validators.pattern(/([0-9]{12})$/)]],
    user_address: ['', Validators.required],
    user_dob: ['', Validators.required]
  })
  ngOnInit(): void {
    this.getAllUser()
    this.getAllRole()
  }
  onSave() {
    if (this.userCreateForm.valid) {
      this.userCreateRequest = {
        ...this.userCreateForm.value,
      }as typeof this.userCreateRequest;
      this.userService.createUser(this.userCreateRequest).subscribe((res: APIResponse) => {
        if (res.code == 1000) {
          alert("Create successfull")
          const modalElement = document.getElementById('createUser')
          const modalInstance = bootstrap.Modal.getInstance(modalElement)
          modalInstance.hide()
          this.getAllUser()
        } else {
          alert(res.message)
        }
      })
    }
  }

  roleItemClick(obj : role){
    this.userResponse.role = obj
    this.userCreateRequest.role_id = this.userResponse.role.role_id
    this.userObj.role = obj
    console.log(this.userObj.role)
  }
  getAllUser(){
    this.userService.getAllUser(this.currentPage, this.pageSize).subscribe((res: APIResponse) => {
      this.userList = res.result.content; 
      this.totalPages = res.result.totalPages; 
      this.userList = this.userList.filter(user => user.user_status !== "deleted");
      console.log(this.userList)
    })
  }
  changePage(page: number) {
    this.currentPage = page;

    this.getAllUser();
  }
  getAllRole(){
    this.roleService.getAllRole().subscribe((res : APIResponse)=>{
      this.roleList = res.result
    })
  }
  onDelete(id: number) {
    const isDelete = confirm("Do you want delete this ? ")
    if (isDelete) {
      this.userService.deleteUser(id).subscribe((res: APIResponse) => {
        if (res.code == 1000) {
          alert("Delete successfull")
          this.getAllUser()
        } else {
          alert(res.message)
        }
      })
    }

  }
  onActive(id: number) {
    const isActive = confirm("Do you want active this ? ")
    if (isActive) {
      this.userService.activeUser(id).subscribe((res: APIResponse) => {
        if (res.code == 1000) {
          alert("Active successfull")
          this.getAllUser()
        } else {
          alert(res.message)
        }
      })
    }
  }
  onUnactive(id: number) {
    const isActive = confirm("Do you want unactive this ? ")
    if (isActive) {
      this.userService.unactiveUser(id).subscribe((res: APIResponse) => {
        if (res.code == 1000) {
          alert("Unactive successfull")
          this.getAllUser()
        } else {
          alert(res.message)
        }
      })
    }

  }
  onUpdate(id: number) {
    // this.userUpdateRequset.role_id = this.userObj.role.role_id
    // this.userUpdateRequset.user_password = this.userObj.user_password
    // this.userUpdateRequset.user_fullname = this.userObj.user_fullname
    // this.userUpdateRequset.user_email = this.userObj.user_email
    // this.userUpdateRequset.user_phone = this.userObj.user_phone
    // this.userUpdateRequset.user_address = this.userObj.user_address
    // this.userUpdateRequset.user_citizen_identification = this.userObj.user_citizen_identification
    // this.userUpdateRequset.user_dob = this.userObj.user_dob
    // this.userUpdateRequset.user_money = this.userObj.user_money
    if (this.userUpdateForm.valid) {
      this.userUpdateRequset = {
        ...this.userUpdateForm.value,
      }as typeof this.userUpdateRequset;
      console.log(this.userUpdateRequset)
      this.userService.updateUser(this.userUpdateRequset, id).subscribe((res: APIResponse) => {
        if (res.code == 1000) {
          alert("Update successfull")
          const modalElement = document.getElementById('editUser')
          const modalInstance = bootstrap.Modal.getInstance(modalElement)
          modalInstance.hide()
          this.getAllUser()
        } else {
          alert(res.message)
        }
      })
    }
  }
  onEdit(data: user) {
    this.userObj = data
    this.userUpdateForm.patchValue({
      role_name : this.userObj.role.role_name,
      role_id: this.userObj.role.role_id,
      user_password: this.userObj.user_password,
      user_fullname: data.user_fullname,
      user_email: this.userObj.user_email,
      user_phone: this.userObj.user_phone,
      user_citizen_identification: this.userObj.user_citizen_identification,
      user_address: this.userObj.user_address,
      user_dob: this.userObj.user_dob
    });
  }
  // onSearch(title : string) {
  //   this.newsService.searchNews(title).subscribe((res: APIResponse) => {
  //     if (res.code == 1000) {
  //       this.newsResult = res.result
  //       alert("Search successfull")
  //     } else {
  //       alert(res.message)
  //     }
  //   })
  // }
  onReset(){
    this.userCreateRequest = new userCreateRequest()
    this.userResponse.role = new role()
  }
  onReset1(){
    this.userObj = new user()
  }
  onSearch(username : string){
    this.userService.findUser(username).subscribe((res : APIResponse) =>{
      if(res.code == 1000){
        this.userList = res.result
        if(res.result == null){
          alert("User not found")
          this.getAllUser()
        }
      }else{
        alert(res.message)
      }
    })
  }
}
