import { Component, OnInit } from '@angular/core';
import { BanverticalService } from '../../../services/ban-vertical.service';
import { Banvertical } from '../../../models/ban-vertical';
import { Location } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpBackend} from '@angular/common/http';

@Component({
  selector: 'app-manage-bannvertical',
  templateUrl: './manage-bannvertical.component.html',
  styleUrls: ['./manage-bannvertical.component.css']
})
export class ManageBannverticalComponent implements OnInit {

  title = 'Manage Banner Vertical';
  banverticals: Banvertical;
  error: string;
  isAgregar:boolean= true;
isEditar:boolean= false;

  ServerUrl = environment.apiUrl;
  private http: HttpClient;

  p: Number = 1;
  count: Number = 10;

  constructor(
    public banverticalService: BanverticalService,
    private location: Location,
    handler: HttpBackend) {
    this.http = new HttpClient(handler);
   }

  ngOnInit() {
    this.banverticalService.getBanverticals().subscribe((resp:any)=>{
      this.banverticals = resp.banverticals.data;
    })
  }

  onDelete(id: number) {
    if (confirm('Are you sure want to delete id = ' + id)) {
      this.banverticalService.deleteBanvertical(+id).subscribe(
        (res:any) => {
          ////console.log(res););
          this.ngOnInit();
        },
        error => this.error = error
      );
    }
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

}
