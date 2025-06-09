import { Component, OnInit } from '@angular/core';
import { SliderService } from '../../../services/slider.service';
import { Slider } from '../../../models/slider';
import { Location } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpBackend} from '@angular/common/http';

@Component({
  selector: 'app-manage-slider',
  templateUrl: './manage-slider.component.html',
  styleUrls: ['./manage-slider.component.css']
})
export class ManageSliderComponent implements OnInit {

  title = 'Manage Slider';
  sliders: Slider;
  error: string;
  isAgregar:boolean= true;
isEditar:boolean= false;
  ServerUrl = environment.apiUrl;
  private http: HttpClient;

  p: Number = 1;
  count: Number = 5;

  constructor(
    public sliderService: SliderService,
    private location: Location,
    handler: HttpBackend) {
    this.http = new HttpClient(handler);
   }

  ngOnInit() {
    this.sliderService.getSliders().subscribe((resp:any)=>{
      this.sliders = resp.sliders.data;
    })
  }

  onDelete(id: number) {
    if (confirm('Are you sure want to delete id = ' + id)) {
      this.sliderService.deleteSlider(+id).subscribe(
        (res:any) => {
          // console.log(res);
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
