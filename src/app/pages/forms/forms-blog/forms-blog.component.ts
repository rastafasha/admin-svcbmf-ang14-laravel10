import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../../services/blog.service';
import { UntypedFormBuilder, Validators, UntypedFormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CategoriaService } from 'src/app/services/categoria.service';
import { Categoria } from 'src/app/models/categoria';
import { Blog } from 'src/app/models/blog';



@Component({
  selector: 'app-forms-blog',
  templateUrl: './forms-blog.component.html',
  styleUrls: ['./forms-blog.component.css']
})
export class FormsBlogComponent implements OnInit {

  pageTitle: string;
  error: string;
  uploadError: string;
  imagePath: string;

  blogForm: UntypedFormGroup;

  blog_id: any;
  user: any;
  user_id: any;
  public FILE_AVATAR:any;
  public IMAGE_PREVISUALIZA:any ;
  public FILE_AVATAR_MOVIL:any;
  public IMAGE_PREVISUALIZA_MOVIL:any ;
  valid_form:boolean = false;
  valid_form_success:boolean = false;
  text_validation:any = null;
  categorias:Categoria;
  categoria:Categoria;
  category_id:Blog;

  constructor(
    private fb: UntypedFormBuilder,
    private blogService: BlogService,
    private router: Router,
    private ativatedRoute: ActivatedRoute,
    private location: Location,
    private categoriaService: CategoriaService,
  ) { }

  ngOnInit() {

    let USER = localStorage.getItem("user");// se solicita el usuario logueado
    this.user = JSON.parse(USER ? USER: ''); //  si no hay un usuario en el localstorage retorna un objeto vacio
    this.user_id = this.user.id;  //se asigna el doctor logueado a este campo para poderlo enviar en los
    this.getCategorias();
    this.ativatedRoute.params.subscribe((resp:any)=>{
      this.blog_id = resp.id; 
     })


    const id = this.ativatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.pageTitle = 'Edit Blog';
      this.blogService.getBlog(+id).subscribe(
        (res:any) => {
          this.blogForm.patchValue({
            title: res.blog.title,
            description: res.blog.description,
            is_featured: res.blog.is_featured,
            is_active: res.blog.is_active,
            category_id: res.blog.category_id,
            FILE_AVATAR: res.blog.avatar,
            id: res.blog.id
          });
          this.imagePath = res.image;
        }
      );
    } else {
      this.pageTitle = 'Create Blog';
    }

    this.blogForm = this.fb.group({
      id: [''],
      title: ['', Validators.required],
      description: ['', Validators.required],
      is_featured: [''],
      is_active: [''],
      category_id: [''],
      user_id: [''],
      image: [''],
    });

  }

  getCategorias(){
      this.categoriaService.getCategorias().subscribe((resp: any) => {
        this.categorias= resp.categories;
        // console.log(this.tiposdepagos);
      });
  }

  onChangeCategory(category_id: any): void {
    this.category_id = category_id;
    // console.log(cal);
  }

  loadFile($event:any){
    if($event.target.files[0].type.indexOf("image")){
      this.text_validation = 'Solamente pueden ser archivos de tipo imagen';
      return;
    }
    this.text_validation = '';
    this.FILE_AVATAR = $event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(this.FILE_AVATAR);
    reader.onloadend = ()=> this.IMAGE_PREVISUALIZA = reader.result;
  }

  get title() { return this.blogForm.get('title'); }
  get description() { return this.blogForm.get('description'); }

  onSubmit () {debugger
    const formData = new FormData();
    formData.append('title', this.blogForm.get('title').value);
    formData.append('description', this.blogForm.get('description').value);
    formData.append('is_featured', this.blogForm.get('is_featured').value);
    formData.append('is_active', this.blogForm.get('is_active').value);
    formData.append('category_id', this.blogForm.get('category_id').value);
    // formData.append('image', this.blogForm.get('image').value);
    formData.append('user_id', this.user_id);
    // formData.append('category_id', this.category_id+'');
    
    if(this.FILE_AVATAR){
      formData.append('imagen', this.FILE_AVATAR);
    }
    const id = this.blog_id;

    if (id) {
      this.blogService.updateBlog(formData, +id).subscribe(
        (res:any) => {
          if (res.status === 'error') {
            this.uploadError = res.message;
          } else {
            this.router.navigate(['/dashboard/blog']);
          }
        },
        error => this.error = error
      );
    } else {
      this.blogService.createBlog(formData).subscribe(
        (res:any) => {
          if (res.status === 'error') {
            this.uploadError = res.message;
          } else {
            this.router.navigate(['/dashboard/blog']);
          }
        },
        error => this.error = error
      );
    }
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  public onReady( editor ) {
    editor.ui.getEditableElement().parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement()
    );
  }



}
