import { Component, OnInit } from '@angular/core';
import { NewsInstagramService } from '../../../services/newsInstagram.service';
import { NewsInstagram } from '../../../models/newsInstagram';
import { Location } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpBackend} from '@angular/common/http';

@Component({
  selector: 'app-newsintagram',
  templateUrl: './newsintagram.component.html',
  styleUrls: ['./newsintagram.component.css']
})
export class NewsintagramComponent implements OnInit {

  title = 'Instagram news';
  newsInstagrams: NewsInstagram;
  error: string;

  ServerUrl = environment.apiUrl;
  private http: HttpClient;
  isAgregar:boolean= true;
isEditar:boolean= false;
  p: Number = 1;
  count: Number = 5;

  constructor(
    public newsInstagramService: NewsInstagramService,
    private location: Location,
    handler: HttpBackend) {
    this.http = new HttpClient(handler);
   }

  ngOnInit() {
    this.newsInstagramService.getNewsIntagrams().subscribe(
      (data: NewsInstagram) => this.newsInstagrams = data,
      error => this.error = error
    );

  }

  onDelete(id: number) {
    if (confirm('Are you sure want to delete id = ' + id)) {
      this.newsInstagramService.deleteNewsIntagram(+id).subscribe(
        res => {
          console.log(res);
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
