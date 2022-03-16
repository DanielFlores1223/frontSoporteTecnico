import { Component, OnInit } from '@angular/core';

//services
import { ComplaintService } from '../../Services/complaint.service';

//interfaces
import { Complaint } from '../../Entities/complaint.interfaces';

@Component({
  selector: 'app-complaints-mailbox',
  templateUrl: './complaints-mailbox.component.html',
  styleUrls: ['./complaints-mailbox.component.css']
})
export class ComplaintsMailboxComponent implements OnInit {

  constructor( private complaintS: ComplaintService ) { }

  createComplaint: Complaint = {
    createdBy: String(localStorage.getItem('id')),
    dateIncidence: '',
    message: '',
    status: 'No leido',
    technicianId: ''
  
  }

  ngOnInit(): void {
  }

  

}
