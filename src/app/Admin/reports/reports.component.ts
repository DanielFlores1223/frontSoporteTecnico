import { Component, OnInit } from '@angular/core';
import {  ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ActivatedRoute, Params } from '@angular/router';
import { saveAs } from 'file-saver';
import { UserIdentity } from '../../Entities/user.interfaces';

import { TicketService } from '../../Services/ticket.service';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  technician: UserIdentity = { email: '', forename: '', id: '', role: '', surname: '', area: '' }
  totalTickets: number = 0;

  constructor( private rutaActiva: ActivatedRoute,
               private ticketS: TicketService,
               private userS: UserService ) { }

    idTechnician: string = '';
    token: string = String(localStorage.getItem('token'));


    ngOnInit(): void {
      this.idTechnician = this.rutaActiva.snapshot.params.id;
      this.getReportByUserMonth();
      this.getTechnicianInfo();
    }

    getReportByUserMonth() {
      this.ticketS.getReportByUserMonth( this.idTechnician, '2022', this.token ).subscribe(
        (res: any) => {
          const { success, result } = res;
          
          if( success ) {
            const { tickets } = result;

            tickets.forEach( (t:any) => {
                const { Enero, Febrero, Marzo, Abril, Mayo, Junio, Julio, Agosto, Septiembre, Octubre, Noviembre, Diciembre } = t;
                
                if( Enero ) this.data[0] = Enero.length;
                if( Febrero ) this.data[1] = Febrero.length;
                if( Marzo ) this.data[2] = Marzo.length;
                if( Abril ) this.data[3] = Abril.length;
                if( Mayo ) this.data[4] = Mayo.length;
                if( Junio ) this.data[5] = Junio.length;
                if( Julio ) this.data[6] = Julio.length;
                if( Agosto ) this.data[7] = Agosto.length;
                if( Septiembre ) this.data[8] = Septiembre.length;
                if( Octubre ) this.data[9] = Octubre.length;
                if( Noviembre ) this.data[10] = Noviembre.length;
                if( Diciembre ) this.data[11] = Diciembre.length;

            });

            //sumar todos los tickets del técnico
            this.totalTickets = this.data.reduce((a, b) => a + b, 0);
          }

          //actualizar gráfica
          this.chart?.update();
          
        },
        err => {
          console.log(err)
        }
      )

    }

    getTechnicianInfo() {
        this.userS.getUser( this.idTechnician, this.token ).subscribe(
          (res: any) => {
              const { success, result } = res;

              if (success) {
                  this.technician = result;

              }else {
                //algo salio mal
              }
          },
          err => {
            //algo salio mal
            console.log(err);
          }
        )
    }

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 0
      }
    },
    plugins: {
      legend: {
        display: true,
      },
     
    }
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [
   
  ];

  public barChartData: ChartData<'bar'> = {
    labels: [ 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre' ],
    datasets: [
      { data: this.data, label: 'Tickets', backgroundColor: 'rgba(52, 152, 219, 0.3)' },
    ]
  };

  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    //console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    //console.log(event, active);
  }

  public randomize(): void {
    // Only Change 3 values
    this.barChartData.datasets[0].data = [
      Math.round(Math.random() * 100),
      59,
      80,
      Math.round(Math.random() * 100),
      56,
      Math.round(Math.random() * 100),
      40 ];

    this.chart?.update();
  }

  public descarga(){
    console.log('descargando');
    //this.ticketS.getXSLXByUserMonth('621c111a0c903452f5a46553', '2022', this.token)

    this.ticketS.getXSLXByUserMonth( this.idTechnician, '2022', this.token );
    

    /*this.ticketS.getXSLXByUserMonth('621c111a0c903452f5a46553', '2022', this.token).subscribe(
      (res:any) => {
        //console.log('salio bien')
        //console.log(res);
        this.manageExcelFile(res, 'reporteOtro')
      },
      err => {
        console.log(err);
      }
    )*/
  }

  manageExcelFile( response:any, filename: string ) {
    const dataType = response.type;
    const binaryData = [];
    binaryData.push(response);

    const filePath = window.URL.createObjectURL(new Blob(binaryData, { type: dataType}) );
    const downloadLink = document.createElement('a');
    downloadLink.href = filePath;
    downloadLink.setAttribute('download', filename);
    document.body.appendChild(downloadLink);
    downloadLink.click();

  }


  /*let headers = new Headers();
  headers.append('Content-Type', 'application/vnd.openxmlformats');
  this.http
    .get(
      `${pathToExcel}`,
      { headers: headers, responseType: ResponseContentType.Blob }
    )
    .subscribe((res: any) => {
      let blob = new Blob([res._body], { type: 'application/vnd.openxmlformats' });
        let myUrl = document.createElement('a');
        myUrl.href = window.URL.createObjectURL(blob);
        myUrl.download = 'Log.xlsx';
        let event = document.createEvent('MouseEvent');
        event.initEvent('click', true, true);
        myUrl.dispatchEvent(event);
    });*/

}
