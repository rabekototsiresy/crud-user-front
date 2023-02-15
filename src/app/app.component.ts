import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { extract } from './common/utils';
import { UserService } from './services/user/user.service';
import { IResponse } from './shared/interfaces/IResponse';
import { User } from './shared/models/User';
import { NgxSpinnerService } from "ngx-spinner";
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Curd User Manatalent';
  modalRef?: BsModalRef;
  public userList: User[]  = [];
  public user: User = {} as User;
  public titleModal = '';
  public isAdd: boolean = false;
  constructor(
    private userService: UserService, 
    private modalService: BsModalService,
  ){}

  ngOnInit(): void {
    this.userService.getAllUser().subscribe(
      ({ data }) => {
        this.userList =  data as User[]
      }
    )
  }

  openAddModal(template: TemplateRef<any>, btn: TemplateRef<any>  | any, user?: User) {
    if(user) {
      this.isAdd = false;
      this.titleModal = 'Edit user';
      this.user = user;
    } else {
      this.isAdd = true;
      this.titleModal = 'Add user';
    }
    this.modalRef = this.modalService.show(template);
  }

  addUser(btn: TemplateRef<HTMLButtonElement>  | any) {
    btn.disabled = true;
    if(this.isAdd) {
      this.userService.createUser(this.user).subscribe(
        ({ data }) => {
          this.userList =  [...this.userList, data as User];
          btn.disabled = false;
          this.closeModal()
        }
      )
    } else {
      const rest = extract(this.user,'_id','__v')
      this.userService.updateUserById(this.user,rest._id).subscribe(
        ({ data }) => {
          Object.assign(this.user,rest);
          btn.disabled = false;
          this.closeModal()
        }
      )
    }
  }

  deleteUser(id: String = '') {
    this.userService.deleteUerById(id).subscribe(
      ({ data }) => {
        this.userList =  this.userList.filter((user: User) => user._id !== id);
      }
    )
  }
  
  openDetailUser(template: TemplateRef<any>,id: string = '') {
    this.userService.getUserById(id).subscribe(
      ({ data }) => {
        this.user = data as User;
      }
    )
    this.modalRef = this.modalService.show(template);
  }
  
  closeModal() {
    this.modalRef?.hide();
    this.user = {} as User;
  }
}
