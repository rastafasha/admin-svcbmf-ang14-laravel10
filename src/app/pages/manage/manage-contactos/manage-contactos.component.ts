import { Component, OnInit } from '@angular/core';
import { Contact } from '../../../models/contact';
import { Location } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpBackend} from '@angular/common/http';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-manage-contactos',
  templateUrl: './manage-contactos.component.html',
  styleUrls: ['./manage-contactos.component.css']
})
export class ManageContactosComponent implements OnInit {

  title = 'Correos Recibidos';
  contacts: Contact;
  error: string;

  ServerUrl = environment.apiUrl;
  private http: HttpClient;
  isAgregar:boolean= true;
isEditar:boolean= false;
  p: Number = 1;
  count: Number = 5;

  constructor(
    public contactService: ContactService,
    private location: Location,
    handler: HttpBackend) {
    this.http = new HttpClient(handler);
   }

  ngOnInit() {
    this.contactService.getContacts().subscribe(
      (data: Contact) => this.contacts = data,
      error => this.error = error
    );
  }

  onDelete(id: number) {
    if (confirm('Are you sure want to delete id = ' + id)) {
      this.contactService.deleteContact(+id).subscribe(
        res => {
          //console.log(res);
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
