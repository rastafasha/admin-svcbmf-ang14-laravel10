import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators, UntypedFormGroup, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/services/user.service';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-forms-users',
  templateUrl: './forms-users.component.html',
  styleUrls: ['./forms-users.component.css']
})
export class FormsUsersComponent implements OnInit {

  pageTitle: string;
  error: string;
  uploadError: string;
  imagePath: string;
  password: string;

  userForm: UntypedFormGroup;
  errors:any = null;

  // Registro
  public formSumitted = false;
  public registerForm = this.fb.group({
    username: ['', Validators.required],
    email: [ '', [Validators.required] ],
    password: ['', Validators.required],
    password2: ['', Validators.required],
    role: ['GUEST'],
    // terminos: [false, Validators.required],

  }, {
    validators: this.passwordsIguales('password', 'password2')

  });
  // Registro

  constructor(
    private fb: UntypedFormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private authService: AccountService,
  ) { }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');
    // if (id) {
    //   this.pageTitle = 'Edit Usuario';
    //   this.userService.getUser(+id).subscribe(
    //     res => {
    //       this.userForm.patchValue({
    //         name: res.name,
    //         surname: res.surname,
    //         password: res.password,
    //         role: res.role,
    //         is_active: res.is_active,
    //         id: res.id
    //       });
    //       this.imagePath = res.image;
    //     }
    //   );
    // } else {
    //   this.pageTitle = 'Create Usuario';
    // }

    this.userForm = this.fb.group({
      id: [''],
      username: ['', Validators.required],
      password: [''],
      first_name: ['', Validators.required],
      role: ['', Validators.required],
      last_name: [''],
      is_active: ['0'],
      image: [''],
    });
  }

  onSelectedFile(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.userForm.get('image').setValue(file);
    }
  }

  get username() { return this.userForm.get('username'); }
  get first_name() { return this.userForm.get('first_name'); }
  get last_name() { return this.userForm.get('last_name'); }
  get role() { return this.userForm.get('role'); }

  // save() {
  //   const formData = new FormData();
  //   formData.append('username', this.userForm.get('username').value);
  //   formData.append('password', this.userForm.get('password').value);
  //   formData.append('role', this.userForm.get('role').value);
  //   formData.append('first_name', this.userForm.get('first_name').value);
  //   formData.append('last_name', this.userForm.get('last_name').value);
  //   formData.append('is_active', this.userForm.get('is_active').value);
  //   formData.append('image', this.userForm.get('image').value);

  //   const id = this.userForm.get('id').value;

  //   if (id) {
  //     this.userService.updateUser(formData, +id).subscribe(
  //       res => {
  //         if (res.status === 'error') {
  //           this.uploadError = res.message;
  //         } else {
  //           this.router.navigate(['/usuarios']);
  //         }
  //       },
  //       error => this.error = error
  //     );
  //   } else {
  //     this.authService.crearUsuario(this.registerForm.value).subscribe(
  //       resp =>{
  //         Swal.fire('Registrado!', `Ya puedes ingresar`, 'success');
  //         this.ngOnInit();
  //       },(error) => {
  //         Swal.fire('Error', error.error.msg, 'error');
  //         this.errors = error.error;
  //       }
  //     );
     
  //   }
  // }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  passwordsIguales(pass1Name: string, pass2Name: string){
    return (formGroup: FormGroup) =>{
      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);
  
      if(pass1Control.value === pass2Control.value){
        pass2Control.setErrors(null)
      }else{
        pass2Control.setErrors({noEsIgual: true});
      }
    }
  }

  passwordNoValido(){
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;
  
    if((pass1 !== pass2) && this.formSumitted){
      return true;
    }else{
      return false;
    }
  }

}
