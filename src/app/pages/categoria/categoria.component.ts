import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/models/categoria';
import { AccountService } from 'src/app/services/account.service';
import { CategoriaService } from 'src/app/services/categoria.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categoria',
  standalone:false,
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  public categoria: Categoria;
  public categorias: Categoria;
    error: string;
    uploadError: string;
    tipoSeleccionado:boolean=false;
    title='Categorias';
    isLoading:boolean = false;
    name:string;
  description:string;
  
    constructor(
      private categoriaService: CategoriaService,
      private accountService: AccountService
    ) {}
  
    ngOnInit(): void {
      this.getMaterias();
      // this.accountService.closeMenu();
    }
  
    
    getMaterias() {
      this.isLoading = true;
      this.categoriaService.getCategorias().subscribe((resp: any) => {
        this.categorias= resp.categories;
        this.isLoading = false;
        // console.log(this.tiposdepagos);
      });
    }
  
  
    save() {
      const data = {
        name: this.name,
        description: this.description,
      };
      this.categoriaService
        .createCategory(data)
        .subscribe((resp: any) => {
          // console.log(resp);
          // this.precio_dia ;
          // this.tipo ='';
          Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Actualizado',
                        showConfirmButton: false,
                        timer: 1500,
                      });
          this.getMaterias();
        });
    }
  
    deleteCategory(cat: any) {
      this.categoriaService.deleteCategory(cat.id)
        .subscribe((resp: any) => {
          this.getMaterias();
        });
    }

}
