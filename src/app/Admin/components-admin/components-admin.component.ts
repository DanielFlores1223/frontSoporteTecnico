import { Component, OnInit } from '@angular/core';
import {AfterViewInit, ViewChild} from '@angular/core';
import { tick } from '@angular/core/testing';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Tecnicos } from 'src/app/interfaces/tecnicos';

@Component({
  selector: 'app-components-admin',
  templateUrl: './components-admin.component.html',
  styleUrls: ['./components-admin.component.css']
})
export class ComponentsAdminComponent implements OnInit {

  listTecnicos: Tecnicos[] = [
    {nombre: 'Juan Carlos Espinoza Ruiz', folio: 1007990, area: "El teclado no responde", estatus:'Disponible', tipoTicket:'administrativo', fecha:'3-Marzo-2022'},
    {nombre: 'Marcos Fabian Lopéz García', folio: 1057990, area: 'El teclado no responde', estatus:'Disponible', tipoTicket:'administrativo', fecha:'3-Marzo-2022'},
    {nombre: 'Luis Figueroa Morales', folio: 1283749, area: 'El teclado no responde', estatus:'Disponible', tipoTicket:'administrativo', fecha:'3-Marzo-2022'},
    {nombre: 'Pedro Fernandez Hernan', folio: 1007163, area: 'El teclado no responde', estatus:'Disponible', tipoTicket:'administrativo', fecha:'3-Marzo-2022'},
    {nombre: 'Carlos Hernan Cortes', folio: 1019285, area: 'El teclado no responde', estatus:'Disponible', tipoTicket:'administrativo', fecha:'3-Marzo-2022'},
    
    {nombre: 'Luis Figueroa Morales', folio: 1283749, area: 'El teclado no responde', estatus:'Disponible', tipoTicket:'administrativo', fecha:'3-Marzo-2022'},
    {nombre: 'Pedro Fernandez Hernan', folio: 1007163, area: 'El teclado no responde', estatus:'Disponible', tipoTicket:'administrativo', fecha:'3-Marzo-2022'},
    {nombre: 'Carlos Hernan Cortes', folio: 1019285, area: 'El teclado no responde', estatus:'Disponible', tipoTicket:'administrativo', fecha:'3-Marzo-2022'},
  ];

  displayedColumns: string[] = ['nom-tecnico', 'folio-tic', 'area', 'estatus', 'tipoTicket', 'fecha'];
 
  dataSource = new MatTableDataSource(this.listTecnicos);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}

