import { Component, OnInit } from '@angular/core';
import { BannhorizontalService } from '../../../services/ban-horizontal.service';
import { Banhorizontal } from '../../../models/ban-horizontal';
import { Location } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpBackend} from '@angular/common/http';

@Component({
  selector: 'app-manage-bannhorizontal',
  templateUrl: './manage-bannhorizontal.component.html',
  styleUrls: ['./manage-bannhorizontal.component.css']
})
export class ManageBannhorizontalComponent implements OnInit {

  title = 'Manage Banner Horizontal';
  banhorizontals: Banhorizontal;
  error: string;

  ServerUrl = environment.apiUrl;
  private http: HttpClient;

  p: Number = 1;
  count: Number = 10;

  constructor(
    public bannhorizontalService: BannhorizontalService,
    private location: Location,
    handler: HttpBackend) {
    this.http = new HttpClient(handler);
   }

  ngOnInit() {
    this.bannhorizontalService.getBanhorizontals().subscribe((resp:any)=>{
      this.banhorizontals = resp.banhorizontals.data;
    })
  }

  onDelete(id: number) {
    if (confirm('Are you sure want to delete id = ' + id)) {
      this.bannhorizontalService.deleteBanhorizontal(+id).subscribe(
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
